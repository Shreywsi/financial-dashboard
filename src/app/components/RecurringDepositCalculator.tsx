"use client";
import React, { useState, useEffect } from "react";

const RecurringDepositCalculator: React.FC = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000); // ₹5,000
  const [rate, setRate] = useState(6.5); // in % per annum
  const [tenure, setTenure] = useState(12); // in months

  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    // RD Maturity Formula: M = P * n + P * n(n+1)/2 * r/(12*100)
    // Where P = monthly deposit, n = number of months, r = annual interest rate
    const P = monthlyDeposit;
    const n = tenure;
    const r = rate;
    const maturity = P * n + (P * n * (n + 1) / 2) * (r / (12 * 100));
    setMaturityAmount(parseFloat(maturity.toFixed(2)));
    setTotalInterest(parseFloat((maturity - P * n).toFixed(2)));
  }, [monthlyDeposit, rate, tenure]);

  return (
    <section className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Recurring Deposit Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Monthly Deposit (₹)</label>
          <input
            type="number"
            min={100}
            max={100000}
            step={100}
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Interest Rate (% per annum)</label>
          <input
            type="number"
            min={1}
            max={15}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Tenure (months)</label>
          <input
            type="number"
            min={6}
            max={120}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Results</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Maturity Amount:</span>
            <span className="font-bold text-blue-700">₹{maturityAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Interest Earned:</span>
            <span className="font-bold text-green-700">₹{totalInterest.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecurringDepositCalculator; 