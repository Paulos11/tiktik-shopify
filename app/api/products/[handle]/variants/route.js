//app/api/products/[handle]/variants/route.js
import { NextResponse } from "next/server";
import { productAPI, ShopifyAPIError } from "@/lib/api";

export async function GET(request, { params }) {
  try {
    const { handle } = params;
    const url = new URL(request.url);
    const selectedOptions = Object.fromEntries(url.searchParams.entries());

    if (!handle) {
      return NextResponse.json(
        { error: "Product handle is required" },
        { status: 400 }
      );
    }

    // Fetch product by handle
    const product = await productAPI.fetchByHandle(handle);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let variants = product.variants;

    // Filter variants based on selected options
    if (Object.keys(selectedOptions).length > 0) {
      variants = variants.filter((variant) => {
        if (!variant.selectedOptions) return false;

        return Object.entries(selectedOptions).every(
          ([optionName, optionValue]) => {
            if (Array.isArray(variant.selectedOptions)) {
              return variant.selectedOptions.some(
                (option) =>
                  option.name?.toLowerCase() === optionName.toLowerCase() &&
                  option.value?.toLowerCase() === optionValue.toLowerCase()
              );
            } else if (typeof variant.selectedOptions === "object") {
              const variantOption = variant.selectedOptions[optionName];
              if (typeof variantOption === "object" && variantOption.value) {
                return (
                  variantOption.value.toLowerCase() ===
                  optionValue.toLowerCase()
                );
              }
              return variantOption?.toLowerCase() === optionValue.toLowerCase();
            }
            return false;
          }
        );
      });
    }

    // Transform variant data
    const transformedVariants = variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      price: variant.priceV2?.amount,
      compareAtPrice: variant.compareAtPriceV2?.amount,
      currencyCode: variant.priceV2?.currencyCode,
      availableForSale: variant.availableForSale,
      quantityAvailable: variant.quantityAvailable,
      sku: variant.sku,
      barcode: variant.barcode,
      weight: variant.weight,
      weightUnit: variant.weightUnit,
      requiresShipping: variant.requiresShipping,
      taxable: variant.taxable,
      selectedOptions: Array.isArray(variant.selectedOptions)
        ? variant.selectedOptions.map((option) => ({
            name: option.name,
            value: option.value,
          }))
        : Object.entries(variant.selectedOptions || {}).map(
            ([name, value]) => ({
              name,
              value:
                typeof value === "object" && value.value ? value.value : value,
            })
          ),
      image: variant.image
        ? {
            id: variant.image.id,
            src: variant.image.src,
            originalSrc: variant.image.originalSrc,
            altText: variant.image.altText,
            width: variant.image.width,
            height: variant.image.height,
          }
        : null,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
      },
    }));

    return NextResponse.json({
      success: true,
      data: {
        variants: transformedVariants,
        count: transformedVariants.length,
        product: {
          id: product.id,
          handle: product.handle,
          title: product.title,
          options: product.options.map((option) => ({
            id: option.id,
            name: option.name,
            values: option.values,
          })),
        },
      },
    });
  } catch (error) {
    console.error("API Error - Product variants:", error);

    if (error instanceof ShopifyAPIError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
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

export async function POST(request, { params }) {
  try {
    const { handle } = params;
    const body = await request.json();
    const { selectedOptions } = body;

    if (!handle) {
      return NextResponse.json(
        { error: "Product handle is required" },
        { status: 400 }
      );
    }

    if (!selectedOptions || typeof selectedOptions !== "object") {
      return NextResponse.json(
        { error: "Selected options are required" },
        { status: 400 }
      );
    }

    // Fetch product by handle
    const product = await productAPI.fetchByHandle(handle);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Find variant that matches selected options
    const matchingVariant = product.variants.find((variant) => {
      if (!variant.selectedOptions) return false;

      return Object.entries(selectedOptions).every(
        ([optionName, optionValue]) => {
          if (Array.isArray(variant.selectedOptions)) {
            return variant.selectedOptions.some(
              (option) =>
                option.name?.toLowerCase() === optionName.toLowerCase() &&
                option.value?.toLowerCase() === optionValue.toLowerCase()
            );
          } else if (typeof variant.selectedOptions === "object") {
            const variantOption = variant.selectedOptions[optionName];
            if (typeof variantOption === "object" && variantOption.value) {
              return (
                variantOption.value.toLowerCase() === optionValue.toLowerCase()
              );
            }
            return variantOption?.toLowerCase() === optionValue.toLowerCase();
          }
          return false;
        }
      );
    });

    if (!matchingVariant) {
      return NextResponse.json(
        { error: "No variant found for selected options" },
        { status: 404 }
      );
    }

    // Transform variant data
    const transformedVariant = {
      id: matchingVariant.id,
      title: matchingVariant.title,
      price: matchingVariant.priceV2?.amount,
      compareAtPrice: matchingVariant.compareAtPriceV2?.amount,
      currencyCode: matchingVariant.priceV2?.currencyCode,
      availableForSale: matchingVariant.availableForSale,
      quantityAvailable: matchingVariant.quantityAvailable,
      sku: matchingVariant.sku,
      barcode: matchingVariant.barcode,
      weight: matchingVariant.weight,
      weightUnit: matchingVariant.weightUnit,
      requiresShipping: matchingVariant.requiresShipping,
      taxable: matchingVariant.taxable,
      selectedOptions: Array.isArray(matchingVariant.selectedOptions)
        ? matchingVariant.selectedOptions.map((option) => ({
            name: option.name,
            value: option.value,
          }))
        : Object.entries(matchingVariant.selectedOptions || {}).map(
            ([name, value]) => ({
              name,
              value:
                typeof value === "object" && value.value ? value.value : value,
            })
          ),
      image: matchingVariant.image
        ? {
            id: matchingVariant.image.id,
            src: matchingVariant.image.src,
            originalSrc: matchingVariant.image.originalSrc,
            altText: matchingVariant.image.altText,
            width: matchingVariant.image.width,
            height: matchingVariant.image.height,
          }
        : null,
    };

    return NextResponse.json({
      success: true,
      data: transformedVariant,
    });
  } catch (error) {
    console.error("API Error - Find variant:", error);

    if (error instanceof ShopifyAPIError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
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
