# AI-Powered Ticket Management System 🎫🤖

Welcome to the AI-Powered Ticket Management System!

This project is a full-stack web application that uses AI to automatically categorize, prioritize, and assign support tickets to the most appropriate moderators. It’s designed to streamline support workflows using smart automation and modern tooling.

---

## 🚀 Features

### 🤖 AI-Powered Ticket Processing
- Automatic ticket categorization based on content
- Smart priority assignment using AI
- AI-generated helpful notes for moderators

### 🧠 Smart Moderator Assignment
- Automatically assigns tickets based on required skills
- Uses regex-based skill matching
- Falls back to admin if no moderator match is found

### 👥 User Management
- Role-based access control (User, Moderator, Admin)
- Skill management for moderators
- Secure authentication using JWT

### ⚙️ Background Processing
- Event-driven architecture using Inngest
- Asynchronous ticket enrichment
- Email notifications via Nodemailer

---

## 🛠 Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Background Jobs**: Inngest
- **AI Integration**: Google Gemini API
- **Email**: Nodemailer with Mailtrap
- **Development**: Nodemon for hot reloading

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google Gemini API key
- Mailtrap account (for email testing)

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-ticket-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with the following:

   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

   MAILTRAP_SMTP_HOST=your_mailtrap_host
   MAILTRAP_SMTP_PORT=your_mailtrap_port
   MAILTRAP_SMTP_USER=your_mailtrap_user
   MAILTRAP_SMTP_PASS=your_mailtrap_password

   GEMINI_API_KEY=your_gemini_api_key
   APP_URL=http://localhost:3000
   ```

---

## 🚀 Running the Application

1. **Start the main server**

   ```bash
   npm run dev
   ```

2. **Start the Inngest dev server**

   ```bash
   npm run inngest-dev
   ```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` – Register a new user  
- `POST /api/auth/login` – Log in and get a JWT token

### Tickets
- `POST /api/tickets` – Create a ticket  
- `GET /api/tickets` – Get tickets for the logged-in user  
- `GET /api/tickets/:id` – Get details of a specific ticket

### Admin
- `GET /api/auth/users` – Get all users (Admin only)  
- `POST /api/auth/update-user` – Update roles and skills (Admin only)

---

## 🔄 Ticket Processing Flow

1. **Ticket Creation**
   - User submits a ticket with a title and description

2. **AI Processing**
   - `on-ticket-created` event is triggered
   - AI processes the ticket and returns:
     - Required skills
     - Priority level
     - Helpful notes
     - Ticket type

3. **Moderator Assignment**
   - Searches for a moderator with matching skills
   - Uses regex matching for skill comparison
   - If none found, falls back to Admin

4. **Notification**
   - Sends email to the assigned moderator
   - Includes ticket info and AI-generated insights

---

## 🧪 Testing

1. **Start the Inngest dev server**

   ```bash
   npm run inngest-dev
   ```

2. **Test Ticket Creation**

   ```bash
   curl -X POST http://localhost:3000/api/tickets \
   -H "Content-Type: application/json" \
   -H "Authorization: Bearer YOUR_JWT_TOKEN" \
   -d '{
     "title": "Database Connection Issue",
     "description": "Experiencing intermittent database connection timeouts"
   }'
   ```

---

## 🧰 Troubleshooting

### Common Issues

- **Port Conflicts**
   ```bash
   lsof -i :8288
   kill -9 <PID>
   ```

- **AI Errors**
  - Check `GEMINI_API_KEY` in `.env`
  - Ensure your quota is not exhausted
  - Validate API request structure

- **Email Issues**
  - Verify Mailtrap credentials
  - Confirm SMTP host/port values

---

## 📦 Dependencies

- `@inngest/agent-kit`
- `bcrypt`
- `cors`
- `dotenv`
- `express`
- `inngest`
- `jsonwebtoken`
- `mongoose`
- `nodemailer`

---


## 🙌 Acknowledgments

- Inngest for background processing
- Google Gemini for AI intelligence
- Mailtrap for email testing
- MongoDB for scalable data handling