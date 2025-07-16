import React, { useState } from 'react';
import { Code, Play, Sparkles, Zap, Bot, Search, Lightbulb } from 'lucide-react';

const demoExamples = [
  {
    id: 'text-generation',
    title: 'AI Text Generation',
    icon: <Bot size={20} />,
    prompt: 'Write a short poem about artificial intelligence and its impact on humanity.',
    output: `Digital minds awaken,
Algorithms learn and grow,
Silicon dreams unfold.

Human and machine,
Partners in creation's dance,
New frontiers emerge.

Knowledge amplified,
Possibilities expand,
Our future transformed.`,
    color: 'cyan'
  },
  {
    id: 'image-prompt',
    title: 'Image Prompt Engineering',
    icon: <Sparkles size={20} />,
    prompt: 'Describe an image prompt: Futuristic city with AI integration, cyberpunk style, neon lights, holographic interfaces.',
    output: `Detailed prompt breakdown:

Subject: Futuristic metropolis
Style: Cyberpunk aesthetic
Lighting: Neon blues and purples, creating dramatic shadows
Elements: Holographic displays floating between buildings
Perspective: Street-level view with towering skyscrapers
Mood: Technological wonder mixed with urban grit
Details: AI-controlled drones, facial recognition systems, interactive public interfaces
Technical specs: High detail, sharp focus, dramatic lighting contrast`,
    color: 'blue'
  },
  {
    id: 'code-generation',
    title: 'AI Code Assistant',
    icon: <Code size={20} />,
    prompt: 'Create a simple function in Python that analyzes sentiment in text using NLTK.',
    output: `\`\`\`python
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
    """
    Analyzes the sentiment of input text and returns a sentiment label.
    
    Args:
        text (str): The text to analyze
        
    Returns:
        dict: Contains the sentiment scores and overall sentiment
    """
    # Download required resources if not already present
    nltk.download('vader_lexicon', quiet=True)
    
    # Initialize the sentiment analyzer
    sia = SentimentIntensityAnalyzer()
    
    # Get sentiment scores
    sentiment_scores = sia.polarity_scores(text)
    
    # Determine overall sentiment
    if sentiment_scores['compound'] >= 0.05:
        overall_sentiment = "Positive"
    elif sentiment_scores['compound'] <= -0.05:
        overall_sentiment = "Negative"
    else:
        overall_sentiment = "Neutral"
        
    # Add overall sentiment to results
    result = {
        'scores': sentiment_scores,
        'sentiment': overall_sentiment
    }
    
    return result

# Example usage
if __name__ == "__main__":
    sample_text = "I'm really enjoying learning about AI. It's fascinating!"
    result = analyze_sentiment(sample_text)
    print(f"Sentiment: {result['sentiment']}")
    print(f"Scores: {result['scores']}")
\`\`\``,
    color: 'indigo'
  },
  {
    id: 'data-analysis',
    title: 'Data Pattern Analysis',
    icon: <Search size={20} />,
    prompt: 'Identify patterns in this dataset: [23, 29, 35, 41, 47, 53, 59, 65]',
    output: `Pattern analysis:

1. Primary pattern: Arithmetic progression with a common difference of 6
   - Each value increases by exactly 6 from the previous value
   - Formula: a_n = 23 + (n-1) × 6, where n is the position

2. Secondary pattern: All values except 65 are prime numbers
   - 23, 29, 35, 41, 47, 53, 59 are prime
   - 65 is composite (5 × 13)
   
3. Position analysis:
   - Values alternate between odd and odd numbers
   - All values end in either 3, 5, or 9

Prediction for next value: 71 (follows the +6 pattern and is prime)`,
    color: 'purple'
  },
  {
    id: 'creative-solution',
    title: 'Creative Problem Solving',
    icon: <Lightbulb size={20} />,
    prompt: 'Suggest innovative solutions for reducing plastic waste in urban environments.',
    output: `Innovative Solutions for Urban Plastic Reduction:

1. AI-Powered Sorting Systems
   - Smart bins with computer vision to automatically sort recyclables
   - Gamified mobile apps that reward proper disposal

2. Blockchain-Based Plastic Credits
   - Digital tokens earned by businesses reducing plastic usage
   - Transparent tracking of plastic reduction achievements

3. Microbial Decomposition Stations
   - Neighborhood facilities using engineered bacteria to break down plastics
   - Converting plastic waste into usable byproducts

4. Community-Scale 3D Printing
   - Converting plastic waste directly into needed community resources
   - Creating circular economy at neighborhood level

5. Hydrothermal Liquefaction Centers
   - Converting non-recyclable plastics into fuel for public transportation
   - Creating closed-loop energy systems`,
    color: 'cyan'
  }
];

