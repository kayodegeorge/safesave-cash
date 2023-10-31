'use client'

import SignUpForm from '../components/SignUpForm'
import Heading from '../components/heading'

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
         <div className="p-6 font-semibold text-blue-700">
         <h1 className="text-2xl">SafeSave by AstraPolaris</h1>
          <p className="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae pariatur vitae aut sapiente, inventore distinctio numquam soluta quasi hic exercitationem velit earum odio culpa obcaecati incidunt a amet, reiciendis explicabo.</p>
         </div>
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
