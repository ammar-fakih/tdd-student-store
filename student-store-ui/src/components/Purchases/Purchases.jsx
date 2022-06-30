import React from 'react';
import axios from 'axios';
import SearchBar from '../../../SearchBar/SearchBar';

export default function Purchases({ BASE_URL }) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${BASE_URL}/purchases`);
      setProducts(response.data.purchases);
    } catch (e) {
      console.log('API call error', e);
      setError('API call error');
    }
    setIsFetching(false);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`MAIN_URL/purchases/${searchQuery}`);
    } catch (e) {
      console.log('API call error', e);
      setError('API call error');
    }
  };

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

    </div>
  );
}


const PurchaseCard = ({ product }) => {
  return (
    <div className="purchase-card">
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
      <div>
        <p>{product.price}</p>
      </div>
    </div>
  );
}