# Backend Document - Shantanu Jagirdar Portfolio

## 1. Current Architecture (Serverless/Client-Side)
The application currently operates as a **Static Site (SPA)**. 
- **Data**: Hardcoded in `Sections.tsx` for maximum performance and zero latency.
- **Form Handling**: Contact form submissions are currently client-side only (UI-ready).

## 2. Recommended Backend Evolution (Firebase)
To support dynamic features, the following backend architecture is recommended:

### 2.1 Database (Firestore)
- **Collections**:
    - `gigs`: `{ date: Timestamp, venue: String, location: String, ticketLink: String }`
    - `gallery`: `{ url: String, caption: String, type: 'image' | 'video' }`
    - `inquiries`: `{ name: String, email: String, message: String, timestamp: Timestamp }`

### 2.2 Authentication (Firebase Auth)
- **Admin Access**: Secure login for Shantanu to access a private dashboard for updating content.

### 2.3 Storage (Firebase Storage)
- **Media Hosting**: Hosting for high-resolution press kits, audio demos, and gallery assets.

## 3. API Endpoints (Proposed Node.js/Express)
If a custom backend is required instead of Firebase:
- `GET /api/gigs`: Fetch upcoming events.
- `POST /api/contact`: Send email notifications and save inquiries.
- `GET /api/media`: Fetch gallery assets.

## 4. Security
- **Environment Variables**: Use `.env` for API keys (Stripe, EmailJS, etc.).
- **CORS**: Restricted to the portfolio domain.
- **Rate Limiting**: Implementation on the contact form to prevent spam.
