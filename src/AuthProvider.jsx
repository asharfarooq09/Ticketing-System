import React, { createContext, useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;
    try {
      const parsedUser = JSON.parse(savedUser);
      return parsedUser;
    } catch (error) {
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        const user = {
          ...userCredential.user,
          role:
            userCredential.user.email === "customer@support.com"
              ? "customer"
              : "support",
        };

        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(AuthContext);
  return context;
};
