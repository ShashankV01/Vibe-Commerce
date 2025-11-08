// frontend/src/components/ProductGrid.js
import React from 'react';

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid">
      {products.map(p => (
        <div key={p.id} className="card">
          <div style={{height:120, display:'flex', alignItems:'center', justifyContent:'center', background:'#f2f6fb', borderRadius:6}}>
            <div style={{fontSize:28, opacity:0.85}}>{p.name.split(' ')[1] || 'V'}</div>
          </div>
          <h4>{p.name}</h4>
          <div>${Number(p.price).toFixed(2)}</div>
          <div style={{marginTop:12, display:'flex', gap:8}}>
            <button className="btn" onClick={() => onAdd(p.id)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
