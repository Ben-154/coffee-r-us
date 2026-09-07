import { SEED_PRODUCTS } from '../data/seedProducts';

const STORAGE_KEY = 'coffee-r-us-products';
const API_URL = 'http://localhost:3001/products';

function readLocal() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
    return [...SEED_PRODUCTS];
  }
  return JSON.parse(raw);
}

function writeLocal(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

async function canUseApi() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const response = await fetch(API_URL, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
}

export async function getProducts() {
  if (await canUseApi()) {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }

  return readLocal();
}

export async function getProductById(id) {
  if (await canUseApi()) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  }

  const product = readLocal().find((item) => String(item.id) === String(id));
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
}

export async function createProduct(product) {
  if (await canUseApi()) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  }

  const products = readLocal();
  const created = {
    ...product,
    id: Date.now(),
    price: Number(product.price),
  };
  writeLocal([created, ...products]);
  return created;
}

export async function updateProduct(id, updates) {
  if (await canUseApi()) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  }

  const products = readLocal();
  const index = products.findIndex((item) => String(item.id) === String(id));
  if (index === -1) {
    throw new Error('Product not found');
  }

  const updated = {
    ...products[index],
    ...updates,
    price:
      updates.price !== undefined
        ? Number(updates.price)
        : products[index].price,
  };
  products[index] = updated;
  writeLocal(products);
  return updated;
}
