import React, { useEffect, useRef, useState } from 'react';

const CategoryFilterDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex p-4 relative" ref={dropdownRef}>
      {/* Toggle button */}
      <button
        onClick={toggleDropdown}
        className="text-black bg-cyan-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="button"
      >
        Filter by category
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute top-full left-0 z-100 mt-2 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </h6>
          <ul className="space-y-2 text-sm">
            {[
              'Apple',
              'Fitbit',
              'Dell',
              'Asus',
              'Logitech',
              'MSI',
              'Bosch',
              'Sony',
              'Samsung',
              'Canon',
              'Microsoft',
              'Razor',
            ].map((brand) => (
              <li className="flex items-center" key={brand}>
                <input
                  id={brand.toLowerCase()}
                  type="checkbox"
                  defaultChecked={['Asus', 'Logitech', 'MSI', 'Bosch', 'Samsung'].includes(brand)}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={brand.toLowerCase()}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  {brand} ({Math.floor(Math.random() * 200)})
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
