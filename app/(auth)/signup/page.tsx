"use client";

import { type ChangeEvent, useState } from "react";
import React from "react";
import { RxAvatar, RxLockClosed } from "react-icons/rx";
import { FaRegEyeSlash, FaRegEye, FaGoogle } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import Link from "next/link";
// import { UserLoginState, useAuth } from "@/firebase/auth/AuthContext";
import { useRouter } from "next/navigation";
import { UserLoginState, useAuth } from "@/firebase/auth/AuthUserProvider";

export default function SignUp() {
  const router = useRouter();
  const auth = useAuth();
  const [passwordType, setPasswordType] = useState("password");
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordInput(e.target.value);
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <div className="custom-height flex flex-col items-center justify-center">
        <div className="flex w-full max-w-screen-xl flex-col items-center gap-4">
        <div className="flex w-full max-w-md flex-col items-center rounded-xl border-dark-blue px-6 py-12 text-dark-blue shadow-custom">
        <h2 className="mb-4 text-center text-heading-m font-bold">Create Account</h2>
          <p className="text-m text-center">{`Let's Create Account Together`}</p>
          <form
            action="/"
            className="my-10 flex w-full max-w-xs flex-col gap-4"
          >
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <RxAvatar size={32} />
              <input
                type="text"
                placeholder="username"
                value={nameInput}
                onChange={(input) => setNameInput(input.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <IoMailOutline size={32} />
              <input
                type="email"
                placeholder="email"
                value={emailInput}
                onChange={(input) => setEmailInput(input.target.value)}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <RxLockClosed size={32} />
              <input
                type={passwordType}
                onChange={handlePasswordChange}
                value={passwordInput}
                placeholder="password"
                className="w-full bg-transparent focus:outline-none"
              />
              <button
                type="button"
                className="bg-transparent"
                onClick={togglePassword}
              >
                {passwordType === "password" ? (
                  <FaRegEye size={24} />
                ) : (
                  <FaRegEyeSlash size={24} />
                )}
              </button>
            </div>
            <div className="flex justify-between test-xs">
              <div className="flex space-x-2">
                <input type="checkbox" id="rememberMe" name="remember_me" />
                <label htmlFor="rememberMe" className="text-xs">
                  I agree with Terms and Privacy
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <button
                type="submit"
                className="h-8 w-40 rounded-full bg-dark-blue font-bold text-white"
                onClick={async (e) => {
                  e.preventDefault();
                  const result = await auth.signUp(
                    nameInput,
                    emailInput,
                    passwordInput,
                  );
                  console.log(auth.loginState);
                  if (result != undefined) {
                    router.push("/");
                  }
                }}
              >
                Sign Up
              </button>
              <button
                type="submit"
                className="flex h-8 w-40 items-center justify-center rounded-full border border-dark-blue text-xs text-black"
              >
                <FaGoogle size={16} className="mr-2 inline-block " />
                Sign Up with google
              </button>
            </div>
          </form>

          <p className="text-center text-sm">
            Already Have An Account?{" "}
            <Link href="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}