import * as React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import './App.css';
import ProductDetail from '../ProductDetail.jsx/ProductDetail';
import NotFound from '../NotFound/NotFound';

const MAIN_END_POINT = `https://codepath-store-api.herokuapp.com`;

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [shoppingCartPrice, setShoppingCartPrice] = React.useState(0);
  const [checkoutForm, setCheckoutForm] = React.useState({});

  React.useEffect(async () => {
    try {
      const response = await axios.get(`${MAIN_END_POINT}/store`);

      if (response.status != 200) {
        setError('API error ', response.text);
        return;
      }

      if (response.data.products.length === 0) {
        setError('Product List Empty');
        return;
      }

      setProducts(response.data.products);
    } catch (e) {
      console.log('API call error', e);
    }
  }, []);

  const handleOnToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleAddItemToCart = (productId, price, name) => {
    setShoppingCartPrice(shoppingCartPrice + price);
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].productId === productId) {
        shoppingCart[i].quantity++;
        setShoppingCart([...shoppingCart]);
        return;
      }
    }
    setShoppingCart([...shoppingCart, { productId, quantity: 1, price, name }]);
  };

  const handleRemoveItemFromCart = (productId, price) => {
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].productId === productId) {
        if (shoppingCart[i].quantity === 1) {
          shoppingCart.splice(i, 1);
        } else {
          shoppingCart[i].quantity--;
        }
        setShoppingCartPrice(shoppingCartPrice - price);
        setShoppingCart([...shoppingCart]);
        return;
      }
    }
  };

  const handleOnCheckoutFormChange = (name, value) => {
    setCheckoutForm({ name, value });
  };

  const handleOnSubmitCheckoutForm = () => {
    // TODO: complete this
  };

  return (
    <div className="app">
      <main>
        <BrowserRouter>
          <Navbar />
          <Sidebar
            handleOnToggle={handleOnToggle}
            isOpen={isOpen}
            shoppingCart={shoppingCart}
            products={products}
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange}
            handleOnSubmitCheckoutForm={handleOnCheckoutFormChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  shoppingCart={shoppingCart}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetail
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  shoppingCart={shoppingCart}
                  MAIN_END_POINT={MAIN_END_POINT}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
