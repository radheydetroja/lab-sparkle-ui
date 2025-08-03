import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Beaker, X, Zap } from 'lucide-react';
import { Compound } from '../data/compounds';

interface ReactionFlaskProps {
  onReaction: (compoundIds: string[]) => { success: boolean; message: string; discoveredCompound?: string };
  compounds: Compound[];
  playSound: (type: string) => void;
}

export interface ReactionFlaskRef {
  addToFlask: (compound: Compound) => void;
}

const ReactionFlask = forwardRef<ReactionFlaskRef, ReactionFlaskProps>(({ onReaction, compounds, playSound }, ref) => {
  const [droppedCompounds, setDroppedCompounds] = useState<Compound[]>([]);
  const [isReacting, setIsReacting] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  // Expose addToFlask function for tap-to-select via ref
  const addToFlask = (compound: Compound) => {
    setDroppedCompounds(prev => {
      // Allow multiple instances of the same compound
      return [...prev, compound];
    });
    playSound('drop'); // Play drop sound for tap-to-add
  };

  useImperativeHandle(ref, () => ({
    addToFlask
  }));

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const compoundId = e.dataTransfer.getData('text/plain');
    const compound = compounds.find(c => c.id === compoundId);
    
    if (compound) {
      addToFlask(compound);
    }
  };

  const removeCompound = (index: number) => {
    setDroppedCompounds(prev => prev.filter((_, i) => i !== index));
  };

  const clearFlask = () => {
    setDroppedCompounds([]);
  };

  const performReaction = () => {
    if (!canReact) return;

    setIsReacting(true);
    playSound('mix'); // Play mixing sound when starting reaction
    
    // Simulate reaction delay with bubbling sounds
    const bubbleInterval = setInterval(() => {
      playSound('bubble');
    }, 300);
    
    setTimeout(() => {
      clearInterval(bubbleInterval);
      const result = onReaction(droppedCompounds.map(c => c.id));
      
      if (result.success) {
        // Success - clear flask and show success animation
        setDroppedCompounds([]);
        playSound('reaction'); // Play success reaction sound
      } else {
        // Failure - shake animation
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
        playSound('error'); // Play error sound
      }
      
      setIsReacting(false);
    }, 1500);
  };

  const canReact = droppedCompounds.length >= 2;

  return (
    <div className="space-y-4">
      {/* Main Flask */}
      <div
        className={`
          relative w-full h-48 rounded-2xl border-2 border-dashed transition-all duration-300 flask-cursor
          bg-gradient-to-b from-purple-900/20 to-blue-900/20 backdrop-blur-sm
          ${droppedCompounds.length > 0 
            ? 'border-cyan-400 bg-gradient-to-b from-cyan-500/20 to-blue-500/20 shadow-lg shadow-cyan-500/25' 
            : 'border-white/30'
          }
          ${isReacting ? 'animate-pulse shadow-2xl shadow-purple-500/50' : ''}
          ${shakeError ? 'shake-animation' : ''}
          flex flex-col items-center justify-center
        `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {droppedCompounds.length === 0 ? (
          <div className="text-center">
            <Beaker className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
            <p className="text-white/80 font-medium">Drop or tap compounds to react</p>
            <p className="text-white/60 text-sm mt-1">Minimum 2 elements required</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 p-4 w-full max-h-44 overflow-y-auto">
            {droppedCompounds.map((compound, index) => (
              <div
                key={`${compound.id}-${index}`}
                className="flex items-center gap-2 bg-white/80 rounded-lg p-2 border"
              >
                <span className="font-bold text-lg">{compound.symbol}</span>
                <span className="text-sm flex-1">{compound.name}</span>
                <button
                  onClick={() => removeCompound(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={performReaction}
          disabled={!canReact || isReacting}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300
            ${canReact && !isReacting
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Zap className="w-5 h-5" />
          {isReacting ? 'Reacting...' : 'React!'}
        </button>
        
        {droppedCompounds.length > 0 && (
          <button
            onClick={clearFlask}
            className="px-4 py-3 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
          >
            Clear Flask
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-white/60">
        <p>Drag and drop or tap compounds to add them to the flask!</p>
        <p className="text-xs mt-1">You need at least 2 compounds to perform a reaction.</p>
      </div>
    </div>
  );
});

ReactionFlask.displayName = 'ReactionFlask';

export default ReactionFlask;