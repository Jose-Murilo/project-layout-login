'use client'

import Image from 'next/image'
import Link from 'next/link'
import imgSingUp from '../../assets/image-sign-up.svg'
import IconEye from '@/assets/IconEye'
import IconEyeInvisible from '@/assets/IconEyeInvisible'
import { IconPadlock } from '@/assets/IconPadlock'
import { encryptData } from '@/utils/crypto'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

type DataFormProps = {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false)
  const { register, handleSubmit, reset } = useForm<DataFormProps>()
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  function createAccount(data: DataFormProps) {
    const { email, name, password, confirmPassword } = data

    if (email && name && password && password === confirmPassword) {
      alert('AA')
      const dataToEncrypt = {
        email,
        name,
        password,
      }

      const encryptedData = encryptData(dataToEncrypt)
      localStorage.setItem('encryptedData', encryptedData)
      reset()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="md:grid min-h-screen grid-cols-2">
        <div className="">
          <form
            onSubmit={handleSubmit(createAccount)}
            className="flex leading-relaxed justify-center items-center min-h-screen"
          >
            <div className="flex flex-col gap-5 px-2">
              <section>
                <h1 className="text-blue-700 text-[22px] text-center mb-5 font-bold">
                  Crie sua conta
                </h1>
              </section>

              <section>
                <input
                  {...register('name')}
                  className="bg-white-transparent text-sm	p-3 placeholder:text-black placeholder:text-[15px] leading-relaxed  rounded-full w-[304px]"
                  type="text"
                  placeholder="Name"
                />
              </section>

              <section>
                <input
                  {...register('email')}
                  className="bg-white-transparent text-sm placeholder:text-black placeholder:text-[15px] p-3 leading-relaxed w-[304px] rounded-full"
                  type="text"
                  placeholder="Email"
                />
              </section>

              <section>
                <div className="relative">
                  <IconPadlock
                    width={20}
                    height={20}
                    className="absolute top-[12px] left-2"
                  />
                  <input
                    {...register('password')}
                    type={isVisible ? 'password' : `text`}
                    placeholder="Senha"
                    className="bg-white-transparent px-8 text-sm leading-relaxed p-3 w-[304px] rounded-full"
                  />

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
                    width={20}
                    height={20}
                    className="absolute top-[12px] left-2"
                  />
                  <input
                    {...register('confirmPassword')}
                    type={isVisible ? 'password' : `text`}
                    placeholder="Confirme sua senha"
                    className="bg-white-transparent px-8 text-sm leading-relaxed p-3 w-[304px] rounded-full"
                  />

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

              <section className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <input className="border-2" id="remember" type="checkbox" />
                  <label htmlFor="remember" className="text-[12px] text-black">
                    Relembre
                  </label>
                </div>
              </section>

              <button className="bg-blue-700 text-white p-2 mt-2 w-[304px] rounded-full">
                Registrar
              </button>

              <Link className="text-[12px] text-center text-black" href={'/'}>
                Já possui uma conta? Logar
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden md:flex items-center bg-blue-600 justify-center">
          <Image src={imgSingUp} alt="" />
        </div>
      </div>
    )
  } else {
    window.location.href = '/home'
  }
}
