import React, { useEffect, useRef, useState } from 'react';

const staticCategories = [
  { id: 1, name: 'Design' },
  { id: 2, name: 'Programming' },
  { id: 3, name: 'Marketing' },
  { id: 4, name: 'Photography' },
  { id: 5, name: 'Business' },
];

const CategoryFilterDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex p-4 relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-black bg-cyan-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Filter by category
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-100 mt-2 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
          <ul className="space-y-2 text-sm">
            {staticCategories.map((cat) => (
              <li className="flex items-center" key={cat.id}>
                <input
                  id={`category-${cat.id}`}
                  type="checkbox"
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`category-${cat.id}`}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryFilterDropdown;
