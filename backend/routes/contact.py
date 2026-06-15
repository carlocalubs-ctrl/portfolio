from fastapi import APIRouter, HTTPException, Depends
from models.contact import ContactMessage, ContactMessageCreate, ContactMessageResponse
from motor.motor_asyncio import AsyncIOMotorDatabase
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Dependency to get database
async def get_database():
    from server import db
    return db

@router.post("/contact", response_model=ContactMessageResponse)
async def create_contact_message(input: ContactMessageCreate, database: AsyncIOMotorDatabase = Depends(get_database)):
    """
    Submit a contact form message
    """
    try:
        # Create contact message object
        contact_dict = input.dict()
        contact_obj = ContactMessage(**contact_dict)
        
        # Insert into database
        result = await database.contact_messages.insert_one(contact_obj.dict())
        
        logger.info(f"Contact message received from {input.email}")
        
        return ContactMessageResponse(
            success=True,
            message="Message sent successfully! I will get back to you soon.",
            id=contact_obj.id
        )
    except Exception as e:
        logger.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send message. Please try again.")

@router.get("/contact/messages")
async def get_contact_messages(skip: int = 0, limit: int = 50, database: AsyncIOMotorDatabase = Depends(get_database)):
    """
    Get all contact messages (for admin use)
    """
    try:
        # Exclude MongoDB's _id field from the query results
        messages = await database.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
        return {
            "success": True,
            "messages": messages,
            "count": len(messages)
        }
    except Exception as e:
        logger.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")
