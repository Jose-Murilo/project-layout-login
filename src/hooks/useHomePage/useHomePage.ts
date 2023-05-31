import { decryptData } from '@/utils/crypto'
import { useState, useEffect, FormEvent } from 'react'

export function useHomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [nameUser, setNameUser] = useState('')

  useEffect(() => {
    const storedValue = localStorage.getItem('isAuthenticated')
    const isAuthenticated = storedValue === 'Authenticated'
    setIsAuthenticated(isAuthenticated)

    if (!isAuthenticated) {
      window.location.href = '/signin'
    }

    const encryptedDataFromStorage = localStorage.getItem('encryptedData')

    if (encryptedDataFromStorage) {
      const { name } = decryptData(encryptedDataFromStorage)
      setNameUser(name)
    }
  }, [])

  function handleLogout(event: FormEvent) {
    event.preventDefault()
    const confirm = window.confirm('Deseja realmente deslogar?')

    if (confirm) {
      localStorage.setItem('isAuthenticated', 'notAuthenticated')
      window.location.href = '/signin'
    }
  }

  function deleteUserAccount() {
    const isDeleted = window.confirm('Deseja realmente apagar sua conta?')

    if (isDeleted) {
      localStorage.removeItem('encryptedData')
      localStorage.setItem('isAuthenticated', 'notAuthenticated')
      window.location.href = '/signin'
    }
  }

  return {
    isAuthenticated,
    nameUser,
    handleLogout,
    deleteUserAccount,
  }
}
