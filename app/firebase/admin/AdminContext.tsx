"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { AdminType, jsonToAdmin } from "./admin";
import { useAdminAuth } from "./useAdminAuth";

export enum AdminLoginState {
  Idle,
  Success,
  Failed,
  Loading,
}

interface AdminAuthType {
  admin: AdminType;
  loginState: AdminLoginState;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => void;
}

export const authAdminContext = createContext<AdminAuthType>({
  admin: {
    username: null,
    superAdmin: null,
  },
  loginState: AdminLoginState.Idle,
  logIn: async function (username: string, password: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  logOut: function (): void {
    throw new Error("Function not implemented");
  },
});

export function AuthAdminProvider({ children }: { children: React.ReactNode }) {
  const adminAuth = useAdminAuth();
  return (
    <authAdminContext.Provider value={adminAuth}>
      {children}
    </authAdminContext.Provider>
  );
}

export const useAdmin = () => useContext(authAdminContext);
