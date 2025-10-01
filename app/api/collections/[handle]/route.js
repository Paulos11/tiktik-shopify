import { NextResponse } from "next/server";
import client from "@/lib/shopify";

export async function GET(request, { params }) {
  try {
    const { handle } = params;

    // Fetch all collections first
    const collections = await client.collection.fetchAllWithProducts();

    // Find the specific collection by handle
    const collection = collections.find((col) => col.handle === handle);

    if (!collection) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    // Format the products in the collection
    const formattedProducts = collection.products.map((product) => ({
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags,
      availableForSale: product.availableForSale,
      images: product.images.map((img) => ({
        id: img.id,
        src: img.src,
        alt: img.altText || product.title,
      })),
      variants: product.variants.map((variant) => ({
        id: variant.id,
        title: variant.title,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        availableForSale: variant.available,
        selectedOptions: variant.selectedOptions,
      })),
      priceRange: {
        minVariantPrice: product.variants[0]?.price || "0",
        maxVariantPrice:
          product.variants[product.variants.length - 1]?.price || "0",
      },
    }));

    const formattedCollection = {
      id: collection.id,
      handle: collection.handle,
      title: collection.title,
      description: collection.description,
      descriptionHtml: collection.descriptionHtml,
      image: collection.image
        ? {
            src: collection.image.src,
            alt: collection.image.altText || collection.title,
          }
        : null,
      products: formattedProducts,
      productCount: formattedProducts.length,
    };

    return NextResponse.json(formattedCollection);
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json(
      { error: "Failed to fetch collection", details: error.message },
      { status: 500 }
    );
  }
}
