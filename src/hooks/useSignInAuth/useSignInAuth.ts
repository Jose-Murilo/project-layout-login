'use client'

import { UseFormProps } from '@/@types/useForm'
import { isAuthenticatedAuth } from '@/functions/isAuthenticatedAuth'
import { decryptData } from '@/utils/crypto'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// type UseFormLoginProps = { }

export function useSignInAuth() {
  const [isVisible, setIsVisible] = useState(false)
  const [errorLogin, setErrorLogin] = useState(false)

  const isAuthenticated = isAuthenticatedAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UseFormProps>()

  function submitUserLogin({ login, password }: UseFormProps) {
    if (login && password) {
      setErrorLogin(false)
      const encryptedDataFromStorage = localStorage.getItem('encryptedData')

      if (encryptedDataFromStorage) {
        const {
          name: loginLocal,
          email,
          password: passwordLocal,
        } = decryptData(encryptedDataFromStorage)

        if (
          (login === loginLocal || login === email) &&
          password === passwordLocal
        ) {
          alert('Você foi logado com sucesso!')

          localStorage.setItem('isAuthenticated', 'Authenticated')
          window.location.href = '/'
        } else {
          setErrorLogin(true)
        }
      } else {
        setErrorLogin(true)
      }
    }
  }

  return {
    isVisible,
    setIsVisible,
    register,
    handleSubmit,
    isAuthenticated,
    submitUserLogin,
    errorLogin,
    setErrorLogin,
    watch,
    errors,
  }
}
