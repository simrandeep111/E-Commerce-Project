import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you with your shopping today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = { sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you find the perfect outfit!",
        "We have a great summer collection that just arrived.",
        "Would you like to know about our current promotions?",
        "Feel free to ask about sizes, materials, or shipping options.",
        "Our most popular items are selling fast. Let me know if you'd like to see them!"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { sender: 'bot', text: randomResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed z-40 bottom-6 right-6 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent/90 transition-all ${isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      
      {/* Chat window */}
      <div 
        className={`fixed z-50 bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-4'
        }`}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 bg-accent text-white rounded-t-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-medium">ASTON Assistant</h3>
              <p className="text-xs text-white/80">Online</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Chat messages */}
        <div className="p-4 h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`mb-3 max-w-[80%] ${
                message.sender === 'user' 
                  ? 'ml-auto bg-accent/10 text-primary rounded-t-lg rounded-bl-lg' 
                  : 'bg-gray-100 text-primary rounded-t-lg rounded-br-lg'
              } p-3 text-sm`}
            >
              {message.text}
            </div>
          ))}
        </div>
        
        {/* Chat input */}
        <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
          <div className="flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 rounded-l-lg px-4 py-2 text-sm focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded-r-lg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;