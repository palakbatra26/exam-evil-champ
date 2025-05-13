
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, autoPlay = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  useEffect(() => {
    if (audioRef.current) {
      // Set audio volume to a comfortable level
      audioRef.current.volume = 0.5;
      
      if (autoPlay) {
        // We need to wait for user interaction before playing audio
        const playAudio = () => {
          if (audioRef.current) {
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(error => {
                  console.error("Autoplay prevented:", error);
                  setIsPlaying(false);
                });
            }
          }
        };
        
        // Try to play audio
        playAudio();
        
        // Also add a click event listener to document that will play audio on first interaction
        const handleFirstInteraction = () => {
          playAudio();
          document.removeEventListener('click', handleFirstInteraction);
        };
        
        document.addEventListener('click', handleFirstInteraction);
        
        return () => {
          document.removeEventListener('click', handleFirstInteraction);
        };
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Play prevented:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={audioSrc} loop />
      <Button 
        onClick={togglePlay}
        variant="outline" 
        size="icon" 
        className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm"
      >
        {isPlaying ? <Music className="h-4 w-4 text-primary animate-pulse" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default AudioPlayer;
