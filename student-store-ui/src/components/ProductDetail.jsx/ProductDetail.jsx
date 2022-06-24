import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductView from '../ProductView/ProductView';

import './ProductDetail.css';

const ProductDetail = ({
  handleAddItemToCart,
  handleRemoveItemFromCart,
  shoppingCart,
  MAIN_END_POINT,
}) => {
  const [currentProduct, setCurrentProduct] = React.useState({});
  const [error, setError] = React.useState(false);
  let { productId } = useParams();

  useEffect(async () => {
    try {
      const curr = await axios.get(`${MAIN_END_POINT}/store/${productId}`);

      setCurrentProduct(curr.data.product);
      setError(false);
    } catch (e) {
      setError(true);
      console.log('Product API fetch error', e);
    }
  }, []);

  return (
    <div>
      {error ? (
        <h1 style={{ textAlign: 'center' }}>Product Not Found</h1>
      ) : (
        <ProductView
          product={currentProduct}
          shoppingCart={shoppingCart}
          handleAddItemToCart={handleAddItemToCart}
          handleRemoveItemFromCart={handleRemoveItemFromCart}
        />
      )}
    </div>
  );
};

// const ProductView = ({
//   currentProduct,
//   shoppingCart,
//   handleAddItemToCart,
//   handleRemoveItemFromCart,
// }) => {
//   console.log(shoppingCart);
//   return (
//     <div className="product-detail">
//       <img src={currentProduct.image} />
//       <div>{currentProduct.name}</div>
//       <div>{currentProduct.description}</div>
//       <div>
//         Quantity:{' '}
//         {shoppingCart.find((item) => item.productId === currentProduct.id)
//           ? shoppingCart.find((item) => item.productId === currentProduct.id)
//               .quantity
//           : 0}
//       </div>
//       <div>
//         <button
//           onClick={() => {
//             handleAddItemToCart(
//               currentProduct.id,
//               currentProduct.price,
//               currentProduct.name
//             );
//           }}>
//           Add To Cart
//         </button>
//         <button
//           onClick={() => {
//             handleRemoveItemFromCart(currentProduct.id, currentProduct.price);
//           }}>
//           Remove From Cart
//         </button>
//       </div>
//     </div>
//   );
// };

export default ProductDetail;
