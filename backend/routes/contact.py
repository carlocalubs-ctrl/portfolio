from fastapi import APIRouter, HTTPException, Depends
from models.contact import ContactMessage, ContactMessageCreate, ContactMessageResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging
import os
import asyncio
import resend
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

# Configure Resend
resend.api_key = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "carlocalubs@gmail.com")


# Dependency to get database
async def get_database():
    from server import db
    return db


def build_email_html(name: str, email: str, subject: str, message: str) -> str:
    """Build HTML email for contact form notification"""
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 40px 20px; font-family: Arial, sans-serif;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1e293b; border-radius: 12px; overflow: hidden; max-width: 600px;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%); padding: 30px 40px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">New Contact Message</h1>
                            <p style="color: #d1fae5; margin: 8px 0 0 0; font-size: 14px;">From your portfolio website</p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                                        <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 600;">{name}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                                        <a href="mailto:{email}" style="color: #14b8a6; margin: 0; font-size: 16px; text-decoration: none;">{email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <p style="color: #94a3b8; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                                        <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 500;">{subject}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style="color: #94a3b8; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                                        <div style="background-color: #0f172a; border-left: 4px solid #14b8a6; padding: 16px 20px; border-radius: 4px;">
                                            <p style="color: #e2e8f0; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{message}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #0f172a; padding: 20px 40px; text-align: center; border-top: 1px solid #334155;">
                            <p style="color: #64748b; margin: 0; font-size: 12px;">
                                Sent from <strong style="color: #14b8a6;">John Carlo R. Calubiran</strong> Portfolio
                            </p>
                            <p style="color: #475569; margin: 4px 0 0 0; font-size: 11px;">
                                Received at {datetime.now().strftime("%B %d, %Y at %I:%M %p")}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    """


async def send_notification_email(name: str, email: str, subject: str, message: str):
    """Send email notification using Resend"""
    try:
        html_content = build_email_html(name, email, subject, message)
        params = {
            "from": SENDER_EMAIL,
            "to": [NOTIFICATION_EMAIL],
            "subject": f"Portfolio Contact: {subject}",
            "html": html_content,
            "reply_to": email
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent successfully. ID: {result.get('id')}")
        return result
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return None


@router.post("/contact", response_model=ContactMessageResponse)
async def create_contact_message(
    input: ContactMessageCreate,
    database: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Submit a contact form message - saves to database AND sends email notification
    """
    try:
        # Create contact message object
        contact_obj = ContactMessage(**input.dict())
        
        # Save to database
        await database.contact_messages.insert_one(contact_obj.dict())
        logger.info(f"Contact message saved from {input.email}")
        
        # Send email notification (non-blocking, won't fail the request)
        email_result = await send_notification_email(
            name=input.name,
            email=input.email,
            subject=input.subject,
            message=input.message
        )
        
        success_message = "Message sent successfully! I will get back to you soon."
        if email_result is None:
            logger.warning("Message saved but email notification failed")
        
        return ContactMessageResponse(
            success=True,
            message=success_message,
            id=contact_obj.id
        )
    except Exception as e:
        logger.error(f"Error in contact endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")


@router.get("/contact/messages")
async def get_contact_messages(
    skip: int = 0,
    limit: int = 50,
    database: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get all contact messages (for admin use)"""
    try:
        messages = await database.contact_messages.find(
            {}, {"_id": 0}
        ).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return {
            "success": True,
            "messages": messages,
            "count": len(messages)
        }
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")