export default function Demo() {
  const [activeDemo, setActiveDemo] = useState(demoExamples[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [typedOutput, setTypedOutput] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  
  const currentDemo = demoExamples.find(demo => demo.id === activeDemo) || demoExamples[0];
  
  const runDemo = () => {
    setIsRunning(true);
    setShowOutput(true);
    setTypedOutput('');
    setCursorPosition(0);
    
    const outputText = currentDemo.output;
    let position = 0;
    
    const typingInterval = setInterval(() => {
      if (position < outputText.length) {
        setTypedOutput(prev => prev + outputText.charAt(position));
        position++;
        setCursorPosition(position);
      } else {
        clearInterval(typingInterval);
        setIsRunning(false);
      }
    }, 15); // Speed of typing animation
  };
  
  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Simple Badge/Logo Overlap */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-16 z-20 flex justify-center w-full pointer-events-none">
        <img
          src="/assets/aiGolabalTech-Dd-RNDJl.png"
          alt="AI Global Tech Badge"
          className="w-32 h-32 object-contain"
        />
      </div>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0xMCAwIEwwIDEwIE0xNSAwIEwwIDE1IE0yMCAwIEwwIDIwIE0yNSAwIEwwIDI1IE0zMCAwIEwwIDMwIE0zNSAwIEwwIDM1IE00MCAwIEwwIDQwIE00NSAwIEwwIDQ1IE01MCAwIEwwIDUwIE01NSAwIEwwIDU1IE02MCAwIEwwIDYwIE02NSAwIEwwIDY1IE03MCAwIEwwIDcwIE03NSAwIEwwIDc1IE04MCAwIEwwIDgwIE04NSAwIEwwIDg1IE05MCAwIEwwIDkwIE85NSAwIEwwIDk1IiBzdHJva2U9IiMwZmYiIHN0cm9rZS13aWR0aD0iMC4yIiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')]"></div>
        <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-900/50 text-cyan-400 font-semibold text-sm mb-4 relative border border-cyan-500/30">INTERACTIVE DEMOS</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl mt-2 mb-4 text-white">
            Experience AI <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">In Action</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg">
            See how the AI skills you'll learn can be applied to solve real-world problems. Select a demo to explore different AI capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
          {/* Left side - Demo Selection */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg border border-gray-800 p-1 overflow-hidden">
            <div className="bg-black rounded-t border-b border-gray-800 p-3 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="font-mono text-sm text-gray-400">ai_demo_selector</span>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              {demoExamples.map(demo => (
                <button
                  key={demo.id}
                  onClick={() => {
                    setActiveDemo(demo.id);
                    setShowOutput(false);
                    setTypedOutput('');
                    setIsRunning(false);
                  }}
                  className={`w-full text-left p-3 rounded transition-all duration-300 flex items-center ${
                    activeDemo === demo.id 
                      ? `bg-${demo.color === 'cyan' ? 'cyan' : demo.color === 'blue' ? 'blue' : demo.color === 'indigo' ? 'indigo' : 'purple'}-900/20 border border-${demo.color === 'cyan' ? 'cyan' : demo.color === 'blue' ? 'blue' : demo.color === 'indigo' ? 'indigo' : 'purple'}-500/30` 
                      : 'bg-gray-800/50 border border-gray-800 hover:bg-gray-800'
                  }`}
                >
                  <div 
                    className={`p-2 mr-3 rounded ${
                      activeDemo === demo.id 
                        ? `bg-${demo.color === 'cyan' ? 'cyan' : demo.color === 'blue' ? 'blue' : demo.color === 'indigo' ? 'indigo' : 'purple'}-900/50 text-${demo.color === 'cyan' ? 'cyan' : demo.color === 'blue' ? 'blue' : demo.color === 'indigo' ? 'indigo' : 'purple'}-400` 
                        : 'bg-gray-900 text-gray-400'
                    }`}
                  >
                    {demo.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{demo.title}</h4>
                    <p className="text-xs text-gray-400 truncate">
                      {demo.prompt.length > 70 ? demo.prompt.substring(0, 70) + "..." : demo.prompt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Demo Display */}
          <div className="lg:col-span-3 bg-gray-900 rounded-lg border border-gray-800 overflow-hidden flex flex-col">
            <div className="bg-black border-b border-gray-800 p-3 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="font-mono text-sm text-gray-400">{currentDemo.title.toLowerCase().replace(/\s+/g, '_')}.ai</span>
              </div>
              <div>
                <button 
                  onClick={runDemo}
                  disabled={isRunning}
                  className={`p-1.5 rounded flex items-center space-x-1 ${isRunning ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-green-900/30 text-green-500 hover:bg-green-900/50'}`}
                >
                  <Play size={14} />
                  <span className="text-xs font-mono">{isRunning ? 'RUNNING' : 'RUN'}</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="mb-4">
                <span className="block text-xs font-mono text-gray-500 mb-1">// PROMPT</span>
                <div className="bg-black border border-gray-800 rounded p-4 text-gray-300 font-mono text-sm">
                  {currentDemo.prompt}
                </div>
              </div>
              
              <div className="flex-grow">
                <span className="block text-xs font-mono text-gray-500 mb-1">// OUTPUT</span>
                <div className="bg-black border border-gray-800 rounded p-4 text-cyan-400 font-mono text-sm h-[300px] overflow-auto">
                  {showOutput ? (
                    <div>
                      {typedOutput}
                      {isRunning && <span className="text-white animate-pulse">|</span>}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <span>Click "RUN" to see the output</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500 font-mono">
                <div className="flex-1">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                  {isRunning ? (
                    <span>Processing... {Math.floor((cursorPosition / currentDemo.output.length) * 100)}%</span>
                  ) : (
                    showOutput ? (
                      <span>Execution complete</span>
                    ) : (
                      <span>Ready to execute</span>
                    )
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <Zap size={14} className="text-yellow-500 mr-1" />
                    <span>Model: GPT-4</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles size={14} className="text-purple-400 mr-1" />
                    <span>Skills: 4+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">These demos showcase just a small sample of what you'll be able to create after completing our program.</p>
          <button 
            onClick={() => {
              const applySection = document.getElementById('apply');
              if (applySection) {
                applySection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-black border border-cyan-500/50 text-cyan-400 hover:bg-gray-900 font-medium py-3 px-6 rounded shadow-lg hover:shadow-cyan-900/20 text-center transition-all duration-300 flex items-center justify-center group mx-auto"
          >
            <span className="mr-2 font-mono text-sm tracking-wider">{">"}</span>
            START LEARNING
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}