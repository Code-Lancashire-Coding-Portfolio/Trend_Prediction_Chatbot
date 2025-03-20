'use client';

import Image from 'next/image';

const MessageBubble = ({ message }) => {
  const { role, content, isPromo, chartData } = message;
  
  // Function to render promo content with a link
  const renderPromoContent = () => {
    const beforeLink = "Unlock your potential for workplace innovation! Take our ";
    const linkText = "Innovation Health Check";
    const afterLink = " and receive a free report packed with practical tips on boosting innovation at work. Start now and take your first step towards a brighter, more innovative future!";
    
    return (
      <div className="promo-bubble message-container">
        <div className="flex items-center space-x-2 mb-2">
          <div className="relative w-5 h-5">
            <Image 
              src="/Emote_Happy.png" 
              alt="EyeQBot" 
              width={20} 
              height={20}
              className="object-contain"
            />
          </div>
          <span className="font-semibold text-white">EyeQBot Recommends</span>
        </div>
        <p className="mb-3">
          {beforeLink}
          <a 
            href="https://groundswellinnovation.co.uk/innovation-health-check/" 
            className="text-accent font-medium underline hover:text-accent/80" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
          {afterLink}
        </p>
        <a 
          href="https://groundswellinnovation.co.uk/innovation-health-check/" 
          className="btn-primary inline-flex items-center space-x-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Start Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    );
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4 message-container`}>
      {role === 'bot' && !isPromo && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <div className="w-8 h-8 bg-navy-light rounded-full flex items-center justify-center border border-white/20 shadow-sm">
            <Image 
              src="/Emote_Happy.png" 
              alt="Bot" 
              width={24} 
              height={24}
              className="object-contain"
            />
          </div>
        </div>
      )}
      
      {isPromo ? (
        renderPromoContent()
      ) : (
        <div className={role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
          {content}
        </div>
      )}
      
      {role === 'user' && (
        <div className="flex-shrink-0 ml-2 mt-1">
          <div className="w-8 h-8 bg-accent/80 rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;