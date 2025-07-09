"use client";
import React, { useState } from "react";

// Example card data (replace or extend as needed)
const cards = [
  {
    id: 1,
    name: "HDFC Regalia Credit Card",
    issuer: "HDFC Bank",
    annualFee: "₹2,500",
    rewards: "4 points per ₹150 spent",
    rating: 4.2,
    benefits: ["Lounge access", "Dining discounts", "Travel insurance", "Fuel surcharge waiver"],
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/HDFC_Bank_Logo.svg"
  },
  {
    id: 2,
    name: "SBI Card Elite",
    issuer: "SBI",
    annualFee: "₹4,999",
    rewards: "2 points per ₹100 spent",
    rating: 4.0,
    benefits: ["Movie tickets", "Lounge access", "Golf benefits", "Concierge services"],
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/State_Bank_of_India_logo.svg"
  },
  {
    id: 3,
    name: "ICICI Platinum Chip Card",
    issuer: "ICICI Bank",
    annualFee: "₹500",
    rewards: "Reward points on retail spends",
    rating: 3.8,
    benefits: ["Fuel surcharge waiver", "EMI conversion", "Online shopping offers"],
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/ICICI_Bank_Logo.svg"
  },
  // Add more cards as needed
];

export default function CreditCardComparison() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  // Filtered cards by search
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase()) ||
    card.issuer.toLowerCase().includes(search.toLowerCase())
  );

  const selectedCards = cards.filter(card => selectedIds.includes(card.id));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Compare Credit Cards</h1>
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by card name or issuer..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Card selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {filteredCards.map(card => (
          <div
            key={card.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-lg bg-white flex flex-col items-center ${selectedIds.includes(card.id) ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"}`}
            onClick={() =>
              setSelectedIds(ids =>
                ids.includes(card.id)
                  ? ids.filter(id => id !== card.id)
                  : [...ids, card.id]
              )
            }
          >
            {card.image && <img src={card.image} alt={card.name} className="h-12 mb-2" />}
            <h2 className="font-semibold text-lg text-center mb-1">{card.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{card.issuer}</p>
            <p className="text-sm text-gray-600 mb-1">Annual Fee: {card.annualFee}</p>
            <p className="text-sm text-gray-600 mb-1">Rewards: {card.rewards}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{card.rating}</span>
            </div>
            <button
              className={`mt-4 px-4 py-2 rounded-lg text-white font-medium transition-colors ${selectedIds.includes(card.id) ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {selectedIds.includes(card.id) ? "Remove" : "Add to Compare"}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedCards.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="p-4 text-left">Feature</th>
                {selectedCards.map(card => (
                  <th key={card.id} className="p-4 text-center">{card.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 font-medium">Issuer</td>
                {selectedCards.map(card => (
                  <td key={card.id} className="p-4 text-center">{card.issuer}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium">Annual Fee</td>
                {selectedCards.map(card => (
                  <td key={card.id} className="p-4 text-center">{card.annualFee}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium">Rewards</td>
                {selectedCards.map(card => (
                  <td key={card.id} className="p-4 text-center">{card.rewards}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium">Rating</td>
                {selectedCards.map(card => (
                  <td key={card.id} className="p-4 text-center flex items-center justify-center">
                    <span className="text-yellow-400 mr-1">★</span>{card.rating}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium">Benefits</td>
                {selectedCards.map(card => (
                  <td key={card.id} className="p-4 text-center">
                    <ul className="list-disc list-inside text-sm text-left inline-block">
                      {card.benefits.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
              {/* Add more features as needed */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
