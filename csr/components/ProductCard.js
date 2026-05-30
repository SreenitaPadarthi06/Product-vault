import Link from 'next/link';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div data-testid="product-item" className="product-card">
      <Link href={`/products/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <img src={product.thumbnail} alt={product.title} className="product-image" />
          <span className="product-category">{product.category}</span>
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <div className="product-meta">
            <span className="product-price">${product.price}</span>
            <span className="product-rating">⭐ {product.rating}</span>
          </div>
        </div>
      </Link>
      <button data-testid="add-to-cart-btn" className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
