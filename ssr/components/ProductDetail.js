export default function ProductDetail({ product }) {
  return (
    <div className="product-detail">
      <div className="product-detail-image-wrapper">
        <img src={product.thumbnail} alt={product.title} className="product-detail-image" />
      </div>
      <div className="product-detail-info">
        <span className="product-detail-category">{product.category}</span>
        <h1 data-testid="product-title" className="product-detail-title">{product.title}</h1>
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-meta">
          <span className="product-detail-price">${product.price}</span>
          <span className="product-detail-rating">⭐ {product.rating}</span>
          <span className="product-detail-brand">Brand: {product.brand || 'N/A'}</span>
        </div>
        <div className="product-detail-stock">
          <span>Stock: {product.stock} available</span>
          <span>Discount: {product.discountPercentage}% off</span>
        </div>
      </div>
    </div>
  );
}
