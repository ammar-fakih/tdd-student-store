import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import "./PurchaseDetail.css";
import Receipt from '../Receipt';

export default function PurchaseDetail({ BASE_URL }) {
  const [currentPurchase, setCurrentPurchase] = React.useState();
  const [error, setError] = React.useState('');
  const { purchaseId } = useParams();

  useEffect(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/store/purchases/${purchaseId}`);
      setCurrentPurchase(response.data.purchase);
    } catch (e) {
      setError('Item not found');
      console.log('API call error', e);
    }
  }, [purchaseId]);

  return (
    <div className="purchase-detail">
      {error && <h3 style={{textAlign: "center"}}>{error}</h3>}
      {currentPurchase && !error && <Receipt receipt={currentPurchase.receipt} title={`Order #${currentPurchase.id}`}/>}
    </div>
  );
}
