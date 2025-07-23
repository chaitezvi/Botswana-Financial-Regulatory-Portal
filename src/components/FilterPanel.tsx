import React from 'react';
import { Filter, X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: {
    type: string;
    category: string;
    authority: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function FilterPanel({ isOpen, onToggle, filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const documentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'act', label: 'Acts' },
    { value: 'regulation', label: 'Regulations' },
    { value: 'policy', label: 'Policies' },
    { value: 'guideline', label: 'Guidelines' },
    { value: 'directive', label: 'Directives' },
    { value: 'form', label: 'Forms' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'banking', label: 'Banking' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'asset-management', label: 'Asset Management' },
    { value: 'microlending', label: 'Microlending' },
    { value: 'payment-systems', label: 'Payment Systems' },
    { value: 'general', label: 'General' }
  ];

  const authorities = [
    { value: 'all', label: 'All Authorities' },
    { value: 'BoB', label: 'Bank of Botswana' },
    { value: 'NBFIRA', label: 'NBFIRA' },
    { value: 'FIA', label: 'Financial Intelligence Agency' }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Regulatory Authority
          </label>
          <select
            value={filters.authority}
            onChange={(e) => onFilterChange('authority', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {authorities.map((authority) => (
              <option key={authority.value} value={authority.value}>
                {authority.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onClearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}