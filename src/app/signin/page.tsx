'use client'

import Image from 'next/image'
import imgLogin from '../../assets/image-login.svg'

import { useSignInAuth } from '../../hooks/useSignInAuth'
import { FormSignIn } from '@/components/FormSignIn'

export default function SignIn() {
  const { isAuthenticated } = useSignInAuth()

  if (!isAuthenticated) {
    return (
      <div className="md:grid min-h-screen grid-cols-2">
        <FormSignIn />

        <div className="hidden md:flex items-center bg-blue-200 justify-center">
          <Image src={imgLogin} alt="" />
        </div>
      </div>
    )
  } else {
    window.location.href = '/'
  }
}
