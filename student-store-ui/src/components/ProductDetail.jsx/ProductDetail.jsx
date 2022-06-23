import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './ProductDetail.css';

const ProductDetail = ({
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart,
  MAIN_END_POINT,
}) => {
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [error, setError] = React.useState(true);
  const [quantity, setQuantity] = React.useState(0);
  let { productId } = useParams();

  useEffect(async () => {
    const curr = await axios.get(`${MAIN_END_POINT}/store/${productId}`);
    console.log(curr.data.product);
    if (curr) {
      setCurrentProduct(curr.data.product);
      setError(false);
    } else {
      setError(true);
    }
  }, []);

  return (
    <div>
      {error ? (
        <div>Product Not Found</div>
      ) : (
        <ProductView
          currentProduct={currentProduct}
          shoppingCart={shoppingCart}
          handleAddItemToCart={handleAddItemToCart}
          handleRemoveItemFromCart={handleRemoveItemFromCart}
        />
      )}
    </div>
  );
};

const ProductView = ({
  currentProduct,
  shoppingCart,
  handleAddItemToCart,
  handleRemoveItemFromCart,
}) => {
  return (
    <div className="product-detail">
      <div>
        <img src={currentProduct.image} />
      </div>
      <div>{currentProduct.name}</div>
      <div>
        Quantity:{' '}
        {shoppingCart.find((item) => item.id === currentProduct.id)
          ? shoppingCart.find((item) => item.id === currentProduct.id).quantity
          : 0}
      </div>
      <div>
        <button
          onClick={() => {
            handleAddItemToCart(
              currentProduct.id,
              currentProduct.price,
              currentProduct.name
            );
          }}>
          Add To Cart
        </button>
        <button
          onClick={() => {
            handleRemoveItemFromCart(currentProduct.id, currentProduct.price);
          }}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
