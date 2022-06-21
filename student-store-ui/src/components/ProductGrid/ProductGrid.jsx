import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import "./ProductGrid.css"

const ProductGrid = ({ products }) => {
  console.log(products)
  return (
    <div className='product-grid'>
      {products.map((product) => {
        return <ProductCard product={product}/>;
      })}
    </div>
  );
};

export default ProductGrid;
