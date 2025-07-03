import IncomeTaxCalculator from "../../components/IncomeTaxCalculator";
import Head from "next/head";

export default function TaxCalculatorPage() {
  return (
    <>
      <Head>
        <title>Income Tax Calculator - My Financial App</title>
        <meta name="description" content="Calculate your income tax quickly and easily." />
      </Head>
      <div className="min-h-screen bg-gray-100 py-10">
        <IncomeTaxCalculator />
      </div>
    </>
  );
}
