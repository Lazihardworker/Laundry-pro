# LaundryPro - Professional Laundry & Dry Cleaning Management System

A modern, full-stack web application for managing laundry and dry-cleaning businesses. Built with scalability and ease of use in mind.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black.svg)
![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)

---

## 🌟 Features

### For Customers
- ✅ Easy online ordering
- ✅ Real-time order tracking
- ✅ Multiple service types (Basic, Premium, Express, Corporate)
- ✅ Pickup & delivery scheduling
- ✅ Order history & reordering
- ✅ Profile management
- ✅ In-app notifications

### For Staff
- ✅ Order management dashboard
- ✅ Status updates (Washing → Ironing → Ready)
- ✅ Task assignment
- ✅ Issue reporting

### For Admin/Owners
- ✅ Complete business dashboard
- ✅ Revenue & order analytics
- ✅ Staff management
- ✅ Branch management
- ✅ Service & pricing control
- ✅ Performance reports

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (Access + Refresh tokens)
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.x ([Download](https://nodejs.org/))
- **PostgreSQL** >= 15.x ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** or **pnpm**
- **Git**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/laundry-pro.git
cd laundry-pro
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` and configure:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/laundrypro?schema=public"

# JWT Secrets (generate secure random strings)
JWT_ACCESS_SECRET=your-super-secret-access-token-key
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment

```bash
cd frontend
cp .env.example .env.local
```

Edit `.env.local` and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database with sample data
npx prisma db seed
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:3000
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Prisma Studio** (Database GUI): `npx prisma studio`

---

## 📁 Project Structure

```
laundry-pro/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma       # Database schema
│   ├── src/
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Auth, validation, error handling
│   │   ├── routes/             # API routes
│   │   ├── utils/              # Helper functions
│   │   └── server.ts           # Express app setup
│   ├── .env.example            # Environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── customer/       # Customer dashboard & features
│   │   │   ├── staff/          # Staff dashboard
│   │   │   └── admin/          # Admin dashboard
│   │   ├── components/
│   │   │   ├── ui/             # Reusable UI components
│   │   │   ├── shared/         # Shared components
│   │   │   └── order/          # Order-specific components
│   │   ├── lib/
│   │   │   ├── api.ts          # API client
│   │   │   ├── constants.ts    # App constants
│   │   │   ├── store.ts        # Zustand store
│   │   │   └── utils.ts        # Utility functions
│   │   └── types/              # TypeScript types
│   ├── .env.example            # Environment template
│   └── package.json
│
└── shared/                     # Shared types & utilities
```

---

## 🔐 Authentication Flow

1. **Registration**: User provides phone/email + password
2. **OTP Verification**: 6-digit code sent to phone
3. **Token Generation**: JWT access + refresh tokens
4. **Access**: Access token in Authorization header
5. **Refresh**: Automatic token refresh on expiry

---

## 🗄️ Database Schema

### Core Tables
- `users` - Customers, staff, admin accounts
- `branches` - Business locations
- `services` - Service types & pricing
- `orders` - Laundry orders
- `order_items` - Individual items in orders
- `payments` - Payment records
- `staff` - Staff profiles
- `issues` - Problem reports
- `notifications` - User notifications
- `subscriptions` - Customer subscriptions
- `reviews` - Customer ratings
- `activity_logs` - Audit trail

See `backend/prisma/schema.prisma` for complete schema.

---

## 🎨 UI/UX Design Principles

- **Mobile-first** responsive design
- **Color-coded order statuses**
- **Large touch targets** (44px minimum)
- **Progressive disclosure**
- **Minimal animations** (Framer Motion)
- **Dark mode support** (admin dashboard)

### Status Colors
| Status | Color |
|--------|-------|
| Pending | Gray |
| Received | Blue |
| Washing | Cyan |
| Ironing | Purple |
| Ready | Green |
| Delivered | Emerald |
| Cancelled | Red |

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
```

### Orders
```
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id/status
```

### Admin
```
GET    /api/admin/dashboard
GET    /api/admin/analytics
GET    /api/admin/staff
```

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
# Deploy to Railway/Render
```

### Database (Supabase/Neon)
1. Create PostgreSQL database
2. Copy connection string
3. Update `DATABASE_URL` in production env
4. Run migrations: `npx prisma migrate deploy`

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## 📈 Roadmap

### Phase 1 (MVP) ✅
- Customer ordering
- Order tracking
- Basic admin dashboard

### Phase 2 (Current)
- Payment integration (Paystack/Flutterwave)
- WhatsApp notifications
- Staff mobile app

### Phase 3 (Future)
- Multi-branch support
- Route optimization
- Mobile apps (iOS/Android)
- Loyalty program

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 📞 Support

For support, email support@laundrypro.com or join our Slack channel.

---

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) for the database ORM
- [Next.js](https://nextjs.org/) for the frontend framework

---

Built with ❤️ for Nigerian laundry businesses
