"use client";
import React, { useState, useEffect } from "react";

const GoldLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(100000); // ₹1 Lakh
  const [interestRate, setInterestRate] = useState(10.5); // in %
  const [tenure, setTenure] = useState(12); // in months

  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const monthlyInterestRate = interestRate / 12 / 100;
    const numberOfPayments = tenure;

    const emiCalc =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPay = emiCalc * numberOfPayments;
    const totalInt = totalPay - principal;

    setEmi(parseFloat(emiCalc.toFixed(2)));
    setTotalPayment(parseFloat(totalPay.toFixed(2)));
    setTotalInterest(parseFloat(totalInt.toFixed(2)));
  }, [loanAmount, interestRate, tenure]);

  return (
    <section className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-yellow-700 mb-6">Gold Loan EMI Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
          <input
            type="number"
            min={1000}
            max={5000000}
            step={1000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Interest Rate (% per annum)</label>
          <input
            type="number"
            min={5}
            max={24}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Tenure (months)</label>
          <input
            type="number"
            min={1}
            max={36}
            step={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">Results</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Monthly EMI:</span>
            <span className="font-bold text-yellow-700">₹{emi.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Payment:</span>
            <span className="font-bold text-gray-800">₹{totalPayment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Interest:</span>
            <span className="font-bold text-red-600">₹{totalInterest.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldLoanCalculator; 