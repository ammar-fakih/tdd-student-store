import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Home from '../Home/Home';
import './App.css';

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
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Navbar />
          <Sidebar />
          <Home classListing={classListing} />
        </main>
      </BrowserRouter>
    </div>
  );
}
