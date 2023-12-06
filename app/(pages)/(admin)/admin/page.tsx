"use client";
import React from "react";
import { RxAvatar, RxLockClosed } from "react-icons/rx";

export default function admin() {
  return (
    <main className=" flex h-screen w-screen items-center justify-center">
      <section className="flex h-fit w-fit flex-col items-center justify-center gap-4 rounded-xl border px-12 py-6 shadow-xl ">
        <h1 className="my-3 text-heading-m font-semibold">Admin</h1>
        <section className="flex flex-col gap-4">
          <div className=" flex w-full items-center gap-4 rounded-xl border-2  px-2">
            <RxAvatar size={30} />
            <input
              type="text"
              placeholder="email"
              // value={emailInput}
              // onChange={(e) => {setEmailInput(e.target.value)}}
              className="h-10 w-full bg-transparent outline-none"
            />
          </div>
          <div className="flex w-full items-center gap-4 rounded-xl border-2  px-2">
            <RxLockClosed size={30} />
            <input
              type="password"
              // onChange={handlePasswordChange}
              // value={passwordInput}
              placeholder="password"
              className="h-10 w-full bg-transparent outline-none"
            />
          </div>
        </section>
        <button
          //   onClick={async (e) => {
          //     e.preventDefault();
          //     const result = await auth.logIn(emailInput, passwordInput);
          //     if (result != undefined) {
          //       console.log(result.user.uid);
          //       router.push('/');
          //     }
          //   }
          // }
          type="submit"
          className="my-3 w-36 rounded-xl bg-primary-blue py-2 font-bold text-white"
        >
          Login
        </button>
      </section>
    </main>
  );
}
