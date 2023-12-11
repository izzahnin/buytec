"use client";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../config";
import {
  doc,
  getDoc,
  increment,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { UserType, userConverter } from "./user";
import { PerfumeProps } from "../perfume/perfume";
import { TransactionFirebaseProps } from "../transaction/transaction";
import { getPerfumeByIdFromLocal } from "../perfume/getPerfumeFromLocal";

export enum UserLoginState {
  Idle,
  Success,
  Failed,
  Loading,
}

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

  const [checkout, setCheckout] = useState({
    perfumes: [] as string[],
    perfumeAmount: [] as number[],
    total: 0,
    formattedTotal: "",
  });

  const placeOrder = (
    perfumes: string[],
    perfumeAmount: number[],
    total: number,
    formattedTotal: string,
  ) => {
    setCheckout({
      perfumes: perfumes,
      perfumeAmount: perfumeAmount,
      total: total,
      formattedTotal: formattedTotal,
    });
  };

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
        buy: [] as string[],
        review: [] as string[],
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
        const document = await getDoc(doc(db, "user", user.uid));
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
            review: [] as string[],
            buy: [] as string[],
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
    va: string,
    perfumes: string[],
    amounts: number[],
    total: number,
    paymentMethod: string,
  ) => {
    // document
    const docRef = doc(db, "transaction", va);

    // parse perfume id and total amount
    let perfumeId: string[] = [];
    let totalAmount: number[] = [];
    for (var i = 0; i < perfumes.length; i++) {
      const perfume = getPerfumeByIdFromLocal(perfumes[i])!;
      perfumeId.push(perfume.id);
      totalAmount.push(perfume.price * amounts[i]);
    }

    // update perfume stock on firebase
    perfumeId.forEach(async (id) => {
      await updateDoc(doc(db, 'perfume', id), {
        stock: increment(amounts[perfumeId.findIndex((val) => val == id)] * -1),
      });
    })

    // await updateStock();

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
      date: new Date(),
    };

    // find perfume index id to be removed
    const indexId: number[] = [];
    for (let perfume in perfumeId) {
      indexId.push(user.cart.findIndex((id) => id == perfume));
    }
    // remove perfumes from user cart
    let newUserCart: string[] = user.cart.filter(
      (cartId) => !perfumeId.includes(cartId),
    );
    const newCartAmount = user.cartAmount.filter(
      (amount, index) => !indexId.includes(index),
    );

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
    const newCartAmount = user.cartAmount.filter(
      (num, index) => index != indexId,
    );

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
    });
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
    const newReview = user.review;
    newReview.unshift(perfumeId);
    await updateDoc(doc(db, "user", user.id!), { review: newReview });
    setUser({
      ...user,
      review: newReview,
    });
  };

  return {
    user,
    checkout,
    loginState,
    placeOrder,
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
