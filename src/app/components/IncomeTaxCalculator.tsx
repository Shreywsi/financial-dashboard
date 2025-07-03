"use client";
import { useState, useEffect } from "react";

type AgeGroup = "<60" | "60-80" | ">80";
type TaxRegime = "old" | "new";
type TaxpayerCategory = "individual" | "huf" | "other";
type ResidentialStatus = "resident" | "non-resident" | "nri";
type TaxBreakupItem = {
  slab: string;
  rate: string;
  amount: string;
  tax: string;
};

const TAX_SLABS_OLD = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250001, max: 500000, rate: 5 },
  { min: 500001, max: 1000000, rate: 20 },
  { min: 1000001, max: Infinity, rate: 30 }
];

const TAX_SLABS_NEW = [
  { min: 0, max: 300000, rate: 0 },
  { min: 300001, max: 600000, rate: 5 },
  { min: 600001, max: 900000, rate: 10 },
  { min: 900001, max: 1200000, rate: 15 },
  { min: 1200001, max: 1500000, rate: 20 },
  { min: 1500001, max: Infinity, rate: 30 }
];

const EXEMPTION_LIMITS: Record<AgeGroup, number> = {
  "<60": 250000,
  "60-80": 300000,
  ">80": 500000,
};

const ASSESSMENT_YEARS = ["2020-21", "2021-22", "2022-23", "2023-24", "2024-25"];

