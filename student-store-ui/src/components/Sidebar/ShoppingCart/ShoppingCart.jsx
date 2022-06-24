import React, { useEffect } from 'react';

const round = (num) => {
  return Number(Math.round(num + 'e2') + 'e-2');
};

const ShoppingCart = ({ shoppingCart }) => {
  return (
    <div className="shopping-cart">
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h1>Shopping Cart</h1>{' '}
        <i className="material-icons md-48">add_shopping_cart</i>
      </div>
      {shoppingCart.length === 0 ? (
        <div style={{ fontSize: '1rem', margin: 20 }}>
          No items added to cart yet. Start shopping now!
        </div>
      ) : (
        <div>
          <Table shoppingCart={shoppingCart} />
          <CostSummary shoppingCart={shoppingCart} />
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

const Table = ({ shoppingCart }) => {
  return (
    <table className="CartTable">
      <thead>
        <tr className="header">
          <th className="flex-2">Name</th>
          <th className="center">Quantity</th>
          <th className="center">Unit Price</th>
          <th className="center">Cost</th>
        </tr>
      </thead>
      <tbody>
        {shoppingCart.map((item, i) => {
          return (
            <tr className="product-row" key={i}>
              <td className="flex-2 cart-product-name">{item.name}</td>
              <td className="center cart-product-quantity">{item.quantity}</td>
              <td className="center cart-product-price">${item.price}</td>
              <td className="center cart-product-subtotal">
                ${round(item.price * item.quantity)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const CostSummary = ({ shoppingCart }) => {
  const [subtotal, setSubtotal] = React.useState(0);

  useEffect(() => {
    let total = 0;
    shoppingCart.forEach((item) => {
      total += item.price;
    });

    setSubtotal(total);
  }, []);

  return (
    <table className="summary-container">
      <tr className="summary-row">
        <td>Subtotal</td>
        <td>${subtotal}</td>
      </tr>
      <tr className="summary-row">
        <td>Taxes and Fees</td>
        <td>${round(subtotal * 0.875)}</td>
      </tr>
      <tr className="summary-row">
        <td>Total</td>
        <td>${round(subtotal + subtotal * 0.875)}</td>
      </tr>
    </table>
  );
};
