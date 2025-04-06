import React, { useState } from 'react';
import { Calendar, Globe, Users, Wallet, Palmtree } from 'lucide-react';

interface SimpleModelProps {
  isDarkMode: boolean;
}

const SimpleModel = ({ isDarkMode }: SimpleModelProps) => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    travelers: '',
    budget: '',
    interests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
        <Palmtree className={`h-12 w-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mx-auto mb-4`} />
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Quick Escape Planner
        </h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          "Stop dreaming about your bucket list and start living it!"
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              <Globe className={`inline-block w-4 h-4 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Your Dream Destination
            </label>
            <select
              className={`w-full rounded-md border ${inputClasses} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            >
              <option value="">Choose your paradise</option>
              <option value="beach">Tropical Paradise</option>
              <option value="mountain">Mountain Sanctuary</option>
              <option value="city">Urban Adventure</option>
              <option value="countryside">Rural Retreat</option>
            </select>
          </div>

          <div className="group">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              <Calendar className={`inline-block w-4 h-4 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Time to Explore
            </label>
            <select
              className={`w-full rounded-md border ${inputClasses} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            >
              <option value="">Select your journey length</option>
              <option value="weekend">Weekend Escape</option>
              <option value="week">Week-long Adventure</option>
              <option value="twoWeeks">Two Weeks of Wonder</option>
              <option value="month">Extended Expedition</option>
            </select>
          </div>

          <div className="group">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              <Users className={`inline-block w-4 h-4 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Travel Companions
            </label>
            <select
              className={`w-full rounded-md border ${inputClasses} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              value={formData.travelers}
              onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
            >
              <option value="">Choose your company</option>
              <option value="solo">Solo Explorer</option>
              <option value="couple">Dynamic Duo</option>
              <option value="family">Family Adventure</option>
              <option value="group">Group Expedition</option>
            </select>
          </div>

          <div className="group">
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2`}>
              <Wallet className={`inline-block w-4 h-4 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              Adventure Budget
            </label>
            <select
              className={`w-full rounded-md border ${inputClasses} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            >
              <option value="">Select your investment</option>
              <option value="budget">Smart Explorer</option>
              <option value="moderate">Balanced Journey</option>
              <option value="luxury">Premium Experience</option>
              <option value="ultra">Ultimate Luxury</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white py-3 px-6 rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]`}
        >
          Start Your Adventure Now!
        </button>
      </form>
    </div>
  );
};

export default SimpleModel;