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
  const [nameInput, setNameInput] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeTermsNotChecked, setAgreeTermsNotChecked] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAgreeTermsNotChecked(false);
    setAgreeTerms(event.target.checked);
  };

  const handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordInput(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordTooShort(true);
    } else {
      setPasswordTooShort(false);
    }
  };

  const handleConfirmPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPasswordInput(e.target.value);
    if (passwordInput != e.target.value) {
      setPasswordNotMatch(true);
    } else {
      setPasswordNotMatch(false);
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const toggleConfirmPassword = () => {
    if (passwordType === "password") {
      setConfirmPasswordType("text");
      return;
    }
    setConfirmPasswordType("password");
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoading(true)
    setSignupError(null);
    const resubmit =
      !emailRegex.test(emailInput) || !agreeTerms || nameInput == "" || passwordInput != confirmPasswordInput;
    if (!emailRegex.test(emailInput)) {
      setEmailInvalid(true);
    }
    if (!agreeTerms) {
      setAgreeTermsNotChecked(true);
    }
    if (nameInput == "") {
      setNameEmpty(true);
    }
    if (passwordInput != confirmPasswordInput) {
      setPasswordNotMatch(true);
    }
    // console.log(agreeTerms);
    if (resubmit) {
      setLoading(false);
      return;
    }

    try {
      const result = await auth.signUp(nameInput, emailInput, passwordInput);
      // console.log(auth.loginState);
      if (result == undefined) {
        router.push("/");
      } else {
        setSignupError(result);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const result = await auth.logInWithGoogle();
    if (result == undefined) {
      router.push("/");
    } else {
      setSignupError(result);
    }
  };

  return (
    <div className="custom-height flex flex-col items-center justify-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-4">
        <div className="flex w-full max-w-md flex-col items-center rounded-xl border-dark-blue px-6 py-12 text-dark-blue shadow-custom">
          <h2 className="mb-4 text-center text-heading-m font-bold">
            Create Account
          </h2>
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
                onChange={(input) => {
                  setNameEmpty(false);
                  setNameInput(input.target.value);
                }}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            {nameEmpty && (
              <span className="text-red-500">Username must be filled</span>
            )}
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <IoMailOutline size={32} />
              <input
                type="email"
                placeholder="email"
                value={emailInput}
                onChange={(input) => {
                  setEmailInput(input.target.value);
                  setEmailInvalid(false);
                }}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            {emailInvalid && (
              <span className="text-red-500">Email is not valid</span>
            )}
            {/* password */}
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <RxLockClosed size={32} />
              <input
                type={passwordType}
                onChange={handlePasswordChange}
                value={passwordInput}
                placeholder="password"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            {passwordTooShort && (
              <span className="text-red-500">
                Password must have minimum 6 characters
              </span>
            )}
            {/* confirm password */}
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <RxLockClosed size={32} />
              <input
                type={confirmPasswordType}
                onChange={handleConfirmPasswordChange}
                value={confirmPasswordInput}
                placeholder="confirm password"
                className="w-full bg-transparent focus:outline-none"
              />
              {/* <button
                type="button"
                className="bg-transparent"
                onClick={toggleConfirmPassword}
              >
                {confirmPasswordType === "password" ? (
                  <FaRegEye size={24} />
                ) : (
                  <FaRegEyeSlash size={24} />
                )}
              </button> */}
            </div>
            {passwordNotMatch && (
              <span className="text-red-500">
                Password did not match
              </span>
            )}
            <div className="test-xs flex justify-between">
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="remember_me"
                  checked={agreeTerms}
                  className="text-primary-blue"
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="rememberMe" className="text-xs">
                  I agree with Terms and Privacy
                </label>
              </div>
            </div>
            {agreeTermsNotChecked && (
              <span className="text-red-500">
                Terms and Privacy must be checked
              </span>
            )}
            {signupError && (
              <span className="text-red-500 flex justify-center">
                {signupError}
              </span>
            )}
            <div className="flex flex-col items-center space-y-6">
              <button
                type="submit"
                className="h-8 w-40 rounded-full bg-dark-blue font-bold text-white"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
              <button
                type="submit"
                className="flex h-8 w-40 items-center justify-center rounded-full border border-dark-blue text-xs text-black"
                onClick={handleGoogleLogin}
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
