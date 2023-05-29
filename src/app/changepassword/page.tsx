import Link from 'next/link'
import imgChangePassword from '../../assets/image-change-password.svg'
import Image from 'next/image'

export default function ChangePassword() {
  return (
    <div className="md:grid min-h-screen grid-cols-2">
      <div className="">
        <form className="flex leading-relaxed bg-changePassword justify-center items-center min-h-screen">
          <div className="flex flex-col gap-5">
            <section>
              <h1 className="text-white text-[32px] mb-5 font-bold">
                Alterar senha
              </h1>
            </section>

            <section>
              <input
                className="bg-white-transparent placeholder:text-sm placeholder:text-black p-3 leading-relaxed w-[300px] sm:w-[350px] rounded-full"
                type="text"
                placeholder="Nova senha"
              />
            </section>

            <section>
              <div className="">
                <input
                  type="text"
                  placeholder="Confirme a nova senha"
                  className="bg-white-transparent placeholder:text-sm placeholder:text-black leading-relaxed p-3 w-full rounded-full"
                />
              </div>
            </section>

            <button className="bg-title text-white p-2 mt-2 w-[300px] sm:w-[350px] rounded-full">
              Alterar
            </button>

            <Link className="text-[12px] text-center text-white" href={'/'}>
              Volte para a tela de login
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:flex items-center bg-blue-transparent justify-center">
        <Image src={imgChangePassword} alt="" />
      </div>
    </div>
  )
}
