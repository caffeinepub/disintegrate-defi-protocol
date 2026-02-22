import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useBurnHistory } from '../hooks/useQueries';
import { Flame, TrendingDown, Coins } from 'lucide-react';

export function BurnHistory() {
  const { data: burnEvents, isLoading } = useBurnHistory();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1_000_000);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: bigint) => {
    return Number(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    });
  };

  const totalBurned = burnEvents?.reduce((sum, [, amount]) => sum + Number(amount), 0) || 0;
  const totalDisintegrateEarned = totalBurned; // 1:1 ratio

  return (
    <Card className="border-cyber-cyan/30 bg-card/80 backdrop-blur-sm shadow-glow">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl font-display flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-cyber-cyan" />
              Burn History
            </CardTitle>
            <CardDescription className="text-base mt-1">
              Track all token disintegration events
            </CardDescription>
          </div>
          {!isLoading && burnEvents && burnEvents.length > 0 && (
            <div className="flex gap-6">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Burned</p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-magenta to-cyber-blue">
                  {totalBurned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ICP
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                  <Coins className="w-3 h-3" />
                  Total Earned
                </p>
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-magenta">
                  {totalDisintegrateEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DIS
                </p>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-cyber-dark/30" />
            ))}
          </div>
        ) : !burnEvents || burnEvents.length === 0 ? (
          <div className="text-center py-12">
            <Flame className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No burn events yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Start disintegrating tokens to see history
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-cyber-cyan/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-cyber-cyan/20 hover:bg-cyber-dark/30">
                  <TableHead className="text-cyber-cyan font-semibold">Timestamp</TableHead>
                  <TableHead className="text-cyber-cyan font-semibold text-right">Amount (ICP)</TableHead>
                  <TableHead className="text-cyber-magenta font-semibold text-right">
                    <span className="flex items-center gap-1 justify-end">
                      <Coins className="w-4 h-4" />
                      Disintegrate Tokens
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {burnEvents.map(([timestamp, amount], index) => (
                  <TableRow 
                    key={index} 
                    className="border-cyber-cyan/10 hover:bg-cyber-dark/20 transition-colors"
                  >
                    <TableCell className="font-mono text-sm">
                      {formatDate(timestamp)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-cyber-magenta">
                      {formatAmount(amount)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-cyber-cyan">
                      {formatAmount(amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
