import React from 'react';
import { X, Sparkles, Beaker, FlaskConical } from 'lucide-react';
import { Compound, reactions } from '../data/compounds';

interface CompoundModalProps {
  compound: Compound | null;
  isOpen: boolean;
  onClose: () => void;
}

const CompoundModal: React.FC<CompoundModalProps> = ({ compound, isOpen, onClose }) => {
  if (!isOpen || !compound) return null;

  const { name, symbol, category, rarity, description, mw, points, uses, discovered } = compound;

  // Find reaction that produces this compound
  const findProductionReaction = () => {
    return reactions.find(reaction => reaction.output === compound.id);
  };

  const getRarityColor = () => {
    switch (rarity) {
      case 'rare':
        return 'text-purple-600 bg-purple-100';
      case 'epic':
        return 'text-yellow-600 bg-yellow-100';
      case 'legendary':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="text-4xl font-bold text-lab-primary">{symbol}</div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{name}</h2>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Rarity badge */}
          {rarity !== 'common' && (
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRarityColor()}`}>
              <Sparkles className="w-4 h-4" />
              {rarity.toUpperCase()}
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Description</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {/* Properties */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Molecular Weight</div>
              <div className="font-semibold">{mw}</div>
            </div>
            <div className="bg-lab-accent/10 p-3 rounded-lg">
              <div className="text-sm text-muted-foreground">Discovery Points</div>
              <div className="font-semibold text-lab-accent">+{points}</div>
            </div>
          </div>

          {/* Uses */}
          {uses && uses.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Beaker className="w-4 h-4" />
                Common Uses
              </h3>
              <ul className="space-y-1">
                {uses.map((use, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-lab-primary rounded-full" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Discovery status and reaction */}
          <div className={`p-3 rounded-lg ${discovered ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${discovered ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="text-sm font-medium">
                {discovered ? 'Discovered' : 'Not Yet Discovered'}
              </span>
            </div>
            
            {!discovered && (() => {
              const reaction = findProductionReaction();
              if (reaction) {
                return (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <FlaskConical className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Synthesis Reaction</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <div className="text-sm font-medium text-gray-800 mb-1">{reaction.name}</div>
                      <div className="text-xs text-gray-600 font-mono">{reaction.description}</div>
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Required components: </span>
                        <span className="text-xs font-medium text-blue-600">
                          {reaction.inputs.map(input => input.toUpperCase()).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              } else if (compound.synthesisHint) {
                return (
                  <p className="text-xs text-gray-600 mt-1 italic">
                    Hint: {compound.synthesisHint}
                  </p>
                );
              }
              return null;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundModal;