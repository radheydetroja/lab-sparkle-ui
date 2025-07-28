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
    
    if (compound && droppedCompounds.length < 3) {
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
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-bold text-primary">Reaction Flask</h3>
      
      {/* Main Flask */}
      <div
        className={`
          lab-flask relative w-48 h-64 flex flex-col items-center justify-center
          transition-all duration-300
          ${isReacting ? 'lab-flask-active' : ''}
          ${shakeError ? 'shake-animation border-red-500' : ''}
        `}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Flask contents */}
        <div className="flex flex-col items-center space-y-2 p-4">
          {droppedCompounds.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <Beaker className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Drop compounds here</p>
              <p className="text-xs">(2-3 compounds)</p>
            </div>
          ) : (
            <>
              {droppedCompounds.map((compound, index) => (
                <div key={`${compound.id}-${index}`} className="relative">
                  <CompoundCard 
                    compound={compound} 
                    isInFlask={true}
                    onDragStart={() => {}}
                    onDragEnd={() => {}}
                    onClick={() => {}}
                  />
                  <button
                    onClick={() => removeCompound(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {/* Add more indicator */}
              {droppedCompounds.length < 3 && (
                <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Bubbling animation during reaction */}
        {isReacting && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-lab-secondary rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div className="flex space-x-3">
        <button
          onClick={performReaction}
          disabled={!canReact || isReacting}
          className={`
            px-6 py-2 rounded-lg font-medium transition-all duration-200
            ${canReact && !isReacting
              ? 'bg-lab-accent text-white hover:bg-lab-accent/90 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isReacting ? 'Reacting...' : 'React!'}
        </button>
        
        <button
          onClick={clearFlask}
          disabled={droppedCompounds.length === 0}
          className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground max-w-md">
        <p>Drag discovered compounds into the flask to create new ones!</p>
        <p className="text-xs mt-1">Some reactions need 2 compounds, others need 3.</p>
      </div>
    </div>
  );
};

export default ReactionFlask;