'use client'

import { decryptData } from '@/utils/crypto'
import { FormEvent, useMemo } from 'react'
import imgHome from '../assets/image-home.svg'
import Image from 'next/image'
import { AuthorCredits } from '@/components/AuthorCredits'

export default function Home() {
  const isAuthenticated =
    localStorage.getItem('isAuthenticated') === 'Authenticated'

  const encryptedDataFromStorage = localStorage.getItem('encryptedData')

  // Esse useMemo ele irá verificar se tem alguma mudança nos dado de nome do usuario, logo após ele irá fazer uma condição para saber se tem os dados, e se estiver, ele retornara o nome do usuario.
  const nameUser = useMemo(() => {
    if (encryptedDataFromStorage) {
      const { name } = decryptData(encryptedDataFromStorage)
      return name
    }
  }, [encryptedDataFromStorage])

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

  if (isAuthenticated) {
    return (
      <div className="md:grid md:text-left flex justify-center text-center min-h-screen grid-cols-2">
        <div className="p-8">
          <h1 className="text-5xl text-customBlue mb-5 text-bold">Home</h1>
          <p>
            Olá <span className="text-red-600 bold">{nameUser}</span> sejá
            bem-vindo!!
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex gap-3 md:justify-start justify-center mt-5">
              <button
                className="bg-gray-800 p-2 hover:bg-gray-900 text-white cursor-pointer rounded-full"
                onClick={handleLogout}
              >
                Deslogar
              </button>
              <button
                className="bg-red-800 transition-all hover:bg-red-900 p-2 text-white cursor-pointer rounded-full"
                onClick={deleteUserAccount}
              >
                Apagar conta
              </button>
            </div>

            <div className="">
              <h2>Sistema desenvolvido com:</h2>
              <div className="px-5">
                <ul className="">
                  <li>* React</li>
                  <li>* NextJS(versão:13.4)</li>
                  <li>* TailwindCSS</li>
                  <li>* LocalStorage</li>
                  <li>* crypto.js(Para criptografar dados do localStorage)</li>
                  <li>* React Hook Form</li>
                  <li>* TypeScript</li>
                </ul>
              </div>
            </div>

            <AuthorCredits />
          </div>
        </div>

        <div className="hidden md:flex items-center bg-blue-200 justify-center">
          <Image src={imgHome} alt="" />
        </div>
      </div>
    )
  } else {
    window.location.href = '/signin'
  }
}
