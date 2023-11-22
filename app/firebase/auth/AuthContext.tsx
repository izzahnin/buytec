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
import { collection, doc, getDoc, runTransaction, setDoc, updateDoc } from "firebase/firestore";
import { UserType, userConverter } from "./user";
import { PerfumeProps } from "../perfume/perfume";
import { TransactionProps } from "../transaction/transaction";

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
  },
  signUp: function (
    name: string,
    email: string,
    password: string,
  ): Promise<UserCredential> {
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
  updateAddress: function (address: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  updateName: function (name: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  updateBirthdate: function (birhtdate: Date): Promise<void> {
    throw new Error("Function not implemented.");
  },
  updateNumber: function (number: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  updateGender: function (gender: string): Promise<void> {
    throw new Error("Function not implemented.");
  },
  checkoutCart: function (perfumes: PerfumeProps[], amounts: number[], total: number): Promise<void> {
    throw new Error("Function not implemented.");
  },
});

interface AuthType {
  user: UserType;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  logInWithGoogle: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  checkUserVerified: () => Promise<Boolean | undefined>;
  updateAddress: (text: string) => Promise<void>;
  updateName: (text: string) => Promise<void>;
  updateBirthdate: (text: Date) => Promise<void>;
  updateNumber: (text: string) => Promise<void>;
  updateGender: (text: string) => Promise<void>;
  checkoutCart: (perfumes: PerfumeProps[], amounts: number[], total: number) => Promise<void>;
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
        });
      }
    });

    setLoading(false);

    return () => unsubscribe();
  }, []);

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
    });
    return await signOut(auth);
  };

  const checkUserVerified = async () => {
    return auth.currentUser?.emailVerified;
  };

  const updateAddress = async (address: string) => {
    await updateDoc(doc(db, "user", user.id!), {
      address: address,
    });
    setUser({
      ...user,
      address: address,
    });
  };
  const updateName = async (name: string) => {
    await updateDoc(doc(db, "user", user.id!), {
      name: name,
    });
    setUser({
      ...user,
      name: name,
    });
  };
  const updateBirthdate = async (birthdate: Date) => {
    await updateDoc(doc(db, "user", user.id!), {
      birthdate: birthdate,
    });
    setUser({
      ...user,
      birthdate: birthdate,
    });
  };

  const updateNumber = async (number: string) => {
    await updateDoc(doc(db, "user", user.id!), {
      number: number,
    });
    setUser({
      ...user,
      number: number,
    });
  };

  const updateGender = async (gender: string) => {
    await updateDoc(doc(db, "user", user.id!), {
      gender: gender,
    });
    setUser({
      ...user,
      gender: gender,
    });
  };

  const checkoutCart = async (perfumes: PerfumeProps[], amounts: number[], total: number) => {
    // document
    const docRef = doc(db, "transaction");

    // parse perfume id and total amount
    let perfumeId: string[] = [];
    let totalAmount: number[] = [];
    for (var i=0; i<perfumes.length; i++) {
      perfumeId.push(perfumes[i].id);
      totalAmount.push(perfumes[i].price * amounts[i]);
    }

    // transaction data
    const newTransaction: TransactionProps = {
      id: docRef.id,
      userId: user.id!,
      perfumeId: perfumeId,
      amount: amounts,
      totalAmount: totalAmount,
      packageStatus: "Packed",
      total: total,
    }
    
    // remove perfumes from user cart
    let newUserCart: string[] = user.cart;
    for (let perfume in perfumeId) {
      newUserCart.filter((cartId) => cartId != perfume);
    }
    
    // transaction on firebase
    await runTransaction(db, async (transaction) => {
      transaction.update(doc(db, 'user', user.id!), {
        cart: newUserCart,
      });

      transaction.set(docRef, transaction)
    })

    // update local
    setUser({
      ...user,
      cart: newUserCart
    })
    // await setDoc(docRef, newTransaction);
    // await updateDoc(doc(db, 'user', user.id!), {
    //   cart: newUserCart,
    // });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logInWithGoogle,
        logOut,
        checkUserVerified,
        updateAddress,
        updateName,
        updateBirthdate,
        updateNumber,
        updateGender,
        checkoutCart,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
