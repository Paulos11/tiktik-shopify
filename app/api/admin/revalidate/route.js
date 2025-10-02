import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Revalidate all common paths
    const paths = [
      '/',
      '/products',
      '/collections',
      '/new-arrivals',
      '/limited-edition',
      '/accessories',
    ];

    paths.forEach(path => {
      revalidatePath(path);
    });

    // Revalidate common tags
    const tags = ['products', 'collections', 'shopify'];
    tags.forEach(tag => {
      revalidateTag(tag);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Cache revalidated successfully',
        revalidated: {
          paths,
          tags
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}
