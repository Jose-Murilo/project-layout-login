'use client'

import Link from 'next/link'
import imgChangePassword from '../../assets/image-change-password.svg'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { decryptData, encryptData } from '@/utils/crypto'
import { useState } from 'react'
import IconEye from '@/assets/IconEye'
import IconEyeInvisible from '@/assets/IconEyeInvisible'
import { IconPadlock } from '@/assets/IconPadlock'
import { AuthorCredits } from '@/components/AuthorCredits'

type AlterPasswordProps = {
  newPassword: string
  confirmNewPassword: string
}

export default function ChangePassword() {
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
        const { name, email } = decryptData(encryptedDataFromStorage)
        if (password && confirmNewPassword && password === confirmNewPassword) {
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
      } else {
        alert('Você não tem conta para alterar senha!')
      }
    }
  }

  return (
    <div className="md:grid min-h-screen grid-cols-2">
      <div className="">
        <form
          onSubmit={handleSubmit(alterPassword)}
          className="flex leading-relaxed bg-changePassword justify-center items-center min-h-screen"
        >
          <div className="flex flex-col gap-5">
            <section>
              <h1 className="text-white text-[32px] ml-2 font-bold">
                Alterar senha
              </h1>
            </section>

            <section>
              <div className="relative">
                <IconPadlock
                  width={23}
                  height={23}
                  className="absolute top-[11px] left-2"
                />
                <input
                  {...register('newPassword', { required: true })}
                  type={isVisible ? 'text' : 'password'}
                  placeholder="Senha"
                  className="bg-white-transparent text-sm px-8 placeholder:text-sm placeholder:text-black p-3 leading-relaxed w-[300px] sm:w-[350px] rounded-full"
                />
                {errors.newPassword && (
                  <span className="absolute text-[11px] bottom-[-18px] left-2 text-red-600">
                    Este campo é obrigatorio.
                  </span>
                )}

                {isVisible ? (
                  <IconEye
                    width={22}
                    height={22}
                    onClick={() => setIsVisible((prev) => !prev)}
                    className="absolute top-[13px] right-5 cursor-pointer"
                  />
                ) : (
                  <IconEyeInvisible
                    width={22}
                    height={22}
                    onClick={() => setIsVisible((prev) => !prev)}
                    className="absolute top-[13px] right-5 cursor-pointer"
                  />
                )}
              </div>
            </section>

            <section>
              <div className="relative">
                <IconPadlock
                  width={23}
                  height={23}
                  className="absolute top-[11px] left-2"
                />
                <input
                  {...register('confirmNewPassword', { required: true })}
                  type={isVisible ? 'text' : 'password'}
                  placeholder="Confirme a nova senha"
                  className="bg-white-transparent focus:outline-black text-sm px-8 placeholder:text-sm placeholder:text-black p-3 leading-relaxed w-[300px] sm:w-[350px] rounded-full"
                />
                {errors.confirmNewPassword && (
                  <span className="absolute text-[11px] bottom-[-18px] left-2 text-red-600">
                    Este campo é obrigatorio.
                  </span>
                )}

                {isVisible ? (
                  <IconEye
                    width={22}
                    height={22}
                    onClick={() => setIsVisible((prev) => !prev)}
                    className="absolute top-[13px] right-5 cursor-pointer"
                  />
                ) : (
                  <IconEyeInvisible
                    width={22}
                    height={22}
                    onClick={() => setIsVisible((prev) => !prev)}
                    className="absolute top-[13px] right-5 cursor-pointer"
                  />
                )}
              </div>
            </section>

            <button className="bg-title transition-all hover:bg-[#4085f0] text-white  p-2 mt-2 w-[300px] sm:w-[350px] rounded-full">
              Alterar
            </button>

            <Link
              className="text-[12px] text-center text-white"
              href={'/signin'}
            >
              Volte para a tela de login
            </Link>
          </div>
        </form>
        <AuthorCredits colorText="white" />
      </div>

      <div className="hidden md:flex items-center bg-blue-transparent justify-center">
        <Image src={imgChangePassword} alt="" />
      </div>
    </div>
  )
}
