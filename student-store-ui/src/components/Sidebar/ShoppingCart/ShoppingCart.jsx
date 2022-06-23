import React, { useEffect } from 'react';

const ShoppingCart = ({ shoppingCart }) => {
  return (
    <div className="shopping-cart">
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <div className="sidebar-title">Shopping Cart</div>
        <i class="material-icons md-48">add_shopping_cart</i>
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
      <tr class="header">
        <th class="flex-2">Name</th>
        <th class="center">Quantity</th>
        <th class="center">Unit Price</th>
        <th class="center">Cost</th>
      </tr>
      {shoppingCart.map((item) => {
        return (
          <tr class="product-row">
            <td class="flex-2 cart-product-name">{item.name}</td>
            <td class="center cart-product-quantity">{item.quantity}</td>
            <td class="center cart-product-price">{item.price}</td>
            <td class="center cart-product-subtotal">
              {item.price * item.quantity}
            </td>
          </tr>
        );
      })}
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
        <td>${subtotal * 0.875}</td>
      </tr>
      <tr className="summary-row">
        <td>Total</td>
        <td>${subtotal + subtotal * 0.875}</td>
      </tr>
    </table>
  );
};
