// Simplified authentication functions using fetch directly
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

async function shopifyRequest(query, variables = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'GraphQL error');
  }

  return data.data;
}

export const authAPI = {
  // Create customer access token
  async createAccessToken(email, password) {
    const query = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: { email, password }
    };

    const data = await shopifyRequest(query, variables);
    return data.customerAccessTokenCreate;
  },

  // Get customer data
  async getCustomer(accessToken) {
    const query = `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          firstName
          lastName
          displayName
          email
          phone
          createdAt
          updatedAt
          acceptsMarketing
          addresses(first: 10) {
            edges {
              node {
                id
                address1
                address2
                city
                company
                country
                countryCodeV2
                firstName
                lastName
                phone
                province
                provinceCode
                zip
              }
            }
          }
          defaultAddress {
            id
            address1
            address2
            city
            company
            country
            countryCodeV2
            firstName
            lastName
            phone
            province
            provinceCode
            zip
          }
        }
      }
    `;

    const variables = { customerAccessToken: accessToken };
    const data = await shopifyRequest(query, variables);
    return data.customer;
  },

  // Create customer account
  async createCustomer(firstName, lastName, email, password) {
    const query = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            firstName
            lastName
            displayName
            email
            phone
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        firstName,
        lastName,
        email,
        password,
        acceptsMarketing: false
      }
    };

    const data = await shopifyRequest(query, variables);
    return data.customerCreate;
  },

  // Get customer orders
  async getCustomerOrders(accessToken, first = 10) {
    const query = `
      query getCustomerOrders($customerAccessToken: String!, $first: Int!) {
        customer(customerAccessToken: $customerAccessToken) {
          orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                orderNumber
                processedAt
                financialStatus
                fulfillmentStatus
                totalPriceV2 {
                  amount
                  currencyCode
                }
                subtotalPriceV2 {
                  amount
                  currencyCode
                }
                totalTaxV2 {
                  amount
                  currencyCode
                }
                totalShippingPriceV2 {
                  amount
                  currencyCode
                }
                shippingAddress {
                  firstName
                  lastName
                  address1
                  address2
                  city
                  province
                  country
                  zip
                  phone
                }
                lineItems(first: 50) {
                  edges {
                    node {
                      title
                      quantity
                      variant {
                        id
                        title
                        image {
                          url
                          altText
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                        product {
                          handle
                          title
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      customerAccessToken: accessToken,
      first
    };

    const data = await shopifyRequest(query, variables);
    return data.customer?.orders?.edges?.map(edge => edge.node) || [];
  },

  // Update customer profile
  async updateCustomer(accessToken, customerData) {
    // Clean up the customer data - remove empty phone or set to null
    const cleanedData = { ...customerData };
    if (cleanedData.phone === '') {
      delete cleanedData.phone; // Remove empty phone field entirely
    }

    const query = `
      mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          customer {
            id
            firstName
            lastName
            displayName
            email
            phone
            acceptsMarketing
          }
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      customerAccessToken: accessToken,
      customer: cleanedData
    };

    const data = await shopifyRequest(query, variables);
    return data.customerUpdate;
  },

  // Password reset
  async recoverPassword(email) {
    const query = `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            field
            message
          }
        }
      }
    `;

    const variables = { email };
    const data = await shopifyRequest(query, variables);
    return data.customerRecover;
  },

  // Delete access token
  async deleteAccessToken(accessToken) {
    const query = `
      mutation customerAccessTokenDelete($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
          deletedAccessToken
          deletedCustomerAccessToken
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = { customerAccessToken: accessToken };
    const data = await shopifyRequest(query, variables);
    return data.customerAccessTokenDelete;
  }
};