import * as React from 'react';
import './Home.css';
import ProductGrid from '../ProductGrid/ProductGrid';
import Hero from "../Hero/Hero"

export default function Home({
  products,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart
}) {
  return (
    <div className="home">
      <Hero />
      <ProductGrid
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
        products={products}
        shoppingCart={shoppingCart}
      />
    </div>
  );
}
