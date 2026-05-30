export default function SkeletonGrid() {
  return (
    <div className="product-grid">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text short"></div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </div>
  );
}
