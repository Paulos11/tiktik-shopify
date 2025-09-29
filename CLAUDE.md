# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server on http://localhost:3000
- **Build**: `npm run build` - Creates production build
- **Start**: `npm run start` - Starts production server
- **Lint**: `npm run lint` - Runs ESLint with Next.js config

## Project Architecture

This is a **Next.js 14** e-commerce application for "TIKTIK WATCH" that integrates with **Shopify** using the Shopify Buy SDK. The project follows the Next.js App Router structure.

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **UI Components**: shadcn/ui (New York style) with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: Zustand with persistence middleware
- **E-commerce**: Shopify Buy SDK for storefront integration
- **Icons**: Lucide React

### Key Architecture Components

**State Management (Zustand)**:
- `useCartStore`: Manages shopping cart state with persistence, includes placeholder methods for cart operations
- `useProductStore`: Handles product fetching and loading states

**Shopify Integration**:
- `lib/shopify.js`: Shopify Buy client configuration using environment variables
- Requires `NEXT_PUBLIC_SHOPIFY_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

**Component Structure**:
- `components/ui/`: shadcn/ui components (button, card, input, toast, etc.)
- `components/product/`: Product-specific components
- `components/layout/`: Layout components
- Uses `@/` path aliases configured in `components.json`

**Styling System**:
- CSS variables defined in `app/globals.css` for consistent theming
- Tailwind configured with custom colors using CSS variables
- Dark mode support via class strategy
- Custom gradients and animations

### Environment Setup
The application requires Shopify environment variables in `.env.local`:
```
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

### Development Notes
- Project uses JavaScript (not TypeScript)
- ESLint configured with Next.js core web vitals
- Cart functionality has placeholder implementations that need completion
- Uses client-side components for interactive features
- Follows shadcn/ui conventions for component structure and styling