"use client";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config";
import {
  doc,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { UserType, userConverter } from "./user";
import { PerfumeProps } from "../perfume/perfume";
import {
  TransactionFirebaseProps,
  TransactionProps,
} from "../transaction/transaction";
import { FirebaseError } from "firebase/app";

export enum UserLoginState {
  Idle,
  Success,
  Failed,
  Loading,
}

// export const AuthContext = createContext<AuthType>({
//   user: {
//     id: null,
//     name: null,
//     email: null,
//     number: null,
//     gender: null,
//     birthdate: null,
//     address: null,
//     wishlist: [],
//     cart: [],
//     cartAmount: [],
//   },
//   loginState: UserLoginState.Idle,
//   signUp: async function (
//     username: string,
//     email: string,
//     password: string,
//   ): Promise<UserCredential | undefined>{
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );
//       // const credential = await userCredential;
//       // store new user account to firestore
//       const newUserData = {
//         id: userCredential.user.uid,
//         name: username,
//       } as UserType;
//       await setDoc(doc(db, "user", newUserData.id!), newUserData);
//       return userCredential;
//     } catch (e) {
//       console.log((e as FirebaseError).code)
//       // setLoginState(UserLoginState.Failed);
//     }
//   },
//   logIn: function (email: string, password: string): Promise<UserCredential | undefined>  {
//     throw new Error("Function not implemented.");
//   },
//   logInWithGoogle: function (): Promise<UserCredential> | undefined {
//     throw new Error("Function not implemented.");
//   },
//   logOut: function (): Promise<void> {
//     throw new Error("Function not implemented.");
//   },
//   checkUserVerified: function (): Promise<Boolean | undefined> {
//     throw new Error("Function not implemented.");
//   },
//   updateAddress: function (address: string): Promise<void> {
//     throw new Error("Function not implemented.");
//   },
//   updateName: function (name: string): Promise<void> {
//     throw new Error("Function not implemented.");
//   },
//   updateBirthdate: function (birhtdate: Date): Promise<void> {
//     throw new Error("Function not implemented.");
//   },
//   updateNumber: function (number: string): Promise<void> {
//     throw new Error("Function not implemented.");
//   },
//   updateGender: function (gender: string): Promise<void> {
//     throw new Error("Function not implemented.");
//   },
//   checkoutCart: function (
//     perfumes: PerfumeProps[],
//     amounts: number[],
//     total: number,
//   ): Promise<void> {
//     throw new Error("Function not implemented.");
//   },
//   addToCart: function (perfumeId: string, amount: number): Promise<void> {
//     throw new Error("Function not implemented");
//   },
//   deleteFromCart: function (perfumeId: string): Promise<void> {
//     throw new Error("Function not implemented");
//   },
//   updateAmountOnCart: function (
//     perfumeId: string,
//     amount: number,
//     increment: boolean,
//   ): Promise<void> {
//     throw new Error("Function not implemented");
//   },
// });

// interface AuthType {
//   user: UserType;
//   loginState: UserLoginState;
//   signUp: (
//     username: string,
//     email: string,
//     password: string,
//   ) => Promise<UserCredential | undefined> | undefined;
//   logIn: (email: string, password: string) => Promise<UserCredential | undefined>;
//   logInWithGoogle: () => Promise<UserCredential> | undefined;
//   logOut: () => Promise<void>;
//   checkUserVerified: () => Promise<Boolean | undefined>;
//   updateAddress: (text: string) => Promise<void>;
//   updateName: (text: string) => Promise<void>;
//   updateBirthdate: (text: Date) => Promise<void>;
//   updateNumber: (text: string) => Promise<void>;
//   updateGender: (text: string) => Promise<void>;
//   checkoutCart: (
//     perfumes: PerfumeProps[],
//     amounts: number[],
//     total: number,
//   ) => Promise<void>;
//   addToCart: (perfumeId: string, amount: number) => Promise<void>;
//   deleteFromCart: (perfumeId: string) => Promise<void>;
//   updateAmountOnCart: (
//     perfumeId: string,
//     amount: number,
//     increment: boolean,
//   ) => Promise<void>;
// }

