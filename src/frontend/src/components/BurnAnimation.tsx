import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BurnAnimationProps {
  isActive: boolean;
}

export function BurnAnimation({ isActive }: BurnAnimationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  return (
    <Card className="border-cyber-magenta/30 bg-card/80 backdrop-blur-sm shadow-glow-magenta overflow-hidden">
      <CardContent className="p-8">
        <div className="relative aspect-square flex items-center justify-center">
          {/* Central burn icon */}
          <div className="relative z-10">
            <img
              src="/assets/generated/icp-burn-icon.dim_256x256.png"
              alt="ICP Burn"
              className={`w-48 h-48 transition-all duration-1000 ${
                isActive ? 'scale-110 animate-pulse' : 'scale-100'
              }`}
            />
            {isActive && (
              <div className="absolute inset-0 blur-2xl bg-cyber-magenta/50 animate-pulse" />
            )}
          </div>

          {/* Particle effects */}
          {isActive && particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-cyber-cyan rounded-full animate-float"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animationDelay: `${particle.delay}s`,
                boxShadow: '0 0 10px oklch(var(--cyber-cyan))'
              }}
            />
          ))}

          {/* Glow rings */}
          {isActive && (
            <>
              <div className="absolute inset-0 border-2 border-cyber-cyan/30 rounded-full animate-ping" />
              <div className="absolute inset-8 border-2 border-cyber-magenta/30 rounded-full animate-ping animation-delay-500" />
              <div className="absolute inset-16 border-2 border-cyber-blue/30 rounded-full animate-ping animation-delay-1000" />
            </>
          )}
        </div>

        {/* Status text */}
        <div className="mt-6 text-center">
          <p className={`text-lg font-display font-bold transition-all duration-300 ${
            isActive 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-blue glow-text' 
              : 'text-muted-foreground'
          }`}>
            {isActive ? 'Disintegrating...' : 'Ready to Burn'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
