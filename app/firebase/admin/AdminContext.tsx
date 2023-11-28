"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../config";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { AdminType, jsonToAdmin } from "./admin";

enum AdminLoginState {
  Idle,
  Success,
  Failed,
  Loading,
}

export const AdminContext = createContext<AuthType>({
  admin: {
    username: null,
    superAdmin: null,
  },
  loginState: AdminLoginState.Idle,
  logIn: function (email: string, password: string) {
    throw new Error("Function not implemented.");
  },
  logOut: function () {
    throw new Error("Function not implemented");
  },
});

interface AuthType {
  admin: AdminType;
  loginState: AdminLoginState;
  logIn: (username: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const useAdmin = () => useContext(AdminContext);

export const AdminContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [admin, setAdmin] = useState<AdminType>({
    username: null,
    superAdmin: null,
  });
  const [loginState, setLoginState] = useState<AdminLoginState>(
    AdminLoginState.Idle,
  );

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, async (user) => {
    //   if (user) {
    //     const userData = await getUserData(user.uid);
    //     setUser({
    //       username: userData!.user,
    //     });
    //   } else {
    //     setUser({
    //       username: null,
    //     });
    //   }
    // });

    setLoginState(AdminLoginState.Success);

    // return () => unsubscribe();
  }, []);

  // Login the admin
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
      console.log("username and/or password is wrong");
      setLoginState(AdminLoginState.Failed);
    } else {
      const fetchPromises = querySnapshot.docs.map((doc) => {
        const admin = jsonToAdmin(doc.data());
        setAdmin(admin);
      });
      setLoginState(AdminLoginState.Success);
    }
  };

  // Logout the user
  const logOut = async () => {
    setAdmin({
      username: null,
      superAdmin: null,
    });
    setLoginState(AdminLoginState.Idle);
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        loginState,
        logIn,
        logOut,
      }}
    >
      {loginState != AdminLoginState.Success ? null : children}
    </AdminContext.Provider>
  );
};
