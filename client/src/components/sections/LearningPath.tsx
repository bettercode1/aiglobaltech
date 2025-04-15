import { useState } from "react";
import { Check, ArrowRight, Brain, Cpu, Braces, Microchip, Sparkles, Terminal, Database, Bot, ImagePlus, Code, Headphones, Leaf, Shield, User, Users, Globe } from "lucide-react";

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

  // Define the modules and their relationships
  const modules: Module[] = [
    {
      id: "ai-fundamentals",
      title: "AI Fundamentals",
      description: "Introduction to core AI concepts, history, and terminology. Learn about different types of AI and their applications.",
      weeks: 3,
      skills: ["AI Theory", "AI History", "Machine Learning Basics", "Ethical AI"],
      icon: <Brain className="h-5 w-5" />,
      tools: ["Python", "Jupyter Notebooks", "Scikit-learn"],
      projects: ["AI Impact Analysis", "Simple Classifier Building"],
      color: "purple",
      dependencies: []
    },
    {
      id: "data-processing",
      title: "Data Processing",
      description: "Learn data collection, cleaning, and preparation techniques essential for AI applications.",
      weeks: 2,
      skills: ["Data Cleaning", "Feature Engineering", "Data Visualization", "Data Ethics"],
      icon: <Database className="h-5 w-5" />,
      tools: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
      projects: ["Dataset Preparation", "Data Visualization Dashboard"],
      color: "blue",
      dependencies: ["ai-fundamentals"]
    },
    {
      id: "ml-techniques",
      title: "ML Techniques",
      description: "Explore various machine learning algorithms and their practical implementations.",
      weeks: 3,
      skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Hyperparameter Tuning"],
      icon: <Braces className="h-5 w-5" />,
      tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Weights & Biases"],
      projects: ["Prediction Model", "Clustering Application"],
      color: "cyan",
      dependencies: ["data-processing"]
    },
    {
      id: "deep-learning",
      title: "Deep Learning",
      description: "Dive into neural networks and deep learning architectures and applications.",
      weeks: 3,
      skills: ["Neural Networks", "CNNs", "RNNs", "Transfer Learning"],
      icon: <Cpu className="h-5 w-5" />,
      tools: ["TensorFlow", "PyTorch", "Keras", "Hugging Face"],
      projects: ["Image Classifier", "Text Classifier"],
      color: "indigo",
      dependencies: ["ml-techniques"]
    },
    {
      id: "generative-ai-intro",
      title: "Generative AI Intro",
      description: "Introduction to generative models and their capabilities.",
      weeks: 2,
      skills: ["Generative Models", "GANs", "VAEs", "Diffusion Models"],
      icon: <Sparkles className="h-5 w-5" />,
      tools: ["Stable Diffusion", "GAN Frameworks", "Hugging Face"],
      projects: ["Image Generation App", "Style Transfer Tool"],
      color: "purple",
      dependencies: ["deep-learning"]
    },
    {
      id: "llm-fundamentals",
      title: "LLM Fundamentals",
      description: "Explore large language models and their capabilities in understanding and generating text.",
      weeks: 2,
      skills: ["Transformers", "LLM Architecture", "Fine-tuning", "Embeddings"],
      icon: <Bot className="h-5 w-5" />,
      tools: ["OpenAI API", "Claude API", "Llama", "LangChain"],
      projects: ["Chatbot Development", "Custom LLM Integration"],
      color: "blue",
      dependencies: ["generative-ai-intro"]
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      description: "Master the art of crafting effective prompts for generative AI systems.",
      weeks: 2,
      skills: ["Prompt Design", "Few-shot Learning", "Chain-of-Thought", "System Prompts"],
      icon: <Terminal className="h-5 w-5" />,
      tools: ["OpenAI Playground", "Claude Console", "Prompt Libraries"],
      projects: ["Prompt Template Library", "Advanced RAG System"],
      color: "cyan",
      dependencies: ["llm-fundamentals"]
    },
    {
      id: "image-generation",
      title: "Image Generation",
      description: "Learn advanced techniques for generating and manipulating images with AI.",
      weeks: 2,
      skills: ["Text-to-Image", "Image Editing", "Style Transfer", "Animation"],
      icon: <ImagePlus className="h-5 w-5" />,
      tools: ["DALL-E", "Midjourney", "Stable Diffusion", "ControlNet"],
      projects: ["Custom Image Generator", "Visual Content Creator"],
      color: "indigo",
      dependencies: ["generative-ai-intro"]
    },
    {
      id: "audio-generation",
      title: "Audio Generation",
      description: "Explore AI tools for speech, music, and sound generation and processing.",
      weeks: 2,
      skills: ["Text-to-Speech", "Voice Cloning", "Music Generation", "Audio Editing"],
      icon: <Headphones className="h-5 w-5" />,
      tools: ["Whisper", "ElevenLabs", "Bark", "MusicGen"],
      projects: ["Voice Assistant", "Music Creation Tool"],
      color: "purple",
      dependencies: ["generative-ai-intro"]
    },
    {
      id: "ai-applications",
      title: "AI Applications",
      description: "Build practical real-world AI applications and learn deployment strategies.",
      weeks: 3,
      skills: ["Web Development", "API Integration", "UX/UI for AI", "Deployment"],
      icon: <Microchip className="h-5 w-5" />,
      tools: ["React", "Flask/FastAPI", "Docker", "Cloud APIs"],
      projects: ["End-to-end AI Application", "AI-powered Website"],
      color: "blue",
      dependencies: ["prompt-engineering", "image-generation", "audio-generation"]
    },
    {
      id: "ai-ethics",
      title: "AI Ethics & Governance",
      description: "Understand ethical considerations, biases, and responsible AI development practices.",
      weeks: 2,
      skills: ["Ethical AI Design", "Bias Detection", "Privacy Protection", "AI Governance"],
      icon: <Shield className="h-5 w-5" />,
      tools: ["Bias Detection Tools", "Model Cards", "Privacy Frameworks"],
      projects: ["Ethical AI Assessment", "Bias Mitigation Strategy"],
      color: "cyan",
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
      color: "green",
      dependencies: ["ai-ethics"]
    },
    {
      id: "certification",
      title: "Certification",
      description: "Receive your program certification and prepare for the job market.",
      weeks: 1,
      skills: ["Portfolio Presentation", "Interview Skills", "Networking"],
      icon: <User className="h-5 w-5" />,
      tools: ["Portfolio Platforms", "LinkedIn", "GitHub"],
      projects: ["Comprehensive Portfolio", "Job Application Strategy"],
      color: "green",
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
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm mb-4">LEARNING JOURNEY</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 text-gray-900">
            Your <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Learning Path</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Explore our comprehensive {getTotalDuration()} curriculum from AI fundamentals to advanced applications. 
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
                cyan: {
                  bg: isActive ? "bg-cyan-600" : isHighlighted ? "bg-cyan-500" : "bg-cyan-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-cyan-700",
                  border: isActive ? "border-cyan-700" : isHighlighted ? "border-cyan-400" : "border-cyan-200",
                  icon: isActive ? "text-cyan-200" : isHighlighted ? "text-cyan-200" : "text-cyan-500",
                  shadow: isActive ? "shadow-lg shadow-cyan-200" : ""
                },
                indigo: {
                  bg: isActive ? "bg-indigo-600" : isHighlighted ? "bg-indigo-500" : "bg-indigo-100",
                  text: isActive ? "text-white" : isHighlighted ? "text-white" : "text-indigo-700",
                  border: isActive ? "border-indigo-700" : isHighlighted ? "border-indigo-400" : "border-indigo-200",
                  icon: isActive ? "text-indigo-200" : isHighlighted ? "text-indigo-200" : "text-indigo-500",
                  shadow: isActive ? "shadow-lg shadow-indigo-200" : ""
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
        
        <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-6 border border-purple-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Start Your Learning Journey?</h3>
              <p className="text-gray-700">Join our AI Learning Hub program and master AI and GenAI skills step by step.</p>
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
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center"
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