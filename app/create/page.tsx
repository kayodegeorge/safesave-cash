import LeftHandSide from '../components/LeftHandSide'
import UploadBvnAndPic from '../components/uploadCustomerDocs'

const CreateCustomer = () => {
  return (
    <>
       <main className="grid grid-cols-2 h-screen">
        {/* left hand side */}
        <div className="hidden md:flex justify-center items-center bg-red-100">
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
          <div className='p-4'>
        
            <UploadBvnAndPic />

            <div className='mt-4 flex justify-center font-semibold text-gray-700'>
         <p>PN: This platform is only designated for Astra-Polaris Marketers.</p>
            
            </div>
          </div>
        </div>
    </main>
    </>
  )
}

export default CreateCustomer
