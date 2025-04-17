import { useState } from "react";
import { Check, ArrowRight, Brain, Cpu, Braces, Microchip, Sparkles, Terminal, Database, Bot, ImagePlus, Code, Headphones, Leaf, Shield, User, Users, Globe, Lightbulb, Rocket, Zap, Search, FileText, Workflow, Book } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  weeks: number;
  skills: string[];
  icon: React.ReactNode;
  tools: string[];
  projects: string[];
  color: string;
  dependencies: string[];
}

export default function LearningPath() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [highlightPath, setHighlightPath] = useState<string[]>([]);

  // Define the modules and their relationships based on BuildSchool curriculum
  const modules: Module[] = [
    {
      id: "ai-foundations",
      title: "AI Foundations",
      description: "Introduction to AI concepts, terminology, and understanding Large Language Models (LLMs). Learn about ethical considerations in AI development.",
      weeks: 2,
      skills: ["AI Terminology", "LLM Understanding", "Ethical AI", "AI Applications"],
      icon: <Brain className="h-5 w-5" />,
      tools: ["ChatGPT", "Claude", "Gemini", "Basic Prompt Writing"],
      projects: ["AI Use-Case Analysis", "Ethical AI Implementation Plan"],
      color: "red",
      dependencies: []
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      description: "Master the art of crafting effective prompts for AI systems. Learn techniques to improve AI outputs and responses.",
      weeks: 1,
      skills: ["Prompt Design", "Few-shot Learning", "Chain-of-Thought", "System Prompts"],
      icon: <Terminal className="h-5 w-5" />,
      tools: ["OpenAI Playground", "Claude Console", "Prompt Libraries"],
      projects: ["Prompt Template Library", "Specialized Prompt Development"],
      color: "orange",
      dependencies: ["ai-foundations"]
    },
    {
      id: "conversational-ai",
      title: "Conversational AI",
      description: "Learn to work with and optimize conversational AI systems for customer service, support, and virtual assistants.",
      weeks: 1,
      skills: ["Chatbot Design", "Conversation Flow", "Response Optimization", "User Experience"],
      icon: <Bot className="h-5 w-5" />,
      tools: ["GPT-4o", "Claude 3", "Gemini", "Custom GPTs"],
      projects: ["Customer Service Bot", "AI Assistant Development"],
      color: "amber",
      dependencies: ["prompt-engineering"]
    },
    {
      id: "image-generation",
      title: "Image Generation",
      description: "Master techniques for generating and editing images with AI. Learn to create visual assets for various purposes.",
      weeks: 1,
      skills: ["Text-to-Image", "Image Editing", "Style Guidance", "Visual Composition"],
      icon: <ImagePlus className="h-5 w-5" />,
      tools: ["DALL-E 3", "Midjourney", "Stable Diffusion", "Adobe Firefly"],
      projects: ["Visual Brand Asset Generator", "Creative Image Portfolio"],
      color: "rose",
      dependencies: ["prompt-engineering"]
    },
    {
      id: "audio-video-ai",
      title: "Audio & Video AI",
      description: "Explore tools for creating and editing audio and video content using AI technologies.",
      weeks: 1,
      skills: ["Text-to-Speech", "Voice Cloning", "Video Generation", "Content Editing"],
      icon: <Headphones className="h-5 w-5" />,
      tools: ["ElevenLabs", "Descript", "Runway", "Pika"],
      projects: ["AI Voice Assistant", "Video Content Generator"],
      color: "red",
      dependencies: ["image-generation"]
    },
    {
      id: "ai-research",
      title: "AI Research & Analysis",
      description: "Learn how to leverage AI for research, data analysis, and information synthesis.",
      weeks: 1,
      skills: ["Information Retrieval", "Data Analysis", "Content Summarization", "Research Methods"],
      icon: <Search className="h-5 w-5" />,
      tools: ["Bing AI", "Perplexity", "Claude Opus", "Research Agents"],
      projects: ["Market Research Analysis", "Data Insights Report"],
      color: "orange",
      dependencies: ["conversational-ai"]
    },
    {
      id: "content-generation",
      title: "Content Generation",
      description: "Master AI-assisted content creation for marketing, blogs, social media, and other channels.",
      weeks: 1,
      skills: ["Copywriting", "SEO Content", "Social Media", "Brand Voice"],
      icon: <FileText className="h-5 w-5" />,
      tools: ["GPT-4", "Claude", "AI Writing Assistants", "SEO Tools"],
      projects: ["Content Marketing Campaign", "Multi-channel Content Strategy"],
      color: "amber",
      dependencies: ["ai-research"]
    },
    {
      id: "rag-systems",
      title: "RAG Systems",
      description: "Learn to build Retrieval Augmented Generation systems that combine LLMs with custom knowledge bases.",
      weeks: 2,
      skills: ["Vector Databases", "Document Processing", "Knowledge Retrieval", "System Architecture"],
      icon: <Database className="h-5 w-5" />,
      tools: ["LangChain", "LlamaIndex", "Pinecone", "Chroma DB"],
      projects: ["Custom Knowledge Base", "Industry-specific RAG Application"],
      color: "rose",
      dependencies: ["content-generation"]
    },
    {
      id: "ai-agents",
      title: "AI Agents & Assistants",
      description: "Build autonomous AI agents that can perform complex tasks and workflows.",
      weeks: 2,
      skills: ["Agent Design", "Tool Use", "Workflow Automation", "System Integration"],
      icon: <Workflow className="h-5 w-5" />,
      tools: ["OpenAI Assistants API", "AutoGPT", "LangChain Agents", "Function Calling"],
      projects: ["Autonomous Business Assistant", "Multi-agent System"],
      color: "red",
      dependencies: ["rag-systems"]
    },
    {
      id: "ai-applications",
      title: "AI Applications",
      description: "Learn to integrate AI into applications and services using APIs and development frameworks.",
      weeks: 3,
      skills: ["API Integration", "UX/UI for AI", "Deployment", "Performance Optimization"],
      icon: <Code className="h-5 w-5" />,
      tools: ["OpenAI API", "Anthropic API", "Frontend Frameworks", "Backend Services"],
      projects: ["End-to-end AI Application", "AI-powered Web Service"],
      color: "orange",
      dependencies: ["ai-agents"]
    },
    {
      id: "industry-projects",
      title: "Industry AI Projects",
      description: "Apply your skills to real-world industry challenges and build portfolio-ready projects.",
      weeks: 3,
      skills: ["Business Automation", "Customer Service", "Content Operations", "AI Strategy"],
      icon: <Rocket className="h-5 w-5" />,
      tools: ["Project Management Tools", "AI Development Stack", "Analytics"],
      projects: ["Business Process Automation", "Industry-specific AI Solution"],
      color: "amber",
      dependencies: ["ai-applications"]
    },
    {
      id: "internship-phase",
      title: "Internship Phase",
      description: "Apply your skills in a real-world environment with industry mentorship.",
      weeks: 8, // 2 months
      skills: ["Project Management", "Teamwork", "Problem-solving", "Communication"],
      icon: <Users className="h-5 w-5" />,
      tools: ["Industry Tools", "Team Collaboration Software", "Version Control"],
      projects: ["Industry Project", "Portfolio Development"],
      color: "rose",
      dependencies: ["industry-projects"]
    },
    {
      id: "certification",
      title: "Certification",
      description: "Receive your program certification and prepare for the job market.",
      weeks: 1,
      skills: ["Portfolio Presentation", "Interview Skills", "Networking"],
      icon: <Book className="h-5 w-5" />,
      tools: ["Portfolio Platforms", "LinkedIn", "GitHub"],
      projects: ["Comprehensive Portfolio", "Job Application Strategy"],
      color: "red",
      dependencies: ["internship-phase"]
    }
  ];
  
  const handleModuleClick = (moduleId: string) => {
    if (activeModule === moduleId) {
      setActiveModule(null);
      setHighlightPath([]);
    } else {
      setActiveModule(moduleId);
      
      // Calculate the path
      const path = [moduleId];
      let current = moduleId;
      
      // Find all dependencies (backward path)
      while (true) {
        const module = modules.find(m => m.id === current);
        if (!module || module.dependencies.length === 0) break;
        
        const dependency = module.dependencies[0]; // Take the first dependency for simplicity
        path.unshift(dependency);
        current = dependency;
      }
      
      // Find all modules that depend on this module (forward path)
      const findDependents = (id: string): string[] => {
        const dependents: string[] = [];
        modules.forEach(module => {
          if (module.dependencies.includes(id)) {
            dependents.push(module.id);
            const subDependents = findDependents(module.id);
            dependents.push(...subDependents);
          }
        });
        return dependents;
      };
      
      const forward = findDependents(moduleId);
      path.push(...forward);
      
      setHighlightPath(path);
    }
  };
  
  // Convert weeks to months for display
  const getTotalDuration = () => {
    const totalWeeks = modules.reduce((sum, module) => sum + module.weeks, 0);
    const months = Math.floor(totalWeeks / 4);
    const remainingWeeks = totalWeeks % 4;
    return `${months} months${remainingWeeks > 0 ? ` ${remainingWeeks} weeks` : ''}`;
  };

  return (
    <section id="learning-path" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-700 font-semibold text-sm mb-4">LEARNING JOURNEY</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 text-gray-900">
            Your <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Learning Path</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Explore our comprehensive {getTotalDuration()} curriculum based on BuildSchool's modern AI training approach. 
            Click on any module to see details and dependencies.
          </p>
        </div>
        
        <div className="relative mb-12">
          {/* Main learning path container */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {modules.map((module) => {
              const isActive = activeModule === module.id;
              const isHighlighted = highlightPath.includes(module.id);
              const colorClasses = {
                red: {
                  bg: isActive ? "bg-red-600" : isHighlighted ? "bg-red-500" : "bg-red-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-red-700",
                  border: isActive ? "border-red-700" : isHighlighted ? "border-red-400" : "border-red-200",
                  icon: isActive ? "text-red-200" : isHighlighted ? "text-red-200" : "text-red-500",
                  shadow: isActive ? "shadow-lg shadow-red-200" : ""
                },
                orange: {
                  bg: isActive ? "bg-orange-600" : isHighlighted ? "bg-orange-500" : "bg-orange-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-orange-700",
                  border: isActive ? "border-orange-700" : isHighlighted ? "border-orange-400" : "border-orange-200",
                  icon: isActive ? "text-orange-200" : isHighlighted ? "text-orange-200" : "text-orange-500",
                  shadow: isActive ? "shadow-lg shadow-orange-200" : ""
                },
                amber: {
                  bg: isActive ? "bg-amber-600" : isHighlighted ? "bg-amber-500" : "bg-amber-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-amber-700",
                  border: isActive ? "border-amber-700" : isHighlighted ? "border-amber-400" : "border-amber-200",
                  icon: isActive ? "text-amber-200" : isHighlighted ? "text-amber-200" : "text-amber-500",
                  shadow: isActive ? "shadow-lg shadow-amber-200" : ""
                },
                rose: {
                  bg: isActive ? "bg-rose-600" : isHighlighted ? "bg-rose-500" : "bg-rose-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-rose-700",
                  border: isActive ? "border-rose-700" : isHighlighted ? "border-rose-400" : "border-rose-200",
                  icon: isActive ? "text-rose-200" : isHighlighted ? "text-rose-200" : "text-rose-500",
                  shadow: isActive ? "shadow-lg shadow-rose-200" : ""
                },
                purple: {
                  bg: isActive ? "bg-purple-600" : isHighlighted ? "bg-purple-500" : "bg-purple-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-purple-700",
                  border: isActive ? "border-purple-700" : isHighlighted ? "border-purple-400" : "border-purple-200",
                  icon: isActive ? "text-purple-200" : isHighlighted ? "text-purple-200" : "text-purple-500",
                  shadow: isActive ? "shadow-lg shadow-purple-200" : ""
                },
                blue: {
                  bg: isActive ? "bg-blue-600" : isHighlighted ? "bg-blue-500" : "bg-blue-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-blue-700",
                  border: isActive ? "border-blue-700" : isHighlighted ? "border-blue-400" : "border-blue-200",
                  icon: isActive ? "text-blue-200" : isHighlighted ? "text-blue-200" : "text-blue-500",
                  shadow: isActive ? "shadow-lg shadow-blue-200" : ""
                },
                green: {
                  bg: isActive ? "bg-green-600" : isHighlighted ? "bg-green-500" : "bg-green-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-green-700",
                  border: isActive ? "border-green-700" : isHighlighted ? "border-green-400" : "border-green-200",
                  icon: isActive ? "text-green-200" : isHighlighted ? "text-green-200" : "text-green-500",
                  shadow: isActive ? "shadow-lg shadow-green-200" : ""
                }
              };
              
              const colorClass = colorClasses[module.color as keyof typeof colorClasses];
              
              return (
                <div 
                  key={module.id} 
                  onClick={() => handleModuleClick(module.id)}
                  className={`relative cursor-pointer rounded-lg border ${colorClass.border} ${colorClass.bg} ${colorClass.text} px-4 py-3
                    transition-all duration-300 ${colorClass.shadow} hover:scale-105 
                    ${isActive ? 'transform scale-105 z-10' : 'hover:z-10'}`}
                >
                  <div className="flex items-center">
                    <div className={`rounded-full p-1.5 mr-2 ${isActive || isHighlighted ? 'bg-white/20' : 'bg-white'} ${colorClass.icon}`}>
                      {module.icon}
                    </div>
                    <span className="font-medium text-sm">{module.title}</span>
                    {module.dependencies.length > 0 && (
                      <div className={`ml-2 text-xs px-1.5 py-0.5 rounded-full bg-white/20 ${isActive || isHighlighted ? 'text-white/90' : ''}`}>
                        {module.weeks}w
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Module Details Card (shown when a module is active) */}
          {activeModule && (
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 max-w-4xl mx-auto mb-8 transform transition-all duration-300 animate-fadeIn">
              {modules
                .filter(module => module.id === activeModule)
                .map(module => (
                  <div key={module.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className={`p-3 rounded-lg mr-4 bg-${module.color}-100 text-${module.color}-600`}>
                          {module.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                          <p className="text-gray-600">{module.weeks} weeks</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {module.dependencies.map(dep => {
                          const dependency = modules.find(m => m.id === dep);
                          if (!dependency) return null;
                          return (
                            <div 
                              key={dep}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleModuleClick(dep);
                              }}
                              className={`cursor-pointer text-xs px-2 py-1 rounded-md bg-${dependency.color}-100 text-${dependency.color}-700 flex items-center`}
                            >
                              <ArrowRight className="w-3 h-3 mr-1 transform rotate-180" />
                              {dependency.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{module.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3 text-gray-900">Skills You'll Learn</h4>
                        <ul className="space-y-2">
                          {module.skills.map(skill => (
                            <li key={skill} className="flex items-start">
                              <Check className={`w-4 h-4 mr-2 mt-0.5 text-${module.color}-500`} />
                              <span className="text-gray-700 text-sm">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3 text-gray-900">Tools & Technologies</h4>
                        <ul className="space-y-2">
                          {module.tools.map(tool => (
                            <li key={tool} className="flex items-start">
                              <Check className={`w-4 h-4 mr-2 mt-0.5 text-${module.color}-500`} />
                              <span className="text-gray-700 text-sm">{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-3 text-gray-900">Projects</h4>
                        <ul className="space-y-2">
                          {module.projects.map(project => (
                            <li key={project} className="flex items-start">
                              <Check className={`w-4 h-4 mr-2 mt-0.5 text-${module.color}-500`} />
                              <span className="text-gray-700 text-sm">{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Show modules that depend on this one */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3 text-gray-900">Next Modules</h4>
                      <div className="flex flex-wrap gap-2">
                        {modules
                          .filter(m => m.dependencies.includes(module.id))
                          .map(nextModule => (
                            <div 
                              key={nextModule.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleModuleClick(nextModule.id);
                              }}
                              className={`cursor-pointer text-xs px-2 py-1 rounded-md bg-${nextModule.color}-100 text-${nextModule.color}-700 flex items-center`}
                            >
                              {nextModule.title}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </div>
                          ))}
                        {modules.filter(m => m.dependencies.includes(module.id)).length === 0 && (
                          <span className="text-sm text-gray-500">No next modules - this is an end point in the learning path</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Start Your AI Journey?</h3>
              <p className="text-gray-700">Join Bettercode's AI Workshop & Internship program and master cutting-edge AI skills with BuildSchool curriculum.</p>
            </div>
            <div>
              <button 
                onClick={() => {
                  const element = document.getElementById('apply');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}