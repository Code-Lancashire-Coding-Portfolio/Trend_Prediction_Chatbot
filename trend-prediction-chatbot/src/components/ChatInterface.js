'use client';

import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TrendChart from './TrendChart';

const ChatInterface = ({ companyContext, suggestedQuestions, selectedQuestion }) => {
  const [messages, setMessages] = useState([
    { 
      role: 'bot', 
      content: 'Hello! I can help predict business trends based on public data. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // This effect adds the handleChatQuestion function to the window object
  useEffect(() => {
    // @ts-ignore
    window.handleChatQuestion = (question) => {
      console.log("External question handler called:", question);
      setInput(question);
      setTimeout(() => handleSubmit({ preventDefault: () => {} }), 50);
    };
    
    return () => {
      // @ts-ignore
      delete window.handleChatQuestion;
    };
  }, []);

  // Watch for selectedQuestion changes
  useEffect(() => {
    if (selectedQuestion) {
      setInput(selectedQuestion);
      setTimeout(() => handleSubmit({ preventDefault: () => {} }), 50);
    }
  }, [selectedQuestion]);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    if (!input.trim()) return;

    // Store the current input value before clearing it
    const currentMessage = input;

    // Add user message
    const userMessage = { role: 'user', content: currentMessage };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Show typing indicator
    setIsTyping(true);

    try {
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          companyContext
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Hide typing indicator
      setIsTyping(false);
      
      // Add bot response
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: data.message,
        chartData: data.chartData
      }]);
      
      // Add promotional message after responses that include chart data
      if (data.chartData) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'bot', 
            content: "Unlock your potential for workplace innovation! Take our Innovation Health Check and receive a free report packed with practical tips on boosting innovation at work. Start now and take your first step towards a brighter, more innovative future!",
            isPromo: true
          }]);
        }, 1000);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Sorry, I encountered an error processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <div key={index}>
            <MessageBubble message={message} />
            {message.chartData && <TrendChart data={message.chartData} />}
          </div>
        ))}
        {isTyping && (
          <div className="flex space-x-2 p-3 max-w-[80%] bg-navy-light rounded-xl animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about future business trends..."
            className="input-field flex-1"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="btn-primary flex-shrink-0" 
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center space-x-1">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Sending</span>
              </span>
            ) : (
              <span>Send</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;