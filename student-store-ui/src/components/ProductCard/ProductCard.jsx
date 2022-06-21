import React from 'react';
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img className="product-image" src={product.image} />
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price}</div>
      <button className="add">Add</button>
      <button className="remove">Remove</button>
    </div>
  );
};

export default ProductCard;
