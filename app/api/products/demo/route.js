import { NextResponse } from "next/server";

// Mock products for demo purposes
const mockProducts = [
  {
    id: "gid://shopify/Product/1",
    title: "Classic Leather Watch",
    description: "A timeless leather watch perfect for any occasion. Features a classic design with premium materials.",
    handle: "classic-leather-watch",
    images: [
      {
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        altText: "Classic Leather Watch"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/1",
        title: "Default Title",
        priceV2: {
          amount: "299.00",
          currencyCode: "USD"
        },
        image: {
          src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
        }
      }
    ]
  },
  {
    id: "gid://shopify/Product/2",
    title: "Modern Steel Watch",
    description: "Contemporary steel watch with a sleek design. Water-resistant and built to last.",
    handle: "modern-steel-watch",
    images: [
      {
        src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        altText: "Modern Steel Watch"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/2",
        title: "Default Title",
        priceV2: {
          amount: "399.00",
          currencyCode: "USD"
        },
        image: {
          src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop"
        }
      }
    ]
  },
  {
    id: "gid://shopify/Product/3",
    title: "Luxury Gold Watch",
    description: "Premium gold watch with intricate details. A statement piece for special occasions.",
    handle: "luxury-gold-watch",
    images: [
      {
        src: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop",
        altText: "Luxury Gold Watch"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/3",
        title: "Default Title",
        priceV2: {
          amount: "799.00",
          currencyCode: "USD"
        },
        image: {
          src: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop"
        }
      }
    ]
  },
  {
    id: "gid://shopify/Product/4",
    title: "Sport Digital Watch",
    description: "Digital sports watch with multiple features. Perfect for active lifestyles.",
    handle: "sport-digital-watch",
    images: [
      {
        src: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop",
        altText: "Sport Digital Watch"
      }
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/4",
        title: "Default Title",
        priceV2: {
          amount: "199.00",
          currencyCode: "USD"
        },
        image: {
          src: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=400&fit=crop"
        }
      }
    ]
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "Demo products loaded successfully",
      data: {
        productCount: mockProducts.length,
        products: mockProducts
      }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to load demo products",
      error: error.message
    }, {
      status: 500
    });
  }
}