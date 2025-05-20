import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownItem {
  value: string;
  label: string;
}

interface Dropdown {
  name: string;
  label: string;
  items: DropdownItem[];
}

const dropdowns: Dropdown[] = [
  {
    name: 'price',
    label: 'Price',
    items: [
      { value: '', label: '0-10 $' },
      { value: '', label: '10-50 $' },
      { value: 'japan', label: 'Japan' },
      { value: 'germany', label: 'Germany' },
      { value: 'uk', label: 'United Kingdom' },

    ]
  },
  {
    name: 'brand',
    label: 'Brand',
    items: [
      { value: 'moetchandon', label: 'Moët & Chandon' },
      { value: 'domperignon', label: 'Dom Pérignon' },
      { value: 'veuveclicquot', label: 'Veuve Clicquot' },
      { value: 'crystalroederer', label: 'Louis Roederer Cristal' },
      { value: 'kruger', label: 'Krug' },
      { value: 'bollinger', label: 'Bollinger' },
      { value: 'taittinger', label: 'Taittinger' },
      { value: 'perrierjouet', label: 'Perrier-Jouët' },
      { value: 'lafite', label: 'Château Lafite Rothschild' },
      { value: 'latour', label: 'Château Latour' },
      { value: 'margaux', label: 'Château Margaux' },
      { value: 'petrus', label: 'Château Pétrus' },
      { value: 'romanee', label: 'Domaine de la Romanée-Conti' }
    ]
  },
  {
    name: 'abv',
    label: 'ABV',
    items: [
      { value: '0-20', label: '0-20%' },
      { value: '20-40', label: '20-40%' },
      { value: '40-99', label: '%40+' }
    ]
  }
];

const FilterForm: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial: Record<string, string[]> = {};
    dropdowns.forEach((dropdown) => {
      const values = params.getAll(`${dropdown.name}[]`);
      if (values.length > 0) {
        initial[dropdown.name] = values;
      }
    });
    setSelected(initial);
  }, []);

  const toggleValue = (dropdown: string, value: string) => {
    setSelected((prev) => {
      const current = prev[dropdown] || [];
      const exists = current.includes(value);
      const updated = exists ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [dropdown]: updated };
    });
  };

  const clearSearch = (dropdown: string) => {
    setSearch((prev) => ({ ...prev, [dropdown]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(selected).forEach(([key, values]) => {
      values.forEach((v) => params.append(`${key}[]`, v));
    });
    window.location.search = params.toString();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-wrap items-start gap-2 mb-4">
        {dropdowns.map((dropdown) => {
          const currentSearch = search[dropdown.name] || '';
          const filtered = dropdown.items.filter((item) =>
            item.label.toLowerCase().includes(currentSearch.toLowerCase())
          );
          const currentSelected = selected[dropdown.name] || [];
          const selectedLabel =
            currentSelected.length === 0
              ? dropdown.label
              : `${dropdown.label}: ${currentSelected.length}`;

          return (
            <div key={dropdown.name} className="relative w-full md:w-auto">
              {currentSelected.map((value) => (
                <input key={value} type="hidden" name={`${dropdown.name}[]`} value={value} />
              ))}

              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === dropdown.name ? null : dropdown.name)}
                className="inline-flex justify-between w-full bg-white rounded md:w-48 px-2 py-2 text-base text-stone-500 border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500"
              >
                <span className="truncate mx-2">{selectedLabel}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {openDropdown === dropdown.name && (
                <div className="absolute z-10 w-full mt-2 rounded bg-white ring-2 ring-rose-200 border border-rose-500">
                  <div className="relative">
                    <input
                      value={currentSearch}
                      onChange={(e) => setSearch({ ...search, [dropdown.name]: e.target.value })}
                      className="block w-full px-4 py-2 text-gray-800 rounded-t border-b focus:outline-none"
                      type="text"
                      placeholder={`Search for a ${dropdown.label.toLowerCase()}`}
                    />
                    {currentSearch && (
                      <button
                        type="button"
                        onClick={() => clearSearch(dropdown.name)}
                        className="absolute inset-y-0 right-2 flex items-center"
                      >
                        <svg className="h-4 w-4 text-gray-400 hover:text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filtered.map((item) => (
                      <div
                        key={item.value}
                        className={twMerge(
                          'block px-4 py-2 text-gray-700 hover:bg-rose-200 cursor-pointer',
                          currentSelected.includes(item.value) ? 'bg-rose-200' : 'bg-white'
                        )}
                        onClick={() => toggleValue(dropdown.name, item.value)}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            readOnly
                            checked={currentSelected.includes(item.value)}
                            className="w-4 h-4 border-gray-300 rounded"
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className="w-full md:w-auto inline-flex justify-center font-medium border border-rose-700 bg-rose-700 rounded px-8 py-2 text-base text-white hover:bg-rose-800"
        >
          Apply Filters
        </button>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {dropdowns.map((dropdown) =>
            (selected[dropdown.name] || []).map((value) => {
              const item = dropdown.items.find((i) => i.value === value);
              if (!item) return null;
              return (
                <span
                  key={`${dropdown.name}-${value}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-base bg-rose-100 text-rose-800"
                >
                  {item.label}
                  <button
                    type="button"
                    onClick={() => toggleValue(dropdown.name, value)}
                    className="ml-2 p-0.5 hover:bg-blue-200 rounded-full"
                  >
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              );
            })
          )}
        </div>
      </div>
    </form>
  );
};

export default FilterForm;