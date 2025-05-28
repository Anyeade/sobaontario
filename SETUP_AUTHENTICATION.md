# Authentication System Setup - SOBA Ontario

This document outlines the complete authentication system implementation for the SOBA Ontario website, including member registration, login, admin dashboard, and role-based access control.

## Features Implemented

### 1. Member Authentication
- **Registration** through membership payment flow
- **Login/Logout** with email and password
- **Password hashing** using bcrypt
- **Session management** with NextAuth.js
- **Profile management** for logged-in members

### 2. Role-Based Access Control
- **Member role** - access to profile and member features
- **Admin role** - access to admin dashboard and management features
- **Super Admin role** - full system access

### 3. Hardcoded Admin Access
- **Email**: `admin@sobaontario.org`
- **Password**: `Mnbvcxzl@5`
- **Role**: `super_admin`

### 4. Admin Dashboard
- **Admin layout** with sidebar navigation
- **Dashboard overview** with statistics and quick actions
- **Members management** - view, edit, activate/deactivate members
- **Role-based access** - only admins can access admin routes

## Environment Variables Required

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="your_neon_database_url_here"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"

# Stripe (for payments)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Email (for notifications)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your_email@gmail.com"
EMAIL_SERVER_PASSWORD="your_app_password"
EMAIL_FROM="noreply@sobaontario.org"
```

## Database Migration

Run the following commands to update your database:

```bash
# Generate migration files
pnpm db:generate

# Apply migrations
pnpm db:migrate
```

## Admin System Features

### Completed Admin Pages:
1. **Dashboard** (`/admin`) - Overview with statistics
2. **Members Management** (`/admin/members`) - Full CRUD operations
3. **Admin Layout** - Consistent navigation and access control

### Admin Features Include:
- View all members with filtering and search
- Toggle member active/inactive status
- Update payment status
- Delete members
- Role management
- Real-time statistics dashboard

## API Routes Created

### Authentication:
- `POST /api/auth/[...nextauth]` - NextAuth handler
- `GET/PUT /api/members/[id]` - Member profile management

### Admin APIs:
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/members` - List all members
- `PATCH /api/admin/members/[id]` - Update member status
- `DELETE /api/admin/members/[id]` - Delete member

## Security Features

1. **Password Hashing** - bcrypt for secure password storage
2. **JWT Tokens** - Secure session management
3. **Role-based Access** - Different permissions for members/admins
4. **Protected Routes** - Automatic authentication checks
5. **CSRF Protection** - Built into NextAuth

## User Roles

### Member (`role: "member"`)
- Access to profile page
- Can update personal information
- View membership status
- Access to public site features

### Admin (`role: "admin"`)
- All member permissions
- Access to admin dashboard
- Manage members, events, store, etc.
- View analytics and reports

### Super Admin (`role: "super_admin"`)
- All admin permissions
- Can manage other admins
- System-wide configuration access

## Next Steps to Complete

### Still Need to Implement:

1. **Store Management**
   - Add/edit/delete products
   - Inventory management
   - Order processing

2. **Event Management**
   - Create/edit events
   - Event registration
   - Calendar integration

3. **News/Blog Management**
   - Create/edit articles
   - Publishing workflow
   - Media management

4. **Volunteer Management**
   - Application review
   - Status updates
   - Communication tools

5. **Donation Management**
   - View donation history
   - Generate reports
   - Donor management

6. **Email System**
   - Welcome emails
   - Password reset
   - Notifications

## Testing the System

### Test Admin Login:
1. Go to `/auth/signin`
2. Use these credentials:
   - **Email**: `admin@sobaontario.org`
   - **Password**: `Mnbvcxzl@5`
3. You should be redirected to `/admin` dashboard

### Create Test Member:
1. Register a new member through `/membership`
2. Complete the payment process
3. Login with the member credentials
4. Access `/profile` to test member features

### Test Member Features:
1. Register as a regular member
2. Login and access `/profile`
3. Update profile information
4. Test authentication flows

## Troubleshooting

### Database Connection Issues:
- Ensure `DATABASE_URL` is correctly set
- Check Neon database is accessible
- Verify schema is up to date

### Authentication Issues:
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies if needed

### Permission Issues:
- Verify user roles in database
- Check session data in browser dev tools
- Ensure proper role checks in API routes

## File Structure

```
app/
├── (site)/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── page.tsx            # Dashboard overview
│   │   └── members/
│   │       └── page.tsx        # Members management
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx        # Login page
│   └── profile/
│       └── page.tsx            # Member profile
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts        # NextAuth handler
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── route.ts        # Dashboard stats API
│   │   └── members/
│   │       └── route.ts        # Admin members API
│   └── members/
│       └── [id]/
│           └── route.ts        # Member profile API
├── context/
│   └── AuthContext.tsx         # Authentication context
lib/
├── auth.ts                     # NextAuth configuration
└── db/
    ├── index.ts               # Database connection
    └── schema.ts              # Database schema
types/
└── next-auth.d.ts             # NextAuth type definitions
```

This system provides a solid foundation for the SOBA Ontario website with secure authentication, member management, and a comprehensive admin dashboard. 