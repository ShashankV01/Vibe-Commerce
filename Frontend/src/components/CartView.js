// frontend/src/components/CartView.js
import React from 'react';

export default function CartView({ cart, onRemove, onUpdateQty, onCheckoutOpen }) {
  return (
    <div className="cart-panel">
      <h3>Cart</h3>
      <div style={{fontSize:14, color:'#555'}}>Items: {cart.items.length}</div>
      <div className="cart-list">
        {cart.items.length === 0 && <div style={{padding:8}}>Cart is empty</div>}
        {cart.items.map(it => (
          <div key={it.id} className="cart-item">
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{it.product?.name || 'Unknown'}</div>
              <div style={{fontSize:13, color:'#666'}}>${Number(it.product?.price || 0).toFixed(2)} x {it.qty} = ${Number(it.lineTotal).toFixed(2)}</div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end'}}>
              <input className="qty-input" type="number" min="1" value={it.qty} onChange={(e)=> onUpdateQty(it.id, Math.max(1, Number(e.target.value)))} />
              <button className="btn" style={{background:'#e74c3c'}} onClick={() => onRemove(it.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontWeight:700}}>Total</div>
        <div style={{fontWeight:700}}>${Number(cart.total).toFixed(2)}</div>
      </div>

      <button className="btn" style={{width:'100%', marginTop:12}} onClick={onCheckoutOpen} disabled={cart.items.length===0}>Checkout</button>
    </div>
  );
}
