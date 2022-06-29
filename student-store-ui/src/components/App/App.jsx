import * as React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import './App.css';
import ProductDetail from '../ProductDetail.jsx/ProductDetail';
import NotFound from '../NotFound/NotFound';
import Hero from '../Hero/Hero';

const MAIN_END_POINT = `http://localhost:3001`;

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

  const handleOnCheckoutFormChange = (name, email) => {
    setCheckoutForm({ name, email });
  };

  const handleOnSubmitCheckoutForm = () => {
    setCheckoutForm({ name: '', email: '' });
    // TODO: complete this
  };

  return (
    <div className="app">
      <main>
        <BrowserRouter>
          <Navbar />
          <Hero />
          <SubNavbar setFilter={setFilter} filter={filter} />
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <Sidebar
            handleOnToggle={handleOnToggle}
            isOpen={isOpen}
            shoppingCart={shoppingCart}
            products={products}
            checkoutForm={checkoutForm}
            handleOnCheckoutFormChange={handleOnCheckoutFormChange}
            handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
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

const SubNavbar = ({ filter, setFilter }) => {
  const categories = ['All Categories', 'Food', 'Accessories', 'Tech'];
  return (
    <div className={`sub-navbar`}>
      {categories.map((item, i) => {
        return (
          <button
            key={i}
            id={`${filter === item ? 'selected-filter' : ''}`}
            onClick={() => {
              setFilter(item);
            }}>
            {item}
          </button>
        );
      })}
    </div>
  );
};

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="searchbar-container">
      <input
        placeholder="Search Items"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};
