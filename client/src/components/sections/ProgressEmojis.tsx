import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Brain, LightbulbIcon, Star, Trophy, Rocket } from 'lucide-react';

interface ProgressEmojisProps {
  // Optional starting module to display
  defaultModule?: string;
}

interface Module {
  id: string;
  name: string;
  progress: number; // 0-100
  emoji: string;
  animatedIcon: React.ReactNode;
  color: string;
  description: string;
  reactions: string[];
  milestones: {
    threshold: number;
    message: string;
    reaction: string;
  }[];
}

export default function ProgressEmojis({ defaultModule }: ProgressEmojisProps) {
  // State for selected module and reactions
  const [selectedModule, setSelectedModule] = useState<string>(defaultModule || 'ai-fundamentals');
  const [showReaction, setShowReaction] = useState<boolean>(false);
  const [reactionIndex, setReactionIndex] = useState<number>(0);
  
  // Define modules and their progress/emojis
  const modules: Module[] = [
    {
      id: 'ai-fundamentals',
      name: 'AI Fundamentals',
      progress: 85,
      emoji: '🧠',
      animatedIcon: <Brain className="text-indigo-500" />,
      color: 'indigo',
      description: 'Core AI concepts and history',
      reactions: ['🎉', '🚀', '🧠', '⭐', '🔥'],
      milestones: [
        { threshold: 20, message: "You're getting started!", reaction: '🌱' },
        { threshold: 50, message: "Halfway there!", reaction: '🚀' },
        { threshold: 80, message: "Almost mastered!", reaction: '🔥' },
        { threshold: 100, message: "You're an expert!", reaction: '🏆' }
      ]
    },
    {
      id: 'data-processing',
      name: 'Data Processing',
      progress: 70,
      emoji: '📊',
      animatedIcon: <Zap className="text-blue-500" />,
      color: 'blue',
      description: 'Transform raw data into usable formats',
      reactions: ['📊', '💾', '🔍', '📈', '🧮'],
      milestones: [
        { threshold: 20, message: "Taking the first steps!", reaction: '🌱' },
        { threshold: 50, message: "Making good progress!", reaction: '📈' },
        { threshold: 80, message: "Data wrangling pro!", reaction: '💪' },
        { threshold: 100, message: "Data master!", reaction: '🏆' }
      ]
    },
    {
      id: 'ml-techniques',
      name: 'ML Techniques',
      progress: 60,
      emoji: '⚙️',
      animatedIcon: <LightbulbIcon className="text-yellow-500" />,
      color: 'yellow',
      description: 'Machine learning algorithms and methods',
      reactions: ['⚙️', '🤖', '📚', '🔬', '📝'],
      milestones: [
        { threshold: 20, message: "Learning the basics!", reaction: '📚' },
        { threshold: 50, message: "Growing your skills!", reaction: '🌱' },
        { threshold: 80, message: "Almost there!", reaction: '🔥' },
        { threshold: 100, message: "ML master!", reaction: '🏆' }
      ]
    },
    {
      id: 'deep-learning',
      name: 'Deep Learning',
      progress: 45,
      emoji: '🔮',
      animatedIcon: <Brain className="text-purple-500" />,
      color: 'purple',
      description: 'Neural networks and deep architectures',
      reactions: ['🔮', '🧠', '📊', '🤖', '📈'],
      milestones: [
        { threshold: 20, message: "Taking your first steps!", reaction: '🐣' },
        { threshold: 50, message: "Building neural prowess!", reaction: '🧠' },
        { threshold: 80, message: "Deep learning pro!", reaction: '🔥' },
        { threshold: 100, message: "Neural network master!", reaction: '🏆' }
      ]
    },
    {
      id: 'gen-ai',
      name: 'Generative AI',
      progress: 30,
      emoji: '✨',
      animatedIcon: <Sparkles className="text-pink-500" />,
      color: 'pink',
      description: 'Creative AI models and applications',
      reactions: ['✨', '🎨', '🤖', '🔮', '🚀'],
      milestones: [
        { threshold: 20, message: "Just beginning!", reaction: '🌱' },
        { threshold: 50, message: "Creating with AI!", reaction: '🎨' },
        { threshold: 80, message: "Generation genius!", reaction: '✨' },
        { threshold: 100, message: "Creative AI master!", reaction: '🏆' }
      ]
    },
    {
      id: 'prompt-engineering',
      name: 'Prompt Engineering',
      progress: 75,
      emoji: '💬',
      animatedIcon: <Sparkles className="text-cyan-500" />,
      color: 'cyan',
      description: 'Crafting effective AI prompts',
      reactions: ['💬', '✍️', '🔍', '🧙‍♂️', '📝'],
      milestones: [
        { threshold: 20, message: "Learning to communicate!", reaction: '💬' },
        { threshold: 50, message: "Honing your prompts!", reaction: '📝' },
        { threshold: 80, message: "Prompt wizard!", reaction: '🧙‍♂️' },
        { threshold: 100, message: "Prompt master!", reaction: '🏆' }
      ]
    },
    {
      id: 'ai-applications',
      name: 'AI Applications',
      progress: 55,
      emoji: '🛠️',
      animatedIcon: <Rocket className="text-emerald-500" />,
      color: 'emerald',
      description: 'Building real-world AI solutions',
      reactions: ['🛠️', '📱', '💻', '🤖', '🚀'],
      milestones: [
        { threshold: 20, message: "Building basics!", reaction: '🧱' },
        { threshold: 50, message: "Applications in progress!", reaction: '⚙️' },
        { threshold: 80, message: "App development pro!", reaction: '💻' },
        { threshold: 100, message: "AI builder master!", reaction: '🏆' }
      ]
    }
  ];

  // Get current module
  const currentModule = modules.find(m => m.id === selectedModule) || modules[0];
  
  // Get appropriate milestone message
  const getCurrentMilestone = (progress: number) => {
    const milestones = currentModule.milestones;
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (progress >= milestones[i].threshold) {
        return milestones[i];
      }
    }
    return milestones[0];
  };
  
  const currentMilestone = getCurrentMilestone(currentModule.progress);
  
  // Trigger reaction animation
  const triggerReaction = () => {
    setReactionIndex((prev) => (prev + 1) % currentModule.reactions.length);
    setShowReaction(true);
    setTimeout(() => setShowReaction(false), 1500);
  };

  return (
    <section id="progress-emoji" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold text-sm mb-4">
            LEARNING JOURNEY
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl mt-2 mb-4 text-gray-900">
            Track Your Progress with <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Fun</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Monitor your learning journey with our playful emoji reaction system. 
            Watch your progress and celebrate milestones along the way!
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Module selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`px-4 py-2 rounded-full flex items-center transition-all ${
                  selectedModule === module.id
                    ? `bg-${module.color}-100 text-${module.color}-800 font-medium shadow-sm`
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl mr-2">{module.emoji}</span>
                <span>{module.name}</span>
              </button>
            ))}
          </div>

          {/* Progress card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r from-${currentModule.color}-500 to-${currentModule.color}-300`}></div>
            
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg mr-4 bg-${currentModule.color}-100 text-${currentModule.color}-600`}>
                    {currentModule.animatedIcon}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{currentModule.name}</h3>
                    <p className="text-gray-600">{currentModule.description}</p>
                  </div>
                </div>
                
                <div 
                  className="relative flex-shrink-0 cursor-pointer transform hover:scale-110 transition-transform"
                  onClick={triggerReaction}
                >
                  <div className="text-4xl relative">
                    {currentModule.emoji}
                    
                    {/* Animated reaction */}
                    <AnimatePresence>
                      {showReaction && (
                        <motion.div
                          className="absolute -top-10 -right-5 text-3xl"
                          initial={{ scale: 0, y: 20, opacity: 0 }}
                          animate={{ scale: 1.2, y: -30, opacity: 1 }}
                          exit={{ scale: 0, y: -50, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {currentModule.reactions[reactionIndex]}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-1">Click me!</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className={`text-sm font-bold text-${currentModule.color}-600`}>
                    {currentModule.progress}%
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r from-${currentModule.color}-500 to-${currentModule.color}-300`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${currentModule.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
              
              {/* Milestone celebration */}
              <div className="mt-6 flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{currentMilestone.reaction}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Current Milestone</h4>
                    <p className="text-gray-600">{currentMilestone.message}</p>
                  </div>
                </div>
                <div className="flex">
                  {currentModule.milestones.map((milestone, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 mx-1 rounded-full ${
                        currentModule.progress >= milestone.threshold 
                          ? `bg-${currentModule.color}-500` 
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Emoji reactions collection */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">Your Reactions</h4>
                <div className="flex flex-wrap gap-3">
                  {currentModule.reactions.map((reaction, index) => (
                    <motion.button
                      key={index}
                      className="text-2xl p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setReactionIndex(index);
                        setShowReaction(true);
                        setTimeout(() => setShowReaction(false), 1500);
                      }}
                    >
                      {reaction}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Encouragement message */}
          <div className="text-center mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
            <p className="text-gray-700 italic">
              "Learning is a journey, not a destination. Click on the emojis to celebrate your progress!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}