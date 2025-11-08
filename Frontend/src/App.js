// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import ProductGrid from './components/ProductGrid';
import CartView from './components/CartView';
import CheckoutModal from './components/CheckoutModal';
import * as api from './api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try { setLoading(true); const data = await api.fetchProducts(); setProducts(data); }
    catch(e){ setError('Failed to load products'); } finally { setLoading(false); }
  };

  const loadCart = async () => {
    try { const data = await api.getCart(); setCart(data); }
    catch(e){ setError('Failed to load cart'); }
  };

  useEffect(()=>{ loadProducts(); loadCart(); }, []);

  const handleAdd = async (productId) => {
    try { await api.addToCart(productId, 1); await loadCart(); }
    catch(e){ setError('Failed to add to cart'); }
  };

  const handleRemove = async (id) => {
    try { await api.removeCartItem(id); await loadCart(); }
    catch(e){ setError('Failed to remove item'); }
  };

  const handleUpdateQty = async (id, qty) => {
    try { await api.updateCartItem(id, qty); await loadCart(); }
    catch(e){ setError('Failed to update quantity'); }
  };

  const handleCheckout = async (payload) => {
    try {
      const res = await api.checkout(payload);
      setReceipt(res.receipt);
      // optionally refresh cart
      await loadCart();
      alert('Order placed — mock receipt generated (look at Receipt below).');
    } catch (err) {
      console.error(err);
      setError('Checkout failed');
    }
  };

  return (
    <div className="app">
      <div className="header">
        <div className="brand">Vibe Commerce — Demo</div>
        <div className="topbar">
          <div style={{padding:8}}>Simple full-stack test app</div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns: '1fr 380px', gap:16}} className="main">
        <div>
          <h2>Products</h2>
          {loading && <div>Loading...</div>}
          <ProductGrid products={products} onAdd={handleAdd} />
        </div>

        <div>
          <CartView cart={cart} onRemove={handleRemove} onUpdateQty={handleUpdateQty} onCheckoutOpen={()=>setCheckoutOpen(true)} />
        </div>
      </div>

      <CheckoutModal isOpen={checkoutOpen} onRequestClose={()=>setCheckoutOpen(false)} cart={cart} onSubmitReceipt={handleCheckout} />

      {receipt && (
        <div style={{marginTop:18}} className="receipt">
          <h4>Receipt</h4>
          <div><strong>Order ID:</strong> {receipt.id}</div>
          <div><strong>Name:</strong> {receipt.name} {receipt.email && <span>— {receipt.email}</span>}</div>
          <div><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</div>
          <div style={{marginTop:8}}>
            {receipt.items.map(it => (<div key={it.productId}>{it.name} x{it.qty} — ${Number(it.line).toFixed(2)}</div>))}
          </div>
          <div style={{marginTop:8, fontWeight:700}}>Total: ${Number(receipt.total).toFixed(2)}</div>
        </div>
      )}

      {error && <div style={{marginTop:12, color:'crimson'}}>{error}</div>}
    </div>
  );
}
