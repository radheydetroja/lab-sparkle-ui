import React from 'react';
import { Trophy, Lock, CheckCircle } from 'lucide-react';
import { Achievement, Compound } from '../data/compounds';

interface AchievementsProps {
  achievements: Achievement[];
  compounds: Compound[];
  completedReactions: number;
}

const Achievements: React.FC<AchievementsProps> = ({ achievements, compounds, completedReactions }) => {
  const calculateProgress = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'first_discovery':
        const discoveredCount = compounds.filter(c => c.discovered).length;
        return Math.min(discoveredCount, 1);
      
      case 'element_master':
        const elements = compounds.filter(c => c.category === 'Element' && c.discovered);
        return elements.length;
      
      case 'acid_master':
        const acids = compounds.filter(c => c.category === 'Acid' && c.discovered);
        return acids.length;
      
      case 'reaction_expert':
        return Math.min(completedReactions, 10);
      
      case 'compound_collector':
        return compounds.filter(c => c.discovered).length;
      
      default:
        return 0;
    }
  };

  const getRequirementTarget = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'first_discovery':
        return 1;
      case 'element_master':
        return compounds.filter(c => c.category === 'Element').length;
      case 'acid_master':
        return compounds.filter(c => c.category === 'Acid').length;
      case 'reaction_expert':
        return 10;
      case 'compound_collector':
        return compounds.length;
      default:
        return 1;
    }
  };

  const isUnlocked = (achievement: Achievement) => {
    const progress = calculateProgress(achievement);
    const target = getRequirementTarget(achievement);
    return progress >= target;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Achievements ({achievements.filter(a => isUnlocked(a)).length}/{achievements.length})</h2>
            <p className="text-sm text-muted-foreground">Unlock achievements by reaching milestones in your chemistry journey</p>
          </div>
        </div>
      </div>

      {/* Achievements grid - 2x4 layout like the screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map(achievement => {
          const progress = calculateProgress(achievement);
          const target = getRequirementTarget(achievement);
          const unlocked = isUnlocked(achievement);
          const progressPercent = (progress / target) * 100;

          return (
            <div
              key={achievement.id}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                ${unlocked 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-md' 
                  : 'bg-gray-50 border-gray-200'
                }
              `}
            >
              {/* Icon and title */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`text-2xl ${unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-sm ${unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-xs ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                </div>
                
                {/* Status indicator */}
                <div className="flex-shrink-0">
                  {unlocked ? (
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                      ✅ Unlocked
                    </div>
                  ) : (
                    <div className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                      🔒 Locked
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement text */}
              <p className={`text-xs mb-2 ${unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                {achievement.requirement}
              </p>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className={unlocked ? 'text-gray-600' : 'text-gray-400'}>
                    Progress: {progress}/{target}
                  </span>
                  <span className={`font-bold ${unlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                    +{achievement.points} pts
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      unlocked 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                        : 'bg-gray-400'
                    }`}
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  />
                </div>
              </div>

              {/* Unlocked glow effect */}
              {unlocked && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-xl pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold">
              {achievements.filter(a => isUnlocked(a)).length} / {achievements.length}
            </div>
            <div className="text-sm opacity-90">Achievements Unlocked</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold">
              +{achievements.filter(a => isUnlocked(a)).reduce((sum, a) => sum + a.points, 0)}
            </div>
            <div className="text-sm opacity-90">Achievement Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;