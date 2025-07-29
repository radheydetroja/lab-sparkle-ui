import React, { useState } from 'react';
import { Beaker, Plus, X } from 'lucide-react';
import CompoundCard from './CompoundCard';
import { Compound } from '../data/compounds';

interface ReactionFlaskProps {
  onReaction: (compoundIds: string[]) => { success: boolean; product?: Compound };
  compounds: Compound[];
}

const ReactionFlask: React.FC<ReactionFlaskProps> = ({ onReaction, compounds }) => {
  const [droppedCompounds, setDroppedCompounds] = useState<Compound[]>([]);
  const [isReacting, setIsReacting] = useState(false);
  const [shakeError, setShakeError] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const compoundId = e.dataTransfer.getData('text/plain');
    const compound = compounds.find(c => c.id === compoundId);
    
    if (compound) {
      setDroppedCompounds(prev => [...prev, compound]);
    }
  };

  const removeCompound = (index: number) => {
    setDroppedCompounds(prev => prev.filter((_, i) => i !== index));
  };

  const clearFlask = () => {
    setDroppedCompounds([]);
  };

  const performReaction = () => {
    if (droppedCompounds.length < 2) return;

    setIsReacting(true);
    
    // Simulate reaction delay
    setTimeout(() => {
      const result = onReaction(droppedCompounds.map(c => c.id));
      
      if (result.success) {
        // Success - clear flask and show success animation
        setDroppedCompounds([]);
        // Add success sound effect here
      } else {
        // Failure - shake animation
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
        // Add error sound effect here
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
          relative w-full h-48 rounded-xl border-2 border-dashed border-gray-300
          flex flex-col items-center justify-center transition-all duration-300
          ${isReacting ? 'border-primary bg-primary/5' : ''}
          ${shakeError ? 'shake-animation border-red-500 bg-red-50' : ''}
          ${droppedCompounds.length > 0 ? 'border-primary bg-blue-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Flask contents */}
        <div className="flex flex-col items-center justify-center space-y-3 p-4">
          {droppedCompounds.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <Beaker className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">Drop compounds here to react</p>
              <p className="text-xs">Add as many compounds as needed</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 w-full justify-center">
                {droppedCompounds.map((compound, index) => (
                  <div key={`${compound.id}-${index}`} className="relative">
                    <div className="text-center p-2 bg-white rounded-lg border shadow-sm min-w-[60px]">
                      <div className="text-lg font-bold text-primary">{compound.symbol}</div>
                      <div className="text-xs text-gray-600 truncate">{compound.name}</div>
                    </div>
                    <button
                      onClick={() => removeCompound(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* Drop zone indicator */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center min-w-[60px] h-16 px-4">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </>
          )}

          {/* Bubbling animation during reaction */}
          {isReacting && (
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div className="space-y-3">
        <button
          onClick={performReaction}
          disabled={!canReact || isReacting}
          className={`
            w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
            ${canReact && !isReacting
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Beaker className="w-4 h-4" />
          {isReacting ? 'Reacting...' : 'React!'}
        </button>
        
        <button
          onClick={clearFlask}
          disabled={droppedCompounds.length === 0}
          className="w-full py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear Flask
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground">
        <p>Drag discovered compounds into the beaker to create new ones!</p>
      </div>
    </div>
  );
};

export default ReactionFlask;