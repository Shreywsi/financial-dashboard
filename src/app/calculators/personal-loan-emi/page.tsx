"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  PieLabelRenderProps as RechartsPieLabelRenderProps,
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

export default function PersonalLoanEmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(12.0);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(3);
  const [loanTenureMonths, setLoanTenureMonths] = useState<number>(0);
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartData[]>([
    { name: "Principal", value: 0 },
    { name: "Interest", value: 0 },
  ]);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [showSchedule, setShowSchedule] = useState<boolean>(true);

  const formatINR = useCallback((value: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }, []);

  const generateAmortizationSchedule = useCallback((
    principal: number,
    monthlyRate: number,
    tenureMonths: number,
    emiValue: number
  ): void => {
    let balance = principal;
    const schedule: AmortizationRow[] = [];

    // Determine how many rows to display, aim for about 12-24 rows for readability
    const displayRowsTarget = 18; // Target number of rows for display
    const actualInterval = tenureMonths > displayRowsTarget ? Math.floor(tenureMonths / displayRowsTarget) : 1;
    const monthInterval = Math.max(1, actualInterval); // Ensure interval is at least 1

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emiValue - interestPayment;
      balance -= principalPayment;

      if (
        month === 1 || // First month
        month === tenureMonths || // Last month
        (month % monthInterval === 0 && month < tenureMonths) // Intermediate months
      ) {
        schedule.push({
          month,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(balance, 0),
        });
      }
    }

    // Add last month explicitly if not already included (handles cases where monthInterval skips the last month)
    if (tenureMonths > 0 && (schedule.length === 0 || schedule[schedule.length - 1].month !== tenureMonths)) {
        // Recalculate values for the true last month to ensure accuracy
        let finalBalance = principal;
        let finalInterest = 0;
        let finalPrincipal = 0;
        for (let m = 1; m <= tenureMonths; m++) {
            finalInterest = finalBalance * monthlyRate;
            finalPrincipal = emiValue - finalInterest;
            finalBalance -= finalPrincipal;
        }
        schedule.push({
            month: tenureMonths,
            principal: finalPrincipal,
            interest: finalInterest,
            balance: Math.max(finalBalance, 0),
        });
    }

    schedule.sort((a, b) => a.month - b.month);
    
    // Filter out potential duplicate last month entry if already added
    const uniqueSchedule = Array.from(new Map(schedule.map(item => [item.month, item])).values());

    setAmortizationSchedule(uniqueSchedule);
  }, []);

  useEffect(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 1200;
    const tenureMonthsTotal = loanTenureYears * 12 + loanTenureMonths; 

    if (tenureMonthsTotal === 0) { 
        setEmi(0);
        setTotalPayment(0);
        setTotalInterest(0);
        setChartData([
            { name: "Principal", value: principal },
            { name: "Interest", value: 0 },
        ]);
        setAmortizationSchedule([]);
        return;
    }

    let emiValue = 0;
    if (monthlyRate === 0) {
      emiValue = principal / tenureMonthsTotal;
    } else {
      emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonthsTotal)) /
        (Math.pow(1 + monthlyRate, tenureMonthsTotal) - 1);
    }
    
    const totalPay = emiValue * tenureMonthsTotal;
    const interest = totalPay - principal;

    setEmi(emiValue);
    setTotalPayment(totalPay);
    setTotalInterest(interest);
    setChartData([
      { name: "Principal", value: principal },
      { name: "Interest", value: interest },
    ]);

    generateAmortizationSchedule(principal, monthlyRate, tenureMonthsTotal, emiValue);
  }, [loanAmount, interestRate, loanTenureYears, loanTenureMonths, generateAmortizationSchedule]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: RechartsPieLabelRenderProps): React.JSX.Element => {
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return <></>;
    }

    const numCx = cx as number;
    const numCy = cy as number;
    const numInnerRadius = innerRadius as number;
    const numOuterRadius = outerRadius as number;

    const radius = numInnerRadius + (numOuterRadius - numInnerRadius) * 0.5;
    const x = numCx + radius * Math.cos(-midAngle * RADIAN); 
    const y = numCy + radius * Math.sin(-midAngle * RADIAN); 

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

  const renderSlider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    unit: string,
    onChange: (val: number) => void,
    formatFn?: (val: number) => string
  ): React.JSX.Element => (
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
        Personal Loan EMI Calculator
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderSlider("Loan Amount", loanAmount, 50000, 2500000, 10000, "₹", setLoanAmount, formatINR)}
            {renderSlider("Interest Rate", interestRate, 10, 25, 0.1, "%", setInterestRate)}
            {renderSlider("Loan Tenure (Years)", loanTenureYears, 0, 7, 1, "years", setLoanTenureYears)}
            {renderSlider("Additional Months", loanTenureMonths, 0, 11, 1, "months", setLoanTenureMonths)}
          </div>

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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(value: string, entry: any) => { // Type changed to 'any'
                      const payloadValue = entry.payload?.value ?? 0; // Safely access value
                      return (
                        <span className="text-gray-900 text-sm">
                          {value}: {formatINR(payloadValue)}
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

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
                  {loanTenureYears} years {loanTenureMonths > 0 && `${loanTenureMonths} months`}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Monthly EMI:</span>
                <span className="text-blue-600 font-semibold">{formatINR(emi)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-900">Total Interest:</span>
                <span className="text-gray-900">{formatINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-900 font-semibold">Total Payment:</span>
                <span className="text-green-600 font-semibold">{formatINR(totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-6 mt-12">
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Amortization Schedule</h2>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {amortizationSchedule.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatINR(row.principal)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatINR(row.interest)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatINR(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}