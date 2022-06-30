import * as React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import './App.css';
import ProductDetail from '../ProductDetail/ProductDetail';
import NotFound from '../NotFound/NotFound';
import Hero from '../Hero/Hero';
import Purchases from '../Purchases/Purchases';
import PurchaseDetails from '../PurchaseDetail/PurchaseDetail';

const BASE_URL = `http://localhost:3001`;

export default function App() {
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [shoppingCartPrice, setShoppingCartPrice] = React.useState(0);
  const [checkoutForm, setCheckoutForm] = React.useState({
    name: '',
    email: '',
  });
  const [filter, setFilter] = React.useState('All Categories');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [receipt, setReceipt] = React.useState(null);

  React.useEffect(async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${BASE_URL}/store`);
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
      setError('API call error');
    }
    setIsFetching(false);
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

  const handleOnCheckoutFormChange = (name, email) => {
    setCheckoutForm({ name, email });
  };

  const formatShoppingCart = () => {
    return shoppingCart.map((item) => {
      return {
        itemId: item.productId,
        quantity: item.quantity,
      }
    })
  }

  const handleOnSubmitCheckoutForm = async () => {

    try {
      const response = await axios.post(`${BASE_URL}/store`, {
        shoppingCart: formatShoppingCart(),
        user: checkoutForm,
      });
      if (response.status !== 201) {
        setError('API error ', response.text);
        return;
      }
      setReceipt(response.data.purchase.receipt);
      setShoppingCart([]);
      setShoppingCartPrice(0);
      setCheckoutForm({ name: '', email: '' });
    } catch(e) {
      console.log('API post error', e);
    }
  };

  return (
    <div className="app">
      <main>
        <BrowserRouter>
          <Navbar handleOnToggle={handleOnToggle}/>
          <Hero />
          
         

          <Sidebar
            handleOnToggle={handleOnToggle}
            isOpen={isOpen}
            shoppingCart={shoppingCart}
            products={products}
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange}
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
            receipt={receipt}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  filter={filter}
                  setFilter={setFilter}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  products={products}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  shoppingCart={shoppingCart}
                  isFetching={isFetching}
                  error={error}
                />
              }
            />
            <Route path="/purchases" element={<Purchases BASE_URL={BASE_URL}/>} />
            <Route path="/purchases/:purchaseId" element={<PurchaseDetails BASE_URL={BASE_URL}/>} />
            <Route
              path="/products/:productId"
              element={
                <ProductDetail
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  shoppingCart={shoppingCart}
                  BASE_URL={BASE_URL}
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



