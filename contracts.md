# Portfolio Website - API Contracts & Implementation Guide

## Overview
This document outlines the frontend implementation with mock data and the backend API contracts needed for full-stack integration.

## Current Implementation Status

### ✅ Frontend Components (Completed with Mock Data)
1. **Header** - Fixed navigation with smooth scroll
2. **Hero Section** - Animated background with personal intro
3. **Services Section** - 4 service cards + automation tools expertise
4. **Experience Section** - Timeline view of work history
5. **Works Section** - Placeholder for projects (to be updated by user)
6. **Testimonials Section** - 3 random testimonials
7. **Contact Section** - Contact form with validation
8. **Footer** - Links and contact information

### 📋 Mock Data Location
- **File**: `/app/frontend/src/mockData.js`
- **Contains**: All static data for sections

---

## Backend API Contracts (To Be Implemented)

### 1. Contact Form Submission API

**Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "id": "contact_message_id"
}
```

**Database Schema** (MongoDB):
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  subject: String,
  message: String,
  created_at: Date,
  status: String // 'new', 'read', 'replied'
}
```

**Frontend Integration**:
- File: `/app/frontend/src/components/Contact.jsx`
- Current: Mock submission with toast notification
- Replace: `handleSubmit` function to call actual API

---

### 2. Projects/Works API (Optional - For Future)

**Endpoint**: `GET /api/projects`

**Response**:
```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "technologies": ["string"],
      "image_url": "string",
      "project_url": "string",
      "featured": boolean
    }
  ]
}
```

**Note**: User will provide project details later. Placeholder is currently displayed.

---

### 3. Testimonials Management (Optional - For Future)

**Endpoint**: `GET /api/testimonials`

**Response**:
```json
{
  "testimonials": [
    {
      "id": "string",
      "name": "string",
      "position": "string",
      "company": "string",
      "content": "string",
      "rating": number,
      "is_active": boolean
    }
  ]
}
```

**Note**: Currently using random testimonials from mock data.

---

## Integration Steps

### Phase 1: Contact Form Backend (Priority)
1. Create MongoDB collection: `contact_messages`
2. Create FastAPI endpoint: `/api/contact`
3. Add email notification (optional)
4. Update frontend Contact component to use actual API
5. Remove mock submission logic

### Phase 2: Projects Management (When User Provides Data)
1. Create MongoDB collection: `projects`
2. Create API endpoints: GET, POST, PUT, DELETE
3. Update frontend Works component
4. Remove placeholder logic

### Phase 3: Admin Dashboard (Optional)
1. View contact form submissions
2. Manage projects/works
3. Manage testimonials

---

## Frontend-Backend Integration Points

### Contact Form Component
**File**: `/app/frontend/src/components/Contact.jsx`

**Current Code** (Lines 18-27):
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // Mock submission - will be replaced with backend API
  console.log('Form submitted:', formData);
  setIsSubmitted(true);
  toast.success('Message sent successfully! I will get back to you soon.');
  setTimeout(() => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
  }, 3000);
};
```

**To Replace With**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API}/contact`, formData);
    setIsSubmitted(true);
    toast.success('Message sent successfully! I will get back to you soon.');
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  } catch (error) {
    toast.error('Failed to send message. Please try again.');
    console.error('Contact form error:', error);
  }
};
```

---

## Environment Variables
No additional environment variables needed. Using existing:
- `REACT_APP_BACKEND_URL` - Already configured
- `MONGO_URL` - Already configured

---

## Testing Checklist
- [ ] Contact form backend API created
- [ ] Contact form submission works with backend
- [ ] Contact messages stored in MongoDB
- [ ] Error handling implemented
- [ ] Email notifications (optional)
- [ ] Projects API when user provides data
- [ ] Frontend components updated to use real APIs

---

## Notes
- Frontend is fully functional with mock data
- All interactive elements work (navigation, forms, buttons)
- Responsive design implemented
- Animations and transitions working
- Color scheme: Professional teal/emerald with slate background
- No purple/blue gradients used (following design guidelines)
- Using lucide-react icons (no emoji icons)
