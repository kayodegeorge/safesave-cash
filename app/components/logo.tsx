import Image from 'next/image'

export const Logo = () => {
  return (
    <div className='mt-10 flex justify-center items-center'>
      <Image
        src='/safesave-bg-jpg.png'
        width={100}
        height={100}
        alt='Logo'
      ></Image>
    </div>
  )
}
export default Logo
