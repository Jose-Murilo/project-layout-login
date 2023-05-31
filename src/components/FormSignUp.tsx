import { UseFormProps } from '../@types/useForm'
import { IconBxUserCircle } from '@/assets/IconBxUserCircle'
import IconEmailOutline from '@/assets/IconEmailOutline'
import IconEye from '@/assets/IconEye'
import IconEyeInvisible from '@/assets/IconEyeInvisible'
import { IconPadlock } from '@/assets/IconPadlock'
import { encryptData } from '@/utils/crypto'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthorCredits } from './AuthorCredits'

export function FormSignUp() {
  const [isVisible, setIsVisible] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormProps>()

  function createAccount({
    email,
    name,
    password,
    confirmPassword,
  }: UseFormProps) {
    if (email && name && password && password === confirmPassword) {
      const dataToEncrypt = {
        email,
        name,
        password,
      }

      const encryptedData = encryptData(dataToEncrypt)
      localStorage.setItem('encryptedData', encryptedData)
      reset()
      alert('Cadastrado realizado com sucesso!')
      window.location.href = '/signin'
    }
  }
  return (
    <div className="">
      <form
        onSubmit={handleSubmit(createAccount)}
        className="flex leading-relaxed justify-center items-center min-h-screen"
      >
        <div className="flex flex-col gap-6 px-2">
          <section>
            <h1 className="text-blue-700 text-[22px] text-center mb-5 font-bold">
              Crie sua conta
            </h1>
          </section>

          <section>
            <div className="relative ">
              <IconBxUserCircle
                width={20}
                height={20}
                className="absolute top-[12px] left-2"
              />
              <input
                {...register('name', { required: true })}
                className="bg-white-transparent text-sm	p-3 px-8 placeholder:text-black placeholder:text-[15px] leading-relaxed  rounded-full w-[304px]"
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <span className="absolute text-[11px] bottom-[-18px] left-2 text-red-600">
                  Este campo é obrigatorio.
                </span>
              )}
            </div>
          </section>

          <section>
            <div className="relative">
              <IconEmailOutline
                width={20}
                height={20}
                className="absolute top-[12px] left-2"
              />
              <input
                {...register('email', { required: true })}
                className="bg-white-transparent text-sm px-8 placeholder:text-black placeholder:text-[15px] p-3 leading-relaxed w-[304px] rounded-full"
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <span className="absolute text-[11px] bottom-[-18px] left-2 text-red-600">
                  Este campo é obrigatorio.
                </span>
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
              <div>
                <input
                  {...register('password', { required: true })}
                  type={isVisible ? 'text' : 'password'}
                  placeholder="Senha"
                  className="bg-white-transparent px-8 text-sm leading-relaxed p-3 w-[304px] rounded-full"
                />
                {errors.password && (
                  <span className="absolute text-[11px] bottom-[-18px] left-2 text-red-600">
                    Este campo é obrigatorio.
                  </span>
                )}
              </div>

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
                {...register('confirmPassword', { required: true })}
                type={isVisible ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                className="bg-white-transparent px-8 text-sm leading-relaxed p-3 w-[304px] rounded-full"
              />

              {errors.confirmPassword && (
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

          <section className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <input className="border-2" id="remember" type="checkbox" />
              <label htmlFor="remember" className="text-[12px] text-black">
                Relembre
              </label>
            </div>
          </section>

          <div className="flex flex-col gap-1">
            <button className="bg-blue-700 transition-all hover:bg-[#023f9b]  text-white p-2 mt-2 w-[304px] rounded-full">
              Registrar
            </button>

            <Link
              className="text-[12px] text-center text-black"
              href={'/signin'}
            >
              Já possui uma conta? Logar
            </Link>
          </div>
        </div>
      </form>
      <AuthorCredits />
    </div>
  )
}
