import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Beaker, BookOpen, Trophy, Atom, Sparkles } from 'lucide-react';

import { compounds as initialCompounds, reactions, achievements, Compound, Achievement } from '../data/compounds';
import DiscoveryTab from './DiscoveryTab';
import ReactionFlask, { ReactionFlaskRef } from './ReactionFlaskRef';
import CompoundModal from './CompoundModal';
import Achievements from './Achievements';

const VirtualChemistryLab: React.FC = () => {
  const [compounds, setCompounds] = useState(initialCompounds);
  const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [completedReactions, setCompletedReactions] = useState(0);
  const [draggedCompound, setDraggedCompound] = useState<Compound | null>(null);
  const { toast } = useToast();
  const reactionFlaskRef = useRef<ReactionFlaskRef>(null);

  // Function to add compound to flask via tap
  const handleAddToFlask = (compound: Compound) => {
    reactionFlaskRef.current?.addToFlask(compound);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-green-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Game HUD Header */}
      <div className="relative z-10 bg-gradient-to-r from-purple-800/90 to-blue-800/90 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ChemLab Quest</h1>
                <p className="text-purple-200">Level {Math.floor(discoveredCount / 5) + 1} Chemist</p>
              </div>
            </div>
            
            {/* XP Bar */}
            <div className="hidden md:flex items-center gap-4">
              <div className="bg-black/30 rounded-full px-4 py-2 border border-yellow-400/50">
                <div className="text-yellow-400 font-bold">XP: {totalPoints + achievementPoints}</div>
              </div>
            </div>
          </div>
          
          {/* Game Stats HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-xl p-3 border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-xl font-bold text-white">{totalPoints + achievementPoints}</div>
                  <div className="text-xs text-blue-200">SCORE</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-600/80 to-emerald-600/80 rounded-xl p-3 border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Atom className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-xl font-bold text-white">{discoveredCount}/{compounds.length}</div>
                  <div className="text-xs text-green-200">DISCOVERED</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-600/80 to-red-600/80 rounded-xl p-3 border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Beaker className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-xl font-bold text-white">{completedReactions}</div>
                  <div className="text-xs text-orange-200">REACTIONS</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-600/80 to-amber-600/80 rounded-xl p-3 border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-xl font-bold text-white">
                    {achievements.filter(a => {
                      const progress = calculateAchievementProgress(a);
                      const target = getAchievementTarget(a);
                      return progress >= target;
                    }).length}
                  </div>
                  <div className="text-xs text-yellow-200">BADGES</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-4">
        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:w-fit bg-black/40 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="lab" className="flex items-center gap-2 flask-cursor text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Beaker className="w-4 h-4" />
              LAB
            </TabsTrigger>
            <TabsTrigger value="discovery" className="flex items-center gap-2 flask-cursor text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Atom className="w-4 h-4" />
              ELEMENTS
            </TabsTrigger>
            <TabsTrigger value="reactions" className="flex items-center gap-2 flask-cursor text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4" />
              RECIPES
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 flask-cursor text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Trophy className="w-4 h-4" />
              BADGES
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lab" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compound Inventory */}
              <div className="lg:col-span-2">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Atom className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Element Inventory</h3>
                    <div className="ml-auto bg-green-500/20 border border-green-400/50 rounded-lg px-3 py-1">
                      <span className="text-green-400 text-sm font-bold">{compounds.filter(c => c.discovered).length} Discovered</span>
                    </div>
                  </div>
                   <DiscoveryTab
                     compounds={compounds.filter(c => c.discovered)}
                     onCompoundClick={handleCompoundClick}
                     onDragStart={setDraggedCompound}
                     onDragEnd={() => setDraggedCompound(null)}
                     onAddToFlask={handleAddToFlask}
                     isLabMode={true}
                   />
                </div>
              </div>
              
              {/* Reaction Beaker */}
              <div className="lg:col-span-1">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sticky top-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Beaker className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Reaction Lab</h3>
                  </div>
                   <ReactionFlask
                     ref={reactionFlaskRef}
                     onReaction={handleReaction}
                     compounds={compounds.filter(c => c.discovered)}
                     playSound={playSound}
                   />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discovery" className="mt-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Element Discovery</h3>
                <div className="ml-auto bg-blue-500/20 border border-blue-400/50 rounded-lg px-3 py-1">
                  <span className="text-blue-400 text-sm font-bold">Tap or Drag to React</span>
                </div>
              </div>
               <DiscoveryTab
                 compounds={compounds}
                 onCompoundClick={handleCompoundClick}
                 onDragStart={() => {}} // No drag functionality in elements tab
                 onDragEnd={() => {}}
                 isLabMode={false}
               />
            </div>
          </TabsContent>

          <TabsContent value="reactions" className="mt-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Recipe Book</h3>
              </div>
              <div className="grid gap-4">
                {reactions.map(reaction => {
                  const isCompleted = compounds.find(c => c.id === reaction.output)?.discovered;
                  const inputCompounds = reaction.inputs.map(id => compounds.find(c => c.id === id));
                  const outputCompound = compounds.find(c => c.id === reaction.output);

                  return (
                    <div
                      key={reaction.id}
                      className={`p-6 rounded-xl border-2 transition-all backdrop-blur-sm ${
                        isCompleted 
                          ? 'bg-green-500/20 border-green-400/50' 
                          : 'bg-white/10 border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2">
                             {inputCompounds.map((compound, index) => (
                               <React.Fragment key={compound?.id}>
                                 <span className="font-mono font-bold text-yellow-400 text-lg bg-black/30 px-2 py-1 rounded">
                                   {compound?.symbol}
                                 </span>
                                {index < inputCompounds.length - 1 && <span className="text-white text-xl">+</span>}
                              </React.Fragment>
                            ))}
                          </div>
                          <span className="text-2xl text-purple-400">⚡</span>
                           <span className="font-mono font-bold text-cyan-400 text-lg bg-black/30 px-2 py-1 rounded">
                             {outputCompound?.symbol}
                           </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <div className="bg-green-500/30 border border-green-400/50 rounded-lg px-3 py-1">
                              <span className="text-green-400 font-bold text-sm">✨ MASTERED</span>
                            </div>
                          ) : (
                            <div className="bg-orange-500/30 border border-orange-400/50 rounded-lg px-3 py-1">
                              <span className="text-orange-400 font-bold text-sm">🔒 LOCKED</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-white text-lg">{reaction.name}</h3>
                        <p className="text-sm text-gray-300 mt-1">{reaction.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Achievement Hall</h3>
              </div>
              <Achievements
                achievements={achievements}
                compounds={compounds}
                completedReactions={completedReactions}
              />
            </div>
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