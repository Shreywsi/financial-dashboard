import type { Metadata } from 'next';
import IncomeTaxCalculator from "../IncomeTaxCalculator";

export const metadata: Metadata = {
  title: "Income Tax Calculator - My Financial App",
  description: "Calculate your income tax quickly and easily.",
};

export default function TaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <IncomeTaxCalculator />
    </div>
  );
}