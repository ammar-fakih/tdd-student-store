import * as React from 'react';
import './Home.css';
import ProductGrid from '../ProductGrid/ProductGrid';

export default function Home({ products }) {
  return (
    <div className="home">
      <div>Home</div>
      <ProductGrid products={products}/>
    </div>
  );
}
