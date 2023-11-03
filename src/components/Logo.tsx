import Image from 'next/image'

const Logo = () => {
  return (
    <div className='flex justify-center items-center mb-3'>
      <Image
        alt='SafeSave logo'
        width={100}
        height={100}
        src='/safesave-bg-jpg.png'
      ></Image>
    </div>
  )
}

export default Logo
