import { NextResponse } from "next/server";
import { productAPI, ShopifyAPIError } from "@/lib/api";

export async function GET(request, { params }) {
  try {
    const { handle } = params;

    if (!handle) {
      return NextResponse.json(
        { error: "Product handle is required" },
        { status: 400 }
      );
    }

    // Fetch product by handle
    const product = await productAPI.fetchByHandle(handle);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Transform product data for client
    const transformedProduct = {
      id: product.id,
      handle: product.handle,
      title: product.title,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags,
      images: product.images.map(image => ({
        id: image.id,
        src: image.src,
        originalSrc: image.originalSrc,
        altText: image.altText,
        width: image.width,
        height: image.height
      })),
      options: product.options.map(option => ({
        id: option.id,
        name: option.name,
        values: option.values
      })),
      variants: product.variants.map(variant => ({
        id: variant.id,
        title: variant.title,
        price: variant.priceV2?.amount,
        compareAtPrice: variant.compareAtPriceV2?.amount,
        availableForSale: variant.availableForSale,
        quantityAvailable: variant.quantityAvailable,
        sku: variant.sku,
        weight: variant.weight,
        weightUnit: variant.weightUnit,
        selectedOptions: Array.isArray(variant.selectedOptions)
          ? variant.selectedOptions.map(option => ({
              name: option.name,
              value: option.value
            }))
          : Object.entries(variant.selectedOptions || {}).map(([name, value]) => ({
              name,
              value: typeof value === 'object' && value.value ? value.value : value
            })),
        image: variant.image ? {
          id: variant.image.id,
          src: variant.image.src,
          originalSrc: variant.image.originalSrc,
          altText: variant.image.altText
        } : null
      })),
      priceRange: {
        min: product.priceRange.minVariantPrice.amount,
        max: product.priceRange.maxVariantPrice.amount,
        currencyCode: product.priceRange.minVariantPrice.currencyCode
      },
      availableForSale: product.availableForSale,
      totalInventory: product.totalInventory,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      publishedAt: product.publishedAt
    };

    return NextResponse.json({
      success: true,
      data: transformedProduct
    });

  } catch (error) {
    console.error("API Error - Product by handle:", error);

    if (error instanceof ShopifyAPIError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code
        },
        { status: error.code === "CONFIG_ERROR" ? 500 : 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}