import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { BurnTransaction, DisintegrateTokens } from '../backend';

export function useBurnHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<BurnTransaction[]>({
    queryKey: ['burnHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBurnEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBurnHistoryByAmount() {
  const { actor, isFetching } = useActor();

  return useQuery<BurnTransaction[]>({
    queryKey: ['burnHistoryByAmount'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBurnEventsByAmount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDisintegrateBalance() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<DisintegrateTokens>({
    queryKey: ['disintegrateBalance', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return BigInt(0);
      const principal = identity.getPrincipal();
      const balance = await actor.getBalance(principal);
      return balance ?? BigInt(0);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useICPBalance() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<bigint>({
    queryKey: ['icpBalance', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return BigInt(0);
      // This will call the backend's getICPBalance method once implemented
      // For now, return 0 as placeholder
      // TODO: Backend needs to implement getICPBalance() query method
      return BigInt(0);
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}
