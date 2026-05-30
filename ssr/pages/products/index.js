import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';

export async function getServerSideProps() {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  const data = await res.json();
  return {
    props: {
      products: data.products,
    },
  };
}

export default function ProductsPage({ products }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>ProductVault — SSR | Product Catalog</title>
        <meta name="description" content="Browse our premium product catalog with server-side rendering" />
      </Head>
      <Layout searchQuery={searchQuery} onSearchChange={setSearchQuery} cartCount={cartCount}>
        <div className="page-header">
          <h2>All Products</h2>
          <span className="rendering-badge ssr-badge">SSR</span>
        </div>
        <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
      </Layout>
    </>
  );
}
