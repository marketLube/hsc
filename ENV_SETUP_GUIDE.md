# Environment Variables Setup Guide

Since you're a beginner, I'll walk you through setting up your environment variables step by step.

## Quick Setup (Copy & Paste Ready)

### Step 1: Create the .env.local file

In your project root (`/Users/althameem/HSC/healthy-sugar-home/`), create a new file called `.env.local` and paste the following content:

```bash
# Environment Configuration for Healthy Sugar Company
# This file contains environment variables for local development

# =============================================================================
# GOOGLE MAPS & PLACES API (Required for address autofill)
# =============================================================================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=demo_key_replace_with_real_key

# =============================================================================
# NEXT.JS CONFIGURATION
# =============================================================================
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# =============================================================================
# DEVELOPMENT TOOLS
# =============================================================================
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_LOGGING=true

# =============================================================================
# FUTURE INTEGRATIONS (Commented out for now)
# =============================================================================
# Payment Gateway (Razorpay)
# NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
# RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Service (Gmail SMTP)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your-app-password

# Analytics
# NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX

# Database (when you move from mock data)
# DATABASE_URL=postgresql://username:password@localhost:5432/healthy_sugar_db
```

### Step 2: Get Google Maps API Key (Optional but Recommended)

The address autofill feature works better with a real Google Maps API key:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing one
3. **Enable the Places API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Places API"
   - Click "Enable"
4. **Create API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated key
5. **Replace in .env.local**:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBdVl-cTICSwYKrZ95SuvNw7dbMuDt1KG0
   ```

### Step 3: Restart Development Server

After creating/modifying `.env.local`, restart your development server:

```bash
npm run dev
```

## How to Create .env.local File

### Option 1: Using VS Code
1. Right-click in the project root folder
2. Select "New File"
3. Name it `.env.local`
4. Paste the content above

### Option 2: Using Terminal
```bash
cd /Users/althameem/HSC/healthy-sugar-home/
touch .env.local
# Then open the file and paste the content
```

### Option 3: Using Finder (Mac)
1. Open Finder and navigate to your project folder
2. Press `Cmd + Shift + .` to show hidden files
3. Right-click → New Document → Text Document
4. Rename to `.env.local`
5. Open and paste the content

## Important Notes for Beginners

### ✅ What You Should Know:
- **`.env.local` is ignored by Git** - it won't be committed to your repository
- **Only `NEXT_PUBLIC_` variables** are accessible in the browser
- **Other variables** are only available on the server side
- **Restart required** - Always restart your dev server after changing env variables

### ⚠️ Security Tips:
- **Never share your API keys** publicly
- **Use different keys** for development and production
- **Set up domain restrictions** on your Google API key for production

### 🔧 Current Status:
- **Google Places**: Will work with demo key (limited functionality)
- **Address Autofill**: Browser autocomplete will still work
- **Form Validation**: All validation works regardless of API key
- **State Dropdown**: Works perfectly without any API key

## Testing Your Setup

1. **Start your development server**: `npm run dev`
2. **Go to checkout page**: Add items to cart and proceed to checkout
3. **Test address field**: 
   - With real API key: You'll see Google Places suggestions
   - With demo key: You'll see a warning but form still works
4. **Test state dropdown**: Should work perfectly with search functionality

## What's Already Working

Even without a Google API key, these features work perfectly:
- ✅ **Browser autocomplete** for all address fields
- ✅ **Searchable state dropdown** with all Indian states
- ✅ **Form validation** and error handling
- ✅ **Responsive design** and mobile compatibility
- ✅ **Coupon system** and order calculations

The Google Places integration is an enhancement that makes address entry even easier, but your checkout form is fully functional without it!

## Need Help?

If you run into any issues:
1. Check that `.env.local` is in the project root folder
2. Verify the file name is exactly `.env.local` (not `.env.local.txt`)
3. Restart your development server
4. Check the browser console for any error messages

The checkout form will work great even without the Google API key - it's just an optional enhancement for better user experience!
