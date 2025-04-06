import React, { useState } from 'react';
import { Palmtree, MenuIcon, X, Plane, PlaneLanding, Sun, Moon } from 'lucide-react';
import Navigation from './components/Navigation';
import SimpleModel from './components/SimpleModel';
import AdvancedModel from './components/AdvancedModel';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModel, setActiveModel] = useState<'simple' | 'advanced'>('simple');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode
    ? 'from-gray-800 to-gray-900 text-white'
    : 'from-blue-50 to-indigo-100 text-gray-900';

  const cardClasses = isDarkMode
    ? 'bg-gray-800/50 border-gray-700/50'
    : 'bg-white/70 border-gray-200';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeClasses} font-poppins transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/70 border-gray-200'} backdrop-blur-sm border-b transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Palmtree className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`ml-2 text-xl font-semibold ${isDarkMode ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-transparent bg-clip-text`}>
                Nomadly
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'} transition-colors duration-200`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Navigation isDarkMode={isDarkMode} />
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-blue-100 text-blue-600'}`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={isDarkMode ? 'text-gray-100 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Navigation isDarkMode={isDarkMode} />
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative mb-8">
            <img
              src="https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?auto=format&fit=crop&w=2000&q=80"
              alt="Travel inspiration"
              className="w-full h-[400px] object-cover rounded-2xl"
            />
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-t from-gray-900/90' : 'bg-gradient-to-t from-indigo-900/80'} to-transparent rounded-2xl flex items-end justify-center pb-12`}>
              <div className="text-white px-4">
                <h1 className="text-5xl font-bold mb-4 animate-slide-down">
                  Life's Too Short for Ordinary Adventures
                </h1>
                <p className="text-xl animate-slide-up">
                  "While you're busy making excuses, others are busy making memories" - Unknown
                </p>
              </div>
            </div>
          </div>

          <p className="text-xl mb-8 animate-slide-up">
            Every moment spent not traveling is a story left untold. Don't let your dreams of exploration fade away – 
            let our AI craft your next extraordinary adventure.
          </p>
          
          {/* Model Toggle */}
          <div className={`inline-flex rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/70'} p-1 mb-12 shadow-lg animate-slide-up backdrop-blur-sm`}>
            <button
              onClick={() => setActiveModel('simple')}
              className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm transition-all duration-200 ${
                activeModel === 'simple'
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plane className="h-4 w-4" />
              Quick Escape
            </button>
            <button
              onClick={() => setActiveModel('advanced')}
              className={`inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm transition-all duration-200 ${
                activeModel === 'advanced'
                  ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PlaneLanding className="h-4 w-4" />
              Dream Journey
            </button>
          </div>
        </div>

        {/* Model Components */}
        <div className="transition-all duration-300 ease-in-out animate-fade-in">
          {activeModel === 'simple' ? (
            <SimpleModel isDarkMode={isDarkMode} />
          ) : (
            <AdvancedModel isDarkMode={isDarkMode} />
          )}
        </div>

        {/* End Quote */}
        <div className="mt-16 text-center animate-fade-in">
          <blockquote className={`text-xl italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            "Congratulations! You've reached the bottom of the page. While you're down here, 
            remember that scrolling through travel websites isn't quite the same as actually traveling. 
            Just saying... 😉" 
            <footer className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-2`}>
              - Your friendly Nomadly reminder
            </footer>
          </blockquote>
        </div>
      </main>
    </div>
  );
}

export default App;