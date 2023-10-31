import Image from 'next/image'

export const Logo = () => {
  return (
    <div className='mt-14 flex justify-center items-center'>
      <Image
        src='/safesave-bg-jpg.png'
        width={125}
        height={125}
        alt='Logo'
      ></Image>
    </div>
  )
}
export default Logo
