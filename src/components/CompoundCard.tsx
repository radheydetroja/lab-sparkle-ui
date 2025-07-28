import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { Compound } from '../data/compounds';

interface CompoundCardProps {
  compound: Compound;
  onDragStart?: (compound: Compound) => void;
  onDragEnd?: () => void;
  onClick?: (compound: Compound) => void;
  isInFlask?: boolean;
  isDragging?: boolean;
}

const CompoundCard: React.FC<CompoundCardProps> = ({ 
  compound, 
  onDragStart, 
  onDragEnd, 
  onClick, 
  isInFlask = false,
  isDragging = false 
}) => {
  const { name, symbol, category, rarity, description, mw, points, discovered, synthesisHint } = compound;

  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case 'element':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'acid':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'base':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'salt':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'gas':
        return 'bg-gray-100 border-gray-300 text-gray-800';
      case 'organic':
        return 'bg-emerald-100 border-emerald-300 text-emerald-800';
      case 'mineral':
        return 'bg-cyan-100 border-cyan-300 text-cyan-800';
      default:
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    }
  };

  const getRarityIndicator = () => {
    if (!discovered) return null;
    
    switch (rarity) {
      case 'uncommon':
        return <span className="text-xs font-bold text-blue-600">UNCOMMON</span>;
      case 'rare':
        return <span className="text-xs font-bold text-purple-600">RARE</span>;
      case 'epic':
        return <span className="text-xs font-bold text-orange-600">EPIC</span>;
      case 'legendary':
        return <span className="text-xs font-bold text-red-600">LEGENDARY</span>;
      default:
        return <span className="text-xs font-bold text-gray-600">COMMON</span>;
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (!discovered) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', compound.id);
    onDragStart?.(compound);
  };

  return (
    <div
      className={`
        relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-300
        ${discovered ? getCategoryColor() : 'bg-gray-100 border-gray-300 opacity-60'}
        ${discovered ? 'hover:scale-105 hover:shadow-lg' : 'cursor-not-allowed'}
        ${isDragging ? 'opacity-50' : ''}
        ${isInFlask ? 'scale-90' : ''}
        ${discovered ? 'transform hover:-translate-y-1' : ''}
      `}
      draggable={discovered}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={() => discovered && onClick?.(compound)}
    >
      {/* Discovered indicator */}
      {discovered && (
        <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}

      {/* Lock overlay for undiscovered compounds */}
      {!discovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500/20 rounded-lg backdrop-blur-sm">
          <Lock className="w-6 h-6 text-gray-500" />
        </div>
      )}

      <div className="text-center space-y-1">
        {/* Chemical Symbol */}
        <div className={`text-2xl font-bold ${discovered ? 'text-gray-800' : 'text-gray-400'}`}>
          {symbol}
        </div>

        {/* Compound Name */}
        <h3 className={`text-sm font-semibold leading-tight ${discovered ? 'text-gray-800' : 'text-gray-500'}`}>
          {name}
        </h3>

        {/* Rarity indicator */}
        <div className="h-4">
          {getRarityIndicator()}
        </div>

        {discovered ? (
          <>
            {/* Category pill */}
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
              {category}
            </div>

            {/* Points */}
            {points > 0 && (
              <div className="text-xs font-bold text-green-600">
                +{points} pts
              </div>
            )}
          </>
        ) : (
          <>
            {/* Synthesis hint for locked compounds */}
            <div className="mt-2 p-2 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-600 italic">
                💡 {synthesisHint || 'Recipe unknown'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompoundCard;