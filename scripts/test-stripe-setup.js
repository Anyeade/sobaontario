// Test script to verify Stripe configuration
// Run with: node scripts/test-stripe-setup.js

require('dotenv').config({ path: '.env.local' });

async function testStripeSetup() {
  console.log('🔍 Testing Stripe Configuration...\n');

  // Check environment variables
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  console.log('📋 Environment Variables:');
  console.log(`Secret Key: ${secretKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`Publishable Key: ${publishableKey ? '✅ Set' : '❌ Missing'}`);
  
  if (!secretKey || !publishableKey) {
    console.log('\n❌ Missing required environment variables!');
    console.log('Please add the following to your .env.local file:');
    console.log('STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"');
    console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"');
    return;
  }

  // Test Stripe connection
  try {
    const Stripe = require('stripe');
    const stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' });
    
    console.log('\n🔌 Testing Stripe Connection...');
    const account = await stripe.accounts.retrieve();
    console.log(`✅ Connected to Stripe account: ${account.display_name || account.id}`);
    console.log(`📧 Account email: ${account.email || 'Not available'}`);
    console.log(`🌍 Country: ${account.country}`);
    
  } catch (error) {
    console.log('\n❌ Stripe connection failed:');
    console.log(error.message);
    return;
  }

  console.log('\n✅ Stripe setup is working correctly!');
  console.log('\n📝 Next steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Test a payment flow (donation or membership)');
  console.log('3. Check that payments are verified on the success pages');
  console.log('\n💡 Note: Webhooks are disabled in this setup. Payment verification happens directly on success pages.');
}

testStripeSetup().catch(console.error);