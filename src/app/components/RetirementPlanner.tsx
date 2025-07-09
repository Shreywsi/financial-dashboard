"use client";
import React, { useState, useEffect } from "react";

const RetirementPlanner: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(200000); // ₹2 Lakh
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000); // ₹10,000
  const [expectedReturn, setExpectedReturn] = useState(10); // % per annum
  const [desiredCorpus, setDesiredCorpus] = useState(10000000); // ₹1 Crore

  const [projectedCorpus, setProjectedCorpus] = useState(0);
  const [gap, setGap] = useState(0);

  useEffect(() => {
    const years = retirementAge - currentAge;
    const n = years * 12;
    const r = expectedReturn / 12 / 100;
    // FV of current savings
    const fvCurrent = currentSavings * Math.pow(1 + r, n);
    // FV of monthly investments (ordinary annuity)
    const fvSIP = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const total = fvCurrent + fvSIP;
    setProjectedCorpus(parseFloat(total.toFixed(2)));
    setGap(parseFloat((desiredCorpus - total).toFixed(2)));
  }, [currentAge, retirementAge, currentSavings, monthlyInvestment, expectedReturn, desiredCorpus]);

  return (
    <section className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Retirement Planner</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Current Age</label>
          <input
            type="number"
            min={18}
            max={70}
            value={currentAge}
            onChange={e => setCurrentAge(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Retirement Age</label>
          <input
            type="number"
            min={currentAge + 1}
            max={80}
            value={retirementAge}
            onChange={e => setRetirementAge(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Current Savings (₹)</label>
          <input
            type="number"
            min={0}
            value={currentSavings}
            onChange={e => setCurrentSavings(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Monthly Investment (₹)</label>
          <input
            type="number"
            min={0}
            value={monthlyInvestment}
            onChange={e => setMonthlyInvestment(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Expected Annual Return (%)</label>
          <input
            type="number"
            min={1}
            max={20}
            step={0.1}
            value={expectedReturn}
            onChange={e => setExpectedReturn(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Desired Retirement Corpus (₹)</label>
          <input
            type="number"
            min={100000}
            value={desiredCorpus}
            onChange={e => setDesiredCorpus(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="mt-8 bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Results</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Projected Corpus at Retirement:</span>
            <span className="font-bold text-purple-700">₹{projectedCorpus.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Gap to Desired Corpus:</span>
            <span className={gap > 0 ? "font-bold text-red-600" : "font-bold text-green-700"}>
              {gap > 0 ? `₹${gap.toLocaleString()} short` : `Goal Achieved!`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetirementPlanner; 