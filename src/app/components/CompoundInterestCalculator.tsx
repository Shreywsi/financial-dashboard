"use client";
import React, { useState, useEffect } from "react";

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(10000); // ₹10,000
  const [rate, setRate] = useState(7.5); // in % per annum
  const [years, setYears] = useState(5);
  const [compoundsPerYear, setCompoundsPerYear] = useState(4); // Quarterly

  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    // Compound Interest Formula: A = P * (1 + r/n)^(nt)
    const n = compoundsPerYear;
    const r = rate / 100;
    const t = years;
    const A = principal * Math.pow(1 + r / n, n * t);
    setMaturityAmount(parseFloat(A.toFixed(2)));
    setTotalInterest(parseFloat((A - principal).toFixed(2)));
  }, [principal, rate, years, compoundsPerYear]);

  return (
    <section className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Compound Interest Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Principal (₹)</label>
          <input
            type="number"
            min={100}
            max={10000000}
            step={100}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Interest Rate (% per annum)</label>
          <input
            type="number"
            min={1}
            max={20}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Time (years)</label>
          <input
            type="number"
            min={1}
            max={50}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Compounding Frequency</label>
          <select
            value={compoundsPerYear}
            onChange={(e) => setCompoundsPerYear(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Yearly</option>
            <option value={2}>Half-Yearly</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
          </select>
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

export default CompoundInterestCalculator; 