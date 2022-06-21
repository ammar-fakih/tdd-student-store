import * as React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import './App.css';
import ProductDetail from '../ProductDetail.jsx/ProductDetail';
import NotFound from '../NotFound/NotFound';

const MAIN_END_POINT = `https://codepath-store-api.herokuapp.com/store`;

export default function App() {
  const [classListing, setClassListing] = React.useState([]);

  React.useEffect(async () => {
    const response = await fetch(
      `https://codepath-store-api.herokuapp.com/store`
    );
    const json = await response.json();
    console.log(json);
    setClassListing(json.products);
  }, []);

  return (
    <div className="app">
      <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </main>
    </div>
  );
}
