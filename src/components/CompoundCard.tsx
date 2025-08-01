import React, { useState } from 'react';
import { Lock, Sparkles, Plus, Zap } from 'lucide-react';
import { Compound } from '../data/compounds';

interface CompoundCardProps {
  compound: Compound;
  onDragStart?: (compound: Compound) => void;
  onDragEnd?: () => void;
  onClick?: (compound: Compound) => void;
  onAddToFlask?: (compound: Compound) => void;
  isInFlask?: boolean;
  isDragging?: boolean;
}

const CompoundCard: React.FC<CompoundCardProps> = ({ 
  compound, 
  onDragStart, 
  onDragEnd, 
  onClick, 
  onAddToFlask,
  isInFlask = false,
  isDragging = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { name, symbol, category, rarity, description, mw, points, discovered, synthesisHint } = compound;

  const getCategoryGradient = () => {
    switch (category.toLowerCase()) {
      case 'element':
        return discovered 
          ? 'from-blue-600 via-blue-500 to-cyan-500' 
          : 'from-gray-600 via-gray-500 to-gray-400';
      case 'acid':
        return discovered 
          ? 'from-red-600 via-red-500 to-pink-500' 
          : 'from-gray-600 via-gray-500 to-gray-400';
      case 'base':
        return discovered 
          ? 'from-green-600 via-green-500 to-emerald-500' 
          : 'from-gray-600 via-gray-500 to-gray-400';
      case 'salt':
        return discovered 
          ? 'from-purple-600 via-purple-500 to-violet-500' 
          : 'from-gray-600 via-gray-500 to-gray-400';
      case 'gas':
        return discovered 
          ? 'from-gray-600 via-slate-500 to-blue-400' 
          : 'from-gray-600 via-gray-500 to-gray-400';
      case 'organic':
        return discovered 
          ? 'from-emerald-600 via-green-500 to-teal-500' 
          : 'from-gray-600 via-gray-500 to-gray-400';
      case 'mineral':
        return discovered 
          ? 'from-cyan-600 via-blue-500 to-indigo-500' 
          : 'from-gray-600 via-gray-500 to-gray-400';
      default:
        return discovered 
          ? 'from-yellow-600 via-yellow-500 to-orange-500' 
          : 'from-gray-600 via-gray-500 to-gray-400';
    }
  };

  const getRarityGlow = () => {
    if (!discovered) return '';
    
    switch (rarity) {
      case 'uncommon':
        return 'shadow-lg shadow-blue-500/25';
      case 'rare':
        return 'shadow-lg shadow-purple-500/25 animate-pulse';
      case 'epic':
        return 'shadow-xl shadow-orange-500/30 animate-pulse';
      case 'legendary':
        return 'shadow-2xl shadow-red-500/40 animate-pulse';
      default:
        return 'shadow-md shadow-white/10';
    }
  };

  const getRarityBadge = () => {
    if (!discovered) return null;
    
    const badges = {
      'uncommon': { text: 'UNCOMMON', color: 'bg-blue-500/80 text-blue-100' },
      'rare': { text: 'RARE', color: 'bg-purple-500/80 text-purple-100' },
      'epic': { text: 'EPIC', color: 'bg-orange-500/80 text-orange-100' },
      'legendary': { text: 'LEGENDARY', color: 'bg-red-500/80 text-red-100' },
      'common': { text: 'COMMON', color: 'bg-gray-500/80 text-gray-100' }
    };
    
    const badge = badges[rarity] || badges.common;
    return (
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${badge.color} backdrop-blur-sm`}>
        {badge.text}
      </div>
    );
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (!discovered) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', compound.id);
    onDragStart?.(compound);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when dragging
    if (isDragging) return;
    
    if (discovered) {
      onClick?.(compound);
    }
  };

  const handleAddToFlask = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (discovered && onAddToFlask) {
      onAddToFlask(compound);
    }
  };

  return (
    <div
      className={`
        relative rounded-xl border-2 cursor-pointer transition-all duration-300 flask-cursor group
        bg-gradient-to-br ${getCategoryGradient()} ${getRarityGlow()}
        ${discovered 
          ? 'hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2' 
          : 'hover:scale-105 opacity-70'
        }
        ${isDragging ? 'opacity-50 dragging scale-95' : ''}
        ${isInFlask ? 'scale-90' : ''}
        ${isHovered ? 'shadow-2xl scale-105' : ''}
        backdrop-blur-sm border-white/20
      `}
      draggable={discovered}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Rarity badge */}
      {getRarityBadge()}

      {/* Lock indicator for undiscovered compounds */}
      {!discovered && (
        <div className="absolute top-2 left-2 bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
          <Lock className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Add to flask button for discovered compounds */}
      {discovered && onAddToFlask && (
        <button
          onClick={handleAddToFlask}
          className="absolute top-2 left-2 bg-green-500/80 hover:bg-green-400 rounded-full p-1.5 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      )}

      {/* Discovered glow effect */}
      {discovered && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-50" />
      )}

      <div className="relative p-4 text-center space-y-2">
        {/* Chemical Symbol */}
        <div className={`text-3xl font-bold ${discovered ? 'text-white drop-shadow-lg' : 'text-gray-300'}`}>
          {symbol}
        </div>

        {/* Compound Name */}
        <h3 className={`text-sm font-bold leading-tight ${discovered ? 'text-white drop-shadow-md' : 'text-gray-400'}`}>
          {name}
        </h3>

        {discovered ? (
          <>
            {/* Category pill */}
            <div className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-black/30 text-white backdrop-blur-sm">
              {category.toUpperCase()}
            </div>

            {/* Points with icon */}
            {points > 0 && (
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-yellow-300">
                <Sparkles className="w-3 h-3" />
                +{points} XP
              </div>
            )}

            {/* Quick action hint */}
            <div className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to view • Drag to react
            </div>
          </>
        ) : (
          <>
            {/* Synthesis hint for locked compounds */}
            <div className="mt-2 p-3 bg-black/40 rounded-lg backdrop-blur-sm">
              <p className="text-xs text-white/90 font-medium">
                🔬 {synthesisHint || 'Recipe unknown'}
              </p>
            </div>
            
            {/* Unlock hint */}
            <div className="text-xs text-white/60">
              Complete reactions to unlock
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompoundCard;