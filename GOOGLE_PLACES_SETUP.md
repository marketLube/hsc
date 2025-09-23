# Google Places API Setup Guide

## Overview
The checkout form now includes Google Places Autocomplete integration for enhanced address filling functionality.

## Features Implemented

### 1. Google Places Autocomplete
- **Address suggestions**: Start typing in the "Address Line 1" field to see Google Maps suggestions
- **Auto-fill**: Selecting a suggestion automatically fills city, state, and pincode fields
- **India-focused**: Restricted to Indian addresses for better relevance
- **Visual indicators**: Shows when Google Places is enabled/disabled

### 2. Browser Autocomplete
- **Saved addresses**: Chrome and other browsers can now suggest saved addresses
- **Standard attributes**: All form fields use proper `name` and `autoComplete` attributes
- **Form recognition**: Browsers will recognize this as an address form

## Setup Instructions

### Step 1: Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Places API**
4. Go to **APIs & Services > Credentials**
5. Create a new **API Key**
6. Restrict the key to your domain for security

### Step 2: Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# Add your Google Maps API key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### Step 3: API Key Restrictions (Recommended)
For production, restrict your API key:
- **Application restrictions**: HTTP referrers
- **Website restrictions**: Add your domain(s)
- **API restrictions**: Only enable "Places API"

## How It Works

### Google Places Integration
1. **Script Loading**: The `useGooglePlaces` hook loads the Google Maps JavaScript API
2. **Autocomplete Init**: When the address step loads, autocomplete is initialized on the address input
3. **Address Parsing**: Selected places are parsed into individual address components
4. **Form Population**: City, state, and pincode fields are automatically filled

### Browser Autocomplete
- **Name field**: `autoComplete="name"`
- **Email field**: `autoComplete="email"`
- **Phone field**: `autoComplete="tel"`
- **Address Line 1**: `autoComplete="address-line1"`
- **Address Line 2**: `autoComplete="address-line2"`
- **City**: `autoComplete="address-level2"`
- **State**: `autoComplete="address-level1"`
- **Pincode**: `autoComplete="postal-code"`

## Fallback Behavior
- **Without API key**: Shows warning message, uses browser autocomplete only
- **API load failure**: Graceful degradation to standard form inputs
- **Network issues**: Form remains fully functional with manual input

## User Experience
- **Visual feedback**: Icons and status messages show Google Places status
- **Instant fill**: Address components populate immediately after selection
- **Error clearing**: Auto-filled fields clear validation errors
- **Success toast**: Confirmation message when address is auto-filled

## Testing
1. **With API key**: Test address suggestions and auto-fill
2. **Without API key**: Verify fallback to browser autocomplete
3. **Mobile**: Test on mobile devices for touch interaction
4. **Various addresses**: Try different address formats and locations

## Security Notes
- API key is exposed in client-side code (normal for Maps API)
- Use domain restrictions to prevent unauthorized usage
- Monitor API usage in Google Cloud Console
- Consider usage limits and billing alerts

## Troubleshooting

### Common Issues
1. **No suggestions appearing**: Check API key and Places API is enabled
2. **Console errors**: Verify API key format and domain restrictions
3. **Slow loading**: API script loads asynchronously, wait for initialization
4. **Wrong country**: Autocomplete is restricted to India (`componentRestrictions: { country: 'IN' }`)

### Debug Mode
The hook provides error states and loading indicators to help with debugging.
