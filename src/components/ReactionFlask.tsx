import React, { useState } from 'react';
import { Beaker, X, Zap } from 'lucide-react';
import { Compound } from '../data/compounds';

interface ReactionFlaskProps {
  onReaction: (compoundIds: string[]) => { success: boolean; message: string; discoveredCompound?: string };
  compounds: Compound[];
  playSound: (type: string) => void;
}

const ReactionFlask: React.FC<ReactionFlaskProps> = ({ onReaction, compounds, playSound }) => {
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
    
    if (compound && !droppedCompounds.find(c => c.id === compoundId)) {
      setDroppedCompounds(prev => [...prev, compound]);
      playSound('drop'); // Play drop sound
    }
  };

  const removeCompound = (compoundId: string) => {
    setDroppedCompounds(prev => prev.filter(c => c.id !== compoundId));
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
          relative w-full h-48 rounded-xl border-2 border-dashed border-gray-300
          flex flex-col items-center justify-center transition-all duration-300 flask-cursor
          ${droppedCompounds.length > 0 ? 'border-lab-primary bg-lab-flask/20' : ''}
          ${isReacting ? 'lab-flask-active animate-pulse' : ''}
          ${shakeError ? 'shake-animation' : ''}
        `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {droppedCompounds.length === 0 ? (
          <div className="text-center">
            <Beaker className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Drop compounds here to react</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 p-4 w-full">
            {droppedCompounds.map((compound) => (
              <div
                key={compound.id}
                className="flex items-center gap-2 bg-white/80 rounded-lg p-2 border"
              >
                <span className="font-bold text-lg">{compound.symbol}</span>
                <span className="text-sm flex-1">{compound.name}</span>
                <button
                  onClick={() => removeCompound(compound.id)}
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
              ? 'bg-lab-primary text-white hover:bg-lab-primary/90 hover:scale-105 shadow-lg'
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
      <div className="text-center text-sm text-gray-600">
        <p>Drag and drop discovered compounds into the flask to create new ones!</p>
        <p className="text-xs mt-1">You need at least 2 compounds to perform a reaction.</p>
      </div>
    </div>
  );
};

export default ReactionFlask;