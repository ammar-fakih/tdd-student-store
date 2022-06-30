import * as React from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import ShoppingCart from './ShoppingCart/ShoppingCart';
import Receipt from '../Receipt';
import './Sidebar.css';

export default function Sidebar({
  handleOnToggle,
  isOpen,
  shoppingCart,
  products,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
  receipt
}) {
  return (
    <section className="sidebar">
      <div className="sidenav" style={{ width: isOpen ? '600px' : 0 }}>
        <div className="closebtn" onClick={handleOnToggle}>
          &times;
        </div>
        {!(Array.isArray(shoppingCart) && shoppingCart.length === 0 && receipt) && <ShoppingCart shoppingCart={shoppingCart} />}
        {Array.isArray(shoppingCart) && shoppingCart.length > 0 && (
        <CheckoutForm
          checkoutForm={checkoutForm}
          handleOnCheckoutFormChange={handleOnCheckoutFormChange}
          handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
        />)}

        {Array.isArray(shoppingCart) && shoppingCart.length === 0 && receipt && (<Receipt receipt={receipt}/>)}
        
      </div>

      <div className="sidebar-closed">
        <i
          id="open-icon"
          className="material-icons md-48 toggle-button"
          onClick={handleOnToggle}>
          arrow_forward
        </i>
      </div>
      <div
        id="blur"
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={handleOnToggle}></div>
    </section>
  );
}