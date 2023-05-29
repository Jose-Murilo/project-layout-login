import { decryptData } from '@/utils/crypto'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type DataFormProps = { login: string; password: string }

export function useSignInAuth() {
  const [isVisible, setIsVisible] = useState(false)
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  const { register, handleSubmit } = useForm<DataFormProps>()

  function submitUserLogin(data: DataFormProps) {
    const { login, password } = data

    if (login && password) {
      const encryptedDataFromStorage = localStorage.getItem('encryptedData')

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

        localStorage.setItem('isAuthenticated', JSON.stringify(true))
        window.location.href = '/home'
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
  }
}
