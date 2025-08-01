import React, { useState } from 'react';
import { Search, Filter, Eye, EyeOff } from 'lucide-react';
import CompoundCard from './CompoundCard';
import { Compound } from '../data/compounds';

interface DiscoveryTabProps {
  compounds: Compound[];
  onCompoundClick: (compound: Compound) => void;
  onDragStart: (compound: Compound) => void;
  onDragEnd: () => void;
  onAddToFlask?: (compound: Compound) => void;
}

const DiscoveryTab: React.FC<DiscoveryTabProps> = ({ compounds, onCompoundClick, onDragStart, onDragEnd, onAddToFlask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDiscoveredOnly, setShowDiscoveredOnly] = useState(false);

  // Get unique categories
  const categories = ['All', ...new Set(compounds.map(c => c.category))];

  // Filter compounds
  const filteredCompounds = compounds.filter(compound => {
    const matchesSearch = compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         compound.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || compound.category === selectedCategory;
    const matchesDiscovered = !showDiscoveredOnly || compound.discovered;
    
    return matchesSearch && matchesCategory && matchesDiscovered;
  });

  // Calculate stats
  const totalCompounds = compounds.length;
  const discoveredCount = compounds.filter(c => c.discovered).length;
  const totalPoints = compounds.filter(c => c.discovered).reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="space-y-6">
      {/* Compound Inventory Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Compound Inventory ({discoveredCount}/{totalCompounds})</h2>
            <p className="text-sm text-muted-foreground">Drag compounds to the reaction beaker to create new substances</p>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search bar */}
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search compounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          {categories.map((category, index) => (
            <option key={`category-${index}`} value={category as string}>
              {category as string === 'All' ? 'All Categories' : category as string}
            </option>
          ))}
        </select>
        
        {/* Show discovered only toggle */}
        <button
          onClick={() => setShowDiscoveredOnly(!showDiscoveredOnly)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            showDiscoveredOnly
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {showDiscoveredOnly ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          {showDiscoveredOnly ? 'Discovered Only' : 'Show All'}
        </button>
      </div>

      {/* Compounds grid - matches the reference layout */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
        {filteredCompounds.map(compound => (
            <CompoundCard
              key={compound.id}
              compound={compound}
              onClick={onCompoundClick}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onAddToFlask={onAddToFlask}
            />
        ))}
      </div>

      {/* No results message */}
      {filteredCompounds.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-lg font-medium mb-2">No compounds found</div>
          <div className="text-sm">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryTab;