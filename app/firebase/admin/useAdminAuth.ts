"use client";
import { useState } from "react";
import { db } from "../config";
import {
    collection,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { AdminType, jsonToAdmin } from "./admin";
import { AdminLoginState } from "./AdminContext";

export enum UserLoginState {
  Idle,
  Success,
  Failed,
  Loading,
}

export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminType>({
    username: null,
    superAdmin: null,
  });

  const [loginState, setLoginState] = useState<AdminLoginState>(
    AdminLoginState.Idle,
  );

  const logIn = async (username: string, password: string) => {
    setLoginState(AdminLoginState.Loading);
    // get admin data from firebase
    const q = query(
      collection(db, "admin"),
      or(
        where("username", "==", username.trim()),
        where("password", "==", password.trim()),
      ),
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // console.log("username and/or password is wrong");
      setLoginState(AdminLoginState.Failed);
    } else {
      querySnapshot.docs.map((doc) => {
        const admin = jsonToAdmin(doc.data());
        setAdmin(admin);
        // console.log(admin);
      });
      setLoginState(AdminLoginState.Success);
    }
  };

  // Logout the user
  const logOut = () => {
    setAdmin({
      username: null,
      superAdmin: null,
    });
    setLoginState(AdminLoginState.Idle);
  };

  return {
    admin,
    loginState,
    logIn,
    logOut,
  };
}
