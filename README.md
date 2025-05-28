# SOBA Ontario Website

The official website for SOBA Ontario (Saint Joseph's College Sasse Alumni Association), a registered not-for-profit organization supporting Sasse College alumni in Ontario, Canada.

## Features

- **Membership Registration**: Secure online membership registration with Stripe payment integration
- **Donation System**: Multi-category donation platform supporting various community initiatives
- **Member Benefits**: Comprehensive benefits including financial assistance, death benefits, and educational support
- **Community Features**: Event management, news updates, and member networking
- **Responsive Design**: Modern, mobile-first design built with Next.js and Tailwind CSS
- **Database Integration**: Neon PostgreSQL database with Drizzle ORM for efficient data management

## Tech Stack

- **Framework**: Next.js 15.1.6 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.3
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Payments**: Stripe Checkout for memberships and donations
- **Animations**: Framer Motion
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- Neon database account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd soba-ontario-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_neon_database_url_here"

# Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key_here"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret_here"

# App
NEXT_PUBLIC_APP_URL="https://www.sobaontario.org"
```

4. Generate and run database migrations:
```bash
pnpm db:generate
pnpm db:migrate
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Database Schema

The application uses the following main tables:

- **members**: Member registration and payment information
- **donations**: Donation records and payment tracking
- **events**: Community events and activities
- **news**: News articles and announcements
- **store_items**: SOBA Ontario merchandise

## Stripe Integration

### Membership Payments
- One-time $100 CAD registration fee
- Automatic member record creation and payment tracking
- Email confirmation and receipt generation

### Donations
- Multiple donation categories (Sports & Recreation, Volunteer Programs, etc.)
- Flexible amount selection with predefined options
- Optional donor information for recognition

### Webhook Configuration
Set up a Stripe webhook endpoint at `/api/webhooks/stripe` to handle:
- `checkout.session.completed`: Update payment status
- `checkout.session.expired`: Handle failed payments

## Deployment

### Environment Setup
1. Set up a Neon database and obtain the connection URL
2. Configure Stripe keys for production
3. Set the correct `NEXT_PUBLIC_APP_URL` for your domain

### Build and Deploy
```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (site)/            # Main site pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── About/            # About section
│   ├── Donations/        # Donation forms and pages
│   ├── Features/         # Features showcase
│   ├── Header/           # Navigation header
│   ├── Hero/             # Hero section
│   ├── Membership/       # Membership forms
│   └── ...               # Other components
├── lib/                  # Utility libraries
│   ├── db/              # Database configuration and schema
│   └── stripe.ts        # Stripe configuration
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## SOBA Ontario Information

### Mission
We encourage harmony and cooperation among Sobans in Ontario, addressing members' social and economic needs while facilitating integration into the Canadian community.

### Core Values
- Integrity
- Service  
- Equality
- Connection
- Community
- Brotherhood
- Leadership
- Pride
- Lifelong Learning

### Membership Benefits
- $5,000 member death benefit
- Financial Emergency Assistance Program (up to $1,000)
- $500 childbirth benefit
- $500 immediate family member death benefit
- Educational Achievement Benefits ($150-$250)
- Wedding milestone celebrations ($150)
- Hospitalization support ($200)
- DHR (Diaspora Home Return) enrollment

### Contact Information
- **Address**: 46 Olde town Road, Brampton, ON, L6X 4T8
- **Phone**: 226-606-0197
- **Website**: www.sobaontario.org
- **Facebook**: https://www.facebook.com/profile.php?id=100077660994849
- **Twitter**: @SobaOntario

## Contributing

This website is maintained by SOBA Ontario. For contributions or issues, please contact the organization directly.

## License

© 2025 SOBA Ontario. All rights reserved.
