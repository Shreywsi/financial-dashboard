"use client";

import { useState } from "react";

type Card = {
  id: number;
  name: string;
  issuer: string;
  annualFee: string;
  rewards: string;
  eligibility: string;
  benefits: string[];
  image?: string;
  rating?: number;
  highlightFeature?: string;
};

const CARDS: Card[] = [
  {
    id: 1,
    name: "HDFC Regalia Credit Card",
    issuer: "HDFC Bank",
    annualFee: "₹2,500",
    rewards: "4 points per ₹150 spent",
    eligibility: "Income above ₹8L/year",
    benefits: ["Lounge access", "Dining discounts", "Travel insurance"],
    image: "/hdfc-regalia.png",
    rating: 4.2,
    highlightFeature: "Best for Travel"
  },
  {
    id: 2,
    name: "SBI Card Elite",
    issuer: "SBI",
    annualFee: "₹4,999",
    rewards: "2 points per ₹100 spent",
    eligibility: "Income above ₹10L/year",
    benefits: ["Movie tickets", "Lounge access", "Golf benefits"],
    image: "/sbi-elite.png",
    rating: 4.0,
    highlightFeature: "Premium Benefits"
  },
  {
    id: 3,
    name: "ICICI Platinum Chip Card",
    issuer: "ICICI Bank",
    annualFee: "₹500",
    rewards: "Reward points on retail spends",
    eligibility: "Salaried or self-employed",
    benefits: ["Fuel surcharge waiver", "EMI conversion"],
    image: "/icici-platinum.png",
    rating: 3.8,
    highlightFeature: "Low Annual Fee"
  },
];

const FEATURES = [
  { key: "issuer", label: "Bank/Issuer" },
  { key: "annualFee", label: "Annual Fee" },
  { key: "rewards", label: "Reward Rate" },
  { key: "eligibility", label: "Eligibility" },
  { key: "benefits", label: "Key Benefits" },
];

export default function CreditCardComparison() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  const selectedCards = CARDS.filter((card) => selectedIds.includes(card.id));
  const maxCompare = 3;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i + 10} className="text-gray-300">☆</span>);
    }
    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="text-center mb-8 bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-4xl font-bold text-black mb-3">
          Compare Credit Cards
        </h1>
        <p className="text-black text-lg">
          Find the perfect credit card by comparing features, rewards, and benefits
        </p>
        <div className="mt-4 text-sm text-black">
          Selected: {selectedIds.length}/{maxCompare} cards
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {CARDS.map((card) => (
          <article
            key={card.id}
            className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
              selectedIds.includes(card.id)
                ? "border-blue-500 ring-2 ring-blue-100"
                : "border-gray-200"
            }`}
          >
            <div className="p-6 border-b border-gray-100">
              {card.highlightFeature && (
                <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mb-3">
                  {card.highlightFeature}
                </div>
              )}

              {card.image && (
                <div className="h-16 mb-4 flex items-center justify-center">
                  <div className="w-20 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    {card.issuer}
                  </div>
                </div>
              )}

              <h2 className="text-xl font-bold text-black mb-2 leading-tight">{card.name}</h2>

              {card.rating && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(card.rating)}</div>
                  <span className="text-black text-sm font-medium">{card.rating}</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Annual Fee:</span>
                  <span className="text-black font-bold text-lg">{card.annualFee}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-black font-medium">Bank:</span>
                  <span className="text-black">{card.issuer}</span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => toggleExpand(card.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1"
                  aria-expanded={expandedCard === card.id}
                  aria-controls={`card-details-${card.id}`}
                >
                  {expandedCard === card.id ? "Hide Details" : "View Details"}
                  <span className={`transform transition-transform ${expandedCard === card.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {expandedCard === card.id && (
                  <div id={`card-details-${card.id}`} className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-black font-medium block mb-1">Rewards:</span>
                      <span className="text-black text-sm">{card.rewards}</span>
                    </div>

                    <div>
                      <span className="text-black font-medium block mb-1">Eligibility:</span>
                      <span className="text-black text-sm">{card.eligibility}</span>
                    </div>

                    <div>
                      <span className="text-black font-medium block mb-2">Key Benefits:</span>
                      <div className="grid grid-cols-1 gap-1">
                        {card.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-green-500 text-sm mt-0.5">✓</span>
                            <span className="text-black text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => toggleCard(card.id)}
                disabled={selectedIds.length >= maxCompare && !selectedIds.includes(card.id)}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedIds.includes(card.id)
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : selectedIds.length >= maxCompare
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {selectedIds.includes(card.id) ? "Remove from Comparison" : "Add to Compare"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedCards.length > 0 && (
        <section aria-labelledby="comparison-results" className="mb-10">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 id="comparison-results" className="text-2xl font-bold text-black">
                Side-by-Side Comparison
              </h2>
              <p className="text-black mt-1">Compare selected cards feature by feature</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Credit card comparison table</caption>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-bold text-black border-r border-gray-200">
                      Features
                    </th>
                    {selectedCards.map((card) => (
                      <th
                        key={card.id}
                        className="p-4 text-center font-bold text-black border-r border-gray-200 last:border-r-0"
                        scope="col"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-lg">{card.name}</div>
                          {card.rating && (
                            <div className="flex justify-center items-center gap-1">
                              <div className="flex text-sm">{renderStars(card.rating)}</div>
                              <span className="text-black text-sm">{card.rating}</span>
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {FEATURES.map((feature, index) => (
                    <tr key={feature.key} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <th scope="row" className="p-4 font-semibold text-black text-left border-r border-gray-200">
                        {feature.label}
                      </th>
                      {selectedCards.map((card) => (
                        <td key={`${card.id}-${feature.key}`} className="p-4 text-center border-r border-gray-200 last:border-r-0">
                          {feature.key === 'benefits' ? (
                            <div className="space-y-1">
                              {card.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center justify-center gap-2">
                                  <span className="text-green-500 text-sm">✓</span>
                                  <span className="text-black text-sm">{benefit}</span>
                                </div>
                              ))}
                            </div>
                          ) : feature.key === 'annualFee' ? (
                            <span className="font-bold text-black text-lg">
                              {card[feature.key as keyof Card] as string}
                            </span>
                          ) : (
                            <span className="text-black">
                              {card[feature.key as keyof Card] as string}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {selectedCards.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-black mb-2">
              Start Your Comparison
            </h3>
            <p className="text-black mb-4">
              Select 2 or more credit cards to compare their features, benefits, and find the best match for your needs.
            </p>
            <div className="text-sm text-black">
              Choose from {CARDS.length} available cards above
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
