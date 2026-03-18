import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Mood } from "../backend.d";
import type { Entry } from "../backend.d";
import { useActor } from "./useActor";

export type { Entry };
export { Mood };

export function useRecentEntries() {
  const { actor, isFetching } = useActor();
  return useQuery<Entry[]>({
    queryKey: ["entries", "recent"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEntriesByNickname(nickname: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Entry[]>({
    queryKey: ["entries", "nickname", nickname],
    queryFn: async () => {
      if (!actor || !nickname) return [];
      return actor.getEntriesByNickname(nickname);
    },
    enabled: !!actor && !isFetching && !!nickname,
  });
}

export function useAddEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      nickname: string | null;
      mood: Mood;
      text: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const id = await actor.addEntry(
        params.nickname,
        params.mood,
        params.text,
      );
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });
}

export function useDeleteEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });
}
