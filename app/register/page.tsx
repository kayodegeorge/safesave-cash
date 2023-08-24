'use client'

import SignUpForm from '../components/SignUpForm'
import Heading from '../components/heading'

const Register = () => {
  return (
    <>
      <main className='flex flex-col sm:flex-row w-full justify-center items-center min-h-screen text-[16px] font-poppins text-white bg-red-400 bg-cover bg-[url(../public/astra-plain-min.jpg)] sm:bg-[url(../public/astra-plain-min.jpg)]'>
        <Heading />
        <SignUpForm />
      </main>
    </>
  )
}

export default Register
