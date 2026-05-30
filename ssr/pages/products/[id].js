import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductDetail from '@/components/ProductDetail';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
}

export default function ProductPage({ product }) {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <Head>
        <title>{product.title} — ProductVault</title>
        <meta name="description" content={product.description} />
      </Head>
      <Layout searchQuery="" onSearchChange={() => {}} cartCount={cartCount}>
        <Link href="/products" className="back-link">← Back to Products</Link>
        <ProductDetail product={product} />
        <button data-testid="add-to-cart-btn" className="add-to-cart-btn detail-add-btn" onClick={handleAddToCart}>Add to Cart</button>
      </Layout>
    </>
  );
}
