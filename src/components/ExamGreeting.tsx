
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedText from './AnimatedText';
import AudioPlayer from './AudioPlayer';
import { cn } from "@/lib/utils";

const ExamGreeting: React.FC = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [section, setSection] = useState(1);
  const [audioReady, setAudioReady] = useState(false);

  // Handle section transitions
  useEffect(() => {
    if (section === 1) {
      const timer = setTimeout(() => {
        setAudioReady(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [section]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSection(3);
      }, 500);
    }
  };

  // Progress to section 2 after intro text
  const goToSection2 = () => {
    setSection(2);
  };

  // Progress to section 4 after name reveal
  const goToSection4 = () => {
    setTimeout(() => {
      setSection(4);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {audioReady && (
        <AudioPlayer 
          audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" 
          autoPlay={submitted}
        />
      )}
      
      <div className="max-w-md w-full mx-auto">
        <div className={cn(
          "bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 transition-all duration-500",
          section >= 3 ? "bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl" : ""
        )}>
          {/* Section 1: Initial Text */}
          {section === 1 && (
            <div className="space-y-4 text-center">
              <AnimatedText 
                text="Shh... don't scroll fast. Just wait."
                className="text-lg font-medium text-gray-700" 
                delay={500}
                animation="fade-in"
              />
              <AnimatedText 
                text="Something fun (and evil 😈) is about to begin."
                className="text-lg font-medium text-gray-700" 
                delay={2000}
                animation="slide-up"
                onAnimationComplete={goToSection2}
              />
            </div>
          )}
          
          {/* Section 2: Name Input Form */}
          {section === 2 && (
            <div className="space-y-6 text-center animate-slide-up">
              <h2 className="text-2xl font-bold text-gradient">Enter your name, Champ 👇</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  type="text"
                  placeholder="Your name here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center text-lg border-2 border-primary/30 focus-visible:ring-primary"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Let's Go!
                </Button>
              </form>
            </div>
          )}
          
          {/* Section 3: Personalized Message */}
          {section === 3 && (
            <div className="space-y-6 text-center">
              <AnimatedText 
                text={`Hey Champ, ${name}!`}
                className="text-2xl font-bold text-gradient" 
                animation="bounce-in"
                delay={200}
              />
              <AnimatedText 
                text="So..."
                className="text-xl font-medium text-gray-700" 
                animation="fade-in"
                delay={1000}
              />
              <AnimatedText 
                text="Happy Exam Starting! 😈📚💥"
                className="text-2xl font-bold text-gradient" 
                animation="bounce-in"
                delay={2000}
              />
              <AnimatedText 
                text="Your break is over. Back to study mode now 😂"
                className="text-lg font-medium text-gray-700" 
                animation="slide-up"
                delay={3000}
                onAnimationComplete={goToSection4}
              />
            </div>
          )}
          
          {/* Section 4: Quote */}
          {section === 4 && (
            <div className="space-y-6 text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-gradient mb-6">
                Remember
              </h2>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg shadow-inner">
                <p className="text-lg font-kalam text-gray-800 italic">
                  "May your mind be sharp and your syllabus shorter than your patience."
                </p>
              </div>
              <div className="pt-6">
                <Button 
                  onClick={() => setSection(1)} 
                  variant="outline"
                  className="hover:bg-primary/10"
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
          
          {/* Footer - Always visible */}
          <div className={cn(
            "mt-8 pt-4 text-center text-sm text-gray-500",
            section >= 3 ? "border-t border-gray-200" : ""
          )}>
            <p>Made with ❤️ by Palak Batra</p>
            <p className="text-xs mt-1">– For you all💗</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamGreeting;
