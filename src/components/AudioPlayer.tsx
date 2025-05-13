
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, autoPlay = true }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (audioRef.current) {
      // Set audio volume to a comfortable level
      audioRef.current.volume = 0.4;
      
      const handleCanPlayThrough = () => {
        setIsLoading(false);
        console.log("Audio is ready to play");
      };
      
      const handlePlay = () => {
        setIsPlaying(true);
        console.log("Audio playing");
      };
      
      const handlePause = () => {
        setIsPlaying(false);
        console.log("Audio paused");
      };
      
      const handleError = (e: ErrorEvent) => {
        console.error("Audio error:", e);
        setIsLoading(false);
      };
      
      // Add event listeners
      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('error', handleError);
      
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
          
          if (audioRef.current) {
            audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
            audioRef.current.removeEventListener('play', handlePlay);
            audioRef.current.removeEventListener('pause', handlePause);
            audioRef.current.removeEventListener('error', handleError);
          }
        };
      }
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          audioRef.current.removeEventListener('play', handlePlay);
          audioRef.current.removeEventListener('pause', handlePause);
          audioRef.current.removeEventListener('error', handleError);
        }
      };
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
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop 
        preload="auto"
        onError={() => console.error("Audio error occurred")}
      />
      <Button 
        onClick={togglePlay}
        variant="outline" 
        size="icon" 
        className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm"
      >
        {isLoading ? (
          <Music className="h-4 w-4 animate-pulse" />
        ) : isPlaying ? (
          <Volume2 className="h-4 w-4 text-primary animate-pulse" />
        ) : (
          <VolumeX className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default AudioPlayer;
