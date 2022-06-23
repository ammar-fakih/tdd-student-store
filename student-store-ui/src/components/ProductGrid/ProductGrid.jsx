import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  products,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart
}) => {
  const [showDescription, setShowDescription] = React.useState();
  return (
    <div style={{ margin: '30px 50px 30px 120px' }}>
      <h1>Best Selling Products</h1>
      <div className="product-grid">
        {products.map((product) => {
          return (
            <ProductCard
              product={product}
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              showDescription={showDescription}
              setShowDescription={setShowDescription}
              shoppingCart={shoppingCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
