// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import React, { useEffect, useState } from "react";

export default function App() {

  const api_url = "https://api.frankfurter.app";

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState("Result");
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () { 
    async function convert() {
        setIsLoading(false);

        if(amount !== 0) {
          const res = await fetch(`${api_url}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
          const data = await res.json();
          console.log(data.rates);
          setResult(data.rates[toCurrency]);
        } else {
          setResult("Enter a amount");
        }
        setIsLoading(false);
    }

    if(toCurrency !== fromCurrency) {
      convert();
    } else {
      setResult("Same currencies")
    }

}, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {
        !isLoading ? <p>
          {result}{toCurrency === fromCurrency ? "." : " " + toCurrency}
          </p> : <p>Loading...</p>
      }
    </div>
  );
}