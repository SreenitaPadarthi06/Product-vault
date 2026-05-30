import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import SkeletonGrid from '@/components/SkeletonGrid';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>ProductVault — CSR | Product Catalog</title>
        <meta name="description" content="Browse our premium product catalog with client-side rendering" />
      </Head>
      <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery} cartCount={cartCount}>
        <div className="page-header">
          <h2>All Products</h2>
          <span className="rendering-badge csr-badge">CSR</span>
        </div>
        {loading ? (
          <SkeletonGrid />
        ) : (
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        )}
      </Layout>
    </>
  );
}
