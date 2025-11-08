// frontend/src/api.js
import axios from 'axios';
const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function fetchProducts() {
  return axios.get(`${BASE}/api/products`).then(r => r.data);
}

export async function addToCart(productId, qty = 1) {
  return axios.post(`${BASE}/api/cart`, { productId, qty }).then(r => r.data);
}

export async function getCart() {
  return axios.get(`${BASE}/api/cart`).then(r => r.data);
}

export async function removeCartItem(id) {
  return axios.delete(`${BASE}/api/cart/${id}`).then(r => r.data);
}

export async function updateCartItem(id, qty) {
  return axios.put(`${BASE}/api/cart/${id}`, { qty }).then(r => r.data);
}

export async function checkout(payload) {
  return axios.post(`${BASE}/api/checkout`, payload).then(r => r.data);
}
