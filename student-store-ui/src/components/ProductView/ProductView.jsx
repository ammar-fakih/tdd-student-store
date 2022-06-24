import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const ProductView = ({
  product,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <h1>Product #{product.id}</h1>
      <ProductCard
        product={product}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        shoppingCart={shoppingCart}
        showDescription={true}
      />
    </div>
  );
};

export default ProductView;
