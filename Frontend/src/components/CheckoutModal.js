// frontend/src/components/CheckoutModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CheckoutModal({ isOpen, onRequestClose, cart, onSubmitReceipt }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      cartItems: cart.items.map(it => ({ productId: it.productId, qty: it.qty })),
      name,
      email
    };
    await onSubmitReceipt(payload);
    setName(''); setEmail('');
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={{content:{maxWidth:600, margin:'auto', borderRadius:8, padding:20}}}>
      <h3>Checkout</h3>
      <form className="checkout-form" onSubmit={submit}>
        <input placeholder="Name" required value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} />
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div><strong>Total:</strong> ${Number(cart.total).toFixed(2)}</div>
          <button className="btn" type="submit">Place Order</button>
        </div>
      </form>
      <div style={{marginTop:12}}>
        <small>Note: This is a mock checkout — no real payment processing.</small>
      </div>
    </Modal>
  );
}
