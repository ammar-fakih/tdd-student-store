import * as React from 'react';
import './Sidebar.css';

export default function Sidebar({
  handleOnToggle,
  isOpen,
  shoppingCart,
  products,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
}) {
  return (
    <section className="sidebar">
      <div className="sidenav" style={{ width: isOpen ? '400px' : 0 }}>
        <div className="closebtn" onClick={handleOnToggle}>
          &times;
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <div>Shopping Cart</div>
          <i class="material-icons md-48">add_shopping_cart</i>
        </div>
        <div style={{ fontSize: '1rem' }}>
          No items added to cart yet. Start shopping now!
        </div>
      </div>

      <div className="sidebar-closed">
        <i
          id="open-icon"
          className="material-icons md-48 toggle-button"
          onClick={handleOnToggle}>
          arrow_forward
        </i>
      </div>
    </section>
  );
}
