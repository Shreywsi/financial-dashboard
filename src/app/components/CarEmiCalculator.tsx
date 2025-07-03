"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, PieLabelRenderProps } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
const RADIAN = Math.PI / 180;

type ProcessingFeesType = "fixed" | "percentage";
type ChartData = {
  name: string;
  value: number;
};

export default function CarEmiCalculator() {
  // Loan parameters
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTenureYears, setLoanTenureYears] = useState(5);
  const [loanTenureMonths, setLoanTenureMonths] = useState(60);
  const [processingFees, setProcessingFees] = useState(3000);
  const [processingFeesType, setProcessingFeesType] = useState<ProcessingFeesType>("fixed");
  
  // Calculation results
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalProcessingFees, setTotalProcessingFees] = useState(0);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate EMI and related values
  useEffect(() => {
    const P = loanAmount;
    const r = interestRate / 1200; // Monthly interest rate
    const n = loanTenureMonths;
    
    // Calculate processing fees
    const calculatedProcessingFees = processingFeesType === "percentage" 
      ? (loanAmount * processingFees) / 100
      : processingFees;
    
    setTotalProcessingFees(calculatedProcessingFees);

    // EMI calculation
    const emiValue = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - P;
    
    setEmi(emiValue);
    setTotalInterest(totalInterestValue);
    setTotalPayment(totalPaymentValue);
    
    // Prepare chart data
    setChartData([
      { name: 'Principal', value: P },
      { name: 'Interest', value: totalInterestValue },
      { name: 'Processing Fees', value: calculatedProcessingFees }
    ]);
  }, [loanAmount, interestRate, loanTenureMonths, processingFees, processingFeesType]);

  // Synchronize years and months
  useEffect(() => {
    setLoanTenureMonths(loanTenureYears * 12);
  }, [loanTenureYears]);

  const handleTenureYearsChange = (value: number) => {
    setLoanTenureYears(value);
  };

  const handleTenureMonthsChange = (value: number) => {
    setLoanTenureMonths(value);
    setLoanTenureYears(value / 12);
  };

  // Custom label renderer for pie chart
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
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
        className="text-sm font-medium"
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
    showInput?: boolean
  ) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label className="text-gray-900 font-medium">{label}</label>
        {showInput ? (
          <div className="flex items-center">
            <input
              type="number"
              value={value}
              min={min}
              max={max}
              step={step}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-24 border rounded p-1 text-sm text-gray-900"
            />
            <span className="ml-1 text-gray-900">{unit}</span>
          </div>
        ) : (
          <span className="font-semibold text-gray-900">
            {value.toLocaleString()}{unit && ` ${unit}`}
          </span>
        )}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-300 rounded-lg accent-blue-600 cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-700 mt-1">
        <span>{min.toLocaleString()}{unit}</span>
        <span>{max.toLocaleString()}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Car Loan EMI Calculator</h1>
        <p className="text-gray-700">Plan your car purchase with accurate EMI calculations</p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 p-4 md:p-6 rounded-lg border border-gray-200 bg-white">
          {renderSlider(
            "Loan Amount", 
            loanAmount, 
            50000, 
            2000000, 
            10000, 
            "₹",
            setLoanAmount,
            true
          )}
          
          {renderSlider(
            "Interest Rate", 
            interestRate, 
            6, 
            20, 
            0.1, 
            "%",
            setInterestRate,
            true
          )}
          
          {renderSlider(
            "Loan Tenure (Years)", 
            loanTenureYears, 
            1, 
            8, 
            1, 
            "years",
            handleTenureYearsChange,
            true
          )}
          
          {renderSlider(
            "Loan Tenure (Months)", 
            loanTenureMonths, 
            12, 
            96, 
            1, 
            "months",
            handleTenureMonthsChange,
            true
          )}

          <div className="mb-6">
            <label className="block text-gray-900 font-medium mb-2">Processing Fees</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  value={processingFees}
                  onChange={(e) => setProcessingFees(Number(e.target.value))}
                  className="w-full border rounded p-2 text-gray-900"
                />
              </div>
              <div>
                <select
                  value={processingFeesType}
                  onChange={(e) => setProcessingFeesType(e.target.value as ProcessingFeesType)}
                  className="border rounded p-2 text-gray-900 w-full sm:w-auto"
                >
                  <option value="fixed">Fixed (₹)</option>
                  <option value="percentage">Percentage (%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Composition</h3>
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
                    formatter={(value, entry: any, index) => (
                      <span className="text-gray-900 text-sm">
                        {value}: {formatCurrency(entry.payload.value)}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="p-4 md:p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your EMI</h2>
            <div className="text-3xl font-bold text-blue-600">{formatCurrency(emi)}</div>
            <p className="text-gray-700 text-sm">Per month for {loanTenureMonths} months</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-900">Principal</span>
              <span className="font-medium text-gray-900">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-900">Interest</span>
              <span className="font-medium text-gray-900">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-900">Processing Fees</span>
              <span className="font-medium text-gray-900">{formatCurrency(totalProcessingFees)}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-900 font-semibold">Total Payment</span>
              <span className="font-bold text-green-600">{formatCurrency(totalPayment + totalProcessingFees)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="mt-8 bg-white p-4 md:p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">What is a Car Loan EMI Calculator?</h2>
        
        <div className="prose prose-gray max-w-none text-gray-800">
          <p>
            Nowadays, it is much easier to buy your dream car due to the various car loan schemes offered by different lenders. Car loans are offered at attractive interest rates and a repayment tenure of up to 8 years.
          </p>
          <p>
            Various banks and third-party websites offer a Car Loan EMI Calculator that allows you to calculate the Equated Monthly Instalments (EMIs) that must be paid. The Car Loan EMI calculator offered here is simple to use and free.
          </p>
          <p>
            Basic details such as the repayment tenure, principal amount, and the rate of interest must be entered to calculate the Car Loan EMI. You can make use of this calculator to estimate the amount you have to pay each month for your car loan.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-4 md:p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">How to Use the Car Loan EMI Calculator</h2>
        
        <div className="prose prose-gray max-w-none text-gray-800">
          <p>
            The procedure to use this Car Loan EMI calculator is simple:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Select your desired loan amount using the slider or input field</li>
            <li>Adjust the interest rate according to your lender's offer</li>
            <li>Set your preferred repayment tenure in years or months</li>
            <li>Enter any processing fees (fixed or percentage-based)</li>
            <li>View your results immediately in the right panel</li>
          </ol>
          <p>
            The calculator shows the principal amount, interest paid, and the outstanding balance breakdown.
          </p>
        </div>
      </div>
    </div>
  );
}