import React from 'react';

export default function Receipt({ receipt, title="Receipt" }) {
  return (
    <div className="receipt">
      <h1>{title}</h1>
      <h3>Name: {receipt.userInfo.name}</h3>
      <h3>Email: {receipt.userInfo.email}</h3>
      {receipt.lines.map((line, i) => {
        return <div key={i}>{line} </div>;
      })}
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
            <tr key={i}>
              <td>{item.quantity}</td>
              <td>{item.name}</td>
              <td>${item.totalPrice}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
