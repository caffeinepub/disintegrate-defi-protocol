import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Coins } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useDisintegrateBalance } from '../hooks/useQueries';
import { useICPBalance } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';

export function WalletInterface() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: disintegrateBalance, isLoading: isLoadingDIS } = useDisintegrateBalance();
  const { data: icpBalance, isLoading: isLoadingICP } = useICPBalance();

  // Show login prompt if not authenticated
  if (!identity) {
    return (
      <Card className="border-cyber-cyan/30 bg-card/80 backdrop-blur-sm shadow-glow">
        <CardHeader>
          <CardTitle className="text-2xl font-display flex items-center gap-2">
            <Wallet className="w-6 h-6 text-cyber-cyan" />
            ICP & Disintegrate Wallet
          </CardTitle>
          <CardDescription className="text-base">
            Restricted wallet for ICP and Disintegrate tokens only
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Please login to view your wallet balances
            </p>
            <Button
              onClick={login}
              disabled={loginStatus === 'logging-in'}
              className="bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:from-cyber-cyan/80 hover:to-cyber-blue/80 text-white font-bold shadow-glow"
            >
              {loginStatus === 'logging-in' ? 'Connecting...' : 'Login with Internet Identity'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format balance for display (convert from e8s to ICP)
  const formatICPBalance = (balance: bigint | undefined) => {
    if (balance === undefined) return '0.00';
    const icpAmount = Number(balance) / 100_000_000;
    return icpAmount.toFixed(8);
  };

  const formatDISBalance = (balance: bigint | undefined) => {
    if (balance === undefined) return '0';
    return balance.toString();
  };

  return (
    <Card className="border-cyber-cyan/30 bg-card/80 backdrop-blur-sm shadow-glow">
      <CardHeader>
        <CardTitle className="text-2xl font-display flex items-center gap-2">
          <Wallet className="w-6 h-6 text-cyber-cyan" />
          ICP & Disintegrate Wallet
        </CardTitle>
        <CardDescription className="text-base">
          Restricted wallet for ICP and Disintegrate tokens only
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {/* ICP Balance Card */}
          <div className="relative overflow-hidden rounded-lg border border-cyber-blue/40 bg-gradient-to-br from-cyber-blue/10 to-cyber-dark/50 p-6 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-blue/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-5 h-5 text-cyber-blue" />
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  ICP Balance
                </h3>
              </div>
              {isLoadingICP ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-cyber-blue/20 rounded w-32 mb-2" />
                  <div className="h-4 bg-cyber-blue/10 rounded w-20" />
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold font-display text-cyber-blue mb-1">
                    {formatICPBalance(icpBalance)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Internet Computer Protocol
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Disintegrate Token Balance Card */}
          <div className="relative overflow-hidden rounded-lg border border-cyber-magenta/40 bg-gradient-to-br from-cyber-magenta/10 to-cyber-dark/50 p-6 backdrop-blur-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-magenta/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-5 h-5 text-cyber-magenta" />
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Disintegrate Balance
                </h3>
              </div>
              {isLoadingDIS ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-cyber-magenta/20 rounded w-32 mb-2" />
                  <div className="h-4 bg-cyber-magenta/10 rounded w-20" />
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold font-display text-cyber-magenta mb-1">
                    {formatDISBalance(disintegrateBalance)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    DIS Tokens
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-4 p-3 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/20">
          <p className="text-xs text-muted-foreground text-center">
            This wallet only supports ICP and Disintegrate tokens. No other tokens can be added or displayed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
