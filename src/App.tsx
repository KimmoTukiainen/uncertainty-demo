import './App.css';

import React from 'react';

import FiniteProductList from './FiniteProductList';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
      <h1>ProductList</h1>
      <ProductList />

      <h1>FiniteProductList</h1>
      <FiniteProductList />
    </div>
  );
}

export default App;
