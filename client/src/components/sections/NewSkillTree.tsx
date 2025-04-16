import React, { useState } from 'react';
import { 
  Brain, Code, Database, Sparkles, Bot, Cpu, LineChart,
  Workflow, Globe, Shield, LucideIcon, Info, Check, MousePointer
} from 'lucide-react';

// Define the Skill type
interface Skill {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  level: number; // 1 = beginner, 2 = intermediate, 3 = advanced
  category: 'foundation' | 'data' | 'ml' | 'genai' | 'application' | 'ethics';
  points: number;
  x: number; // position in grid
  y: number; // position in grid
  dependencies: string[];
}

export default function NewSkillTree() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredConnections, setHoveredConnections] = useState<string[]>([]);

  // Define skill data
  const skills: Skill[] = [
    // Foundation Skills
    { 
      id: 'python',
      name: 'Python Programming',
      description: 'Master the fundamentals of Python, the primary language used in AI and data science.',
      icon: <Code size={24} />,
      level: 1,
      category: 'foundation',
      points: 10,
      x: 1,
      y: 0,
      dependencies: []
    },
    { 
      id: 'data-structures',
      name: 'Data Structures',
      description: 'Learn essential data structures for efficient algorithm implementation and data manipulation.',
      icon: <Database size={24} />,
      level: 1,
      category: 'foundation',
      points: 15,
      x: 3,
      y: 0,
      dependencies: ['python']
    },
    
    // Data Skills
    { 
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Process, clean, and analyze data using pandas, numpy and visualization libraries.',
      icon: <LineChart size={24} />,
      level: 1,
      category: 'data',
      points: 20,
      x: 0,
      y: 1,
      dependencies: ['python']
    },
    { 
      id: 'data-visualization',
      name: 'Data Visualization',
      description: 'Create insightful visualizations to communicate complex data patterns and insights.',
      icon: <LineChart size={24} />,
      level: 2,
      category: 'data',
      points: 15,
      x: 2,
      y: 1,
      dependencies: ['data-analysis']
    },
    
    // ML Skills
    { 
      id: 'ml-basics',
      name: 'ML Fundamentals',
      description: 'Understand core machine learning concepts, algorithms, and their applications.',
      icon: <Brain size={24} />,
      level: 2,
      category: 'ml',
      points: 25,
      x: 4,
      y: 1,
      dependencies: ['data-structures']
    },
    { 
      id: 'deep-learning',
      name: 'Deep Learning',
      description: 'Master neural networks architecture, training, and optimization techniques.',
      icon: <Cpu size={24} />,
      level: 3,
      category: 'ml',
      points: 30,
      x: 1,
      y: 2,
      dependencies: ['ml-basics', 'data-visualization']
    },
    
    // GenAI Skills
    { 
      id: 'llm-basics',
      name: 'LLM Fundamentals',
      description: 'Learn about large language models, their capabilities, and applications.',
      icon: <Bot size={24} />,
      level: 2,
      category: 'genai',
      points: 25,
      x: 3,
      y: 2,
      dependencies: ['ml-basics']
    },
    { 
      id: 'prompt-engineering',
      name: 'Prompt Engineering',
      description: 'Master the art of crafting effective prompts to get optimal results from AI models.',
      icon: <Sparkles size={24} />,
      level: 2,
      category: 'genai',
      points: 20,
      x: 0,
      y: 3,
      dependencies: ['llm-basics']
    },
    { 
      id: 'generative-models',
      name: 'Generative Models',
      description: 'Explore different types of generative AI models beyond LLMs, including image and audio generation.',
      icon: <Sparkles size={24} />,
      level: 3,
      category: 'genai',
      points: 30,
      x: 2,
      y: 3,
      dependencies: ['deep-learning', 'llm-basics']
    },
    
    // Application Skills
    { 
      id: 'ai-applications',
      name: 'AI Applications',
      description: 'Build practical applications that leverage AI capabilities to solve real-world problems.',
      icon: <Workflow size={24} />,
      level: 3,
      category: 'application',
      points: 35,
      x: 4,
      y: 3,
      dependencies: ['generative-models', 'prompt-engineering']
    },
    
    // Ethics Skills
    { 
      id: 'ai-ethics',
      name: 'AI Ethics',
      description: 'Understand ethical considerations in AI development, including bias detection and responsible AI.',
      icon: <Shield size={24} />,
      level: 2,
      category: 'ethics',
      points: 20,
      x: 2,
      y: 4,
      dependencies: ['llm-basics', 'ai-applications']
    },
    { 
      id: 'ai-governance',
      name: 'AI Governance',
      description: 'Learn about AI policy, regulations, and governance frameworks for responsible AI deployment.',
      icon: <Globe size={24} />,
      level: 3,
      category: 'ethics',
      points: 25,
      x: 4,
      y: 4,
      dependencies: ['ai-ethics']
    }
  ];

  // Get skill color by category
  const getSkillColor = (category: string, isHovered: boolean, isSelected: boolean) => {
    const colors = {
      foundation: { 
        normal: '#818cf8', // indigo-400
        active: '#6366f1'  // indigo-500
      },
      data: { 
        normal: '#22d3ee', // cyan-400
        active: '#06b6d4'  // cyan-500
      },
      ml: { 
        normal: '#c084fc', // purple-400
        active: '#a855f7'  // purple-500
      },
      genai: { 
        normal: '#e879f9', // fuchsia-400
        active: '#d946ef'  // fuchsia-500
      },
      application: { 
        normal: '#2dd4bf', // teal-400
        active: '#14b8a6'  // teal-500
      },
      ethics: { 
        normal: '#fb7185', // rose-400
        active: '#f43f5e'  // rose-500
      }
    };
    
    const categoryColors = colors[category as keyof typeof colors];
    return isHovered || isSelected ? categoryColors.active : categoryColors.normal;
  };

  // Get grid position in pixels
  const getGridPosition = (x: number, y: number) => {
    const gridSize = 160;
    const offsetX = 80;
    const offsetY = 80;
    
    return {
      x: offsetX + x * gridSize,
      y: offsetY + y * gridSize
    };
  };

  // Handle mouse hover on a skill node
  const handleSkillHover = (skill: Skill | null) => {
    setHoveredSkill(skill);
    
    if (skill) {
      // Find direct dependencies and dependents
      const dependencies = skill.dependencies;
      const dependents = skills.filter(s => s.dependencies.includes(skill.id)).map(s => s.id);
      
      // Set all connections to be highlighted
      setHoveredConnections([
        ...dependencies,
        ...dependents.map(depId => `${skill.id}-${depId}`)
      ]);
    } else {
      setHoveredConnections([]);
    }
  };

  // Handle click on a skill node
  const handleSkillClick = (skill: Skill) => {
    if (selectedSkill && selectedSkill.id === skill.id) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  };

  // Generate connecting paths between skills
  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    skills.forEach(skill => {
      if (skill.dependencies.length > 0) {
        skill.dependencies.forEach(depId => {
          const sourceSkill = skills.find(s => s.id === depId);
          
          if (sourceSkill) {
            const sourcePos = getGridPosition(sourceSkill.x, sourceSkill.y);
            const targetPos = getGridPosition(skill.x, skill.y);
            
            const connectionId = `${depId}-${skill.id}`;
            const isSourceHovered = hoveredSkill?.id === sourceSkill.id;
            const isTargetHovered = hoveredSkill?.id === skill.id;
            const isHighlighted = hoveredConnections.includes(depId) || 
                                hoveredConnections.includes(connectionId);
            
            const strokeColor = getSkillColor(
              skill.category, 
              isSourceHovered || isTargetHovered,
              false
            );
            
            connections.push(
              <path
                key={connectionId}
                d={`M ${sourcePos.x} ${sourcePos.y} L ${targetPos.x} ${targetPos.y}`}
                stroke={strokeColor}
                strokeWidth={isHighlighted ? 3 : 1.5}
                opacity={isHighlighted ? 0.8 : 0.3}
                strokeDasharray={isHighlighted ? "none" : "8,4"}
                className="transition-all duration-300"
              />
            );
          }
        });
      }
    });
    
    return connections;
  };

  // Calculate SVG viewBox dimensions based on grid layout
  const maxX = Math.max(...skills.map(s => s.x)) + 1;
  const maxY = Math.max(...skills.map(s => s.y)) + 1;
  const viewBoxWidth = maxX * 160 + 160;
  const viewBoxHeight = maxY * 160 + 160;

  return (
    <section id="skill-tree" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-violet-200 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-4">SKILL DEVELOPMENT</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 text-gray-900">
            Your <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Skill Tree</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Explore the skills you'll develop throughout the AI Learning Hub program.
            Hover over any skill to see its connections and click for more details.
          </p>
        </div>

        <div className="skill-tree-container mb-8 rounded-xl border border-gray-200 shadow-lg bg-white p-4 overflow-hidden">
          {/* Skill tree legend */}
          <div className="skill-tree-legend flex flex-wrap justify-center gap-4 mb-6 px-4 py-2 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
              <span className="text-sm text-gray-700">Foundation</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-400 mr-2"></div>
              <span className="text-sm text-gray-700">Data</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
              <span className="text-sm text-gray-700">Machine Learning</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-fuchsia-400 mr-2"></div>
              <span className="text-sm text-gray-700">Generative AI</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
              <span className="text-sm text-gray-700">Applications</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-rose-400 mr-2"></div>
              <span className="text-sm text-gray-700">Ethics</span>
            </div>
            <div className="flex items-center gap-1 ml-4">
              <MousePointer className="w-4 h-4 text-indigo-500" />
              <span className="text-sm text-gray-700">Hover to see connections</span>
            </div>
            <div className="flex items-center gap-1">
              <Info className="w-4 h-4 text-indigo-500" />
              <span className="text-sm text-gray-700">Click for details</span>
            </div>
          </div>
          
          {/* Interactive skill tree visualization */}
          <div className="overflow-auto min-h-[500px]">
            <svg 
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} 
              className="w-full min-w-[800px]"
              style={{ minHeight: '500px' }}
            >
              {/* Connections between skills */}
              <g className="connections">
                {renderConnections()}
              </g>
              
              {/* Skill nodes */}
              <g className="skill-nodes">
                {skills.map(skill => {
                  const { x, y } = getGridPosition(skill.x, skill.y);
                  const isHovered = hoveredSkill?.id === skill.id;
                  const isSelected = selectedSkill?.id === skill.id;
                  
                  return (
                    <g 
                      key={skill.id}
                      transform={`translate(${x}, ${y})`}
                      className="cursor-pointer"
                      onMouseEnter={() => handleSkillHover(skill)}
                      onMouseLeave={() => handleSkillHover(null)}
                      onClick={() => handleSkillClick(skill)}
                    >
                      {/* Shadow for elevated effect */}
                      <circle
                        cx="0"
                        cy="0"
                        r="38"
                        fill="rgba(0,0,0,0.1)"
                        transform={isHovered || isSelected ? "translate(3, 3)" : "translate(2, 2)"}
                        className="transition-all duration-300"
                      />
                      
                      {/* Main circle */}
                      <circle
                        cx="0"
                        cy="0"
                        r="38"
                        fill="white"
                        stroke={getSkillColor(skill.category, isHovered, isSelected)}
                        strokeWidth={isHovered || isSelected ? "3" : "2"}
                        className={`transition-all duration-300 ${
                          isHovered || isSelected ? "filter drop-shadow-lg" : ""
                        }`}
                      />
                      
                      {/* Background glow for hover/selected state */}
                      <circle
                        cx="0"
                        cy="0"
                        r="34"
                        fill={getSkillColor(skill.category, isHovered, isSelected)}
                        opacity={isHovered || isSelected ? "0.1" : "0"}
                        className="transition-all duration-300"
                      />
                      
                      {/* Skill icon */}
                      <foreignObject
                        x="-20"
                        y="-20"
                        width="40"
                        height="40"
                        className="pointer-events-none"
                      >
                        <div className="h-full w-full flex items-center justify-center">
                          <div 
                            style={{ 
                              color: getSkillColor(skill.category, isHovered, isSelected),
                              transform: isHovered || isSelected ? "scale(1.1)" : "scale(1)"
                            }}
                            className="transition-all duration-300"
                          >
                            {skill.icon}
                          </div>
                        </div>
                      </foreignObject>
                      
                      {/* Skill name */}
                      <text
                        x="0"
                        y="55"
                        textAnchor="middle"
                        className="font-medium text-sm fill-gray-900"
                      >
                        {skill.name}
                      </text>
                      
                      {/* Skill level indicator */}
                      <g transform="translate(0, -48)">
                        {[...Array(skill.level)].map((_, i) => (
                          <circle
                            key={i}
                            cx={i * 6 - (skill.level - 1) * 3}
                            cy="0"
                            r="2"
                            fill={getSkillColor(skill.category, isHovered, isSelected)}
                            className="transition-all duration-300"
                          />
                        ))}
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
        
        {/* Selected skill details card */}
        {selectedSkill && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-2xl mx-auto mb-8 animate-fadeIn">
            <div className="flex items-start">
              <div 
                className="p-3 rounded-lg mr-4" 
                style={{ 
                  backgroundColor: `${getSkillColor(selectedSkill.category, true, true)}20`,
                  color: getSkillColor(selectedSkill.category, true, true)
                }}
              >
                {selectedSkill.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{selectedSkill.name}</h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Level:</span>
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < selectedSkill.level 
                              ? `bg-${selectedSkill.category === 'foundation' ? 'indigo' : 
                                selectedSkill.category === 'data' ? 'cyan' : 
                                selectedSkill.category === 'ml' ? 'purple' : 
                                selectedSkill.category === 'genai' ? 'fuchsia' : 
                                selectedSkill.category === 'application' ? 'teal' : 'rose'}-500` 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{selectedSkill.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Prerequisites</h4>
                    {selectedSkill.dependencies.length > 0 ? (
                      <ul className="space-y-1">
                        {selectedSkill.dependencies.map(depId => {
                          const dependency = skills.find(s => s.id === depId);
                          return dependency ? (
                            <li 
                              key={depId} 
                              className="text-sm text-gray-600 flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                const dep = skills.find(s => s.id === depId);
                                if (dep) handleSkillClick(dep);
                              }}
                            >
                              <Check className="h-3 w-3 mr-1 text-green-500" />
                              {dependency.name}
                            </li>
                          ) : null;
                        })}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No prerequisites</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Unlocks</h4>
                    {skills.filter(s => s.dependencies.includes(selectedSkill.id)).length > 0 ? (
                      <ul className="space-y-1">
                        {skills
                          .filter(s => s.dependencies.includes(selectedSkill.id))
                          .map(dependent => (
                            <li 
                              key={dependent.id} 
                              className="text-sm text-gray-600 flex items-center cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSkillClick(dependent);
                              }}
                            >
                              <Check className="h-3 w-3 mr-1 text-green-500" />
                              {dependent.name}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Advanced skill (terminal node)</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Skill points:</span>
                    <span 
                      className="text-sm font-bold" 
                      style={{ color: getSkillColor(selectedSkill.category, true, true) }}
                    >
                      {selectedSkill.points} points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}