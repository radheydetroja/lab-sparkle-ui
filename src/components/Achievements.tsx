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
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Achievements</h2>
        <p className="text-muted-foreground">Complete challenges to earn badges and points</p>
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map(achievement => {
          const progress = calculateProgress(achievement);
          const target = getRequirementTarget(achievement);
          const unlocked = isUnlocked(achievement);
          const progressPercent = (progress / target) * 100;

          return (
            <div
              key={achievement.id}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300
                ${unlocked 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-50 border-gray-200'
                }
              `}
            >
              {/* Achievement icon and status */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`text-3xl ${unlocked ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold ${unlocked ? 'text-foreground' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${unlocked ? 'text-muted-foreground' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                
                {/* Status icon */}
                <div className="flex-shrink-0">
                  {unlocked ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className={unlocked ? 'text-muted-foreground' : 'text-gray-400'}>
                    Progress
                  </span>
                  <span className={`font-medium ${unlocked ? 'text-foreground' : 'text-gray-500'}`}>
                    {progress}/{target}
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

              {/* Requirement and points */}
              <div className="flex justify-between items-center">
                <p className={`text-xs ${unlocked ? 'text-muted-foreground' : 'text-gray-400'}`}>
                  {achievement.requirement}
                </p>
                <div className={`flex items-center gap-1 ${unlocked ? 'text-yellow-600' : 'text-gray-400'}`}>
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-bold">+{achievement.points}</span>
                </div>
              </div>

              {/* Unlocked glow effect */}
              {unlocked && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Summary stats */}
      <div className="bg-gradient-to-r from-lab-primary to-lab-secondary text-white p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-bold">
              {achievements.filter(a => isUnlocked(a)).length} / {achievements.length}
            </div>
            <div className="text-sm opacity-90">Achievements Unlocked</div>
          </div>
          <div>
            <div className="text-lg font-bold">
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