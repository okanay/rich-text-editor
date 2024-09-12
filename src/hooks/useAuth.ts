import { useAtom,atom } from "jotai";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

type AuthStatus = "logged-in" | "logged-out" | "loading";
const authAtom = atom<AuthStatus>("loading");

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const [cookies] = useCookies(["auth-status"]);

  useEffect(() => {
    if (cookies["auth-status"]) {
      setAuth("logged-in");
    } else {
      setAuth("logged-out");
    }
  }, [cookies]);

  return auth;
}
