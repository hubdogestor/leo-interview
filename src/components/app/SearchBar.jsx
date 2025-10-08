// src/components/app/SearchBar.jsx
import React, { memo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

/**
 * Search bar component - Memoized for performance
 */
const SearchBar = memo(({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <Input
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500"
        aria-label="Search content"
      />
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;