'use client';

const SuggestedQuestions = ({ questions, onQuestionClick }) => {
  const handleClick = (question) => {
    console.log("Button clicked with question:", question);
    
    // @ts-ignore
    if (window.handleChatQuestion) {
      // @ts-ignore
      window.handleChatQuestion(question);
    }
    
    if (onQuestionClick) {
      onQuestionClick(question);
    }
  };

  return (
    <div className="bg-navy-light border border-white/10 rounded-xl shadow-md p-6 h-full">
      <h3 className="text-lg font-semibold mb-4 text-white">Suggested Questions</h3>
      <ul className="space-y-3">
        {questions.map((question, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(question)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(question);
                }
              }}
              className="w-full text-left p-4 bg-accent/80 hover:bg-navy-light border border-white/10 rounded-lg transition-all hover:shadow-md hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-accent/50 text-white/90"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedQuestions;