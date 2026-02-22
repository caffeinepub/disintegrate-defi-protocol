import { ReactNode } from 'react';
import { Flame } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div 
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-cyber-dark via-background to-cyber-purple opacity-90" />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(oklch(var(--cyber-cyan) / 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, oklch(var(--cyber-cyan) / 0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Header */}
      <header className="relative z-10 border-b border-cyber-cyan/20 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Flame className="w-8 h-8 text-cyber-magenta animate-pulse" />
                <div className="absolute inset-0 blur-xl bg-cyber-magenta/50" />
              </div>
              <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-blue glow-text">
                Disintegrate DeFi Protocol
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-cyber-cyan/20 bg-background/50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Disintegrate DeFi Protocol. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
