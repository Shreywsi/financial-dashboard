"use client";
import React, { useState, useEffect } from "react";

const NpsCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyContribution, setMonthlyContribution] = useState(5000); // ₹5,000
  const [expectedReturn, setExpectedReturn] = useState(10); // % per annum
  const [annuityRate, setAnnuityRate] = useState(6); // % per annum
  const [annuityPercent, setAnnuityPercent] = useState(40); // % of corpus to annuity

  const [projectedCorpus, setProjectedCorpus] = useState(0);
  const [monthlyPension, setMonthlyPension] = useState(0);
  const [lumpSum, setLumpSum] = useState(0);

  useEffect(() => {
    const years = retirementAge - currentAge;
    const n = years * 12;
    const r = expectedReturn / 12 / 100;
    // FV of monthly contributions (ordinary annuity)
    const corpus = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setProjectedCorpus(parseFloat(corpus.toFixed(2)));
    // Lump sum withdrawal
    const lump = corpus * (1 - annuityPercent / 100);
    setLumpSum(parseFloat(lump.toFixed(2)));
    // Monthly pension from annuity
    const annuityCorpus = corpus * (annuityPercent / 100);
    const monthly = (annuityCorpus * (annuityRate / 100)) / 12;
    setMonthlyPension(parseFloat(monthly.toFixed(2)));
  }, [currentAge, retirementAge, monthlyContribution, expectedReturn, annuityRate, annuityPercent]);

  return (
    <section className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-orange-700 mb-6">NPS Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Current Age</label>
          <input
            type="number"
            min={18}
            max={60}
            value={currentAge}
            onChange={e => setCurrentAge(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Retirement Age</label>
          <input
            type="number"
            min={currentAge + 1}
            max={70}
            value={retirementAge}
            onChange={e => setRetirementAge(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Monthly Contribution (₹)</label>
          <input
            type="number"
            min={500}
            value={monthlyContribution}
            onChange={e => setMonthlyContribution(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Expected Annual Return (%)</label>
          <input
            type="number"
            min={5}
            max={15}
            step={0.1}
            value={expectedReturn}
            onChange={e => setExpectedReturn(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Annuity Rate (% per annum)</label>
          <input
            type="number"
            min={4}
            max={10}
            step={0.1}
            value={annuityRate}
            onChange={e => setAnnuityRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">% Corpus to Annuity (min 40%)</label>
          <input
            type="number"
            min={40}
            max={100}
            step={1}
            value={annuityPercent}
            onChange={e => setAnnuityPercent(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
      <div className="mt-8 bg-orange-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">Results</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Projected Corpus at Retirement:</span>
            <span className="font-bold text-orange-700">₹{projectedCorpus.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Lump Sum Withdrawal:</span>
            <span className="font-bold text-green-700">₹{lumpSum.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Monthly Pension:</span>
            <span className="font-bold text-orange-700">₹{monthlyPension.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NpsCalculator; 