export function useFirebaseAuth() {
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
    cartAmount: [],
    review: [],
    buy: [],
  });
  const [loginState, setLoginState] = useState<UserLoginState>(
    UserLoginState.Idle,
  );

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
          cartAmount: userData!.cartAmount,
    review: userData!.review,
    buy: userData!.buy,
        });
        console.log(userData?.name);
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
          cartAmount: [],
    review: [],
    buy: [],
        });
      }
    });

    // setLoginState(UserLoginState.Idle);

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
    try {
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
        email: email,
        wishlist: [] as string[],
        cart: [] as string[],
        cartAmount: [] as number[],
      } as UserType;
      await setDoc(doc(db, "user", newUserData.id!), newUserData);
      setLoginState(() => UserLoginState.Success);
      await sendEmailVerification(credential.user);
      return credential;
    } catch (e) {
      setLoginState(UserLoginState.Failed);
    }
  };

  // Login the user
  const logIn = async (email: string, password: string) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return credential;
    } catch (e) {
      setLoginState(UserLoginState.Failed);
    }
  };

  const logInWithGoogle = () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = signInWithPopup(auth, provider).then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // check if user has data in firestore
        const document = await getDoc(doc(db, 'user', user.uid));
        if (document.exists()) {
          //not doing anything
        } else {
          // create new user data and send email verification
          const newUserData = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            wishlist: [] as string[],
            cart: [] as string[],
            cartAmount: [] as number[],
          } as UserType;
          await setDoc(doc(db, "user", newUserData.id!), newUserData);
          setLoginState(() => UserLoginState.Success);
          await sendEmailVerification(user);
        }
        return result;
      });
      return result;
    } catch (e) {
      setLoginState(UserLoginState.Failed);
    }
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
      cartAmount: [],
    review: [],
    buy: [],
    });
    setLoginState(UserLoginState.Idle);
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

  const updateBirthdate = async (birthdate: string) => {
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

  const checkoutCart = async (
    perfumes: PerfumeProps[],
    amounts: number[],
    total: number,
    paymentMethod: string,
  ) => {
    // document
    const docRef = doc(db, "transaction");

    // parse perfume id and total amount
    let perfumeId: string[] = [];
    let totalAmount: number[] = [];
    for (var i = 0; i < perfumes.length; i++) {
      perfumeId.push(perfumes[i].id);
      totalAmount.push(perfumes[i].price * amounts[i]);
    }

    // new transaction data
    const newTransaction: TransactionFirebaseProps = {
      id: docRef.id,
      userId: user.id!,
      userName: user.name!,
      address: user.address!,
      perfumeId: perfumeId,
      amount: amounts,
      totalAmount: totalAmount,
      packageStatus: "Packed",
      total: total,
      paymentMethod: paymentMethod,
    };

    // find perfume index id to be removed
    const indexId: number[] = [];
    for (let perfume in perfumeId) {
      indexId.push(user.cart.findIndex((id) => id == perfume));
    }
    // remove perfumes from user cart
    let newUserCart: string[] = user.cart.filter((cartId) => !perfumeId.includes(cartId));
    const newCartAmount = user.cartAmount.filter((index) => !indexId.includes(index));

    const newBuy = user.buy;
    newBuy.unshift(...perfumeId);

    // transaction on firebase
    await runTransaction(db, async (transaction) => {
      transaction.update(doc(db, "user", user.id!), {
        cart: newUserCart,
        cartAmount: newCartAmount,
        buy: newBuy,
      });

      transaction.set(docRef, newTransaction);
    });

    // update local
    setUser({
      ...user,
      cart: newUserCart,
      cartAmount: newCartAmount,
      buy: newBuy,
    });
  };

  const addToCart = async (perfumeId: string, amount: number) => {
    let newCart = user.cart;
    let newCartAmount = user.cartAmount;
    // if item already in cart
    if (newCart.includes(perfumeId)) {
      const indexId = newCart.findIndex((value) => value == perfumeId);
      // delete items from cart & amount
      newCart = newCart.filter((id) => id != perfumeId);
      // get the amount in the cart before
      const previousAmount = newCartAmount[indexId];
      newCartAmount = newCartAmount.filter((num, index) => index != indexId);
      // add item at the start of the list
      newCart.unshift(perfumeId);
      newCartAmount.unshift(amount + previousAmount);
    }
    // if item is not yet in cart
    else {
      // add item in cart
      newCart.unshift(perfumeId);
      newCartAmount.unshift(amount);
    }

    await updateDoc(doc(db, "user", user.id!), {
      cart: newCart,
      cartAmount: newCartAmount,
    });

    setUser({
      ...user,
      cart: newCart,
      cartAmount: newCartAmount,
    });
  };

  const deleteFromCart = async (perfumeId: string) => {
    // get the index of the perfume
    const indexId = user.cart.findIndex((id) => id == perfumeId);
    // remove the perfume from cart and cart amount
    const newCart = user.cart.filter((id) => id != perfumeId);
    const newCartAmount = user.cartAmount.filter((num, index) => index != indexId);

    setUser({
      ...user,
      cart: newCart,
      cartAmount: newCartAmount,
    });

    await updateDoc(doc(db, "user", user.id!), {
      cart: newCart,
      cartAmount: newCartAmount,
    });
  };

  const updateAmountOnCart = async (
    perfumeId: string,
    // amount: number,
    increment: boolean,
  ) => {
    const cart = user.cart;
    const newCartAmount = user.cartAmount;
    // look for the index of perfume
    const indexId = cart.findIndex((id) => id == perfumeId);
    // add/reduce the amount the amount
    if (increment) {
      newCartAmount[indexId] += 1;
    } else {
      if (newCartAmount[indexId] == 1) return;
      newCartAmount[indexId] -= 1;
    }

    await updateDoc(doc(db, "user", user.id!), {
      cartAmount: newCartAmount,
    });
    setUser({
      ...user,
      cartAmount: newCartAmount,
    })
  };

  const addToWishlist = async (perfumeId: string) => {
    const newWishlist = user.wishlist;
    // add item in wishlist
    newWishlist.unshift(perfumeId);

    await updateDoc(doc(db, "user", user.id!), { wishlist: newWishlist });

    setUser({
      ...user,
      wishlist: newWishlist,
    });
  };

  const deleteFromWishlist = async (perfumeId: string) => {
    // remove id from wishlist
    const newWishlist = user.wishlist.filter((id) => id != perfumeId);
    await updateDoc(doc(db, "user", user.id!), { wishlist: newWishlist });

    setUser({
      ...user,
      wishlist: newWishlist,
    });
  };

  const addReview = async (perfumeId: string) => {
    const newReview = user.review
    newReview.unshift(perfumeId);
    await updateDoc(doc(db, "user", user.id!), { review: newReview});
    setUser({
      ...user,
      review: newReview,
    });
  }

  return {
    user,
    loginState,
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
    addToCart,
    deleteFromCart,
    updateAmountOnCart,
    addToWishlist,
    deleteFromWishlist,
    addReview,
  };
}
