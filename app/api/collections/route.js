import { NextResponse } from "next/server";
import client from "@/lib/shopify";

export async function GET() {
  try {
    // Fetch all collections from Shopify
    const collections = await client.collection.fetchAllWithProducts();

    // Transform the data to include only necessary information
    const formattedCollections = collections.map((collection) => ({
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
      productCount: collection.products.length,
    }));

    return NextResponse.json({
      collections: formattedCollections,
      count: formattedCollections.length,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections", details: error.message },
      { status: 500 }
    );
  }
}
