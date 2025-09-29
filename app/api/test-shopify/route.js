import { NextResponse } from "next/server";
import { productAPI, checkShopifyConfig } from "@/lib/api";

export async function GET() {
  try {
    // Check if Shopify is configured
    const config = checkShopifyConfig();

    // Test fetching products
    const products = await productAPI.fetchAll(3); // Get just 3 products for testing

    return NextResponse.json({
      success: true,
      message: "Shopify API connection successful",
      config: {
        domain: config.domain,
        hasToken: !!config.token,
      },
      data: {
        productCount: products.length,
        products: products.map(p => ({
          id: p.id,
          title: p.title,
          price: p.variants[0]?.priceV2?.amount,
          currency: p.variants[0]?.priceV2?.currencyCode,
        }))
      }
    });
  } catch (error) {
    console.error("Shopify API test failed:", error);

    return NextResponse.json({
      success: false,
      message: "Shopify API connection failed",
      error: {
        name: error.name,
        message: error.message,
        code: error.code || "UNKNOWN_ERROR"
      }
    }, {
      status: 500
    });
  }
}