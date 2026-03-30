import type { CredentialResponse } from "@react-oauth/google";
import type { OAuthUserData } from "@/types";

interface GoogleTokenPayload {
  sub?: unknown;
  name?: unknown;
  email?: unknown;
  picture?: unknown;
  email_verified?: unknown;
}

const parseJwtPayload = (token: string): GoogleTokenPayload | null => {
  const payloadSegment = token.split(".")[1];
  if (!payloadSegment) return null;

  try {
    const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64);
    return JSON.parse(decoded) as GoogleTokenPayload;
  } catch {
    return null;
  }
};

export const extractGoogleUserData = (
  credentialResponse: CredentialResponse
): OAuthUserData | null => {
  const token = credentialResponse.credential;
  if (!token) return null;

  const payload = parseJwtPayload(token);
  if (!payload) return null;

  if (
    typeof payload.sub !== "string" ||
    typeof payload.name !== "string" ||
    typeof payload.email !== "string"
  ) {
    return null;
  }

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: typeof payload.picture === "string" ? payload.picture : undefined,
    verified:
      typeof payload.email_verified === "boolean"
        ? payload.email_verified
        : undefined,
  };
};
