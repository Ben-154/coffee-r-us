import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useProducts } from './hooks/useProducts';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/App.css';

// Must match vite.config.js `base` for GitHub Pages.
const routerBasename = '/coffee-r-us';

function App() {
  const {
    filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedLocations,
    toggleLocation,
    refreshProducts,
  } = useProducts();

  return (
    <BrowserRouter basename={routerBasename}>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/shop"
            element={
              <ShopPage
                filteredProducts={filteredProducts}
                loading={loading}
                error={error}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedLocations={selectedLocations}
                toggleLocation={toggleLocation}
              />
            }
          />
          <Route
            path="/shop/:id"
            element={<ProductDetailPage onProductUpdated={refreshProducts} />}
          />
          <Route
            path="/admin"
            element={<AdminPage onProductCreated={refreshProducts} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
