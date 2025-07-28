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

  const getRarityClass = () => {
    if (!discovered) return 'compound-card-locked';
    
    switch (rarity) {
      case 'rare':
        return 'compound-card-rare';
      case 'epic':
        return 'compound-card-epic';
      case 'legendary':
        return 'compound-card-legendary';
      default:
        return 'compound-card-discovered';
    }
  };

  const getRarityColor = () => {
    switch (rarity) {
      case 'rare':
        return 'text-purple-600';
      case 'epic':
        return 'text-yellow-600';
      case 'legendary':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
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
        relative p-4 rounded-xl cursor-pointer transition-all duration-300 
        ${getRarityClass()}
        ${discovered ? 'hover:scale-105 hover:shadow-xl' : 'cursor-not-allowed'}
        ${isDragging ? 'opacity-50' : ''}
        ${isInFlask ? 'scale-90' : ''}
      `}
      draggable={discovered}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={() => discovered && onClick?.(compound)}
    >
      {/* Lock overlay for undiscovered compounds */}
      {!discovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500/20 rounded-xl backdrop-blur-sm">
          <Lock className="w-8 h-8 text-gray-500" />
        </div>
      )}

      {/* Rarity sparkle indicator */}
      {discovered && rarity !== 'common' && (
        <div className="absolute top-2 right-2">
          <Sparkles className={`w-4 h-4 ${getRarityColor()}`} />
        </div>
      )}

      <div className="text-center">
        {/* Chemical Symbol */}
        <div className={`text-3xl font-bold mb-2 ${discovered ? 'text-primary' : 'text-gray-400'}`}>
          {symbol}
        </div>

        {/* Compound Name */}
        <h3 className={`text-lg font-semibold mb-1 ${discovered ? 'text-foreground' : 'text-gray-500'}`}>
          {name}
        </h3>

        {/* Category */}
        <p className={`text-sm mb-2 ${discovered ? 'text-muted-foreground' : 'text-gray-400'}`}>
          {category}
        </p>

        {discovered ? (
          <>
            {/* Molecular Weight */}
            <p className="text-xs text-muted-foreground mb-1">
              MW: {mw}
            </p>

            {/* Points */}
            <div className="flex items-center justify-center gap-1">
              <span className="text-xs text-muted-foreground">Points:</span>
              <span className="text-sm font-bold text-lab-accent">+{points}</span>
            </div>

            {/* Rarity indicator */}
            {rarity !== 'common' && (
              <div className={`mt-2 text-xs font-medium ${getRarityColor()}`}>
                {rarity.toUpperCase()}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Synthesis hint for locked compounds */}
            <div className="mt-2 p-2 bg-gray-100 rounded-md">
              <p className="text-xs text-gray-600 italic">
                {synthesisHint || 'Recipe unknown'}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompoundCard;