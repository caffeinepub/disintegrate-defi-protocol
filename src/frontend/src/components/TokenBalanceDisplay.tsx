import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Sparkles } from 'lucide-react';
import { useDisintegrateBalance } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Skeleton } from '@/components/ui/skeleton';

export function TokenBalanceDisplay() {
  const { data: balance, isLoading } = useDisintegrateBalance();
  const { identity, login, isLoginIdle } = useInternetIdentity();

  const formatBalance = (amount: bigint) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  if (!identity) {
    return (
      <Card className="border-cyber-magenta/30 bg-gradient-to-br from-cyber-dark/80 to-cyber-dark/60 backdrop-blur-sm shadow-glow-magenta">
        <CardHeader>
          <CardTitle className="text-xl font-display flex items-center gap-2">
            <Coins className="w-5 h-5 text-cyber-magenta" />
            Disintegrate Token Balance
          </CardTitle>
          <CardDescription>
            Login to view and claim your earned tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={login}
            disabled={!isLoginIdle}
            className="w-full bg-gradient-to-r from-cyber-magenta to-cyber-blue hover:from-cyber-magenta/80 hover:to-cyber-blue/80 text-white font-bold shadow-glow-magenta"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Login to Claim Tokens
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-cyber-magenta/30 bg-gradient-to-br from-cyber-dark/80 to-cyber-dark/60 backdrop-blur-sm shadow-glow-magenta">
      <CardHeader>
        <CardTitle className="text-xl font-display flex items-center gap-2">
          <Coins className="w-5 h-5 text-cyber-magenta" />
          Disintegrate Token Balance
        </CardTitle>
        <CardDescription>
          Earn 1 Disintegrate token for every 1 ICP burned
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-16 w-full bg-cyber-dark/30" />
          </div>
        ) : (
          <div className="space-y-3">
            {/* Total Balance */}
            <div className="p-4 rounded-lg bg-cyber-dark/50 border border-cyber-magenta/30">
              <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-magenta to-cyber-blue animate-pulse">
                {formatBalance(balance || BigInt(0))} DIS
              </p>
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-cyber-magenta/10 border border-cyber-magenta/20">
              <Sparkles className="w-4 h-4 text-cyber-magenta mt-0.5 shrink-0" />
              <p className="text-xs text-cyber-cyan">
                Tokens are automatically claimed when you burn ICP. Your balance increases by 1 DIS for every 1 ICP burned.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
