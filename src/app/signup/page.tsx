'use client'

import Image from 'next/image'
import imgSingUp from '../../assets/image-sign-up.svg'
import { FormSignUp } from '@/components/FormSignUp'
import { isAuthenticatedAuth } from '@/functions/isAuthenticatedAuth'

export default function SignUp() {
  const isAuthenticated = isAuthenticatedAuth()

  if (!isAuthenticated) {
    return (
      <div className="md:grid min-h-screen grid-cols-2">
        <FormSignUp />

        <div className="hidden md:flex items-center bg-blue-600 justify-center">
          <Image src={imgSingUp} alt="" />
        </div>
      </div>
    )
  } else {
    window.location.href = '/'
  }
}
