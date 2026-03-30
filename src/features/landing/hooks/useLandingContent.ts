import { useQuery } from "@tanstack/react-query";
import { landingService } from "../services/landingService";
import type { LandingContent } from "../types";

const LANDING_CONTENT_QUERY_KEY = ["landing", "content"] as const;

export const useLandingContent = () => {
  return useQuery<LandingContent, Error>({
    queryKey: LANDING_CONTENT_QUERY_KEY,
    queryFn: ({ signal }) => landingService.getContent(signal),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
  });
};
