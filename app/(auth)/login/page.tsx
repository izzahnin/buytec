"use client";

import { type ChangeEvent, useState } from "react";
import { RxAvatar, RxLockClosed } from "react-icons/rx";
import { FaRegEyeSlash, FaRegEye, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { UserLoginState, useAuth } from "@/firebase/auth/AuthUserProvider";
import { useRouter } from "next/navigation";

export default function Login() {
  const auth = useAuth();
  const router = useRouter();
  const [passwordType, setPasswordType] = useState("password");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto my-10 flex w-full max-w-screen-xl flex-col items-center space-y-12 py-10">
        <h1 className="text-center font-playfair text-6xl font-bold">Elixir</h1>
        <div className="flex w-full max-w-md flex-col items-center rounded-xl bg-dark-blue px-6 py-12 text-white">
          <h2 className="mb-4 text-center text-2xl font-bold">Hello Again!</h2>
          <p className="text-m text-center">{`Welcome Back You've Been Missed!`}</p>
          <form
            action="/"
            className="my-10 flex w-full max-w-xs flex-col space-y-6"
          >
            <div className="flex items-center space-x-4 rounded-full bg-primary-blue-accent px-2">
              <RxAvatar size={34} />
              <input
                type="text"
                placeholder="email"
                value={emailInput}
                onChange={(e) => {setEmailInput(e.target.value)}}
                className="h-10 w-full bg-transparent font-bold focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4 rounded-full bg-primary-blue-accent px-2">
              <RxLockClosed size={34} />
              <input
                type={passwordType}
                onChange={handlePasswordChange}
                value={passwordInput}
                placeholder="password"
                className="h-10 w-full bg-transparent font-bold focus:outline-none"
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
            <div className="flex justify-between text-xs">
              <div className="flex space-x-2">
                <input type="checkbox" id="rememberMe" name="remember_me" />
                <label htmlFor="rememberMe" className="text-s">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-s">
                Forgot Password?
              </a>
            </div>
            <div className="flex flex-col items-center space-y-6">
              <button
              onClick={async (e) => {
                e.preventDefault();
                const result = await auth.logIn(emailInput, passwordInput);
                if (result != undefined) {
                  console.log(result.user.uid);
                  router.push('/');
                }
              }
            }
                type="submit"
                className="h-8 w-36 rounded-full bg-white font-bold text-black"
              >
                Login
              </button>
              <button
              onClick={async (e) => {
                e.preventDefault();
                const result = await auth.logInWithGoogle();
                if (result != undefined) {
                  console.log(result.user.uid);
                  router.push('/');
                }
              }}
                type="submit"
                className="h-8 w-36 rounded-full bg-white text-xs text-black flex items-center justify-center"
              >
                <FaGoogle size={16} className="mr-2 inline-block " />
                Login with google
              </button>
            </div>
          </form>

          <p className="text-center text-sm">
            {`Don't Have An Account?`}{" "}
            <Link href="/signup" className="font-bold underline">
              Sign Up For Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}