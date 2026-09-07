import { LOCATIONS } from '../data/seedProducts';
import ProductGrid from '../components/ProductGrid';
import './ShopPage.css';

function ShopPage({
  filteredProducts,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  selectedLocations,
  toggleLocation,
}) {
  return (
    <main className="shop-page">
      <aside className="shop-page__sidebar" aria-label="Filters">
        <label className="shop-page__search-label" htmlFor="product-search">
          Search
        </label>
        <input
          id="product-search"
          className="shop-page__search"
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <fieldset className="shop-page__locations">
          <legend className="shop-page__legend">Locations</legend>
          {LOCATIONS.map((location) => (
            <label key={location} className="shop-page__checkbox">
              <input
                type="checkbox"
                checked={selectedLocations.includes(location)}
                onChange={() => toggleLocation(location)}
              />
              <span>{location}</span>
            </label>
          ))}
        </fieldset>
      </aside>

      <section className="shop-page__content" aria-label="Products">
        {loading ? <p>Loading products...</p> : null}
        {error ? (
          <p className="shop-page__error" role="alert">
            {error}
          </p>
        ) : null}
        {!loading && !error ? (
          <ProductGrid products={filteredProducts} />
        ) : null}
      </section>
    </main>
  );
}

export default ShopPage;
