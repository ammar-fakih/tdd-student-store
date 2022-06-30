import * as React from 'react';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import ShoppingCart from './ShoppingCart/ShoppingCart';
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

const Receipt = ({receipt}) => {
  return (
    <div className="receipt">
      <h1>Receipt</h1>
      <h3>Name: {receipt.userInfo.name}</h3>
      <h3>Email: {receipt.userInfo.email}</h3>
      {receipt.lines.map((line, i) => {
        return <div key={i}>{line} </div>; })}
        {'\n'}
      <h3>Purchases</h3>
      <table>
        <tr>
          <th>Quantity</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {receipt.productRows.map((item, i) => {
        return (
        <tr>
          <td>{item.quantity}</td>
          <td>{item.name}</td>
          <td>${item.totalPrice}</td>
        </tr>);
      })}
      </table>
    </div>
  );
}