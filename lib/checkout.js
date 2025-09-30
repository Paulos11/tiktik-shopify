// Checkout helper functions for Shopify integration

const CHECKOUT_CONFIG = {
  development: {
    successUrl: 'http://localhost:3000/checkout/success',
    cancelUrl: 'http://localhost:3000/checkout/cancel',
  },
  production: {
    successUrl: 'https://tiktikwatch.com/checkout/success',
    cancelUrl: 'https://tiktikwatch.com/checkout/cancel',
  }
};

// Get the appropriate URLs based on environment
export function getCheckoutUrls() {
  const isDevelopment = process.env.NODE_ENV === 'development' ||
                       typeof window !== 'undefined' &&
                       (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  return isDevelopment ? CHECKOUT_CONFIG.development : CHECKOUT_CONFIG.production;
}

// Create checkout session and redirect to Shopify checkout
export async function initiateCheckout(cart, customerAccessToken = null) {
  try {
    if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
      throw new Error('Cart is empty');
    }

    const { successUrl, cancelUrl } = getCheckoutUrls();

    // The cart from Shopify Buy SDK already has a webUrl for checkout
    // We need to modify it to include our return URLs as query parameters
    let checkoutUrl = cart.webUrl;

    // Add return URLs as query parameters (Shopify will handle the redirect)
    const urlParams = new URLSearchParams();
    urlParams.set('return_to', successUrl);
    urlParams.set('cancel_url', cancelUrl);

    // If we have a customer access token, include it
    if (customerAccessToken) {
      urlParams.set('customer_access_token', customerAccessToken);
    }

    // Append parameters to checkout URL
    checkoutUrl += (checkoutUrl.includes('?') ? '&' : '?') + urlParams.toString();

    // Redirect to Shopify checkout
    if (typeof window !== 'undefined') {
      window.location.href = checkoutUrl;
    }

    return { checkoutUrl };
  } catch (error) {
    console.error('Checkout initiation failed:', error);
    throw new Error(`Checkout failed: ${error.message}`);
  }
}

// Handle successful checkout return
export function handleCheckoutSuccess(searchParams) {
  const orderDetails = {
    orderId: searchParams.get('order_id') || searchParams.get('checkout_id'),
    orderNumber: searchParams.get('order_number'),
    total: searchParams.get('total') || searchParams.get('total_price'),
    currency: searchParams.get('currency') || 'USD',
    checkoutId: searchParams.get('checkout_id'),
  };

  // Log successful checkout for analytics
  console.log('Checkout successful:', orderDetails);

  return orderDetails;
}

// Handle checkout cancellation
export function handleCheckoutCancel(searchParams) {
  const cancelReason = searchParams.get('reason') || 'user_cancelled';

  // Log cancellation for analytics
  console.log('Checkout cancelled:', { reason: cancelReason });

  return { reason: cancelReason };
}

// Validate checkout completion (can be used for webhooks later)
export async function validateCheckoutCompletion(checkoutId) {
  try {
    // This would typically involve checking with Shopify's API
    // For now, we'll just return true
    return { valid: true, checkoutId };
  } catch (error) {
    console.error('Checkout validation failed:', error);
    return { valid: false, error: error.message };
  }
}

// Format order details for display
export function formatOrderDetails(orderDetails) {
  return {
    ...orderDetails,
    formattedTotal: orderDetails.total ?
      `${orderDetails.currency || 'USD'} ${parseFloat(orderDetails.total).toFixed(2)}` :
      'N/A',
    formattedOrderNumber: orderDetails.orderNumber ? `#${orderDetails.orderNumber}` : 'N/A',
  };
}