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
  const [signupError, setSignupError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoading(true);
    setSignupError(null);
    try {
      const result = await auth.logIn(emailInput, passwordInput);
      if (result == undefined) {
        router.push("/");
      } else {
        setSignupError("Email and/or password is wrong");
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
    }
  };

  return (
    <div className="custom-height mx-3 flex flex-col items-center justify-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-4">
        <div className="bder flex w-full max-w-md flex-col items-center rounded-xl border-dark-blue px-6 py-12 text-dark-blue shadow-custom">
          <h2 className="mb-4 text-center text-heading-m font-bold">
            Hello Again!
          </h2>
          <p className="text-m text-center">{`Welcome Back You've Been Missed!`}</p>
          <form
            action="/"
            className="my-10 flex w-full max-w-xs flex-col gap-4"
          >
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <RxAvatar size={32} />
              <input
                type="text"
                placeholder="Email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-4 rounded-full border px-4 py-2">
              <RxLockClosed size={32} />
              <input
                type={passwordType}
                onChange={handlePasswordChange}
                value={passwordInput}
                placeholder="Password"
                className=" w-full bg-transparent focus:outline-none"
              />
            </div>

            {signupError && (
              <span className="flex justify-center text-red-500">
                {signupError}
              </span>
            )}
            <div className="flex flex-col items-center space-y-6">
              <button
                onClick={handleLogin}
                type="submit"
                className="h-8 w-40 rounded-full bg-dark-blue font-bold text-white"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <button
                onClick={handleGoogleLogin}
                type="submit"
                className="flex h-8 w-40 items-center justify-center rounded-full border border-dark-blue text-xs text-black"
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
