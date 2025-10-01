// Shopify Metafields Helper
// The new Shopify API requires specific metafield identifiers
// Use this helper when you know which metafields you want to fetch

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

/**
 * Fetch specific metafields for a product
 * @param {string} productId - The Shopify product ID
 * @param {Array} metafieldKeys - Array of objects with namespace and key
 * Example: [{ namespace: "custom", key: "material" }, { namespace: "custom", key: "care_instructions" }]
 */
export async function getProductMetafields(productId, metafieldKeys) {
  if (!metafieldKeys || metafieldKeys.length === 0) {
    return {};
  }

  // Build the identifiers array for the query
  const identifiers = metafieldKeys
    .map(
      ({ namespace, key }) =>
        `{ namespace: "${namespace}", key: "${key}" }`
    )
    .join(", ");

  const query = `{
    product(id: "${productId}") {
      metafields(identifiers: [${identifiers}]) {
        namespace
        key
        value
        type
      }
    }
  }`;

  const URL = `https://${domain}/api/2024-10/graphql.json`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("Metafields GraphQL errors:", data.errors);
      return {};
    }

    // Transform metafields into a simple object
    const metafields = {};
    if (data.data?.product?.metafields) {
      data.data.product.metafields.forEach((field) => {
        if (field) {
          metafields[`${field.namespace}.${field.key}`] = {
            value: field.value,
            type: field.type,
          };
        }
      });
    }

    return metafields;
  } catch (error) {
    console.error("Error fetching metafields:", error);
    return {};
  }
}

/**
 * Example usage:
 *
 * // Define which metafields you want to fetch
 * const metafieldKeys = [
 *   { namespace: "custom", key: "case_material" },
 *   { namespace: "custom", key: "water_resistance" },
 *   { namespace: "custom", key: "movement_type" },
 *   { namespace: "custom", key: "warranty_years" },
 * ];
 *
 * // Fetch them for a specific product
 * const metafields = await getProductMetafields(productId, metafieldKeys);
 *
 * // Result will be:
 * // {
 * //   "custom.case_material": { value: "Stainless Steel", type: "single_line_text_field" },
 * //   "custom.water_resistance": { value: "50m", type: "single_line_text_field" },
 * //   ...
 * // }
 */
