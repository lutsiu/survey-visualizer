import { useEffect, useState } from "react";
import { getRequestToken } from "../api/requests";

const TOKEN_KEY = "trivia_token";

export function getStoredToken(): string | undefined {
  try {
    return localStorage.getItem(TOKEN_KEY) || undefined
  } catch {
    return undefined;
  }
}

export function setStoredToken(t: string) {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {
    console.log("Error");
  }
}

export default function useToken() {
  const [token, setToken] = useState<string | undefined>(getStoredToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) return;
    let cancelled = false;
    async function fetchToken() {
      console.log("lets go")
      setLoading(true);
      try {
        console.log("try start")
        const t = await getRequestToken();
        console.log("token is " + t)
        if (!cancelled) {
          setStoredToken(t);
          setToken(t);
        }
      } catch (er: any) {
        if (!cancelled) setError(er.message ?? "Failed to get a token");
      } finally {
        if (!cancelled) setLoading(false);
      }
    } 
    fetchToken();
    return () => {cancelled = true;};
  }, [token]);

  const refresh = async () => {
    const t = await getRequestToken();
    setStoredToken(t);
    setToken(t);
  }

  return {token, setToken, loading, error, refresh};
}