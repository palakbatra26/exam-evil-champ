
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
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const funnyQuotes = [
    "\"Syllabus kam ho na ho, par toppers ke aansoo zaroor kam honge.\"",
    "\"Exam center mein sirf ek hi chiz fast chalti hai... Ghadi ke kaante!\"",
    "\"Teacher says: 'I taught you everything.' Student says: 'But you didn't teach me how to pass without studying!'\"",
    "\"Marks itne kam aate hai ki calculator ko bhi sharam aati hai.\"",
    "\"Exams ke baad, Maa ka pahla sawal: Paper kaisa gaya? Doosra sawal: Tere dost ka kaisa gaya?\"",
    "\"Kal exam hai aur aaj concentration itna hai ki Netflix ki opening sound bhi revision lag rahi hai.\"",
  ];

  // Handle section transitions
  useEffect(() => {
    if (section === 1) {
      const timer = setTimeout(() => {
        setAudioReady(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [section]);

  // Rotate quotes automatically in section 4
  useEffect(() => {
    if (section === 4) {
      const quoteRotationInterval = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % funnyQuotes.length);
      }, 8000); // Change quote every 8 seconds
      
      return () => clearInterval(quoteRotationInterval);
    }
  }, [section, funnyQuotes.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSection(3);
      }, 500);
    }
  };

  // Progress to section 2 after intro text with a longer delay
  const goToSection2 = () => {
    // Added longer delay to give more time to read
    setTimeout(() => {
      setSection(2);
    }, 3000); // Additional delay before moving to next section
  };

  // Progress to section 4 after name reveal
  const goToSection4 = () => {
    setTimeout(() => {
      setSection(4);
    }, 8000); // Increased delay to give more time to read
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {audioReady && (
        <AudioPlayer 
          audioSrc="https://cdn.pixabay.com/download/audio/2021/04/06/audio_b4242abb48.mp3?filename=acoustic-motivation-11290.mp3" 
          autoPlay={true}
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
                text="Shh... Ruko jara, sabar karo..."
                className="text-lg font-medium text-gray-700" 
                delay={1500}
                duration={2500}
                animation="fade-in"
              />
              <AnimatedText 
                text="Kuch mzedar hone wala hai... 😈"
                className="text-lg font-medium text-gray-700" 
                delay={6000}
                duration={2500}
                animation="slide-up"
                onAnimationComplete={goToSection2}
              />
            </div>
          )}
          
          {/* Section 2: Name Input Form */}
          {section === 2 && (
            <div className="space-y-6 text-center animate-slide-up">
              <h2 className="text-2xl font-bold text-gradient">Apna naam batao, Champion 👇</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  type="text"
                  placeholder="Naam yaha likho"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center text-lg border-2 border-primary/30 focus-visible:ring-primary"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Chalo Shuru Karen!
                </Button>
              </form>
            </div>
          )}
          
          {/* Section 3: Personalized Message */}
          {section === 3 && (
            <div className="space-y-6 text-center">
              <AnimatedText 
                text={`Arre ${name}!`}
                className="text-2xl font-bold text-gradient" 
                animation="bounce-in"
                delay={1500}
                duration={2500}
              />
              <AnimatedText 
                text="Sunna hai..."
                className="text-xl font-medium text-gray-700" 
                animation="fade-in"
                delay={4500}
                duration={2500}
              />
              <AnimatedText 
                text="War isliye cancel hui thi kyuki GNE ke students ko padhna tha! 📚😂"
                className="text-2xl font-bold text-gradient" 
                animation="bounce-in"
                delay={8000}
                duration={2500}
              />
              <AnimatedText 
                text="Break khatam, ab exam mode ON! 🧠💥"
                className="text-lg font-medium text-gray-700" 
                animation="slide-up"
                delay={12000}
                duration={2500}
                onAnimationComplete={goToSection4}
              />
            </div>
          )}
          
          {/* Section 4: Rotating Quotes */}
          {section === 4 && (
            <div className="space-y-6 text-center animate-fade-in">
              <h2 className="text-2xl font-bold text-gradient mb-6">
                Yaad Rakhna
              </h2>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg shadow-inner min-h-[120px] flex items-center justify-center">
                <p className="text-lg font-kalam text-gray-800 italic transition-all duration-1000">
                  {funnyQuotes[currentQuoteIndex]}
                </p>
              </div>
              <div className="pt-6">
                <Button 
                  onClick={() => setSection(1)} 
                  variant="outline"
                  className="hover:bg-primary/10"
                >
                  Dobara Shuru Karen
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
