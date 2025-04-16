import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Code, Database, Sparkles, Bot, FileCode, LineChart, 
  Workflow, Layers, Github, Cpu, BarChart, Network, LucideIcon, 
  ChevronRight, PlusCircle, CheckCircle, MousePointer2, Braces, Globe 
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  level: number; // 1 = beginner, 2 = intermediate, 3 = advanced
  position: [number, number]; // x, y position in the grid
  dependencies: string[];
  category: 'foundation' | 'data' | 'ml' | 'genai' | 'application';
  points: number;
}

export default function SkillTree() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [animatedPaths, setAnimatedPaths] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const skills: Skill[] = [
    // Foundation Skills
    {
      id: 'python',
      name: 'Python Programming',
      description: 'Core programming language for AI and machine learning development.',
      icon: <Code />,
      level: 1,
      position: [1, 1],
      dependencies: [],
      category: 'foundation',
      points: 10
    },
    {
      id: 'data-structures',
      name: 'Data Structures',
      description: 'Essential data structures for efficient algorithm implementation.',
      icon: <Layers />,
      level: 1,
      position: [2, 1],
      dependencies: ['python'],
      category: 'foundation',
      points: 15
    },
    {
      id: 'algorithms',
      name: 'Algorithms',
      description: 'Fundamental algorithms and computational problem-solving techniques.',
      icon: <Workflow />,
      level: 2,
      position: [3, 1],
      dependencies: ['data-structures'],
      category: 'foundation',
      points: 20
    },
    {
      id: 'version-control',
      name: 'Version Control',
      description: 'Git and collaborative development practices.',
      icon: <Github />,
      level: 1,
      position: [4, 1],
      dependencies: ['python'],
      category: 'foundation',
      points: 10
    },
    
    // Data Skills
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Techniques for analyzing and visualizing datasets.',
      icon: <LineChart />,
      level: 1,
      position: [1, 2],
      dependencies: ['python'],
      category: 'data',
      points: 15
    },
    {
      id: 'pandas',
      name: 'Pandas & NumPy',
      description: 'Data manipulation and numerical computing libraries.',
      icon: <Database />,
      level: 2,
      position: [2, 2],
      dependencies: ['data-analysis'],
      category: 'data',
      points: 20
    },
    {
      id: 'sql',
      name: 'SQL & Databases',
      description: 'Working with relational databases and writing SQL queries.',
      icon: <Database />,
      level: 2,
      position: [3, 2],
      dependencies: ['data-analysis'],
      category: 'data',
      points: 15
    },
    {
      id: 'data-vis',
      name: 'Data Visualization',
      description: 'Creating informative charts and visual representations of data.',
      icon: <BarChart />,
      level: 2,
      position: [4, 2],
      dependencies: ['pandas'],
      category: 'data',
      points: 15
    },
    
    // ML Skills
    {
      id: 'ml-fundamentals',
      name: 'ML Fundamentals',
      description: 'Basic machine learning concepts and terminology.',
      icon: <Brain />,
      level: 1,
      position: [1, 3],
      dependencies: ['pandas'],
      category: 'ml',
      points: 20
    },
    {
      id: 'supervised-learning',
      name: 'Supervised Learning',
      description: 'Classification and regression algorithms with labeled data.',
      icon: <Braces />,
      level: 2,
      position: [2, 3],
      dependencies: ['ml-fundamentals'],
      category: 'ml',
      points: 25
    },
    {
      id: 'unsupervised-learning',
      name: 'Unsupervised Learning',
      description: 'Clustering and dimensionality reduction with unlabeled data.',
      icon: <Network />,
      level: 2,
      position: [3, 3],
      dependencies: ['ml-fundamentals'],
      category: 'ml',
      points: 25
    },
    {
      id: 'deep-learning',
      name: 'Deep Learning',
      description: 'Neural networks, CNNs, RNNs, and advanced architectures.',
      icon: <Cpu />,
      level: 3,
      position: [4, 3],
      dependencies: ['supervised-learning', 'unsupervised-learning'],
      category: 'ml',
      points: 30
    },
    
    // GenAI Skills
    {
      id: 'llm-basics',
      name: 'LLM Basics',
      description: 'Understanding large language models and their capabilities.',
      icon: <Bot />,
      level: 2,
      position: [1, 4],
      dependencies: ['deep-learning'],
      category: 'genai',
      points: 20
    },
    {
      id: 'prompt-engineering',
      name: 'Prompt Engineering',
      description: 'Designing effective prompts for generative AI systems.',
      icon: <FileCode />,
      level: 2,
      position: [2, 4],
      dependencies: ['llm-basics'],
      category: 'genai',
      points: 15
    },
    {
      id: 'generative-models',
      name: 'Generative Models',
      description: 'GANs, diffusion models, and other generative architectures.',
      icon: <Sparkles />,
      level: 3,
      position: [3, 4],
      dependencies: ['deep-learning'],
      category: 'genai',
      points: 30
    },
    {
      id: 'llm-fine-tuning',
      name: 'LLM Fine-tuning',
      description: 'Specialized adaptation of large language models.',
      icon: <Bot />,
      level: 3,
      position: [4, 4],
      dependencies: ['llm-basics', 'generative-models'],
      category: 'genai',
      points: 35
    },
    
    // Application Skills
    {
      id: 'ai-ethics',
      name: 'AI Ethics',
      description: 'Ethical considerations, biases, and responsible AI development.',
      icon: <Globe />,
      level: 2,
      position: [1, 5],
      dependencies: ['ml-fundamentals'],
      category: 'application',
      points: 15
    },
    {
      id: 'ai-apps',
      name: 'AI Applications',
      description: 'Building end-to-end applications that utilize AI capabilities.',
      icon: <Layers />,
      level: 3,
      position: [2, 5],
      dependencies: ['llm-basics', 'generative-models'],
      category: 'application',
      points: 25
    },
    {
      id: 'mlops',
      name: 'MLOps',
      description: 'Deploying and maintaining machine learning systems in production.',
      icon: <Workflow />,
      level: 3,
      position: [3, 5],
      dependencies: ['deep-learning', 'ai-apps'],
      category: 'application',
      points: 30
    },
    {
      id: 'ai-product',
      name: 'AI Product Development',
      description: 'Creating complete products built around AI capabilities.',
      icon: <PlusCircle />,
      level: 3,
      position: [4, 5],
      dependencies: ['ai-apps', 'mlops'],
      category: 'application',
      points: 40
    }
  ];

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate SVG viewBox dimensions
  const gridSize = 150;
  const padding = 30;
  const viewBoxWidth = 5 * gridSize + 2 * padding;
  const viewBoxHeight = 6 * gridSize + 2 * padding;

  // Get skill color by category
  const getSkillColor = (category: string, isActive: boolean, isHovered: boolean) => {
    const baseColors = {
      foundation: isActive || isHovered ? 'rgb(99, 102, 241)' : 'rgb(165, 180, 252)', // indigo
      data: isActive || isHovered ? 'rgb(6, 182, 212)' : 'rgb(103, 232, 249)', // cyan
      ml: isActive || isHovered ? 'rgb(139, 92, 246)' : 'rgb(192, 132, 252)', // violet
      genai: isActive || isHovered ? 'rgb(217, 70, 239)' : 'rgb(232, 121, 249)', // fuchsia
      application: isActive || isHovered ? 'rgb(16, 185, 129)' : 'rgb(110, 231, 183)', // emerald
    };
    return baseColors[category as keyof typeof baseColors];
  };

  // Get skill background color
  const getSkillBackground = (category: string, isActive: boolean, isHovered: boolean) => {
    const baseColors = {
      foundation: isActive || isHovered ? 'rgba(99, 102, 241, 0.15)' : 'rgba(165, 180, 252, 0.1)',
      data: isActive || isHovered ? 'rgba(6, 182, 212, 0.15)' : 'rgba(103, 232, 249, 0.1)',
      ml: isActive || isHovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(192, 132, 252, 0.1)',
      genai: isActive || isHovered ? 'rgba(217, 70, 239, 0.15)' : 'rgba(232, 121, 249, 0.1)',
      application: isActive || isHovered ? 'rgba(16, 185, 129, 0.15)' : 'rgba(110, 231, 183, 0.1)',
    };
    return baseColors[category as keyof typeof baseColors];
  };

  // Get skill border color
  const getSkillBorder = (category: string, isActive: boolean, isHovered: boolean) => {
    const baseColors = {
      foundation: isActive || isHovered ? 'rgba(99, 102, 241, 0.8)' : 'rgba(165, 180, 252, 0.5)',
      data: isActive || isHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(103, 232, 249, 0.5)',
      ml: isActive || isHovered ? 'rgba(139, 92, 246, 0.8)' : 'rgba(192, 132, 252, 0.5)',
      genai: isActive || isHovered ? 'rgba(217, 70, 239, 0.8)' : 'rgba(232, 121, 249, 0.5)',
      application: isActive || isHovered ? 'rgba(16, 185, 129, 0.8)' : 'rgba(110, 231, 183, 0.5)',
    };
    return baseColors[category as keyof typeof baseColors];
  };

  // Calculate node position
  const getNodePosition = (position: [number, number]) => {
    const [x, y] = position;
    return {
      x: padding + (x * gridSize),
      y: padding + (y * gridSize),
    };
  };

  // Get connecting paths between nodes
  const getConnectingPaths = () => {
    const paths: JSX.Element[] = [];
    
    skills.forEach(skill => {
      if (skill.dependencies.length > 0) {
        skill.dependencies.forEach(depId => {
          const parentSkill = skills.find(s => s.id === depId);
          if (parentSkill) {
            const startPos = getNodePosition(parentSkill.position);
            const endPos = getNodePosition(skill.position);
            
            // Create curved path
            const controlPointX = (startPos.x + endPos.x) / 2;
            const controlPointY = (startPos.y + endPos.y) / 2 + 30;
            
            const pathId = `${parentSkill.id}-to-${skill.id}`;
            const isActive = 
              (activeSkill && (activeSkill.id === skill.id || activeSkill.id === parentSkill.id)) ||
              (hoveredSkill && (hoveredSkill.id === skill.id || hoveredSkill.id === parentSkill.id)) ||
              animatedPaths.includes(pathId);
            
            // Stroke color based on skill category
            const strokeColor = getSkillColor(skill.category, isActive, false);
            
            paths.push(
              <path
                key={pathId}
                id={pathId}
                d={`M ${startPos.x} ${startPos.y} Q ${controlPointX} ${controlPointY} ${endPos.x} ${endPos.y}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isActive ? 3 : 2}
                strokeDasharray={isActive ? "0" : "6,3"}
                opacity={isActive ? 0.9 : 0.5}
                className={`transition-all duration-300 ease-in-out ${isActive ? 'path-active' : ''}`}
              />
            );
            
            // Removed animated circles on paths
          }
        });
      }
    });
    
    return paths;
  };
  
  const handleNodeHover = (skill: Skill, event: React.MouseEvent) => {
    setHoveredSkill(skill);
    
    // Calculate tooltip position
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    
    // Determine all paths connected to this skill
    const paths = [...skill.dependencies];
    const dependants = skills.filter(s => s.dependencies.includes(skill.id)).map(s => s.id);
    
    // Set all the paths to be animated
    const animatedPathIds = [
      ...skill.dependencies.map(depId => `${depId}-to-${skill.id}`),
      ...dependants.map(depId => `${skill.id}-to-${depId}`)
    ];
    setAnimatedPaths(animatedPathIds);
  };
  
  const handleNodeLeave = () => {
    setHoveredSkill(null);
    setAnimatedPaths([]);
  };
  
  const handleNodeClick = (skill: Skill) => {
    if (activeSkill && activeSkill.id === skill.id) {
      setActiveSkill(null);
    } else {
      setActiveSkill(skill);
    }
  };

  return (
    <section id="skill-tree" className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-violet-200 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-4">SKILL DEVELOPMENT</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 text-gray-900">
            Your <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Skill Tree</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Visualize the skills you'll develop throughout the AI Learning Hub program. 
            Hover over a skill to see its connections and click for more details.
          </p>
        </div>

        <div className="relative mb-12 overflow-x-auto py-4">
          <div className="skill-tree-container min-w-[800px] max-w-5xl mx-auto">
            <div className="skill-tree-legend flex items-center justify-center gap-6 mb-8 flex-wrap">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                <span className="text-sm text-gray-700">Foundation</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                <span className="text-sm text-gray-700">Data</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
                <span className="text-sm text-gray-700">Machine Learning</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-fuchsia-500 mr-2"></div>
                <span className="text-sm text-gray-700">Generative AI</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                <span className="text-sm text-gray-700">Applications</span>
              </div>
              <div className="flex items-center ml-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm text-gray-700">Click for details</span>
                </div>
              </div>
              <div className="flex items-center ml-4">
                <div className="flex items-center gap-2">
                  <MousePointer2 className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm text-gray-700">Hover to see connections</span>
                </div>
              </div>
            </div>
            
            <svg 
              ref={svgRef}
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
              className="w-full border border-gray-100 rounded-xl bg-white shadow-sm"
            >
              {/* Grid lines for visualization (optional) */}
              {/* <g className="grid-lines opacity-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <line 
                    key={`h-${i}`} 
                    x1={padding} 
                    y1={padding + i * gridSize} 
                    x2={viewBoxWidth - padding} 
                    y2={padding + i * gridSize} 
                    stroke="#aaa" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line 
                    key={`v-${i}`} 
                    x1={padding + i * gridSize} 
                    y1={padding} 
                    x2={padding + i * gridSize} 
                    y2={viewBoxHeight - padding} 
                    stroke="#aaa" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                  />
                ))}
              </g> */}
              
              {/* Connecting lines between nodes */}
              <g className="connecting-paths">
                {getConnectingPaths()}
              </g>
              
              {/* Skill nodes */}
              <g className="skill-nodes">
                {skills.map(skill => {
                  const { x, y } = getNodePosition(skill.position);
                  const isActive = activeSkill?.id === skill.id;
                  const isHovered = hoveredSkill?.id === skill.id;
                  
                  const size = isActive ? 50 : (isHovered ? 48 : 45);
                  const iconSize = isActive ? 24 : (isHovered ? 22 : 20);
                  
                  const skillColor = getSkillColor(skill.category, isActive, isHovered);
                  const skillBg = getSkillBackground(skill.category, isActive, isHovered);
                  const skillBorder = getSkillBorder(skill.category, isActive, isHovered);
                  
                  return (
                    <g 
                      key={skill.id}
                      className="skill-node"
                      transform={`translate(${x - size/2}, ${y - size/2})`}
                      onClick={() => handleNodeClick(skill)}
                      onMouseEnter={(e) => handleNodeHover(skill, e)}
                      onMouseLeave={handleNodeLeave}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Node background */}
                      <rect
                        width={size}
                        height={size}
                        rx={10}
                        ry={10}
                        fill={skillBg}
                        stroke={skillBorder}
                        strokeWidth={2}
                        className="transition-all duration-300 ease-in-out"
                      />
                      
                      {/* Node icon */}
                      <foreignObject 
                        width={size} 
                        height={size}
                        className="flex items-center justify-center pointer-events-none"
                      >
                        <div className="h-full w-full flex items-center justify-center">
                          <div className={`text-[${skillColor}]`}>
                            {React.cloneElement(skill.icon as React.ReactElement, {
                              size: iconSize,
                              color: skillColor,
                              className: "transition-all duration-300"
                            })}
                          </div>
                        </div>
                      </foreignObject>
                      
                      {/* Small dots indicating skill level */}
                      <g className="skill-level flex" transform={`translate(${size - 20}, ${size - 15})`}>
                        {Array.from({ length: skill.level }).map((_, i) => (
                          <circle
                            key={`level-${i}`}
                            cx={i * 6}
                            cy={0}
                            r={2}
                            fill={skillColor}
                          />
                        ))}
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
            
            {/* Tooltip for hovering */}
            <AnimatePresence>
              {hoveredSkill && (
                <motion.div
                  className="skill-tooltip absolute"
                  style={{
                    top: tooltipPosition.y,
                    left: tooltipPosition.x,
                    transform: 'translate(-50%, -100%)',
                    zIndex: 100,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white px-4 py-2 rounded-md shadow-lg border border-gray-200 text-center">
                    <p className="font-medium text-gray-900">{hoveredSkill.name}</p>
                    <p className="text-xs text-gray-600">{hoveredSkill.points} points</p>
                  </div>
                  <div 
                    className="tooltip-arrow absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2"
                    style={{ 
                      width: '8px', 
                      height: '8px', 
                      backgroundColor: 'white',
                      borderRight: '1px solid #e5e7eb',
                      borderBottom: '1px solid #e5e7eb',
                      transform: 'translate(-50%, -50%) rotate(45deg)'
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Skill detail panel */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              className="skill-detail-panel bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <div className={`p-3 rounded-lg mr-4 text-${activeSkill.category === 'foundation' ? 'indigo' : 
                                         activeSkill.category === 'data' ? 'cyan' : 
                                         activeSkill.category === 'ml' ? 'violet' : 
                                         activeSkill.category === 'genai' ? 'fuchsia' : 
                                         'emerald'}-600 bg-${activeSkill.category === 'foundation' ? 'indigo' : 
                                                 activeSkill.category === 'data' ? 'cyan' : 
                                                 activeSkill.category === 'ml' ? 'violet' : 
                                                 activeSkill.category === 'genai' ? 'fuchsia' : 
                                                 'emerald'}-100`}>
                  {activeSkill.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{activeSkill.name}</h3>
                    <div className="text-sm font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      {activeSkill.points} Points
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{activeSkill.description}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {activeSkill.dependencies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Prerequisites</h4>
                        <ul className="text-sm text-gray-600">
                          {activeSkill.dependencies.map(depId => {
                            const dep = skills.find(s => s.id === depId);
                            return dep ? (
                              <li key={depId} className="flex items-center py-1">
                                <span className="text-gray-600">• {dep.name}</span>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                    
                    {/* Find skills that depend on this one */}
                    {(() => {
                      const dependents = skills.filter(s => s.dependencies.includes(activeSkill.id));
                      return dependents.length > 0 ? (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">Unlocks</h4>
                          <ul className="text-sm text-gray-600">
                            {dependents.map(dep => (
                              <li key={dep.id} className="flex items-center py-1">
                                <span className="text-gray-600">• {dep.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null;
                    })()}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Skill Level</h4>
                      <div className="flex items-center mt-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-8 h-2 rounded-full mr-1 ${i < activeSkill.level ? 
                              activeSkill.category === 'foundation' ? 'bg-indigo-500' :
                              activeSkill.category === 'data' ? 'bg-cyan-500' :
                              activeSkill.category === 'ml' ? 'bg-violet-500' :
                              activeSkill.category === 'genai' ? 'bg-fuchsia-500' :
                              'bg-emerald-500'
                              : 'bg-gray-200'}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          {activeSkill.level === 1 ? 'Beginner' : 
                           activeSkill.level === 2 ? 'Intermediate' : 
                           'Advanced'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <button 
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
                        onClick={() => setActiveSkill(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-6">
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our curriculum is structured to build your AI skills progressively, from foundational 
            programming knowledge to advanced generative AI applications. Each skill unlocks new possibilities
            in your AI journey.
          </p>
        </div>
      </div>
    </section>
  );
}