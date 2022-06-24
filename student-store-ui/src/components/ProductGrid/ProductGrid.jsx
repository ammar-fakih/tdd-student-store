import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({
  products,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart,
  filter,
  searchQuery,
}) => {
  const [showDescription, setShowDescription] = React.useState();
  let filteredList;
  if (filter === 'All Categories') {
    if (searchQuery === '') {
      filteredList = products;
    } else {
      filteredList = products.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
  } else {
    filteredList = products.filter((item) => {
      return (
        item.category === filter.toLowerCase() &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }

  return (
    <div style={{ margin: '30px 50px 30px 120px' }}>
      <h1>Best Selling Products</h1>
      <div className="product-grid">
        {filteredList.map((product) => {
          return (
            <ProductCard
              key={product.id}
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
