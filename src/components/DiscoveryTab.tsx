import React, { useState } from 'react';
import { Search, Filter, Eye, EyeOff } from 'lucide-react';
import CompoundCard from './CompoundCard';
import { Compound } from '../data/compounds';

interface DiscoveryTabProps {
  compounds: Compound[];
  onCompoundClick: (compound: Compound) => void;
  onDragStart: (compound: Compound) => void;
  onDragEnd: () => void;
}

const DiscoveryTab: React.FC<DiscoveryTabProps> = ({ compounds, onCompoundClick, onDragStart, onDragEnd }) => {
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
      {/* Header with stats */}
      <div className="bg-gradient-to-r from-lab-primary to-lab-secondary text-white p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Compound Discovery</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm opacity-90">Total Points</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{discoveredCount}</div>
            <div className="text-sm opacity-90">Compounds</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{Math.round((discoveredCount / totalCompounds) * 100)}%</div>
            <div className="text-sm opacity-90">Progress</div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${(discoveredCount / totalCompounds) * 100}%` }}
          />
        </div>
        <div className="text-center text-sm mt-2 opacity-90">
          Progress: {discoveredCount}/{totalCompounds} compounds discovered
        </div>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search compounds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lab-primary focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Category:</span>
          </div>
          
          {categories.map((category, index) => (
            <button
              key={`category-${index}`}
              onClick={() => setSelectedCategory(category as string)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-lab-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category as string}
            </button>
          ))}
          
          {/* Show discovered only toggle */}
          <button
            onClick={() => setShowDiscoveredOnly(!showDiscoveredOnly)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              showDiscoveredOnly
                ? 'bg-lab-accent text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {showDiscoveredOnly ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            Discovered Only
          </button>
        </div>
      </div>

      {/* Compounds grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCompounds.map(compound => (
          <CompoundCard
            key={compound.id}
            compound={compound}
            onClick={onCompoundClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
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