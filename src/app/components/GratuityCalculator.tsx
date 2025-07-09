"use client";
import React, { useState, useEffect } from "react";

const GratuityCalculator: React.FC = () => {
  const [lastDrawnSalary, setLastDrawnSalary] = useState(50000); // ₹50,000
  const [yearsOfService, setYearsOfService] = useState(5);
  const [monthsOfService, setMonthsOfService] = useState(0);
  const [gratuity, setGratuity] = useState(0);

  useEffect(() => {
    // If months >= 6, round up to next year as per Indian law
    let years = yearsOfService;
    if (monthsOfService >= 6) years += 1;
    // Gratuity formula: (Last drawn salary × 15 × years of service) / 26
    const amount = (lastDrawnSalary * 15 * years) / 26;
    setGratuity(Math.max(0, Math.floor(amount)));
  }, [lastDrawnSalary, yearsOfService, monthsOfService]);

  return (
    <section className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Gratuity Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Last Drawn Salary (Basic + DA) (₹)</label>
          <input
            type="number"
            min={1000}
            value={lastDrawnSalary}
            onChange={e => setLastDrawnSalary(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Years of Service</label>
            <input
              type="number"
              min={0}
              value={yearsOfService}
              onChange={e => setYearsOfService(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium text-gray-700 mb-1">Months</label>
            <input
              type="number"
              min={0}
              max={11}
              value={monthsOfService}
              onChange={e => setMonthsOfService(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 bg-pink-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-pink-800 mb-4">Results</h3>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Gratuity Amount:</span>
            <span className="font-bold text-pink-700">₹{gratuity.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">* As per Indian law, gratuity is calculated as (Last drawn salary × 15 × years of service) / 26. If months of service ≥ 6, it is rounded up to the next year.</p>
      </div>
    </section>
  );
};

export default GratuityCalculator; 