"use client";

import { useState, useEffect } from "react";
import Select from "react-select";

const API_URL = `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/USD`;

export default function Home() {
  const [currencies, setCurrencies] = useState({});
  const [amount, setAmount] = useState(null);
  const [from, setFrom] = useState("Search...");
  const [to, setTo] = useState("Search...");
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log(data);
        setCurrencies(data?.conversion_rates);
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    };
    fetchData();
  }, []);

  const convertCurrency = () => {
    if (amount === null || Number(amount) === 0) {
      setError("Please enter any amount.");
      setConverted(null);
    } else {
      setError(null);
    }
    if (!currencies[from] || !currencies[to]) return;
    const rate = currencies[to] / currencies[from];
    setConverted(Number(amount) * rate);
    setShow(true);
  };

  return (
    <div className=" h-screen overflow-y-hidden flex items-center justify-center bg-gray-50  text-white relative px-4">
      <div className=" z-20 bg-gradient-to-b bg-gray-50 p-6 rounded-lg shadow-lg w-96 mb-8">
        <h2 className="text-xl font-bold mb-6 text-center text-black">
          Currency Converter
        </h2>
        <div className="flex flex-col gap-4">
          {/* Amount Input */}
          <label className="text-sm font-medium text-black">
            Enter Your Amount :
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setShow(false);
            }}
            className="p-2 border rounded placeholder:text-gray-800  w-full bg-gray-50 text-black"
            placeholder="Enter amount"
          />

          {/* From Currency */}
          <label className="text-sm font-medium text-black">
            From Currency
          </label>
          <Select
            value={{ value: from, label: from }}
            onChange={(option) => {
              setFrom(option.value);
              setShow(false);
            }}
            options={Object.keys(currencies).map((currency) => ({
              value: currency,
              label: currency,
            }))}
            className="basic-single text-black  "
            classNamePrefix="select"
          />

          {/* To Currency */}
          <label className="text-sm font-medium text-black">To Currency</label>
          <Select
            value={{ value: to, label: to }}
            onChange={(option) => {
              setTo(option.value);
              setShow(false);
            }}
            options={Object.keys(currencies).map((currency) => ({
              value: currency,
              label: currency,
            }))}
            className="basic-single  text-black"
            classNamePrefix="select"
          />
          {/* Convert Button */}
          <button
            onClick={convertCurrency}
            className="bg-gray-950 text-white p-2 rounded w-full hover:bg-gray-900"
          >
            Convert
          </button>

          {/* Converted Value */}
          {show && Number(amount) > 0 && (
            <p className="text-center font-semibold text-lg mt-2 text-black">
              {amount} {from} = {converted.toFixed(2)} {to}
            </p>
          )}
          {error && (
            <p className="text-center font-semibold text-sm  text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
      <div className="custom-shape-divider-top-1739206564">
        <svg
          dataName="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
  );
}
