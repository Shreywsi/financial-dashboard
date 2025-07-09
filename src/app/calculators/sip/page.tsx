"use client";
import { useState, useEffect, useCallback } from "react"; // Added useCallback
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  PieLabelRenderProps,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F"];
const RADIAN = Math.PI / 180;

type ChartData = {
  name: string;
  value: number;
};

type SipGrowthRow = {
  year: number;
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
};

export default function SIPInvestmentCalculator() {
  // State for SIP parameters
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(12); // Annual rate in %
  const [investmentTenureYears, setInvestmentTenureYears] = useState<number>(10);
  const [investmentTenureMonths, setInvestmentTenureMonths] = useState<number>(0);

  // State for calculation results
  const [investedAmount, setInvestedAmount] = useState<number>(0);
  const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  // Initialized chartData with default values
  const [chartData, setChartData] = useState<ChartData[]>([
    { name: "Invested Amount", value: 0 },
    { name: "Estimated Returns", value: 0 },
  ]);
  const [sipGrowthSchedule, setSipGrowthSchedule] = useState<SipGrowthRow[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(true);

  // Format currency - wrapped in useCallback for stability
  const formatINR = useCallback((value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }, []); // No dependencies, so it's created once

  // Main calculation effect for SIP
  useEffect(() => {
    const p = monthlyInvestment; // Monthly investment
    const annualRate = expectedReturnRate / 100; // Convert % to decimal
    const monthlyRate = annualRate / 12; // Monthly return rate
    const totalMonths = investmentTenureYears * 12 + investmentTenureMonths;

    // Helper function for schedule generation, defined inside useEffect
    // This way it automatically "sees" the latest state values without needing useCallback dependencies
    const generateSIPGrowthSchedule = (
      currentMonthlyInvestment: number, // renamed parameter for clarity
      currentMonthlyRate: number,     // renamed parameter for clarity
      currentTotalMonths: number      // renamed parameter for clarity
    ): void => {
      const schedule: SipGrowthRow[] = [];
      let currentTotalValue = 0;
      let currentInvested = 0;

      for (let month = 1; month <= currentTotalMonths; month++) {
        currentTotalValue = currentTotalValue * (1 + currentMonthlyRate) + currentMonthlyInvestment;
        currentInvested += currentMonthlyInvestment;

        if (month % 12 === 0 || month === currentTotalMonths) { // Add yearly data or at the very end
          const year = Math.ceil(month / 12);
          schedule.push({
            year,
            investedAmount: currentInvested,
            estimatedReturns: currentTotalValue - currentInvested,
            totalValue: currentTotalValue,
          });
        }
      }
      setSipGrowthSchedule(schedule);
    };

    // Handle edge cases for zero investment or tenure
    if (totalMonths === 0 || p === 0) {
      setInvestedAmount(0);
      setEstimatedReturns(0);
      setTotalValue(0);
      setChartData([
        { name: "Invested Amount", value: 0 },
        { name: "Estimated Returns", value: 0 },
      ]);
      setSipGrowthSchedule([]);
      return;
    }

    // Calculate Future Value of SIP (assuming end of period payments)
    // FV = P * [((1 + r)^n - 1) / r]
    const futureValue = p * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate); // Changed 'let' to 'const'

    const totalInvested = p * totalMonths;
    const totalReturns = futureValue - totalInvested;

    setInvestedAmount(totalInvested);
    setEstimatedReturns(totalReturns);
    setTotalValue(futureValue);
    setChartData([
      { name: "Invested Amount", value: totalInvested },
      { name: "Estimated Returns", value: totalReturns },
    ]);

    generateSIPGrowthSchedule(p, monthlyRate, totalMonths);
  }, [monthlyInvestment, expectedReturnRate, investmentTenureYears, investmentTenureMonths]);

  // Pie chart label renderer
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps): JSX.Element => {
    // Add checks for undefined values, as Recharts can sometimes pass undefined
    if (
        cx === undefined || cy === undefined || midAngle === undefined ||
        innerRadius === undefined || outerRadius === undefined || percent === undefined
    ) {
        return <></>; // Return empty fragment if any critical prop is missing
    }

    // Ensure innerRadius and outerRadius are numbers, as they could be strings from Recharts
    const numInnerRadius = typeof innerRadius === 'string' ? parseFloat(innerRadius) : innerRadius;
    const numOuterRadius = typeof outerRadius === 'string' ? parseFloat(outerRadius) : outerRadius;

    const radius = numInnerRadius + (numOuterRadius - numInnerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Reusable slider component (no changes needed)
  const renderSlider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    unit: string,
    onChange: (val: number) => void,
    formatFn?: (val: number) => string
  ): JSX.Element => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1">
        <label className="font-medium text-gray-900">{label}</label>
        <div className="flex items-center">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-24 border rounded p-1 text-gray-900"
          />
          {unit && <span className="ml-1 text-gray-900">{unit}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>
          {formatFn ? formatFn(min) : min}
          {unit && ` ${unit}`}
        </span>
        <span>
          {formatFn ? formatFn(max) : max}
          {unit && ` ${unit}`}
        </span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
        SIP Investment Calculator
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Inputs and Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderSlider(
              "Monthly Investment",
              monthlyInvestment,
              500, // Min SIP amount
              100000, // Max SIP amount
              500,
              "₹",
              setMonthlyInvestment,
              formatINR
            )}
            {renderSlider(
              "Expected Return Rate",
              expectedReturnRate,
              1, // Min realistic return
              25, // Max optimistic return
              0.1,
              "%",
              setExpectedReturnRate
            )}
            {renderSlider(
              "Investment Tenure (Years)",
              investmentTenureYears,
              1, // Min 1 year
              40, // Max long-term investment
              1,
              "years",
              setInvestmentTenureYears
            )}
            {renderSlider(
              "Additional Months",
              investmentTenureMonths,
              0,
              11,
              1,
              "months",
              setInvestmentTenureMonths
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Investment Composition
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(value: string, entry: { payload: ChartData }) => ( // Fixed 'any'
                      <span className="text-gray-900 text-sm">
                        {value}: {formatINR(entry.payload.value)}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Investment Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Monthly Investment:</span>
                <span className="text-gray-900">{formatINR(monthlyInvestment)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Expected Return Rate:</span>
                <span className="text-gray-900">{expectedReturnRate}%</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Tenure:</span>
                <span className="text-gray-900">
                  {investmentTenureYears} years{" "}
                  {investmentTenureMonths > 0 && `${investmentTenureMonths} months`}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Total Invested Amount:</span>
                <span className="text-blue-600 font-semibold">
                  {formatINR(investedAmount)}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Estimated Returns:</span>
                <span className="text-gray-900">{formatINR(estimatedReturns)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-900 font-semibold">
                  Total Value:
                </span>
                <span className="text-green-600 font-semibold">
                  {formatINR(totalValue)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sections Below */}
        <div className="lg:col-span-3 space-y-6">
          {/* SIP Growth Schedule */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                SIP Growth Schedule (Yearly)
              </h2>
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                {showSchedule ? "Hide Details" : "Show More Details"}
              </button>
            </div>
            {showSchedule && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invested Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estimated Returns
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sipGrowthSchedule.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatINR(row.investedAmount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatINR(row.estimatedReturns)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatINR(row.totalValue)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* What is SIP Investment Section - Full width */}
          <div className="w-full bg-white p-8 rounded-lg border border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
                What is SIP Investment?
              </h2>
              <div className="prose prose-gray max-w-4xl mx-auto text-gray-800">
                <p className="mb-4 text-lg">
                  A Systematic Investment Plan (SIP) is a method of investing a fixed amount regularly (e.g., monthly) into a mutual fund scheme chosen by you. SIPs are popular because they allow investors to participate in the stock market without having to time it, benefiting from rupee cost averaging.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">How SIP Works</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">1</span>
                        <span>Invests a fixed amount at regular intervals (e.g., ₹5,000 every month).</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">2</span>
                        <span>Buys more units when prices are low and fewer when prices are high.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">3</span>
                        <span>Averages out the cost of investment over time (Rupee Cost Averaging).</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Key Benefits of SIP</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">1</span>
                        <span>**Discipline:** Encourages regular saving and investing.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">2</span>
                        <span>**Rupee Cost Averaging:** Reduces market timing risk.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">3</span>
                        <span>**Power of Compounding:** Returns earn returns, leading to significant wealth creation over long periods.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Did You Know?</h3>
                  <p className="text-gray-700">
                    An investment of ₹5,000 per month for 15 years at an expected 12% annual return can grow to over ₹25 lakhs, while your total invested amount would only be ₹9 lakhs&apos;! {/* Fixed unescaped apostrophe here */}
                  </p>
                </div>
                <p className="mt-4 text-lg">
                    SIPs are an ideal way for salaried individuals and new investors to build wealth over the long term, making financial goals like retirement planning, children&apos;s education, or buying a home achievable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}