# 🚀 Deployment Guide - SOBA Ontario Website

This guide covers deploying your SOBA Ontario website to Vercel with proper database migration setup.

## 🗄️ Database Migration Strategy

### ✅ **Automatic Migration Setup**

Your `package.json` has been configured to automatically run database migrations during deployment using **pnpm**:

```json
{
  "scripts": {
    "build": "pnpm db:migrate && next build",
    "postinstall": "pnpm db:migrate"
  }
}
```

### 🔄 **How It Works:**

1. **Vercel Auto-Detection**: Vercel automatically detects `pnpm-lock.yaml` and uses pnpm
2. **During Build**: `pnpm db:migrate` runs before `next build`
3. **After Install**: `postinstall` hook ensures migrations run after dependencies are installed
4. **Production Ready**: `drizzle-kit` is in `dependencies` (not `devDependencies`) so it's available in production

## 📋 **Environment Variables Checklist**

Make sure these are set in your Vercel project:

### ✅ **Database (Auto-configured by Neon)**
```env
DATABASE_URL=postgresql://username:password@host/database
```

### ✅ **Authentication (Required)**
```env
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your_random_secret_here
```

### ✅ **Stripe Payments (Required)**
```env
STRIPE_SECRET_KEY=sk_live_your_live_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
```

## 🚀 **Deployment Steps**

### 1. **Pre-Deployment Checklist**
- ✅ All environment variables set in Vercel
- ✅ Migration files exist in `lib/db/migrations/`
- ✅ Database schema is up to date
- ✅ Stripe keys are live keys (for production)
- ✅ `pnpm-lock.yaml` is committed to git

### 2. **Deploy to Vercel**
```bash
# Push to your main branch
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 3. **Vercel Build Process (with pnpm)**
1. **Install Dependencies**: `pnpm install` (auto-detected from pnpm-lock.yaml)
2. **Run Migrations**: `pnpm db:migrate` (via postinstall hook)
3. **Build App**: `pnpm build` (which runs `pnpm db:migrate && next build`)
4. **Deploy**: App goes live

### 4. **Verify Deployment**
- ✅ Visit your live site
- ✅ Test admin login: `admin@sobaontario.org` / `Mnbvcxzl@5`
- ✅ Test member registration and payment
- ✅ Check all payment flows work

## 🔧 **Manual Migration (If Needed)**

If you need to run migrations manually:

### **Local Development:**
```bash
pnpm db:generate  # Generate new migration files
pnpm db:migrate   # Apply migrations to database
```

### **Production (via Vercel CLI):**
```bash
vercel env pull .env.local  # Pull production env vars
pnpm db:migrate             # Run migrations locally against prod DB
```

## 📊 **Database Tables Created**

Your migrations will create these tables in Neon:

### **Authentication Tables:**
- `members` - User accounts and profiles
- `accounts` - OAuth provider accounts (NextAuth)
- `sessions` - User sessions (NextAuth)
- `verification_tokens` - Email verification (NextAuth)

### **Business Tables:**
- `donations` - Community donations
- `events` - Community events
- `event_registrations` - Event sign-ups
- `news` - News articles and updates
- `store_items` - Merchandise catalog
- `store_orders` - Purchase orders
- `volunteers` - Volunteer applications

## 🛠️ **Troubleshooting**

### **Migration Fails During Build:**
```bash
# Check migration files exist
ls lib/db/migrations/

# Verify database connection
pnpm test:stripe  # This also tests DB connection
```

### **Tables Not Created:**
1. Check Vercel build logs for migration errors
2. Verify `DATABASE_URL` is correctly set
3. Ensure Neon database is accessible
4. Check migration files are committed to git
5. Ensure `pnpm-lock.yaml` is committed

### **Build Succeeds But App Crashes:**
1. Check environment variables are set
2. Verify `NEXTAUTH_SECRET` is configured
3. Test database connection in Vercel logs

## 🔄 **Schema Updates**

When you need to update the database schema:

1. **Update Schema**: Modify `lib/db/schema.ts`
2. **Generate Migration**: `pnpm db:generate`
3. **Test Locally**: `pnpm db:migrate`
4. **Commit & Deploy**: Git push triggers auto-migration

## 📈 **Production Monitoring**

### **Check These After Deployment:**
- ✅ All pages load correctly
- ✅ Authentication works (login/logout)
- ✅ Payment processing works
- ✅ Database operations succeed
- ✅ Admin dashboard accessible

### **Vercel Dashboard Monitoring:**
- Check build logs for migration success
- Monitor function execution times
- Watch for any runtime errors
- Verify pnpm is being used in build logs

## 🎯 **Best Practices**

1. **Always test migrations locally first** with `pnpm db:migrate`
2. **Use live Stripe keys only in production**
3. **Monitor Vercel logs during first deployment**
4. **Keep migration files in version control**
5. **Test all payment flows after deployment**
6. **Keep `pnpm-lock.yaml` committed** for consistent builds

## 📦 **pnpm Benefits on Vercel**

- ✅ **Faster installs** - pnpm is faster than npm
- ✅ **Disk space efficient** - shared dependencies
- ✅ **Consistent builds** - exact same versions via lockfile
- ✅ **Auto-detection** - Vercel automatically uses pnpm when it finds `pnpm-lock.yaml`

Your database migrations will now run automatically every time you deploy using pnpm! 🎉 