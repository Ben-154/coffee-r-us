import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/productsApi';
import { LOCATIONS } from '../data/seedProducts';
import './AdminPage.css';

const INITIAL_FORM = {
  name: '',
  description: '',
  image: '',
  origin: 'Location 1',
  price: '',
};

function AdminPage({ onProductCreated }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setStatus('');
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Coffee name is required.';
    }
    if (!form.description.trim()) {
      nextErrors.description = 'Description is required.';
    }
    if (!form.image.trim()) {
      nextErrors.image = 'Image URL is required.';
    } else {
      try {
        // eslint-disable-next-line no-new
        new URL(form.image.trim());
      } catch {
        nextErrors.image = 'Enter a valid image URL.';
      }
    }
    if (!form.price || Number(form.price) <= 0) {
      nextErrors.price = 'Enter a valid price.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setStatus('');

    try {
      const created = await createProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        origin: form.origin,
        price: Number(form.price),
      });

      setForm(INITIAL_FORM);
      setStatus('Product added successfully.');
      if (onProductCreated) {
        await onProductCreated();
      }
      navigate(`/shop/${created.id}`);
    } catch (err) {
      setStatus(err.message || 'Could not add product.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-page">
      <form className="admin-form" onSubmit={handleSubmit} noValidate>
        <h1 className="admin-form__title">Admin Portal</h1>

        <label className="admin-form__label" htmlFor="coffee-name">
          Coffee Name
        </label>
        <input
          id="coffee-name"
          className="admin-form__input"
          type="text"
          placeholder="Type here"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
        />
        {errors.name ? (
          <p className="admin-form__error" role="alert">
            {errors.name}
          </p>
        ) : null}

        <label className="admin-form__label" htmlFor="coffee-description">
          Description
        </label>
        <input
          id="coffee-description"
          className="admin-form__input"
          type="text"
          placeholder="Type here"
          value={form.description}
          onChange={(event) => updateField('description', event.target.value)}
        />
        {errors.description ? (
          <p className="admin-form__error" role="alert">
            {errors.description}
          </p>
        ) : null}

        <label className="admin-form__label" htmlFor="coffee-image">
          Image
        </label>
        <input
          id="coffee-image"
          className={`admin-form__input ${
            errors.image ? 'admin-form__input--invalid' : ''
          }`}
          type="url"
          placeholder="https://example.com/coffee.jpg"
          value={form.image}
          onChange={(event) => updateField('image', event.target.value)}
        />
        {errors.image ? (
          <p className="admin-form__error" role="alert">
            {errors.image}
          </p>
        ) : null}

        <label className="admin-form__label" htmlFor="coffee-origin">
          Origin
        </label>
        <select
          id="coffee-origin"
          className="admin-form__input"
          value={form.origin}
          onChange={(event) => updateField('origin', event.target.value)}
        >
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        <label className="admin-form__label" htmlFor="coffee-price">
          Price
        </label>
        <input
          id="coffee-price"
          className="admin-form__input"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Type here"
          value={form.price}
          onChange={(event) => updateField('price', event.target.value)}
        />
        {errors.price ? (
          <p className="admin-form__error" role="alert">
            {errors.price}
          </p>
        ) : null}

        {status ? <p className="admin-form__status">{status}</p> : null}

        <button
          className="admin-form__submit"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </main>
  );
}

export default AdminPage;
