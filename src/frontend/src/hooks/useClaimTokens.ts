import { useState } from 'react';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export function useClaimTokens() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const claimTokens = async (burnAmount: number) => {
    if (!actor) {
      throw new Error('Actor not initialized');
    }

    if (!identity) {
      throw new Error('Please login to claim tokens');
    }

    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const principal = identity.getPrincipal();
      const amount = BigInt(Math.floor(burnAmount * 100) / 100);
      
      await actor.claimTokens(principal, amount);
      
      setIsSuccess(true);
      
      // Invalidate queries to refresh balance and burn history
      await queryClient.invalidateQueries({ queryKey: ['disintegrateBalance'] });
      await queryClient.invalidateQueries({ queryKey: ['burnHistory'] });
      
      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to claim tokens');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    claimTokens,
    isLoading,
    isSuccess,
    error
  };
}
