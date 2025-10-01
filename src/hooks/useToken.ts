import { useEffect, useState } from "react";
import { getRequestToken } from "../api/requests";

const TOKEN_KEY = "trivia_token";

export function getStoredToken(): string | undefined {
  try {
    return localStorage.getItem(TOKEN_KEY) || undefined;
  } catch {
    return undefined;
  }
}

export function setStoredToken(t: string) {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {
    console.log("Error saving token");
  }
}

export function clearStoredToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    console.log("Error clearing token");
  }
}

export default function useToken() {
  // start with no token
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) return; 

    let cancelled = false;
    async function fetchToken() {
      setLoading(true);
      try {
        const t = await getRequestToken();
        if (!cancelled) {
          setStoredToken(t);
          setToken(t);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to get token";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchToken();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const refresh = async () => {
    clearStoredToken();
    const t = await getRequestToken();
    setStoredToken(t);
    setToken(t);
  };

  return { token, setToken, loading, error, refresh };
}
