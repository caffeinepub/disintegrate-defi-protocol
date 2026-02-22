import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Flame, Copy, Check } from 'lucide-react';
import { useClaimTokens } from '../hooks/useClaimTokens';
import { BurnAnimation } from './BurnAnimation';
import { TokenBalanceDisplay } from './TokenBalanceDisplay';
import { toast } from 'sonner';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

const ICP_ADDRESS = 'msmz5-ia7qe-jf2px-7jbzd-5rgkw-4rvub-fatyr-fqktu-pd5k3-wvafj-fqe';

export function BurnInterface() {
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const { claimTokens, isLoading, isSuccess } = useClaimTokens();
  const { identity } = useInternetIdentity();

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ICP_ADDRESS);
      setCopied(true);
      toast.success('Address copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy address');
    }
  };

  const handleBurn = async () => {
    const burnAmount = parseFloat(amount);
    
    if (isNaN(burnAmount) || burnAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!identity) {
      toast.error('Please login to burn tokens');
      return;
    }

    try {
      await claimTokens(burnAmount);
      setAmount('');
      toast.success(`Successfully burned ${burnAmount} ICP and claimed ${burnAmount} Disintegrate tokens!`);
    } catch (error) {
      toast.error('Failed to burn tokens. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Token Balance Display */}
      <TokenBalanceDisplay />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Burn Interface Card */}
        <Card className="border-cyber-cyan/30 bg-card/80 backdrop-blur-sm shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl font-display flex items-center gap-2">
              <Flame className="w-6 h-6 text-cyber-magenta" />
              Disintegrate ICP now
            </CardTitle>
            <CardDescription className="text-base">
              Transform your ICP tokens into the DeFi protocol
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ICP Address Display */}
            <div className="space-y-2">
              <Label htmlFor="icp-address" className="text-sm font-medium">
                Protocol Address
              </Label>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-cyber-dark/50 border border-cyber-cyan/30 rounded-lg font-mono text-sm text-cyber-cyan break-all">
                  {ICP_ADDRESS}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyAddress}
                  className="border-cyber-cyan/30 hover:bg-cyber-cyan/10 hover:border-cyber-cyan shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-cyber-cyan" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="burn-amount" className="text-sm font-medium">
                Amount to Burn (ICP)
              </Label>
              <Input
                id="burn-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg border-cyber-cyan/30 focus:border-cyber-magenta bg-cyber-dark/30"
                min="0"
                step="0.01"
                disabled={isLoading}
              />
            </div>

            {/* Burn Button */}
            <Button
              onClick={handleBurn}
              disabled={isLoading || !amount || !identity}
              className="w-full bg-gradient-to-r from-cyber-magenta to-cyber-blue hover:from-cyber-magenta/80 hover:to-cyber-blue/80 text-white font-bold py-6 text-lg shadow-glow-magenta transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Flame className="w-5 h-5 mr-2 animate-pulse" />
                  Burning...
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5 mr-2" />
                  Disintegrate Tokens
                </>
              )}
            </Button>

            {/* Info Text */}
            <p className="text-xs text-muted-foreground text-center">
              Tokens will be permanently burned and recorded on-chain
            </p>
          </CardContent>
        </Card>

        {/* Animation Card */}
        <div className="lg:sticky lg:top-8">
          <BurnAnimation isActive={isLoading || isSuccess} />
        </div>
      </div>
    </div>
  );
}
