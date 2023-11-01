'use client'

import LeftHandSide from '../components/LeftHandSide'
import SignUpForm from '../components/SignUpForm'


const Register = () => {
  return (
    <>
     <main className="grid grid-cols-2 h-screen">
        {/* left hand side */}
        <div className="flex justify-center items-center bg-red-100">
        {/* <Image
            fill
            className='max-h-full max-w-full'
            src='/astra-masked.jpg'
            alt='Astra bank'
          /> */}
         <LeftHandSide/>
        </div>
        {/* right hand side */}
        <div className='flex justify-center items-center bg-gray-100'>
          <div className='p-6'>
        
            <SignUpForm />

            <div className='mt-4 flex justify-center font-semibold text-gray-700'>
         <p>PN: This platform is only designated for Astra-Polaris Marketers.</p>
            
            </div>
          </div>
        </div>
    </main>
    </>
  )
}

export default Register
