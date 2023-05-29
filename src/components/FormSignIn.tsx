import { IconBxUserCircle } from '@/assets/IconBxUserCircle'
import IconEye from '@/assets/IconEye'
import IconEyeInvisible from '@/assets/IconEyeInvisible'
import { IconPadlock } from '@/assets/IconPadlock'
import Link from 'next/link'
import { useSignInAuth } from '../hooks/useSignInAuth'
import { useCallback, useEffect } from 'react'
import { AuthorCredits } from './AuthorCredits'

export function FormSignIn() {
  const {
    isVisible,
    setIsVisible,
    register,
    handleSubmit,
    submitUserLogin,
    watch,
    errors,
    errorLogin,
    setErrorLogin,
  } = useSignInAuth()

  const filedLogin = watch('login')
  const filedPassword = watch('password')

  const handleSetErrorLogin = useCallback(() => {
    setErrorLogin(false)
  }, [setErrorLogin])

  useEffect(() => {
    if (filedLogin?.length === 0 || filedPassword?.length === 0) {
      handleSetErrorLogin()
    }
  }, [filedLogin, filedPassword, handleSetErrorLogin])

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(submitUserLogin)}
        className="flex leading-relaxed justify-center items-center min-h-screen"
      >
        <div className="flex flex-col gap-5">
          <section>
            <h1 className="text-title text-[32px] font-bold">Seja bem-vindo</h1>
          </section>

          <section>
            <div className="relative">
              <input
                {...register('login', { required: true })}
                className="bg-white-transparent text-sm	p-2 px-8 leading-relaxed w-72 rounded-full"
                type="text"
                placeholder="Login"
              />

              {errors.login && (
                <span className="absolute text-[11px] bottom-[-18px] left-2 text-red-600">
                  Este campo é obrigatorio.
                </span>
              )}

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
                {...register('password', { required: true })}
                type={isVisible ? 'text' : 'password'}
                placeholder="Senha"
                className="bg-white-transparent px-8 text-sm leading-relaxed p-2 w-72 rounded-full"
              />

              {errors.password && (
                <span className="absolute text-[11px] bottom-[-18px] left-2 text-red-600">
                  Este campo é obrigatorio.
                </span>
              )}

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

            {filedLogin?.length > 0 || filedPassword?.length > 0 ? (
              errorLogin ? (
                <span className="text-[12px] ml-2 mt-3 text-red-700">
                  Seu login ou sua senha estão incorretos
                </span>
              ) : null
            ) : (
              ''
            )}
          </section>

          <section className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <input className="border-2 " id="remember" type="checkbox" />
              <label htmlFor="remember" className="text-[12px] text-title">
                Relembre
              </label>
            </div>

            <div>
              <Link href={'/changepassword'} className="text-title text-[12px]">
                Esqueci a senha
              </Link>
            </div>
          </section>

          <button className="transition-all hover:bg-[#4085f0] bg-title text-white p-2 mt-2 w-72 rounded-full">
            Login
          </button>

          <Link className="text-[12px] text-center text-title" href={'/signup'}>
            Não tem conta? Crie aqui.
          </Link>
        </div>
      </form>
      <AuthorCredits />
    </div>
  )
}
