import React, { useEffect, useState } from 'react';
import { Shield, Cpu, Microchip, Terminal, Brain, Database, LineChart } from 'lucide-react';

interface SkillProgressProps {
  name: string;
  icon: React.ReactNode;
  startValue: number;
  endValue: number;
  color: string;
  description: string;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ 
  name, 
  icon, 
  startValue, 
  endValue, 
  color,
  description
}) => {
  const [progress, setProgress] = useState(startValue);
  
  useEffect(() => {
    // Create an intersection observer to trigger animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start the animation when the element comes into view
          const interval = setInterval(() => {
            setProgress(prev => {
              if (prev >= endValue) {
                clearInterval(interval);
                return endValue;
              }
              return prev + 1;
            });
          }, 20);
          
          // Unobserve after triggering
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    // Find the element with the data-skill attribute matching the name
    const element = document.querySelector(`[data-skill="${name}"]`);
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [name, endValue]);
  
  return (
    <div 
      className="p-5 bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-purple-500/30 transition-all duration-500 relative group overflow-hidden shadow-lg hover:shadow-purple-500/10 transform hover:-translate-y-1" 
      data-skill={name}
    >
      {/* Background tech pattern with gradient opacity */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTAgTDUwIDEwIEw1MCA1MCBMMTAgNTAgWiIgc3Ryb2tlPSIjZmZmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxwYXRoIGQ9Ik0yMCAyMCBMNDAgMjAgTDQwIDQwIEwyMCA0MCBaIiBzdHJva2U9IiNmZmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iMTAiIHI9IjIiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIxMCIgY3k9IjUwIiByPSIyIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]"></div>
      
      {/* Highlight glow effects */}
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"
        style={{ backgroundColor: color === 'cyan' ? 'rgba(34, 211, 238, 0.2)' : 
                               color === 'blue' ? 'rgba(96, 165, 250, 0.2)' : 
                               color === 'indigo' ? 'rgba(129, 140, 248, 0.2)' : 
                               color === 'purple' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(34, 211, 238, 0.2)' }}
      ></div>
      
      <div 
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 delay-100"
        style={{ backgroundColor: color === 'cyan' ? 'rgba(34, 211, 238, 0.1)' : 
                               color === 'blue' ? 'rgba(96, 165, 250, 0.1)' : 
                               color === 'indigo' ? 'rgba(129, 140, 248, 0.1)' : 
                               color === 'purple' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(34, 211, 238, 0.1)' }}
      ></div>
      
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div className="flex items-center">
          <div 
            className="p-2.5 mr-3 rounded-lg border transform group-hover:scale-110 transition-transform duration-300"
            style={{ 
              backgroundColor: color === 'cyan' ? 'rgba(34, 211, 238, 0.1)' : 
                            color === 'blue' ? 'rgba(96, 165, 250, 0.1)' : 
                            color === 'indigo' ? 'rgba(129, 140, 248, 0.1)' : 
                            color === 'purple' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(34, 211, 238, 0.1)',
              borderColor: color === 'cyan' ? 'rgba(34, 211, 238, 0.3)' : 
                          color === 'blue' ? 'rgba(96, 165, 250, 0.3)' : 
                          color === 'indigo' ? 'rgba(129, 140, 248, 0.3)' : 
                          color === 'purple' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(34, 211, 238, 0.3)',
              color: color === 'cyan' ? '#22d3ee' : 
                    color === 'blue' ? '#60a5fa' : 
                    color === 'indigo' ? '#818cf8' : 
                    color === 'purple' ? '#c084fc' : '#22d3ee'
            }}
          >
            {icon}
          </div>
          <h4 className="font-bold text-white text-lg">{name}</h4>
        </div>
        <div className="text-xl font-mono font-bold text-gray-300 group-hover:animate-pulse transition-colors duration-300">
          <span style={{ 
            color: color === 'cyan' ? '#22d3ee' : 
                  color === 'blue' ? '#60a5fa' : 
                  color === 'indigo' ? '#818cf8' : 
                  color === 'purple' ? '#c084fc' : '#22d3ee'
          }}>{progress}</span>
          <span className="text-gray-500">/100</span>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4 text-sm relative z-10">{description}</p>
      
      <div className="h-2.5 w-full bg-gray-900 rounded-full overflow-hidden shadow-inner relative z-10">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out shadow-lg relative"
          style={{ 
            width: `${progress}%`,
            background: color === 'cyan' ? 'linear-gradient(to right, #0891b2, #22d3ee)' : 
                      color === 'blue' ? 'linear-gradient(to right, #1d4ed8, #60a5fa)' : 
                      color === 'indigo' ? 'linear-gradient(to right, #4338ca, #818cf8)' : 
                      color === 'purple' ? 'linear-gradient(to right, rgb(147, 51, 234), rgb(192, 132, 252))' : 
                      'linear-gradient(to right, rgb(125, 39, 169), rgb(45, 212, 191))'
          }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
        </div>
      </div>
      
      {/* Terminal-like progress indicator */}
      <div className="mt-3 flex justify-between relative z-10">
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
          <span className="text-xs font-mono text-gray-500">ailh.skills.tracking</span>
        </div>
        <div className="text-xs font-mono" style={{ 
          color: progress < endValue ? '#9ca3af' : 
                 color === 'cyan' ? '#22d3ee' : 
                 color === 'blue' ? '#60a5fa' : 
                 color === 'indigo' ? '#818cf8' : 
                 color === 'purple' ? '#c084fc' : '#22d3ee'
        }}>
          {progress < endValue ? 'loading...' : 'complete'}
        </div>
      </div>
    </div>
  );
};

export default function SkillsTracker() {
  const skills = [
    {
      name: "AI Fundamentals",
      icon: <Brain size={20} />,
      startValue: 0,
      endValue: 95,
      color: "purple",
      description: "Core concepts, history, and theories of artificial intelligence"
    },
    {
      name: "ML Techniques",
      icon: <LineChart size={20} />,
      startValue: 0,
      endValue: 88,
      color: "cyan",
      description: "Machine learning algorithms and statistical analysis methods"
    },
    {
      name: "GenAI Tools",
      icon: <Cpu size={20} />,
      startValue: 0,
      endValue: 93,
      color: "purple",
      description: "Working with GPT models, image generators, and other AI tools"
    },
    {
      name: "Data Processing",
      icon: <Database size={20} />,
      startValue: 0,
      endValue: 85,
      color: "cyan",
      description: "Collecting, cleaning, and preparing data for AI applications"
    },
    {
      name: "Prompt Engineering",
      icon: <Terminal size={20} />,
      startValue: 0,
      endValue: 90,
      color: "purple",
      description: "Designing effective prompts for optimal AI model responses"
    },
    {
      name: "AI Applications",
      icon: <Microchip size={20} />,
      startValue: 0,
      endValue: 82,
      color: "cyan",
      description: "Building practical real-world AI systems and integrations"
    },
    {
      name: "AI Ethics",
      icon: <Shield size={20} />,
      startValue: 0,
      endValue: 78,
      color: "purple",
      description: "Responsible AI development, bias detection, and governance"
    }
  ];

  return (
    <section id="skills" className="py-24 bg-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9IiM4YjVjZjYxMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-cyan-500/5 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-600/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <div className="w-20 h-20 bg-purple-900/20 rounded-full blur-3xl"></div>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-900/30 text-purple-400 font-semibold text-sm mb-4 relative border border-purple-500/30 animate-pulse">SKILLS YOU'LL GAIN</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 relative text-white">
            Track Your <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Progress</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg relative">
            Our curriculum is designed to build your technical and practical skills progressively, regardless of your starting point. Monitor your growth as you advance through the program.
          </p>
          <div className="absolute -z-10 bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-1.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-sm"></div>
        </div>

        {/* Terminal-style header */}
        <div className="mb-8 bg-gray-900 rounded-t border border-gray-800 p-3 flex items-center shadow-lg">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-purple-500/30 mr-2 animate-pulse"></div>
            <span className="font-mono text-sm text-gray-400">ailh_skills_tracker</span>
          </div>
          <div className="hidden md:flex items-center space-x-1 text-xs font-mono text-gray-500">
            <span>user:student</span>
            <span className="mx-1">|</span>
            <span className="text-cyan-400">status:active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillProgress
              key={skill.name}
              name={skill.name}
              icon={skill.icon}
              startValue={skill.startValue}
              endValue={skill.endValue}
              color={skill.color}
              description={skill.description}
            />
          ))}
        </div>
        
        {/* Terminal-style footer */}
        <div className="mt-8 p-4 bg-gray-900 rounded-b border border-gray-800 font-mono text-sm text-gray-500 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-green-400">$</span>
              <span className="ml-2">system.info: Skills monitored throughout the 5-month AILH program</span>
            </div>
            <div className="hidden md:flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
              <span className="text-cyan-400">ailh-progress-monitoring-active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}