import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../api/productsApi';
import './ProductDetailPage.css';

function ProductDetailPage({ onProductUpdated }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError('');
      try {
        const data = await getProductById(id);
        if (!active) {
          return;
        }
        setProduct(data);
        setPrice(String(data.price));
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load product');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    return () => {
      active = false;
    };
  }, [id]);

  async function handleSave(event) {
    event.preventDefault();
    const nextPrice = Number(price);

    if (!nextPrice || nextPrice <= 0) {
      setMessage('Enter a valid price greater than 0.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const updated = await updateProduct(id, { price: nextPrice });
      setProduct(updated);
      setPrice(String(updated.price));
      setMessage('Price updated successfully.');
      if (onProductUpdated) {
        await onProductUpdated();
      }
    } catch (err) {
      setMessage(err.message || 'Could not update price.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="product-detail">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="product-detail">
        <p role="alert">{error || 'Product not found.'}</p>
        <Link to="/shop">Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="product-detail">
      <Link className="product-detail__back" to="/shop">
        ← Back to Shop
      </Link>

      <article className="product-detail__card">
        <img
          className="product-detail__image"
          src={product.image}
          alt={product.name}
        />
        <div className="product-detail__content">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>
            <strong>Origin:</strong> {product.origin}
          </p>
          <p>
            <strong>Current price:</strong> ${Number(product.price).toFixed(2)}
          </p>

          <form className="product-detail__form" onSubmit={handleSave}>
            <label htmlFor="edit-price">Update price</label>
            <div className="product-detail__price-row">
              <input
                id="edit-price"
                type="number"
                min="0.01"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
              <button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save price'}
              </button>
            </div>
          </form>

          {message ? <p className="product-detail__message">{message}</p> : null}
        </div>
      </article>
    </main>
  );
}

export default ProductDetailPage;
