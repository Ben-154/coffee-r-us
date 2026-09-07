import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/shop/${product.id}`} className="product-card__link">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__origin">{product.origin}</p>
        <p className="product-card__price">${Number(product.price).toFixed(2)}</p>
      </Link>
    </article>
  );
}

export default ProductCard;
