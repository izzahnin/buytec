"use client";
import { AdminLoginState, AuthAdminProvider, useAdmin } from "@/firebase/admin/AdminContext";
import { useAdminAuth } from "@/firebase/admin/useAdminAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RxAvatar, RxLockClosed } from "react-icons/rx";

export default function Admin() {
  const adminAuth = useAdmin();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await adminAuth.logIn(username, password);
    console.log(adminAuth.loginState);
    console.log(adminAuth.admin.username);
    if (adminAuth.loginState == AdminLoginState.Success) {
      router.push('/admin/product');
    } else {
      console.log('gagal login');
    }
  }

  return (
      <main className=" flex h-screen w-screen items-center justify-center">
        <section className="flex h-fit w-fit flex-col items-center justify-center gap-4 rounded-xl border px-12 py-6 shadow-xl ">
          <h1 className="my-3 text-heading-m font-semibold">Admin</h1>
          <section className="flex flex-col gap-4">
            <div className=" flex w-full items-center gap-4 rounded-xl border-2  px-2">
              <RxAvatar size={30} />
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
                className="h-10 w-full bg-transparent outline-none"
              />
            </div>
            <div className="flex w-full items-center gap-4 rounded-xl border-2  px-2">
              <RxLockClosed size={30} />
              <input
                type="password"
                onChange={(e) => {setPassword(e.target.value)}}
                value={password}
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
            className="my-3 w-36 rounded-xl bg-primary-blue py-2 font-bold hover:scale-105 text-white"
            onClick={handleSubmit}
          >
            Login
          </button>
        </section>
      </main>
  );
}
