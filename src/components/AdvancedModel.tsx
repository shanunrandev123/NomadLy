import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface AdvancedModelProps {
  isDarkMode: boolean;
}

const AdvancedModel = ({ isDarkMode }: AdvancedModelProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Prompt submitted:', prompt);
  };

  const cardClasses = isDarkMode
    ? 'bg-gray-800/50 border-gray-700/50'
    : 'bg-white/70 border-gray-200';

  const inputClasses = isDarkMode
    ? 'border-gray-600 bg-gray-800/50 text-gray-100'
    : 'border-gray-300 bg-white/50 text-gray-900';

  return (
    <div className={`${cardClasses} backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-2xl mx-auto border`}>
      <div className="text-center mb-8">
        <Sparkles className={`h-12 w-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-4`} />
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Dream Journey Creator
        </h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          "Every day you wait is another adventure you'll never have"
        </p>
      </div>
      
      <div className="mb-8">
        <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-4`}>
          Your perfect adventure is waiting to be discovered. Don't let another moment slip away – 
          tell us your travel dreams, and watch them transform into reality.
        </p>
        <div className={`${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-100/70'} rounded-lg p-6 space-y-3`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            What's on your wanderlust wishlist?
          </p>
          <ul className={`list-disc list-inside ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
            <li>Those bucket-list destinations you keep dreaming about</li>
            <li>The perfect timing for your escape</li>
            <li>Experiences that will make incredible stories</li>
            <li>Your ideal mix of luxury and adventure</li>
            <li>The moments you don't want to miss</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            className={`w-full h-48 rounded-md border ${inputClasses} px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            placeholder="Example: I've always dreamed of watching the northern lights while staying in a glass igloo. I want to chase the aurora, try dog sledding, and experience the magic of the Arctic wilderness. Make it happen!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className={`absolute bottom-3 right-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
            Your adventure awaits...
          </div>
        </div>

        <button
          type="submit"
          className={`w-full ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-3 px-6 rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center`}
        >
          <Send className="w-5 h-5 mr-2" />
          Make Dreams Reality
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
          "Twenty years from now you will be more disappointed by the things you didn't do than by the ones you did do"
        </p>
      </div>
    </div>
  );
};

export default AdvancedModel;