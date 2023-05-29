'use client'

import { decryptData } from '@/utils/crypto'
import { FormEvent } from 'react'

export default function Home() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  const encryptedDataFromStorage = localStorage.getItem('encryptedData')
  const { name } = decryptData(encryptedDataFromStorage)

  function handleLogout(event: FormEvent) {
    event.preventDefault()
    const confirm = window.confirm('Deseja realmente deslogar?')

    if (confirm) {
      localStorage.setItem('isAuthenticated', JSON.stringify(false))
      window.location.href = '/'
    }
  }

  if (isAuthenticated) {
    return (
      <div>
        <h1>Home</h1>
        <p>
          Olá <span className="text-red-600 bold">{name}</span> sejá bem-vindo!!
        </p>
        <button onClick={handleLogout}>Deslogar</button>
      </div>
    )
  } else {
    window.location.href = '/'
  }
}
