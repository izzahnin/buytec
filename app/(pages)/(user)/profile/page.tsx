'use client'
import { useAuth } from '@/firebase/auth/AuthUserProvider'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Profile() {
  const auth = useAuth();
  const router = useRouter();
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
    <h1>profile page</h1>
    <button onClick={async () => {
      await auth.logOut();
      router.push('/product')
    }}>
      log out
    </button>
  </div>
  )
}
