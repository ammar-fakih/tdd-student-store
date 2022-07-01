import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../../../SearchBar/SearchBar';
import './Purchases.css';

export default function Purchases({ BASE_URL }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(async () => {
    getPurchases();
  }, []);
  
  const getPurchases = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/store/purchases`);
      console.log(response.data);
      setProducts(response.data.purchases);
    } catch (e) {
      console.log('API call error', e);
      setError('API call error');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/store/purchases/?email=${searchQuery}`
      );
      setProducts([response.data.purchase]);
    } catch (e) {
      console.log('Item not found', e);
      setError('Item not found');
    }
  };

  const handleOnChange = (e) => {
    if (e.target.value === '') {
      getPurchases();
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          handleOnChange={handleOnChange}
        />
      )}
      {!error ? (
        <div className="purchase-container">
          {Array.isArray(products) && products.length === 0 ? (
            <h3>No Orders</h3>
          ) : (
            <h3>Orders</h3>
          )}
          {products.reverse().map((item) => {
            return <PurchaseCard product={item} key={item.id} />;
          })}
        </div>
      ) : (
        <h3 style={{ textAlign: 'center' }}>Item not found</h3>
      )}
    </div>
  );
}

const PurchaseCard = ({ product }) => {
  return (
    <div className="purchase-card">
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/purchases/${product.id}`}>
        <div>
          <h3>
            #{product.id} {product.name}
          </h3>
          <p>{product.email}</p>
        </div>
        <div>
          <p>{product.price}</p>
        </div>
        <div>
          <p>{product.createdAt}</p>
        </div>
      </Link>
    </div>
  );
};
