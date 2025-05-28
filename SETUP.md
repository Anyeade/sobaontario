# SOBA Ontario Website Setup Guide

## Quick Setup

### 1. Environment Variables
Create a `.env.local` file in the root directory with the following:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@host:port/database"

# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Database Setup (Neon)

1. Create a Neon account at https://neon.tech
2. Create a new project
3. Copy the connection string to your `.env.local` file
4. Run database migrations:
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

### 3. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe dashboard
3. Set up a webhook endpoint pointing to: `https://yourdomain.com/api/webhooks/stripe`
4. Configure webhook events:
   - `checkout.session.completed`
   - `checkout.session.expired`

### 4. Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at http://localhost:3000

## Features Implemented

✅ **Homepage** - SOBA Ontario landing page with hero, about, and features
✅ **Membership Registration** - Complete form with Stripe payment ($100 CAD)
✅ **Donation System** - Multi-category donations with flexible amounts
✅ **Database Integration** - Neon PostgreSQL with Drizzle ORM
✅ **Payment Processing** - Stripe Checkout for secure payments
✅ **Responsive Design** - Mobile-first design with dark/light themes
✅ **Success Pages** - Post-payment confirmation pages

## Pages Available

- `/` - Homepage
- `/membership` - Membership registration
- `/donations` - Donation page
- `/membership/success` - Membership success page
- `/donations/success` - Donation success page

## Missing Pages (To Be Created)

- `/news` - News and announcements
- `/volunteer` - Volunteer programs
- `/events` - Community events
- `/contact` - Contact information
- `/outreach` - Community outreach

## Database Schema

The application includes tables for:
- `members` - Member registration and payment tracking
- `donations` - Donation records
- `events` - Community events
- `news` - News articles
- `store_items` - SOBA Ontario merchandise

## Troubleshooting

### Hydration Errors
If you encounter hydration errors, ensure:
- All client components use `"use client"` directive
- Server and client rendering match
- No dynamic content that changes between server and client

### Build Errors
- Ensure all environment variables are set
- Check that database connection is working
- Verify Stripe keys are correct

### Payment Issues
- Verify Stripe webhook is configured correctly
- Check webhook secret matches your environment variable
- Ensure webhook endpoint is accessible

## Next Steps

1. Set up production environment variables
2. Configure domain and SSL certificate
3. Set up Stripe webhook in production
4. Create remaining pages (news, events, contact)
5. Add content management system for news/events
6. Implement member dashboard
7. Add email notifications for payments

## Contact

For technical support or questions about the SOBA Ontario website, contact the development team. 