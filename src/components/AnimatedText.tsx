
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fade-in' | 'slide-up' | 'bounce-in' | 'typing';
  onAnimationComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className, 
  delay = 0, 
  duration = 500, 
  animation = 'fade-in',
  onAnimationComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Call the completion callback after animation finishes + some additional time to read
      if (onAnimationComplete) {
        const animationTimer = setTimeout(() => {
          onAnimationComplete();
        }, duration + 3000); // Added extra time to read
        
        return () => clearTimeout(animationTimer);
      }
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay, duration, onAnimationComplete]);
  
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'bounce-in':
        return 'animate-bounce-in';
      case 'typing':
        return 'animate-typing';
      default:
        return 'animate-fade-in';
    }
  };
  
  return (
    <div 
      className={cn(
        getAnimationClass(),
        animation === 'typing' && 'typing-effect',
        className
      )}
      style={{ 
        visibility: isVisible ? 'visible' : 'hidden',
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`
      }}
    >
      {text}
    </div>
  );
};

export default AnimatedText;
