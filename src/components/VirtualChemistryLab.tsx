import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Beaker, BookOpen, Trophy, Atom } from 'lucide-react';

import { compounds as initialCompounds, reactions, achievements, Compound, Achievement } from '../data/compounds';
import DiscoveryTab from './DiscoveryTab';
import ReactionFlask from './ReactionFlask';
import CompoundModal from './CompoundModal';
import Achievements from './Achievements';

const VirtualChemistryLab: React.FC = () => {
  const [compounds, setCompounds] = useState(initialCompounds);
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [completedReactions, setCompletedReactions] = useState(0);
  const [draggedCompound, setDraggedCompound] = useState<Compound | null>(null);
  const { toast } = useToast();

  // Helper functions - declared first to avoid temporal dead zone errors
  const calculateAchievementProgress = (achievement: Achievement) => {
    const discoveredCount = compounds.filter(c => c.discovered).length;
    switch (achievement.id) {
      case 'first_discovery':
        return Math.min(discoveredCount, 1);
      case 'element_master':
        return compounds.filter(c => c.category === 'Element' && c.discovered).length;
      case 'acid_master':
        return compounds.filter(c => c.category === 'Acid' && c.discovered).length;
      case 'base_master':
        return compounds.filter(c => c.category === 'Base' && c.discovered).length;
      case 'salt_master':
        return compounds.filter(c => c.category === 'Salt' && c.discovered).length;
      case 'organic_master':
        return compounds.filter(c => c.category === 'Organic' && c.discovered).length;
      case 'gas_master':
        return compounds.filter(c => c.category === 'Gas' && c.discovered).length;
      case 'reaction_novice':
        return Math.min(completedReactions, 5);
      case 'reaction_expert':
        return Math.min(completedReactions, 20);
      case 'reaction_master':
        return Math.min(completedReactions, 50);
      case 'compound_collector':
        return discoveredCount;
      case 'chemistry_legend':
        return Math.min(completedReactions, reactions.length);
      default:
        return 0;
    }
  };

  const getAchievementTarget = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'first_discovery':
        return 1;
      case 'element_master':
        return compounds.filter(c => c.category === 'Element').length;
      case 'acid_master':
        return compounds.filter(c => c.category === 'Acid').length;
      case 'base_master':
        return compounds.filter(c => c.category === 'Base').length;
      case 'salt_master':
        return compounds.filter(c => c.category === 'Salt').length;
      case 'organic_master':
        return compounds.filter(c => c.category === 'Organic').length;
      case 'gas_master':
        return compounds.filter(c => c.category === 'Gas').length;
      case 'reaction_novice':
        return 5;
      case 'reaction_expert':
        return 20;
      case 'reaction_master':
        return 50;
      case 'compound_collector':
        return compounds.length;
      case 'chemistry_legend':
        return reactions.length;
      default:
        return 1;
    }
  };

  // Background music
  const backgroundMusic = useRef<AudioContext | null>(null);
  const musicGain = useRef<GainNode | null>(null);
  const musicOscillators = useRef<OscillatorNode[]>([]);

  const startBackgroundMusic = () => {
    if (backgroundMusic.current) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      backgroundMusic.current = audioContext;
      
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.1; // Low volume
      gainNode.connect(audioContext.destination);
      musicGain.current = gainNode;
      
      // Create ambient chemistry lab sounds
      const playAmbientNote = (frequency: number, duration: number, delay: number) => {
        setTimeout(() => {
          if (!backgroundMusic.current) return;
          
          const osc = backgroundMusic.current.createOscillator();
          const gain = backgroundMusic.current.createGain();
          
          osc.connect(gain);
          gain.connect(musicGain.current!);
          
          osc.frequency.value = frequency;
          osc.type = 'sine';
          
          gain.gain.setValueAtTime(0, backgroundMusic.current.currentTime);
          gain.gain.linearRampToValueAtTime(0.05, backgroundMusic.current.currentTime + 0.5);
          gain.gain.linearRampToValueAtTime(0, backgroundMusic.current.currentTime + duration);
          
          osc.start();
          osc.stop(backgroundMusic.current.currentTime + duration);
          
          musicOscillators.current.push(osc);
        }, delay);
      };
      
      // Play ambient lab atmosphere
      const playAmbientLoop = () => {
        if (!backgroundMusic.current) return;
        
        // Gentle bubbling and chemical atmosphere sounds
        [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
          playAmbientNote(freq, 8, i * 2000);
        });
        
        setTimeout(playAmbientLoop, 16000); // Loop every 16 seconds
      };
      
      playAmbientLoop();
    } catch (error) {
      console.error('Could not start background music:', error);
    }
  };

  const stopBackgroundMusic = () => {
    musicOscillators.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    musicOscillators.current = [];
    
    if (backgroundMusic.current) {
      backgroundMusic.current.close();
      backgroundMusic.current = null;
    }
  };

  // Enhanced sound effects
  const playSound = (type: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (type) {
        case 'discovery':
          // Ascending chime
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
          break;
        case 'reaction':
          // Bubbling sound
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.4);
          break;
        case 'error':
          // Low buzz
          oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
          break;
        case 'achievement':
          // Victory fanfare
          oscillator.frequency.setValueAtTime(392, audioContext.currentTime); // G4
          oscillator.frequency.setValueAtTime(523, audioContext.currentTime + 0.15); // C5
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.3); // E5
          oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.45); // G5
          gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.8);
          break;
        case 'drop':
          // Liquid drop sound
          oscillator.frequency.value = 300;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          break;
        case 'bubble':
          // Gentle bubbling sound
          oscillator.frequency.value = 150;
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
          break;
        case 'mix':
          // Mixing/stirring sound
          oscillator.frequency.value = 250;
          oscillator.type = 'triangle';
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
          break;
      }
      
      if (type !== 'reaction') {
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
      }
    } catch (e) {
      console.log('Sound effect:', type);
    }
  };

  const handleCompoundClick = (compound: Compound) => {
    if (compound.discovered) {
      setSelectedCompound(compound);
      setModalOpen(true);
    }
  };

  const discoverCompound = (compoundId: string, showToast = true) => {
    setCompounds(prev => prev.map(compound => {
      if (compound.id === compoundId && !compound.discovered) {
        if (showToast) {
          toast({
            title: "New Compound Discovered! ✨",
            description: `You discovered ${compound.name} (+${compound.points} points)`,
            duration: 3000,
          });
          playSound('discovery');
          
          // Check for new achievements
          setTimeout(() => {
            const newAchievements = achievements.filter(achievement => {
              const oldProgress = calculateAchievementProgress(achievement);
              const target = getAchievementTarget(achievement);
              return oldProgress < target && oldProgress + 1 >= target;
            });
            
            newAchievements.forEach(achievement => {
              toast({
                title: "Achievement Unlocked! 🏆",
                description: `${achievement.name} (+${achievement.points} points)`,
                duration: 4000,
              });
              playSound('achievement');
            });
          }, 500);
        }
        return { ...compound, discovered: true };
      }
      return compound;
    }));
  };

  const handleReaction = (compoundIds: string[]) => {
    // Find matching reaction
    const reaction = reactions.find(r => {
      const sortedInputs = [...r.inputs].sort();
      const sortedCompoundIds = [...compoundIds].sort();
      return sortedInputs.length === sortedCompoundIds.length &&
             sortedInputs.every((input, index) => input === sortedCompoundIds[index]);
    });

    if (reaction) {
      // Success!
      const product = compounds.find(c => c.id === reaction.output);
      if (product && !product.discovered) {
        discoverCompound(reaction.output);
        setCompletedReactions(prev => prev + 1);
        playSound('reaction');
        
        toast({
          title: "Reaction Successful! ⚗️",
          description: `Created ${product.name}!`,
          duration: 3000,
        });
      } else if (product && product.discovered) {
        toast({
          title: "Reaction Complete ✅",
          description: `You already know how to make ${product.name}`,
          duration: 2000,
        });
        setCompletedReactions(prev => prev + 1);
        playSound('reaction');
      }
      
      return { success: true, message: `Created ${product?.name}!`, discoveredCompound: product?.name };
    } else {
      // Failure
      playSound('error');
      toast({
        title: "Reaction Failed ❌",
        description: "These compounds don't react together",
        variant: "destructive",
        duration: 2000,
      });
      
      return { success: false, message: "These compounds don't react together" };
    }
  };

  // Calculate total stats
  const totalPoints = compounds.filter(c => c.discovered).reduce((sum, c) => sum + c.points, 0);
  const discoveredCount = compounds.filter(c => c.discovered).length;
  const achievementPoints = achievements.filter(achievement => {
    // Same logic as in Achievements component
    const progress = calculateAchievementProgress(achievement);
    const target = getAchievementTarget(achievement);
    return progress >= target;
  }).reduce((sum, a) => sum + a.points, 0);

  // Start background music on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startBackgroundMusic();
    }, 1000); // Start after 1 second
    
    return () => {
      clearTimeout(timer);
      stopBackgroundMusic();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-lab-primary to-lab-secondary text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Atom className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Virtual Chemistry Lab Pro</h1>
          </div>
          <p className="text-lg opacity-90 mb-4">Master chemistry through discovery and experimentation!</p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{totalPoints + achievementPoints}</div>
              <div className="text-sm opacity-90">Total Points</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{discoveredCount}</div>
              <div className="text-sm opacity-90">Compounds</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{completedReactions}</div>
              <div className="text-sm opacity-90">Reactions</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">
                {achievements.filter(a => {
                  const progress = calculateAchievementProgress(a);
                  const target = getAchievementTarget(a);
                  return progress >= target;
                }).length}
              </div>
              <div className="text-sm opacity-90">Achievements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:w-fit">
            <TabsTrigger value="lab" className="flex items-center gap-2 flask-cursor">
              <Beaker className="w-4 h-4" />
              Lab
            </TabsTrigger>
            <TabsTrigger value="discovery" className="flex items-center gap-2 flask-cursor">
              <Atom className="w-4 h-4" />
              Discovery
            </TabsTrigger>
            <TabsTrigger value="reactions" className="flex items-center gap-2 flask-cursor">
              <BookOpen className="w-4 h-4" />
              Reactions
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 flask-cursor">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lab" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compound Inventory */}
              <div className="lg:col-span-2">
                <DiscoveryTab
                  compounds={compounds.filter(c => c.discovered)}
                  onCompoundClick={handleCompoundClick}
                  onDragStart={setDraggedCompound}
                  onDragEnd={() => setDraggedCompound(null)}
                />
              </div>
              
              {/* Reaction Beaker */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6 sticky top-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Beaker className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Reaction Beaker</h3>
                  </div>
                  <ReactionFlask
                    onReaction={handleReaction}
                    compounds={compounds.filter(c => c.discovered)}
                    playSound={playSound}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discovery" className="mt-6">
            <DiscoveryTab
              compounds={compounds}
              onCompoundClick={handleCompoundClick}
              onDragStart={setDraggedCompound}
              onDragEnd={() => setDraggedCompound(null)}
            />
          </TabsContent>

          <TabsContent value="reactions" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Reaction Guide</h2>
              <div className="grid gap-4">
                {reactions.map(reaction => {
                  const isCompleted = compounds.find(c => c.id === reaction.output)?.discovered;
                  const inputCompounds = reaction.inputs.map(id => compounds.find(c => c.id === id));
                  const outputCompound = compounds.find(c => c.id === reaction.output);

                  return (
                    <div
                      key={reaction.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2">
                             {inputCompounds.map((compound, index) => (
                               <React.Fragment key={compound?.id}>
                                 <span className="font-mono font-bold text-lab-primary">
                                   {compound?.symbol}
                                 </span>
                                {index < inputCompounds.length - 1 && <span>+</span>}
                              </React.Fragment>
                            ))}
                          </div>
                          <span className="text-xl">→</span>
                           <span className="font-mono font-bold text-lab-secondary">
                             {outputCompound?.symbol}
                           </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <span className="text-green-600 font-bold">✅ Completed</span>
                          ) : (
                            <span className="text-gray-500">❌ Not completed</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <h3 className="font-semibold">{reaction.name}</h3>
                        <p className="text-sm text-muted-foreground">{reaction.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <Achievements
              achievements={achievements}
              compounds={compounds}
              completedReactions={completedReactions}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Compound Modal */}
      <CompoundModal
        compound={selectedCompound}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default VirtualChemistryLab;