// Shopify Storefront API GraphQL client
const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function ShopifyData(query) {
  if (!domain || !storefrontAccessToken) {
    throw new Error(
      "Missing Shopify credentials. Please check your .env.local file."
    );
  }

  const URL = `https://${domain}/api/2024-10/graphql.json`;
  console.log("Fetching from:", URL.replace(domain, "***"));

  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for GraphQL errors
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error(`GraphQL Error: ${data.errors[0]?.message || 'Unknown error'}`);
    }

    return data;
  } catch (error) {
    console.error("Shopify API Error:", error);
    throw new Error(`Products not fetched: ${error.message}`);
  }
}

export async function getProductsInCollection() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          vendor
          productType
          tags
          availableForSale
          createdAt
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 25) {
            edges {
              node {
                id
                title
                sku
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  if (!response || !response.data || !response.data.products) {
    console.error("Invalid response structure:", response);
    throw new Error("Invalid response from Shopify API");
  }

  const allProducts = response.data.products.edges || [];

  return allProducts;
}

export async function getAllProducts() {
  const products = await getProductsInCollection();
  return products;
}

export async function getProduct(handle) {
  const query = `{
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      productType
      tags
      availableForSale
      createdAt
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 20) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 25) {
        edges {
          node {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const product = response.data.productByHandle
    ? response.data.productByHandle
    : [];

  return product;
}
