# Metro Cracks - Cyber Recovery Platform

A professional full-stack cryptocurrency recovery and security platform built with React, TypeScript, Node.js, and MongoDB.

## Features

### Public Features
- **Home Page**: Professional landing page with recovery stats, services overview, and testimonials
- **About Page**: Company mission, credentials, and team expertise
- **Services Page**: Detailed service descriptions with "Connect Wallet" CTAs
- **FAQ Page**: Comprehensive Q&A about recovery services
- **Contact Page**: Contact form with Formspree integration for admin messaging
- **24/7 WhatsApp Support Widget**: Quick access to support team

### Authenticated Features
- **User Registration & Login**: Secure authentication with JWT
- **Dashboard**: Overview of user cases and activities
- **Wallet Backup**: Secure wallet backup functionality
- **Recovery Request**: Submit recovery requests with supporting documents
- **Admin Panel**: Manage user cases and track recovery progress

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS v4, Framer Motion, React Icons
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT/bcrypt authentication
- **Form Processing**: Formspree (formspree.io) for contact form submissions
- **Styling**: Tailwind CSS v4 with custom orange/white color scheme, responsive design

## Project Structure

```
PrimeSolutions/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Landing page with services & testimonials
│   │   │   ├── About.tsx             # Company information
│   │   │   ├── Services.tsx          # Detailed service descriptions
│   │   │   ├── FAQ.tsx               # Frequently asked questions
│   │   │   ├── Contact.tsx           # Contact form with Formspree
│   │   │   ├── Login.tsx             # User login
│   │   │   ├── Register.tsx          # User registration
│   │   │   ├── Dashboard.tsx         # User dashboard
│   │   │   ├── WalletConnect.tsx     # Wallet backup page
│   │   │   ├── UploadProof.tsx       # Recovery request upload
│   │   │   ├── Admin.tsx             # Admin panel
│   │   │   └── WalletSelection.tsx   # Wallet type selection
│   │   ├── components/
│   │   │   ├── Layout.tsx            # Global navbar/footer with responsive mobile menu
│   │   │   └── WhatsAppWidget.tsx    # 24/7 support widget
│   │   └── App.tsx                   # Route configuration
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── auth.ts                   # Authentication endpoints
│   │   ├── wallet.ts                 # Wallet management endpoints
│   │   ├── cases.ts                  # Case management endpoints
│   │   └── admin.ts                  # Admin endpoints
│   ├── middleware/
│   │   └── auth.ts                   # JWT authentication middleware
│   └── package.json
└── README.md                          # This file
```

## Navigation Structure

### Desktop Navigation (Top Navbar)
- **Logo**: Links to home page
- **Menu Items**: Home, About, Services, Contact, FAQ
- **Authentication**: 
  - If logged out: "Connect Wallet" button → leads to login
  - If logged in: "Dashboard" link + "Logout" button

### Mobile Navigation
- **Hamburger Menu**: Opens/closes mobile dropdown menu
- **Menu Items**: All desktop menu items plus Dashboard/Logout for authenticated users
- **Responsive**: Full-width mobile menu with touch-friendly spacing

## Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PrimeSolutions
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set Up Environment Variables**

   Backend (.env):
   ```
   MONGODB_URI=mongodb://localhost:27017/primesolutions
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   Frontend (.env):
   ```
   VITE_API_URL=http://localhost:5000
   ```

5. **Ensure MongoDB is Running**
   ```bash
   mongod
   ```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173 (or next available port)

### Production Build

**Frontend Build:**
```bash
cd frontend
npm run build
```

Build output: `frontend/dist/`

## Key Features Implementation

### Mobile Responsive Hamburger Menu
- Fixed navbar with scroll detection
- Mobile menu toggle button (hamburger icon)
- Auto-closes menu on navigation
- Responsive styling for scrolled/non-scrolled states

### Formspree Contact Form Integration
- Contact form at `/contact` endpoint
- Fields: Name, Email, Phone, Subject, Message
- Formspree endpoint: https://formspree.io/f/xyzpdvlj
- Success/error handling with user feedback
- Fully responsive design with animations

### Navigation Flow
1. **Unauthenticated Users**: See "Connect Wallet" button → redirects to login page
2. **Authenticated Users**: See "Dashboard" link + "Logout" button
3. **Mobile Users**: Full dropdown menu with all navigation items

### Button Updates
- All "BOOK FREE CONSULTATION" buttons changed to "CONNECT WALLET"
- All CTAs route to `/login` page
- Consistent `!text-white` styling for button text visibility

## Color Scheme

- **Orange** (`orange-900` to `orange-400`): Primary brand color for buttons, accents, and highlights
- **White**: Backgrounds and text contrast
- **Gray**: Neutral containers and secondary text
- **Gradients**: Subtle orange gradients for visual depth

## Authentication

- JWT-based authentication
- Passwords encrypted with bcrypt
- Protected routes require valid token
- Token stored in localStorage

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Wallet Management
- `GET /wallet/data` - Get user wallet data
- `POST /wallet/backup` - Backup wallet

### Cases
- `GET /cases` - Get user cases
- `POST /cases` - Create recovery request

### Admin
- `GET /admin/cases` - Get all cases (admin only)
- `PUT /admin/cases/:id` - Update case status (admin only)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in .env file
- Verify MongoDB is accessible on localhost:27017

### Mobile Menu Not Working
- Clear browser cache and reload
- Check if JavaScript is enabled
- Verify screen width (mobile menu only shows on screens < 768px)

## Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables
# Deploy backend folder
```

## License

This project is proprietary and confidential.

## Support

For support, contact via the "Contact Us" page or WhatsApp widget (24/7).
