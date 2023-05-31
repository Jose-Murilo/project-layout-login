import { isAuthenticatedAuth } from '@/functions/isAuthenticatedAuth'
import { decryptData, encryptData } from '@/utils/crypto'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type AlterPasswordProps = {
  newPassword: string
  confirmNewPassword: string
  password: string
}

export function useChangePassword() {
  const isAuthenticated = isAuthenticatedAuth()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AlterPasswordProps>()
  const [isVisible, setIsVisible] = useState(false)

  function alterPassword({
    newPassword: password,
    confirmNewPassword,
  }: AlterPasswordProps) {
    const encryptedDataFromStorage = localStorage.getItem('encryptedData')
    const isChangedPassword = confirm('Deseja realmente alterar a sua senha?')

    if (isChangedPassword) {
      if (encryptedDataFromStorage) {
        const {
          name,
          email,
          password: passwordLocal,
        } = decryptData(encryptedDataFromStorage)
        if (password !== passwordLocal) {
          if (
            password &&
            confirmNewPassword &&
            password === confirmNewPassword
          ) {
            const dataToEncrypt = {
              name,
              email,
              password,
            }
            console.log(dataToEncrypt)

            const encryptedData = encryptData(dataToEncrypt)
            localStorage.setItem('encryptedData', encryptedData)
            reset()
            alert('Senha alterada com sucesso!')
          } else {
            alert('Os dois campos precisam conter a mesma senha!')
          }
        }
        alert('Você tem que adicionar uma senha que seja diferente da passada!')
      } else {
        alert('Você não tem conta para alterar senha!')
      }
    }
  }

  return {
    isAuthenticated,
    alterPassword,
    isVisible,
    errors,
    register,
    handleSubmit,
    setIsVisible,
  }
}
