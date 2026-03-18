import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Category, Win } from "../backend.d";
import { useActor } from "./useActor";

export type { Win, Category };

export function useRecentWins() {
  const { actor, isFetching } = useActor();
  return useQuery<Win[]>({
    queryKey: ["wins", "recent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentWins();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWinCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["wins", "count"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getWinCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWinsByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Win[]>({
    queryKey: ["wins", "category", category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getWinsByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useAddWin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { text: string; category: Category | null }) => {
      if (!actor) throw new Error("Not connected");
      const id = await actor.addWin(params.text, params.category);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wins"] });
    },
  });
}

export function useDeleteWin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteWin(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wins"] });
    },
  });
}
