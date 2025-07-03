'use client';

import React from 'react';
import {
  Home,
  Briefcase,
  TrendingUp,
  LandPlot,
  Car,
  CircleDollarSign,
  GraduationCap,
  PiggyBank,
  HandCoins,
  ArrowRight,
  Search,
  Calculator,
  BarChart2,
  Shield,
  Percent
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Calculator {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  category: 'loans' | 'investments' | 'savings' | 'business';
}

// Data for the financial calculators
const calculators: Calculator[] = [
  {
    id: 'home-loan-emi',
    icon: Home,
    title: 'Home Loan EMI Calculator',
    description: 'Calculate monthly EMI for purchasing a house with detailed amortization',
    link: '/calculators/home-loan-emi',
    category: 'loans'
  },
  {
    id: 'personal-loan-emi',
    icon: Briefcase,
    title: 'Personal Loan EMI Calculator',
    description: 'Estimate repayment for personal loans with flexible tenure options',
    link: '/calculators/personal-loan-emi',
    category: 'loans'
  },
  {
    id: 'sip-investment',
    icon: TrendingUp,
    title: 'SIP Investment Calculator',
    description: 'Project returns from Systematic Investment Plans with inflation adjustment',
    link: '/calculators/sip-investment',
    category: 'investments'
  },
  {
    id: 'fixed-deposit-interest',
    icon: LandPlot,
    title: 'Fixed Deposit Calculator',
    description: 'Compute interest earned on fixed deposits with tax implications',
    link: '/calculators/fixed-deposit-interest',
    category: 'savings'
  },
  {
    id: 'car-loan-emi',
    icon: Car,
    title: 'Car Loan EMI Calculator',
    description: 'Determine EMI for car financing with down payment options',
    link: '/calculators/car-loan-emi',
    category: 'loans'
  },
  {
    id: 'gold-loan-eligibility',
    icon: CircleDollarSign,
    title: 'Gold Loan Calculator',
    description: 'Estimate loan value based on gold assets with LTV ratios',
    link: '/calculators/gold-loan-eligibility',
    category: 'loans'
  },
  {
    id: 'education-loan-emi',
    icon: GraduationCap,
    title: 'Education Loan Calculator',
    description: 'Plan student loan repayments with moratorium period options',
    link: '/calculators/education-loan-emi',
    category: 'loans'
  },
  {
    id: 'recurring-deposit',
    icon: PiggyBank,
    title: 'Recurring Deposit Calculator',
    description: 'Calculate maturity amount and interest on RD savings with premature withdrawal options',
    link: '/calculators/recurring-deposit',
    category: 'savings'
  },
  {
    id: 'mudra-loan-emi',
    icon: HandCoins,
    title: 'Mudra Loan Calculator',
    description: 'Compute business loan EMIs under government schemes with subsidy details',
    link: '/calculators/mudra-loan-emi',
    category: 'business'
  },
  {
    id: 'retirement-planning',
    icon: Shield,
    title: 'Retirement Planner',
    description: 'Project your retirement corpus needs based on current savings',
    link: '/calculators/retirement-planning',
    category: 'investments'
  },
  {
    id: 'tax-calculator',
    icon: Percent,
    title: 'Income Tax Calculator',
    description: 'Estimate your tax liability with all deductions and exemptions',
    link: '/calculators/tax-calculator',
    category: 'savings'
  },
  {
    id: 'compound-interest',
    icon: BarChart2,
    title: 'Compound Interest Calculator',
    description: 'Visualize how your investments grow over time with compounding',
    link: '/calculators/compound-interest',
    category: 'investments'
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Calculators', icon: Calculator },
  { id: 'loans', name: 'Loan Calculators', icon: HandCoins },
  { id: 'investments', name: 'Investment Tools', icon: TrendingUp },
  { id: 'savings', name: 'Savings Calculators', icon: PiggyBank },
  { id: 'business', name: 'Business Finance', icon: Briefcase },
];

// Header component
const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white pt-28 pb-16 px-4 md:px-8 lg:px-16 rounded-b-lg shadow-lg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          Financial Calculators
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
          Smart tools to help you plan loans, investments, savings, and more with precision
        </p>
      </div>
    </header>
  );
};

// Card component
const CalculatorCard: React.FC<Calculator> = ({ icon: Icon, title, description, link }) => {
  const router = useRouter();

  return (
    <div 
      className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-start h-full cursor-pointer"
      onClick={() => router.push(link)}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-499 to-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-md">
        <Icon className="text-blue-600 w-8 h-8 md:w-10 md:h-10" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-gray-600 mb-4 flex-grow text-base md:text-lg">
        {description}
      </p>
      <div className="mt-auto inline-flex items-center text-blue-600 hover:text-teal-400 font-semibold text-lg md:text-xl transition-colors duration-200 group">
        Calculate Now
        <ArrowRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </div>
  );
};

// Category Filter Component
const CategoryFilter: React.FC<{ 
  activeCategory: string;
  setActiveCategory: (category: string) => void 
}> = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map(({ id, name, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveCategory(id)}
          className={`flex items-center px-4 py-2 rounded-full transition-all duration-200 ${activeCategory === id 
            ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-md' 
            : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 shadow-sm'}`}
        >
          <Icon className="w-5 h-5 mr-2" />
          {name}
        </button>
      ))}
    </div>
  );
};

// Search Component
const SearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-2xl mx-auto mb-12 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for calculators..."
        className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg text-gray-900"
      />
    </div>
  );
};

// Page component
export default function Page() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCalculators = calculators.filter(calculator => {
    const matchesCategory = activeCategory === 'all' || calculator.category === activeCategory;
    const matchesSearch = calculator.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         calculator.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-sans antialiased">
      
      <Header />
      
      <main className="max-w-7xl mx-auto py-12 px-4 md:py-16 md:px-8 lg:py-20 lg:px-16">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        
        {filteredCalculators.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
            {filteredCalculators.map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                {...calculator}
              />
            ))}
          </section>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-12 h-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No calculators found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}