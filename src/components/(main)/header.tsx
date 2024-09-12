"use client";

import { ThemeSwitcher } from "../utils/theme-switcher";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-end gap-4 px-4 py-2">
      <ShowAuthButton />
      <ThemeSwitcher />
    </header>
  );
};

const LoginButton = () => {
  const handleLogin = () => {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    fetch(API_URL + "/login", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      onClick={handleLogin}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Login
    </button>
  );
};

const LogoutButton = () => {
  const handleLogout = () => {
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    fetch(API_URL + "/auth/logout", {
      method: "GET",
      credentials: "include", // Cookie'lerin gönderilmesini sağlar
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Başarılı login sonrası yapılacak işlemler
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Logout
    </button>
  );
};

const ShowAuthButton = () => {
  const auth = useAuth();

  if (auth === "logged-in") {
    return <LogoutButton />;
  }

  return <LoginButton />;
};
