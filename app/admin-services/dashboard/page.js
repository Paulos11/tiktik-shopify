'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Download, FileText, LogOut, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    collection: '',
    tag: '',
    priceRange: '',
  });

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('admin_authenticated');
    if (!isAuth) {
      router.push('/admin-services');
    }
  }, [router]);

  useEffect(() => {
    // Fetch products on mount
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleClearCache = async () => {
    setIsClearing(true);

    try {
      // Clear browser cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // Clear localStorage
      localStorage.clear();

      // Clear sessionStorage except admin auth
      const adminAuth = sessionStorage.getItem('admin_authenticated');
      sessionStorage.clear();
      sessionStorage.setItem('admin_authenticated', adminAuth);

      // Call revalidate API to clear server cache
      await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      toast({
        title: 'Cache Cleared',
        description: 'All cache has been cleared successfully from server and browser.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear cache: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);

    try {
      // Filter products based on selected filters
      let filteredProducts = [...products];

      if (filters.collection) {
        filteredProducts = filteredProducts.filter(product =>
          product.collections?.some(col =>
            col.title.toLowerCase().includes(filters.collection.toLowerCase())
          )
        );
      }

      if (filters.tag) {
        filteredProducts = filteredProducts.filter(product =>
          product.tags?.some(tag =>
            tag.toLowerCase().includes(filters.tag.toLowerCase())
          )
        );
      }

      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
          const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0);
          return price >= min && price <= max;
        });
      }

      // Prepare data for Excel matching the template format
      const excelData = filteredProducts.map(product => {
        const price = parseFloat(product.priceRange?.minVariantPrice?.amount || 0);
        const firstImage = product.images?.edges?.[0]?.node?.src || '';

        return {
          'category ': product.productType || '',
          'Sub Category': product.collections?.[0]?.title || '',
          'item name': product.title,
          'description': product.description?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
          'weight ml/g': product.variants?.edges?.[0]?.node?.weight || '',
          'price ': price,
          'vat%': 0,
          'merchant sku': product.variants?.edges?.[0]?.node?.sku || product.handle || '',
          'GTIN': product.variants?.edges?.[0]?.node?.barcode || '',
          'alcohol%': 0,
          'BCRS': '',
          'Image URL': firstImage
        };
      });

      // Create workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Set column widths to match template
      ws['!cols'] = [
        { wch: 15 }, // category
        { wch: 15 }, // Sub Category
        { wch: 30 }, // item name
        { wch: 50 }, // description
        { wch: 12 }, // weight ml/g
        { wch: 10 }, // price
        { wch: 8 },  // vat%
        { wch: 15 }, // merchant sku
        { wch: 15 }, // GTIN
        { wch: 10 }, // alcohol%
        { wch: 10 }, // BCRS
        { wch: 40 }, // Image URL
      ];

      XLSX.utils.book_append_sheet(wb, ws, 'list');

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `TIKTIK_Products_${timestamp}.xlsx`;

      // Download file
      XLSX.writeFile(wb, filename);

      toast({
        title: 'Export Successful',
        description: `Exported ${excelData.length} products to ${filename}`,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'Failed to export products: ' + error.message,
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin-services');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your store settings and data</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cache Management Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Cache Management
              </CardTitle>
              <CardDescription>
                Clear all cached data from server and browser
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This will clear:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>Browser cache (Service Workers, Cache Storage)</li>
                <li>LocalStorage data</li>
                <li>Server-side cache (Next.js revalidation)</li>
                <li>Vercel Edge Cache</li>
              </ul>
              <Button
                onClick={handleClearCache}
                disabled={isClearing}
                className="w-full"
                variant="destructive"
              >
                {isClearing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Clearing Cache...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All Cache
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Excel Export Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Products to Excel
              </CardTitle>
              <CardDescription>
                Filter and export product data from Shopify
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Collection</label>
                  <input
                    type="text"
                    placeholder="Filter by collection name"
                    value={filters.collection}
                    onChange={(e) => setFilters({ ...filters, collection: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Tag</label>
                  <input
                    type="text"
                    placeholder="Filter by tag"
                    value={filters.tag}
                    onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Price Range</label>
                  <input
                    type="text"
                    placeholder="e.g., 0-100"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>
              <Button
                onClick={handleExportExcel}
                disabled={isExporting}
                className="w-full"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export to Excel
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500">
                Total Products: {products.length}
              </p>
            </CardContent>
          </Card>

          {/* Hero Section Management Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Hero Section Management
              </CardTitle>
              <CardDescription>
                Manage homepage hero section content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    Coming Soon
                  </h3>
                  <p className="text-sm text-gray-500">
                    Hero section management will be available in a future update
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
