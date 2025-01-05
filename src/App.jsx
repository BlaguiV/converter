import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(
      "https://v6.exchangerate-api.com/v6/e60b06371e33752278ad6927/latest/USD"
    )
      .then((response) => response.json())
      .then((data) => setCurrencies(Object.keys(data.conversion_rates)))
      .catch((error) => alert("Error fetching currencies: ", error));
  }, []);

  const handleConvert = async () => {
    if (!amount1 || isNaN(amount1)) return alert("Введіть правильну суму!");

    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/e60b06371e33752278ad6927/latest/${fromCurrency}`
      );
      const data = await response.json();
      const rate = data.conversion_rates[toCurrency];

      if (rate) {
        setResult((amount1 * rate).toFixed(2));
        setAmount2((amount1 * rate).toFixed(2));
      } else {
        alert("Не вдалося отримати курс для цієї валюти");
      }
    } catch (error) {
      alert("Помилка при отриманні даних: " + error.message);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="input-group">
            <input
              type="number"
              placeholder="Сума"
              value={amount1}
              onChange={(e) => setAmount1(e.target.value)}
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button className="conv-button" onClick={handleConvert}>
            Convert
          </button>
          <div className="input-group">
            <input
              type="number"
              placeholder="Сума"
              value={amount2}
              onChange={(e) => setAmount2(e.target.value)}
              disabled
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
