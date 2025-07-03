"use client";
import { useState, useEffect } from "react";
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

type AmortizationRow = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
};

export default function HomeLoanEmiCalculator() {
  // State for loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(20);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(0);

  // State for calculation results
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(true);

  // Format currency
  const formatINR = (value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Main calculation effect
  useEffect(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 1200;
    const tenureMonths = loanTenureYears * 12 + loanTenureMonths;

    const emiValue =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const totalPay = emiValue * tenureMonths;
    const interest = totalPay - principal;

    setEmi(emiValue);
    setTotalPayment(totalPay);
    setTotalInterest(interest);
    setChartData([
      { name: "Principal", value: principal },
      { name: "Interest", value: interest },
    ]);

    generateAmortizationSchedule(principal, monthlyRate, tenureMonths, emiValue);
  }, [loanAmount, interestRate, loanTenureYears, loanTenureMonths]);

  // Generate amortization schedule
  const generateAmortizationSchedule = (
    principal: number,
    monthlyRate: number,
    tenureMonths: number,
    emiValue: number
  ): void => {
    let balance = principal;
    const schedule: AmortizationRow[] = [];

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;

      if (month === 1 || month === tenureMonths || month % 12 === 0) {
        schedule.push({
          month,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(balance, 0),
        });
      }
    }

    setAmortizationSchedule(schedule);
  };

  // Pie chart label renderer
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps): JSX.Element => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
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

  // Reusable slider component
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
        Home Loan EMI Calculator
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Inputs and Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderSlider(
              "Loan Amount",
              loanAmount,
              500000,
              20000000,
              50000,
              "₹",
              setLoanAmount,
              formatINR
            )}
            {renderSlider(
              "Interest Rate",
              interestRate,
              6,
              15,
              0.1,
              "%",
              setInterestRate
            )}
            {renderSlider(
              "Loan Tenure (Years)",
              loanTenureYears,
              0,
              30,
              1,
              "years",
              setLoanTenureYears
            )}
            {renderSlider(
              "Additional Months",
              loanTenureMonths,
              0,
              11,
              1,
              "months",
              setLoanTenureMonths
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Loan Composition
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
                    formatter={(value: string, entry: any) => (
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
              Loan Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Loan Amount:</span>
                <span className="text-gray-900">{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Interest Rate:</span>
                <span className="text-gray-900">{interestRate}%</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Tenure:</span>
                <span className="text-gray-900">
                  {loanTenureYears} years{" "}
                  {loanTenureMonths > 0 && `${loanTenureMonths} months`}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Monthly EMI:</span>
                <span className="text-blue-600 font-semibold">
                  {formatINR(emi)}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Total Interest:</span>
                <span className="text-gray-900">{formatINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-900 font-semibold">
                  Total Payment:
                </span>
                <span className="text-green-600 font-semibold">
                  {formatINR(totalPayment)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Sections Below */}
        <div className="lg:col-span-3 space-y-6">
          {/* Amortization Schedule */}
         <div className="bg-white p-6 rounded-lg border border-gray-200 text-center"> 
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Amortization Schedule
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
                        Month
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Principal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remaining Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {amortizationSchedule.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {row.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatINR(row.principal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatINR(row.interest)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatINR(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* What is Home Loan EMI Section - Full width */}
          <div className="w-full bg-white p-8 rounded-lg border border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
                What is Home Loan EMI?
              </h2>
              <div className="prose prose-gray max-w-4xl mx-auto text-gray-800">
                <p className="mb-4 text-lg">
                  An Equated Monthly Installment (EMI) is the fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month, allowing the loan to be fully paid off over the specified term.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">How EMI Works</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">1</span>
                        <span>Each EMI payment reduces both principal and interest</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">2</span>
                        <span>Early payments cover more interest than principal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">3</span>
                        <span>As the loan matures, principal repayment increases</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Key Factors</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">1</span>
                        <span>Loan amount significantly impacts EMI size</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">2</span>
                        <span>Interest rate determines your borrowing cost</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">3</span>
                        <span>Tenure affects both EMI amount and total interest</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Did You Know?</h3>
                  <p className="text-gray-700">
                    A 0.5% difference in interest rate on a ₹30 lakh loan for 20 years can save you over ₹2 lakh in total interest payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
