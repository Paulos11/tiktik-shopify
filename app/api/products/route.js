import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/shopify-storefront";

export async function GET() {
  try {
    // Fetch all products from Shopify using GraphQL
    const productEdges = await getAllProducts();

    // Transform the GraphQL data to a simpler format
    const formattedProducts = productEdges.map(({ node: product }) => ({
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags || [],
      availableForSale: product.availableForSale,
      createdAt: product.createdAt,
      images: product.images.edges.map(({ node: img }) => ({
        id: img.id,
        src: img.url,
        alt: img.altText || product.title,
      })),
      variants: product.variants.edges.map(({ node: variant }) => ({
        id: variant.id,
        title: variant.title,
        sku: variant.sku,
        price: variant.price.amount,
        compareAtPrice: variant.compareAtPrice?.amount || null,
        availableForSale: variant.availableForSale,
        selectedOptions: variant.selectedOptions,
      })),
      priceRange: {
        minVariantPrice: product.priceRange.minVariantPrice.amount,
        maxVariantPrice: product.priceRange.maxVariantPrice.amount,
      },
      // Metafields will be added in a future update when we know the specific keys
      metafields: {},
    }));

    // Log first product for debugging
    if (formattedProducts.length > 0) {
      console.log("Sample product:", {
        title: formattedProducts[0].title,
        tags: formattedProducts[0].tags,
        productType: formattedProducts[0].productType,
      });
    }

    return NextResponse.json({
      products: formattedProducts,
      count: formattedProducts.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
