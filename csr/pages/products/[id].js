import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductDetail from '@/components/ProductDetail';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <>
      <Head>
        <title>{product ? `${product.title} — ProductVault` : 'Loading... — ProductVault'}</title>
        <meta name="description" content={product ? product.description : 'Loading product details'} />
      </Head>
      <Layout searchQuery="" onSearchChange={() => {}} cartCount={cartCount}>
        <Link href="/products" className="back-link">← Back to Products</Link>
        {loading ? (
          <div className="product-detail-skeleton">
            <div className="skeleton-image large"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        ) : product ? (
          <>
            <ProductDetail product={product} />
            <button data-testid="add-to-cart-btn" className="add-to-cart-btn detail-add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </>
        ) : (
          <p>Product not found.</p>
        )}
      </Layout>
    </>
  );
}