const IncomeTaxCalculator = () => {
  const [calculatorType, setCalculatorType] = useState<"basic" | "advanced">("basic");
  const [income, setIncome] = useState<number>(1000000);
  const [deductions, setDeductions] = useState<number>(100000);
  const [age, setAge] = useState<AgeGroup>("<60");
  const [taxRegime, setTaxRegime] = useState<TaxRegime>("old");
  const [assessmentYear, setAssessmentYear] = useState<string>("2023-24");
  const [taxpayerCategory, setTaxpayerCategory] = useState<TaxpayerCategory>("individual");
  const [residentialStatus, setResidentialStatus] = useState<ResidentialStatus>("resident");
  const [oldRegimeTax, setOldRegimeTax] = useState<number>(0);
  const [newRegimeTax, setNewRegimeTax] = useState<number>(0);
  const [taxBreakup, setTaxBreakup] = useState<TaxBreakupItem[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Income details
  const [salaryIncome, setSalaryIncome] = useState<number>(0);
  const [housePropertyIncome, setHousePropertyIncome] = useState<number>(0);
  const [capitalGainsIncome, setCapitalGainsIncome] = useState<number>(0);
  const [businessIncome, setBusinessIncome] = useState<number>(0);
  const [otherIncome, setOtherIncome] = useState<number>(0);

  // Advanced tax details
  const [tds, setTds] = useState<number>(0);
  const [advanceTax, setAdvanceTax] = useState<number>(0);
  const [interest234A, setInterest234A] = useState<number>(0);
  const [interest234B, setInterest234B] = useState<number>(0);
  const [interest234C, setInterest234C] = useState<number>(0);
  const [lateFilingFee, setLateFilingFee] = useState<number>(0);

  useEffect(() => {
    calculateTax();
  }, [income, age, taxRegime, deductions]);

  const calculateTax = () => {
    if (income <= 0) {
      setOldRegimeTax(0);
      setNewRegimeTax(0);
      setTaxBreakup([]);
      return;
    }

    const taxableIncomeOld = Math.max(0, income - EXEMPTION_LIMITS[age] - (taxRegime === "old" ? deductions : 0));
    const taxableIncomeNew = Math.max(0, income - EXEMPTION_LIMITS[age]);

    const oldTax = calculateTaxForRegime(taxableIncomeOld, TAX_SLABS_OLD);
    setOldRegimeTax(oldTax);

    const newTax = calculateTaxForRegime(taxableIncomeNew, TAX_SLABS_NEW);
    setNewRegimeTax(newTax);

    const currentSlabs = taxRegime === "old" ? TAX_SLABS_OLD : TAX_SLABS_NEW;
    const currentTaxableIncome = taxRegime === "old" ? taxableIncomeOld : taxableIncomeNew;
    setTaxBreakup(generateTaxBreakup(currentTaxableIncome, currentSlabs));
  };

  const calculateTaxForRegime = (taxableIncome: number, slabs: typeof TAX_SLABS_OLD) => {
    let taxPayable = 0;

    for (const slab of slabs) {
      if (taxableIncome <= slab.min) break;

      const slabAmount = Math.min(taxableIncome, slab.max) - slab.min;
      if (slabAmount <= 0) continue;

      taxPayable += (slabAmount * slab.rate) / 100;
    }

    return taxPayable + taxPayable * 0.04;
  };

  const generateTaxBreakup = (taxableIncome: number, slabs: typeof TAX_SLABS_OLD) => {
    let taxPayable = 0;
    const breakup: TaxBreakupItem[] = [];

    for (const slab of slabs) {
      if (taxableIncome <= slab.min) break;

      const slabAmount = Math.min(taxableIncome, slab.max) - slab.min;
      if (slabAmount <= 0) continue;

      const slabTax = (slabAmount * slab.rate) / 100;
      taxPayable += slabTax;

      breakup.push({
        slab: `${formatINR(slab.min + 1)} - ${slab.max === Infinity ? "Above" : formatINR(slab.max)}`,
        rate: `${slab.rate}%`,
        amount: formatINR(slabAmount),
        tax: formatINR(slabTax),
      });
    }

    const cess = taxPayable * 0.04;
    taxPayable += cess;

    breakup.push({
      slab: "Health & Education Cess",
      rate: "4%",
      amount: formatINR(taxPayable - cess),
      tax: formatINR(cess),
    });

    return breakup;
  };

  const formatINR = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const renderOptionButton = <T extends string>(
    value: T,
    currentValue: T,
    setValue: (val: T) => void,
    label: string,
    className?: string
  ) => (
    <button
      type="button"
      key={value}
      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
        currentValue === value
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
      } ${className}`}
      onClick={() => setValue(value)}
    >
      {label}
    </button>
  );

  const renderSelectField = (
    label: string,
    value: string,
    options: string[],
    onChange: (val: string) => void,
    required?: boolean
  ) => (
    <div>
      <label className="block text-gray-800 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={required}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const renderInputField = (
    label: string,
    value: number,
    onChange: (val: number) => void,
    placeholder?: string,
    required?: boolean
  ) => (
    <div>
      <label className="block text-gray-800 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        min="0"
        required={required}
      />
    </div>
  );

  const renderIncomeCard = (
    title: string,
    value: number,
    setValue: (val: number) => void,
    showDetailsButton?: boolean
  ) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-800">{title}</h4>
        {showDetailsButton && (
          <button className="text-blue-600 text-sm font-medium">
            Provide Income in detail
          </button>
        )}
      </div>
      <input
        type="number"
        value={value || ""}
        onChange={(e) => setValue(Number(e.target.value) || 0)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter amount"
        min="0"
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Income and Tax Calculator (India)
      </h1>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex-1 py-3 font-medium ${
            calculatorType === "basic"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setCalculatorType("basic")}
        >
          Basic Calculator
        </button>
        <button
          className={`flex-1 py-3 font-medium ${
            calculatorType === "advanced"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setCalculatorType("advanced")}
        >
          Advanced Calculator
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {renderSelectField(
            "Assessment Year *",
            assessmentYear,
            ASSESSMENT_YEARS,
            setAssessmentYear,
            true
          )}

          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Taxpayer Category *
            </label>
            <div className="flex gap-3">
              {renderOptionButton(
                "individual",
                taxpayerCategory,
                setTaxpayerCategory,
                "Individual"
              )}
              {renderOptionButton(
                "huf",
                taxpayerCategory,
                setTaxpayerCategory,
                "HUF"
              )}
              {renderOptionButton(
                "other",
                taxpayerCategory,
                setTaxpayerCategory,
                "Other"
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Your Age *
            </label>
            <div className="flex gap-3">
              {renderOptionButton(
                "<60",
                age,
                setAge,
                "Below 60 years (Regular Citizen)"
              )}
              {renderOptionButton(
                "60-80",
                age,
                setAge,
                "Between 60-80 years (Senior Citizen)"
              )}
              {renderOptionButton(
                ">80",
                age,
                setAge,
                "Above 80 years (Super Senior Citizen)"
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Residential Status *
            </label>
            <div className="flex gap-3">
              {renderOptionButton(
                "resident",
                residentialStatus,
                setResidentialStatus,
                "Resident"
              )}
              {renderOptionButton(
                "non-resident",
                residentialStatus,
                setResidentialStatus,
                "Non-Resident"
              )}
              {renderOptionButton(
                "nri",
                residentialStatus,
                setResidentialStatus,
                "NRI"
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Income Details
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {renderInputField(
              "Total Annual Income *",
              income,
              setIncome,
              "Enter total income",
              true
            )}

            {renderInputField(
              "Total Deductions",
              deductions,
              setDeductions,
              "Enter total deductions"
            )}
          </div>

          {calculatorType === "advanced" && (
            <>
              {renderIncomeCard(
                "Income under the head Salaries",
                salaryIncome,
                setSalaryIncome,
                true
              )}
              {renderIncomeCard(
                "Income under the head House Property",
                housePropertyIncome,
                setHousePropertyIncome,
                true
              )}
              {renderIncomeCard(
                "Income under the head Capital Gains",
                capitalGainsIncome,
                setCapitalGainsIncome,
                true
              )}
              {renderIncomeCard(
                "Income under the head Business or Profession",
                businessIncome,
                setBusinessIncome,
                true
              )}
              {renderIncomeCard(
                "Income under the head Other Sources",
                otherIncome,
                setOtherIncome,
                true
              )}
            </>
          )}
        </div>

        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Tax Regime *
          </label>
          <div className="flex gap-3">
            {renderOptionButton("old", taxRegime, setTaxRegime, "Old Tax Regime")}
            {renderOptionButton("new", taxRegime, setTaxRegime, "New Tax Regime")}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            TAX Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-800">Total Income:</span>
              <span className="font-medium text-green-600">{formatINR(income)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-800">Total Deductions:</span>
              <span className="font-medium text-green-600">{formatINR(deductions)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-800">
                Tax Amount (as per old Tax regime):
              </span>
              <span className="font-medium text-green-600">{formatINR(oldRegimeTax)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-800">
                Tax Amount (as per new Tax regime):
              </span>
              <span className="font-medium text-green-600">{formatINR(newRegimeTax)}</span>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
              >
                <span>View Comparison</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showComparison ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showComparison && (
                <div className="mt-3 bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    You save{" "}
                    <span className="font-bold text-green-600">
                      {formatINR(Math.abs(oldRegimeTax - newRegimeTax))}
                    </span>{" "}
                    if you opt for{" "}
                    {oldRegimeTax > newRegimeTax ? "New" : "Old"} Tax Regime.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {calculatorType === "advanced" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Tax Calculation Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-800">Tax at Normal Rates:</span>
                  <span className="font-medium text-green-600">
                    {formatINR(taxRegime === "old" ? oldRegimeTax : newRegimeTax)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-800">
                    Tax at Special Rates (Capital Gains, Lottery, etc.):
                  </span>
                  <span className="font-medium text-green-600">{formatINR(0)}</span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-800 font-medium">
                    Total Tax before Rebate:
                  </span>
                  <span className="font-medium text-green-600">
                    {formatINR(taxRegime === "old" ? oldRegimeTax : newRegimeTax)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-800">
                    Less: Tax Rebate u/s 87A:
                  </span>
                  <span className="font-medium text-green-600">
                    {age === "<60" ? formatINR(0) : "Not applicable"}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-800 font-medium">
                    Net Tax after Rebate:
                  </span>
                  <span className="font-medium text-green-600">
                    {formatINR(taxRegime === "old" ? oldRegimeTax : newRegimeTax)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-800">Add: Surcharge:</span>
                  <span className="font-medium text-green-600">{formatINR(0)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-800">
                    Add: Health & Education Cess:
                  </span>
                  <span className="font-medium text-green-600">
                    {formatINR(
                      ((taxRegime === "old" ? oldRegimeTax : newRegimeTax) * 0.04)
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-800 font-medium">
                    Total Tax on Income:
                  </span>
                  <span className="font-medium text-green-600">
                    {formatINR(taxRegime === "old" ? oldRegimeTax : newRegimeTax)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Tax Payments and Interest
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {renderInputField(
                    "TDS/TCS",
                    tds,
                    setTds,
                    "Enter TDS/TCS amount"
                  )}
                  {renderInputField(
                    "Self-Assessment Tax/ Advance Tax",
                    advanceTax,
                    setAdvanceTax,
                    "Enter advance tax amount"
                  )}
                  <button className="text-blue-600 text-sm font-medium text-left">
                    Provide details
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-800">
                      Balance Tax Payable / Refundable:
                    </span>
                    <span className="font-medium text-green-600">
                      {formatINR(
                        (taxRegime === "old" ? oldRegimeTax : newRegimeTax) -
                          tds -
                          advanceTax
                      )}
                    </span>
                  </div>

                  {renderInputField(
                    "Interest u/s 234A",
                    interest234A,
                    setInterest234A,
                    "Enter interest amount"
                  )}
                  {renderInputField(
                    "Interest u/s 234B",
                    interest234B,
                    setInterest234B,
                    "Enter interest amount"
                  )}
                  {renderInputField(
                    "Interest u/s 234C",
                    interest234C,
                    setInterest234C,
                    "Enter interest amount"
                  )}
                  {renderInputField(
                    "Fees for late filing of return u/s 234F",
                    lateFilingFee,
                    setLateFilingFee,
                    "Enter late filing fee"
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold mb-4 text-blue-800 border-b border-blue-200 pb-2">
                Total Tax and Interest payable
              </h2>
              <div className="flex justify-between">
                <span className="text-blue-800 font-medium">Total:</span>
                <span className="font-bold text-green-600 text-lg">
                  {formatINR(
                    (taxRegime === "old" ? oldRegimeTax : newRegimeTax) +
                      interest234A +
                      interest234B +
                      interest234C +
                      lateFilingFee
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <span>{showDetails ? "Hide" : "Show"} Tax Calculation Details</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                showDetails ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showDetails && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium text-gray-800">
                      Slab
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-800">
                      Rate
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-800">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-800">
                      Tax
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {taxBreakup.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{item.slab}</td>
                      <td className="py-3 px-4 text-gray-800">{item.rate}</td>
                      <td className="py-3 px-4 text-gray-800">{item.amount}</td>
                      <td className="py-3 px-4 text-green-600">{item.tax}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-semibold">
                    <td colSpan={3} className="py-3 px-4 text-right text-gray-800">
                      Total Tax Payable:
                    </td>
                    <td className="py-3 px-4 text-green-600 font-bold">
                      {formatINR(
                        taxRegime === "old" ? oldRegimeTax : newRegimeTax
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600 mt-6">
          <p>
            The above calculator is only to enable public to have a quick and an
            easy access to basic tax calculation and does not purport to give
            correct tax calculation in all circumstances. It is advised that for
            filing of returns the exact calculation may be made as per the
            provisions contained in the relevant Acts, Rules etc.
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
            Back
          </button>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-800">
              <input type="checkbox" className="rounded" />
              <span>Reset</span>
            </label>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Calculate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;