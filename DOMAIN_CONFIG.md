# 🌐 TIKTIK WATCH Domain Configuration

## 🏗️ **Your Domain Architecture**

### **Main Frontend Domain**: `tiktikwatch.com`
- **Purpose**: Customer-facing website
- **Hosts**: Next.js application, product pages, authentication, accounts
- **Pages**: Home, products, cart, account, login, signup, etc.

### **Shopify Store Domain**: `checkout.tiktikwatch.com`
- **Purpose**: Shopify store and checkout processing
- **Hosts**: Shopify store, payment processing, order management
- **Handles**: Product data, inventory, payments, order fulfillment

## 🔄 **Complete Payment Flow**

### **Customer Journey:**

```
1. Browse Products → tiktikwatch.com/products
2. Add to Cart → tiktikwatch.com (cart stored locally)
3. Click Checkout → Redirect to checkout.tiktikwatch.com
4. Enter Payment → Shopify handles Stripe processing
5. Payment Success → Return to tiktikwatch.com/checkout/success
6. View Orders → tiktikwatch.com/account/orders
```

## ⚙️ **Configuration Files**

### **Environment Variables** (`.env.local`):
```env
# Shopify Store Configuration
NEXT_PUBLIC_SHOPIFY_DOMAIN=checkout.tiktikwatch.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here

# Automatic URL Detection:
# Development: localhost:3000 (for success/cancel returns)
# Production: tiktikwatch.com (for success/cancel returns)
```

### **Checkout Return URLs:**

**Development Testing:**
- Success: `http://localhost:3000/checkout/success`
- Cancel: `http://localhost:3000/checkout/cancel`

**Production:**
- Success: `https://tiktikwatch.com/checkout/success`
- Cancel: `https://tiktikwatch.com/checkout/cancel`

## 🛒 **Shopify Admin Settings**

### **1. In checkout.tiktikwatch.com Admin:**

**Settings > Checkout:**
- Customer accounts: "Accounts optional"
- Return policy URL: `https://tiktikwatch.com/returns`
- Privacy policy URL: `https://tiktikwatch.com/privacy`
- Terms of service URL: `https://tiktikwatch.com/terms`

**Settings > Payments:**
- Enable Shopify Payments (includes Stripe)
- Set up tax settings
- Configure shipping rates

**Settings > Notifications:**
- Webhook endpoints point to main domain:
  - `https://tiktikwatch.com/api/webhooks/order-created`
  - `https://tiktikwatch.com/api/webhooks/order-paid`

### **2. Domain Settings:**

**Primary Domain**: `checkout.tiktikwatch.com`
**Connected to**: Your Shopify store

**Additional domains** (if needed):
- `shop.tiktikwatch.com` (redirect to checkout.tiktikwatch.com)

## 🎯 **API Integration Points**

### **Frontend (tiktikwatch.com) calls Shopify API:**

```javascript
// Storefront API calls to checkout.tiktikwatch.com
const SHOPIFY_STOREFRONT_URL = `https://checkout.tiktikwatch.com/api/2024-01/graphql.json`;

// Examples:
- Fetch products
- Create cart
- Customer authentication
- Order history
```

### **Checkout Flow:**

```javascript
// User clicks checkout on tiktikwatch.com
const checkoutUrl = `https://checkout.tiktikwatch.com/cart/...`;

// After payment, Shopify redirects back to:
window.location.href = 'https://tiktikwatch.com/checkout/success';
```

## 🔐 **Security & CORS**

### **CORS Configuration:**
- Frontend domain: `tiktikwatch.com`
- API calls to: `checkout.tiktikwatch.com`
- Headers include: Storefront Access Token

### **Allowed Origins:**
```javascript
// Shopify automatically handles CORS for:
- https://tiktikwatch.com
- http://localhost:3000 (development)
```

## 📊 **Analytics & Tracking**

### **Google Analytics:**
- Main tracking on: `tiktikwatch.com`
- Ecommerce events: Track checkout → success conversion
- Cross-domain tracking: `tiktikwatch.com` → `checkout.tiktikwatch.com`

### **Facebook Pixel:**
- Pixel on: `tiktikwatch.com`
- Conversion tracking: Purchase events from success page

## 🚀 **Deployment Checklist**

### **Frontend (tiktikwatch.com):**
- [ ] Deploy Next.js app to Vercel/Netlify
- [ ] Set environment variables
- [ ] Configure custom domain
- [ ] Set up SSL certificate
- [ ] Test authentication flow

### **Shopify (checkout.tiktikwatch.com):**
- [ ] Configure custom domain in Shopify
- [ ] Set up SSL certificate (automatic)
- [ ] Add products and inventory
- [ ] Configure payment settings
- [ ] Set return URLs in checkout settings
- [ ] Test payment flow

### **Integration Testing:**
- [ ] Products load from Shopify API
- [ ] Cart functionality works
- [ ] Checkout redirects correctly
- [ ] Payment processing works
- [ ] Success page receives order data
- [ ] Customer accounts sync properly

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:**
   - Verify Shopify domain is `checkout.tiktikwatch.com`
   - Check Storefront Access Token is valid

2. **Checkout Redirect Issues:**
   - Confirm return URLs in Shopify settings
   - Test with both localhost and production

3. **Order Data Missing:**
   - Check URL parameters on success page
   - Verify webhook endpoints if using real-time updates

## 🎉 **Success Metrics**

With this setup, you can track:
- Conversion rate: `tiktikwatch.com` → `checkout.tiktikwatch.com`
- Cart abandonment rate
- Payment success rate
- Customer account creation rate
- Repeat purchase rate

Your domain architecture is now optimized for both user experience and business analytics! 🚀