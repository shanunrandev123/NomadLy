import React from 'react';
import { Home, Mail, BookOpen } from 'lucide-react';

interface NavigationProps {
  isDarkMode: boolean;
}

const Navigation = ({ isDarkMode }: NavigationProps) => {
  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Documentation', icon: BookOpen },
    { name: 'Contact', icon: Mail },
  ];

  return (
    <div className="flex md:flex-row flex-col">
      {navItems.map((item) => (
        <a
          key={item.name}
          href="#"
          className={`flex items-center px-3 py-2 text-sm font-medium ${
            isDarkMode
              ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
          } rounded-md transition-colors duration-200`}
        >
          <item.icon className="h-4 w-4 mr-2" />
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default Navigation;