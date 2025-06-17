
# 🎫 SupportMate AI – AI-Powered Ticket Management System

**SupportMate AI** is a full-stack web application that leverages AI to streamline customer support workflows. It automatically categorizes, prioritizes, and assigns support tickets to the most suitable moderators based on skills—making ticket resolution faster, smarter, and more efficient.

---

## 🚀 Features

### 🤖 AI-Powered Ticket Handling
- Auto-categorizes tickets using Google Gemini AI
- Assigns priority levels intelligently
- Generates helpful notes for moderators

### 👥 Role-Based User Management
- Roles: User, Moderator, Admin
- Moderators can have specific skills
- Admin panel to manage users and roles

### 🔄 Smart Moderator Assignment
- Regex-based skill matching
- Falls back to Admin if no match found

### 📧 Email Notifications
- Moderator receives an email on new ticket assignment
- Integration with Mailtrap via Nodemailer

### ⚙️ Background Jobs (Event-Driven)
- Uses Inngest for async event handling
- Real-time ticket enrichment after creation

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Background Jobs**: Inngest
- **AI Integration**: Google Gemini API
- **Email Service**: Nodemailer + Mailtrap
- **Development Tools**: VS Code, Postman, Nodemon

---

## 📋 Prerequisites

- Node.js v14 or higher
- MongoDB instance (local or cloud)
- Google Gemini API key
- Mailtrap account for email testing

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Niteshyadav18/FULLSTACK_AI-AGENT.git
cd ai-ticket-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root with the following:

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

## 🚀 Running the App

Start both the main and Inngest dev servers:

```bash
# Run the backend server
npm run dev

# Run Inngest background job server
npm run inngest-dev
```

---

## 📡 API Endpoints

### 🔐 Authentication

- `POST /api/auth/signup` – Register new user
- `POST /api/auth/login` – Login & get token

### 🎫 Ticket Management

- `POST /api/tickets` – Create new ticket
- `GET /api/tickets` – Get all tickets for logged-in user
- `GET /api/tickets/:id` – Get specific ticket details

### 🔧 Admin Routes

- `GET /api/auth/users` – Get all users (admin only)
- `POST /api/auth/update-user` – Update user role/skills (admin only)

---

## 🧠 How It Works (Flow)

1. **User Submits Ticket**
   - Inputs title and description
2. **AI Enrichment Begins**
   - Triggers `on-ticket-created` event
   - Gemini AI enriches the ticket (adds skills, type, notes, priority)
3. **Moderator Assignment**
   - Finds matching moderator via skills
   - Defaults to Admin if none
4. **Email Notification**
   - Assigned moderator receives email with ticket details

---

## 🧪 Testing

Use Postman or CURL to test ticket creation:

```bash
curl -X POST http://localhost:3000/api/tickets \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
  "title": "Login Issue",
  "description": "I can't login using my credentials."
}'
```

---

## 🧰 Troubleshooting

- **Port Already in Use**  
  ```bash
  lsof -i :8288
  kill -9 <PID>
  ```

- **Email not sending?**
  - Double-check Mailtrap credentials in `.env`

- **AI not responding?**
  - Verify your Gemini API Key & rate limits

---

## 📦 Dependencies

- `express`  
- `mongoose`  
- `jsonwebtoken`  
- `bcrypt`  
- `cors`  
- `dotenv`  
- `nodemailer`  
- `inngest`  
- `@inngest/agent-kit`

---

## 🙌 Acknowledgments

- [Inngest](https://www.inngest.com/) – Background event handling  
- [Google Gemini](https://deepmind.google/technologies/gemini/) – AI-powered insights  
- [Mailtrap](https://mailtrap.io/) – Email testing  
- [MongoDB](https://www.mongodb.com/) – NoSQL database  


---

## 📜 License

MIT © 2025 Nitesh Yadav
