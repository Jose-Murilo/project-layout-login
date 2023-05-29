'use client'

import Image from 'next/image'
import imgLogin from '../assets/image-login.svg'
import Link from 'next/link'
import { IconBxUserCircle } from '../assets/IconBxUserCircle'
import { IconPadlock } from '../assets/IconPadlock'
import IconEye from '../assets/IconEye'
import IconEyeInvisible from '@/assets/IconEyeInvisible'
import { useSignInAuth } from './hooks/useSignInAuth'

export default function SignIn() {
  const {
    isVisible,
    setIsVisible,
    register,
    handleSubmit,
    isAuthenticated,
    submitUserLogin,
  } = useSignInAuth()

  if (!isAuthenticated) {
    return (
      <div className="md:grid min-h-screen grid-cols-2">
        <div className="">
          <form
            onSubmit={handleSubmit(submitUserLogin)}
            className="flex leading-relaxed justify-center items-center min-h-screen"
          >
            <div className="flex flex-col gap-5">
              <section>
                <h1 className="text-title text-[32px] font-bold">
                  Seja bem-vindo
                </h1>
              </section>

              <section>
                <div className="relative">
                  <input
                    {...register('login')}
                    className="bg-white-transparent text-sm	p-2 px-8 leading-relaxed w-72 rounded-full"
                    type="text"
                    placeholder="Login"
                  />
                  <IconBxUserCircle
                    width={20}
                    height={18}
                    className="absolute top-[11px] left-2"
                  />
                </div>
              </section>

              <section>
                <div className="relative">
                  <IconPadlock
                    width={20}
                    height={18}
                    className="absolute top-[11px] left-2"
                  />
                  <input
                    {...register('password')}
                    type={isVisible ? 'password' : `text`}
                    placeholder="Senha"
                    className="bg-white-transparent px-8 text-sm leading-relaxed p-2 w-72 rounded-full"
                  />

                  {isVisible ? (
                    <IconEye
                      width={20}
                      height={20}
                      onClick={() => setIsVisible((prev) => !prev)}
                      className="absolute top-[10px] right-5 cursor-pointer"
                    />
                  ) : (
                    <IconEyeInvisible
                      width={20}
                      height={20}
                      onClick={() => setIsVisible((prev) => !prev)}
                      className="absolute top-[10px] right-5 cursor-pointer"
                    />
                  )}
                </div>
              </section>

              <section className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <input className="border-2 " id="remember" type="checkbox" />
                  <label htmlFor="remember" className="text-[12px] text-title">
                    Relembre
                  </label>
                </div>

                <div>
                  <Link
                    href={'/changepassword'}
                    className="text-title text-[12px]"
                  >
                    Esqueci a senha
                  </Link>
                </div>
              </section>

              <button className="bg-title text-white p-2 mt-2 w-72 rounded-full">
                Login
              </button>

              <Link
                className="text-[12px] text-center text-title"
                href={'/signup'}
              >
                Não tem conta? Crie aqui.
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden md:flex items-center bg-blue-200 justify-center">
          <Image src={imgLogin} alt="" />
        </div>
      </div>
    )
  } else {
    window.location.href = '/home'
  }
}
