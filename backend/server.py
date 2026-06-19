import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import resend

resend.api_key = os.environ.get("re_WsT8Cufn_NusDmwUnfxETTe7pZ3dVxDR1")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/send-email")
async def send_email(request: Request):
    try:
        data = await request.json()
        params = {
            "from": os.environ.get("SENDER_EMAIL"),
            "to": os.environ.get("NOTIFICATION_EMAIL"),
            "subject": "New Contact Submission",
            "html": f"<p>Name: {data.get('name')}</p><p>Message: {data.get('message')}</p>"
        }
        resend.Emails.send(params)
        return {"status": "success"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
