import React from 'react';
import './CheckoutForm.css';

const CheckoutForm = ({
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
}) => {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <input
        name="email"
        value={checkoutForm.email}
        type="email"
        placeholder="student@codepath.org"
        onChange={(e) => {
          handleOnCheckoutFormChange(checkoutForm.name, e.target.value);
        }}
      />
      <input
        name="name"
        value={checkoutForm.name}
        type="text"
        placeholder="Student Name"
        onChange={(e) => {
          handleOnCheckoutFormChange(e.target.value, checkoutForm.email);
        }}
      />
      <button onClick={handleOnSubmitCheckoutForm}>Checkout</button>
    </div>
  );
};

export default CheckoutForm;
