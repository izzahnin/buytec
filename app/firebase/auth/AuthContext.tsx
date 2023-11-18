"use client";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserType, userConverter } from "./user";

export const AuthContext = createContext<AuthType>({
    user: {
        id: null,
        name: null,
        email: null,
        number: null,
        gender: null,
        birthdate: null,
        address: null,
        wishlist: [],
        cart: [],
        review: [],
        transaction: []
    },
    signUp: function (name: string, email: string, password: string): Promise<UserCredential> {
        throw new Error("Function not implemented.");
    },
    logIn: function (email: string, password: string): Promise<UserCredential> {
        throw new Error("Function not implemented.");
    },
    logInWithGoogle: function (): Promise<UserCredential> {
        throw new Error("Function not implemented.");
    },
    logOut: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    checkUserVerified: function (): Promise<Boolean | undefined> {
        throw new Error("Function not implemented.");
    },
    updateUserData: function(newUserData: UserType): void {
        throw new Error("Function not implemented.");
    }
});

interface AuthType {
  user: UserType;
  signUp: (name: string, email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logInWithGoogle: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  checkUserVerified: () => Promise<Boolean| undefined>;
  updateUserData: (newUserData: UserType) => void;
}

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({
    id: null,
    name: null,
    email: null,
    number: null,
    gender: null,
    birthdate: null,
    address: null,
    wishlist: [],
    cart: [],
    review: [],
    transaction: [],
  });
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserData(user.uid);
        setUser({
          id: userData!.id,
          name: userData!.name,
          email: userData!.email,
          number: userData!.number,
          gender: userData!.gender,
          birthdate: userData!.birthdate,
          address: userData!.address,
          wishlist: userData!.wishlist,
          cart: userData!.cart,
          review: userData!.review,
          transaction: userData!.transaction,
        });
      } else {
        setUser({
          id: null,
          name: null,
          email: null,
          number: null,
          gender: null,
          birthdate: null,
          address: null,
          wishlist: [],
          cart: [],
          review: [],
          transaction: [],
        });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  const updateUserData = (newUserData: UserType) => {
    setUser(newUserData);
  }

  // get user data from firestore
  const getUserData = async (uid: string) => {
    const docRef = doc(db, "user", uid).withConverter(userConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user;
    } else {
      return null;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    const userCredential = createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const credential = await userCredential;
    // store new user account to firestore
    const newUserData = {
      id: credential.user.uid,
      name: name,
    } as UserType;
    await setDoc(doc(db, "user", newUserData.id!), newUserData);
    return userCredential;
  };

  // Login the user
  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      return result;
    });
    return result;
  };

  // Logout the user
  const logOut = async () => {
    setUser({
      id: null,
      name: null,
      email: null,
      number: null,
      gender: null,
      birthdate: null,
      address: null,
      wishlist: [],
      cart: [],
      review: [],
      transaction: [],
    });
    return await signOut(auth);
  };

  const checkUserVerified = async () => {
    return auth.currentUser?.emailVerified;
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logInWithGoogle, logOut, checkUserVerified, updateUserData }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
