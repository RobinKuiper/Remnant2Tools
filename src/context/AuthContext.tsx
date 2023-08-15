import React, { createContext, useEffect, useMemo, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const DEFAULT_VALUES = {
  isLoggedIn: false,
};

interface AuthContextData {
  isLoggedIn: boolean;
  login: () => void;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: DEFAULT_VALUES.isLoggedIn,
  login: () => {},
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(DEFAULT_VALUES.isLoggedIn);

  useEffect(() => {
    const storedGoogleOAuth = localStorage.getItem("google_oauth");
    if (storedGoogleOAuth) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const result = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      });

      const { body } = await result.json();
      localStorage.setItem("google_oauth", JSON.stringify(body));
      setIsLoggedIn(true);
    },
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "auth-code",
  });

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      login,
    }),
    [isLoggedIn],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
