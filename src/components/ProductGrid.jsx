import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid({ products }) {
  if (products.length === 0) {
    return <p className="product-grid__empty">No products match your filters.</p>;
  }

  return (
    <div className="product-grid" role="list">
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
