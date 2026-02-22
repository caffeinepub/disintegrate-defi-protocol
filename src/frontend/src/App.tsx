import { BurnInterface } from './components/BurnInterface';
import { BurnHistory } from './components/BurnHistory';
import { Layout } from './components/Layout';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <InternetIdentityProvider>
        <Layout>
          <div className="container mx-auto px-4 py-8 space-y-12">
            <BurnInterface />
            <BurnHistory />
          </div>
        </Layout>
        <Toaster />
      </InternetIdentityProvider>
    </ThemeProvider>
  );
}

export default App;
