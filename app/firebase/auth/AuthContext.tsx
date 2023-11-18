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

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

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
    review: null,
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
          review: null,
          transaction: [],
        });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

  // get user data from firestore
  const getUserData = async (uid: string, ) => {
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
    const userCredential = createUserWithEmailAndPassword(auth, email, password);
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
      review: null,
      transaction: [],
    });
    return await signOut(auth);
  };

  const checkUserVerified = async () => {
    return auth.currentUser?.emailVerified;
  };

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logInWithGoogle, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
