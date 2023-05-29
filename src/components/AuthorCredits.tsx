export function AuthorCredits({ colorText }: { colorText?: string }) {
  return (
    <div
      className={`absolute bottom-1 ${
        colorText ? 'text-white' : 'text-black'
      }  right-6 md:right-[52%]`}
    >
      <p>developer 💜 by @Murilo</p>
    </div>
  )
}
