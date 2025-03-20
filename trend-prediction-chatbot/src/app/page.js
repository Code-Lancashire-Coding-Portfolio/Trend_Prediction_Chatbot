'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ChatInterface from '../components/ChatInterface';
import SuggestedQuestions from '../components/SuggestedQuestions';

export default function Home() {
  const [companyContext, setCompanyContext] = useState({
    industry: 'Technology',
    location: 'London',
    size: 'Medium'
  });
  
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const chatInterfaceRef = useRef(null);
  
  const suggestedQuestions = [
    "How will population trends affect technology recruitment in London by 2027?",
    "What skills will be in highest demand in the tech sector over the next 5 years?",
    "Which UK regions should we consider for expansion based on workforce availability?",
    "What age demographic changes will impact our hiring pool by 2028?"
  ];

  const handleQuestionClick = (question) => {
    console.log("Question clicked from sidebar:", question);
    
    // @ts-ignore
    if (window.handleChatQuestion) {
      // @ts-ignore
      window.handleChatQuestion(question);
    } else {
      setSelectedQuestion(question);
    }
  };

  return (
    <div className="container mx-auto px-4 relative py-6">
      {/* Header with proper alignment */}
      <header className="w-full bg-navy mb-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative w-32 h-32 py-8">
              <Image 
                src="/Groundswell_Logo_Glasses_White.png" 
                alt="EyeQBot Logo" 
                width={180} 
                height={180}
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              EyeQBot <span className="text-gray-300 mx-1">·</span> Business Trends Predictor
            </h1>
            <p className="text-gray-300 text-sm mt-1">
              Ask questions about future business trends based on public data
            </p>
          </div>
        </div>
      </header>

      <div className="bg-navy-light panel p-6 mb-8 transition-all hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-5 text-white">Company Context</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="industry" className="block mb-2 font-medium text-white/90">Industry:</label>
            <select 
              id="industry" 
              className="w-full p-2 pl-4 pr-10 border border-white/20 rounded-md bg-navy text-white appearance-none"
              value={companyContext.industry}
              onChange={(e) => setCompanyContext({...companyContext, industry: e.target.value})}
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px'
              }}
            >
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Retail">Retail</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="location" className="block mb-2 font-medium text-white/90">Location:</label>
            <select 
              id="location" 
              className="w-full p-2 pl-4 pr-10 border border-white/20 rounded-md bg-navy text-white appearance-none"
              value={companyContext.location}
              onChange={(e) => setCompanyContext({...companyContext, location: e.target.value})}
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px'
              }}
            >
              <option value="London">London</option>
              <option value="Manchester">Manchester</option>
              <option value="Birmingham">Birmingham</option>
              <option value="Edinburgh">Edinburgh</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="size" className="block mb-2 font-medium text-white/90">Company Size:</label>
            <select 
              id="size" 
              className="w-full p-2 pl-4 pr-10 border border-white/20 rounded-md bg-navy text-white appearance-none"
              value={companyContext.size}
              onChange={(e) => setCompanyContext({...companyContext, size: e.target.value})}
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px'
              }}
            >
              <option value="Small">Small (1-49)</option>
              <option value="Medium">Medium (50-249)</option>
              <option value="Large">Large (250+)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="md:col-span-1">
    <div className="h-[600px] bg-navy-light backdrop-blur-sm border border-white/10 rounded-xl shadow-md overflow-hidden">
      <SuggestedQuestions 
        questions={suggestedQuestions} 
        onQuestionClick={handleQuestionClick}
      />
    </div>
  </div>
  <div className="md:col-span-2">
    <div className="h-[600px] bg-navy-light backdrop-blur-sm border border-white/10 rounded-xl shadow-md overflow-hidden">
      <ChatInterface 
        companyContext={companyContext}
        suggestedQuestions={suggestedQuestions}
        selectedQuestion={selectedQuestion}
      />
    </div>
  </div>
</div>

<footer className="text-center py-6 border-t border-white/10 text-white/60 mt-8">
  <p>Powered by ONS Public Data Sources · {new Date().getFullYear()}</p>
</footer>
    </div>
  );
}