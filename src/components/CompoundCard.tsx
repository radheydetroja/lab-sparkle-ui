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
  enableDrag?: boolean;
}

const CompoundCard: React.FC<CompoundCardProps> = ({ 
  compound, 
  onDragStart, 
  onDragEnd, 
  onClick, 
  onAddToFlask,
  isInFlask = false,
  isDragging = false,
  enableDrag = true
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
      if (enableDrag && onAddToFlask) {
        // In lab mode, clicking adds to flask
        onAddToFlask(compound);
      } else {
        // In elements mode or for details, show modal
        onClick?.(compound);
      }
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
        relative rounded-2xl border-2 cursor-pointer transition-all duration-500 flask-cursor group aspect-square
        bg-gradient-to-br ${getCategoryGradient()} ${getRarityGlow()}
        ${discovered 
          ? 'hover:scale-110 hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-1' 
          : 'hover:scale-105 opacity-70'
        }
        ${isDragging ? 'opacity-50 dragging scale-95' : ''}
        ${isInFlask ? 'scale-90' : ''}
        ${isHovered ? 'shadow-2xl scale-110 -translate-y-2' : ''}
        backdrop-blur-sm border-white/30 overflow-hidden
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:via-transparent before:to-white/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100
      `}
      draggable={enableDrag && discovered}
      onDragStart={enableDrag ? handleDragStart : undefined}
      onDragEnd={enableDrag ? onDragEnd : undefined}
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
      {discovered && onAddToFlask && enableDrag && (
        <button
          onClick={handleAddToFlask}
          className="absolute top-2 left-2 bg-green-500/80 hover:bg-green-400 rounded-full p-1.5 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      )}

      {/* Discovered glow effect and decorative elements */}
      {discovered && (
        <>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-50" />
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/40 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/40 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/40 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/40 rounded-br-2xl"></div>
        </>
      )}

      <div className="relative p-2 text-center flex flex-col h-full">
        {/* Chemical Symbol with decorative background */}
        <div className="relative flex-shrink-0 mb-2">
          <div className={`text-lg sm:text-xl font-black ${discovered ? 'text-white drop-shadow-2xl' : 'text-gray-300'} relative z-10`}>
            {symbol}
          </div>
          {discovered && (
            <div className="absolute inset-0 bg-white/10 rounded-full blur-xl scale-150 -z-10"></div>
          )}
        </div>

        {/* Compound Name */}
        <h3 className={`text-xs font-bold leading-tight ${discovered ? 'text-white drop-shadow-lg' : 'text-gray-400'} text-center px-1 line-clamp-2 min-h-[2rem] flex items-center justify-center mb-2`}>
          {name}
        </h3>

        {discovered ? (
          <div className="flex-1 flex flex-col justify-end space-y-2 min-h-[3rem]">
            {/* Category pill with enhanced styling */}
            <div className="inline-block text-xs font-bold px-2 py-1 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 shadow-lg mx-auto">
              {category.toUpperCase()}
            </div>

            {/* Points with icon and enhanced styling */}
            {points > 0 && (
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-yellow-300 bg-yellow-500/20 rounded-full px-2 py-0.5 backdrop-blur-sm border border-yellow-400/30 mx-auto">
                <Sparkles className="w-3 h-3 animate-pulse" />
                +{points}
              </div>
            )}

            {/* Quick action hint */}
            <div className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              {enableDrag ? 'Tap to add' : 'Tap to view'}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-end space-y-2">
            {/* Synthesis hint for locked compounds */}
            <div className="p-2 bg-black/50 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
              <p className="text-xs text-white/90 font-medium leading-relaxed line-clamp-2">
                🔬 {synthesisHint || 'Recipe unknown'}
              </p>
            </div>
            
            {/* Unlock hint */}
            <div className="text-xs text-white/70 font-medium mt-1">
              Unlock via reactions
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundCard;