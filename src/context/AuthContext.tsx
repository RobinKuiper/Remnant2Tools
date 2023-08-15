import React, { createContext, useEffect, useMemo, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const DEFAULT_VALUES = {
  isLoggedIn: false,
};

interface AuthContextData {
  isLoggedIn: boolean;
  loggingIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: DEFAULT_VALUES.isLoggedIn,
  loggingIn: false,
  login: () => {},
  logout: () => {},
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(DEFAULT_VALUES.isLoggedIn);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  useEffect(() => {
    const storedGoogleOAuth = localStorage.getItem("google_oauth");
    if (storedGoogleOAuth) {
      setIsLoggedIn(true);
    }
  }, []);

  const googleLogin = useGoogleLogin({
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
      setLoggingIn(false);
    },
    onError: err => {
      setLoggingIn(false);
    },
    onNonOAuthError: err => {
      setLoggingIn(false);
    },
    scope: "https://www.googleapis.com/auth/drive.file",
    flow: "auth-code",
  });

  const login = () => {
    setLoggingIn(true);
    googleLogin();
  };

  const logout = () => {
    // TODO: implement real? logout
    localStorage.removeItem("google_oauth");
    setIsLoggedIn(false);
  };

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      loggingIn,
      login,
      logout,
    }),
    [isLoggedIn, loggingIn],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
