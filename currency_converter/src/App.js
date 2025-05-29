import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResult(data.rates[toCur]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    if (amount && fromCur && toCur) {
      fetchData();
    }
  }
  , [amount, fromCur, toCur]);
  //`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
  return (
    <div className="App">
 
        <div className='currency-converter'>
       <input type="text" onChange={(e)=> setAmount(e.target.value)}></input>
       <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">CAD</option>
          <option value="INR">INR</option>
       </select>
       <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
       </select>
       
       </div>
       <h1>Output: {result ? result : 'No result yet'}</h1>
    </div>
  );
}

export default App;
