import { useCallback, useEffect, useMemo, useState } from 'react';
import { getProducts } from '../api/productsApi';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Unable to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const toggleLocation = useCallback((location) => {
    setSelectedLocations((current) =>
      current.includes(location)
        ? current.filter((item) => item !== location)
        : [...current, location]
    );
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query);

      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(product.origin);

      return matchesSearch && matchesLocation;
    });
  }, [products, searchQuery, selectedLocations]);

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedLocations,
    toggleLocation,
    refreshProducts,
    setProducts,
  };
}
