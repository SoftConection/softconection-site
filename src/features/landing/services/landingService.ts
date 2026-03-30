import { landingContentSeed } from "../data/landingContent";
import type { LandingContent } from "../types";

const SERVICE_DELAY_MS = 280;

const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const onAbort = () => {
      window.clearTimeout(timeout);
      reject(new DOMException("Request aborted", "AbortError"));
    };

    const timeout = window.setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    if (!signal) {
      return;
    }

    signal.addEventListener("abort", onAbort, { once: true });
  });

const cloneContent = (content: LandingContent): LandingContent => {
  return JSON.parse(JSON.stringify(content)) as LandingContent;
};

const shouldForceError = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem("landing:force-error") === "1";
};

export const landingService = {
  async getContent(signal?: AbortSignal): Promise<LandingContent> {
    await delay(SERVICE_DELAY_MS, signal);

    if (shouldForceError()) {
      throw new Error("Nao foi possivel carregar o conteudo da landing page.");
    }

    return cloneContent(landingContentSeed);
  },
};
