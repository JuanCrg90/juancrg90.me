---
layout: post
title: "Google Maps Places Autocomplete Setup"
date: 2025-06-23 00:00:00 -0500
categories: Google Maps, Stimulus, Rails
permalink: /posts/google-maps-autocomplete-setup
---


## 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Places API (New)** and **Maps JavaScript API**
4. Create credentials (API Key)
5. Restrict the API key to your domains for security

## 2. Configure API Key in Rails

### For Development:
```bash
# Add to your .env file or export as environment variable
export GOOGLE_MAPS_API_KEY="your_api_key_here"
```

### For Production (Recommended):
```bash
# Edit Rails credentials
EDITOR=nano rails credentials:edit

# Add this structure:
google_maps:
  api_key: your_api_key_here
```

## 3. API Key Restrictions (Security)

### Application Restrictions:
- **HTTP referrers (web sites)**
- Add your domains:
  - `localhost:3000/*` (development)
  - `yourdomain.com/*` (production)
  - `*.yourdomain.com/*` (subdomains)

### API Restrictions:
- Restrict to these APIs only:
  - Maps JavaScript API
  - Places API (New)

## 4. Test the Integration

1. Start your Rails server: `rails server`
2. Navigate to event edit form
3. Try typing in location fields
4. You should see Google Places suggestions

## 5. Troubleshooting

- Check browser console for errors
- Verify API key is loaded: `console.log(window.google)`
- Ensure Places API is enabled in Google Cloud Console
- Check API key restrictions match your domain

## 6. Cost Considerations

- Places Autocomplete: $0.00282 per request (first 100,000 requests/month free)
- Places Details: $0.017 per request
- Monitor usage in Google Cloud Console
