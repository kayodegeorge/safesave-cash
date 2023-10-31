import Link from "next/link";
import Image from "next/image";
import LoginForm from "../components/LoginForm";

const CustomerCreated = () => {
    return ( <>
    {/* <main className="flex flex-col sm:flex-row w-full justify-center items-center min-h-screen text-[16px] font-poppins bg-red-400 bg-cover bg-[url(../public/astra-masked.jpg)] sm:bg-[url(../public/astra-masked.jpg)]">
        <section className="flex justify-center bg-white shadow-md rounded-lg w-[50%] p-8">
            <div className="text-gray-700">
                <h1>Customer John Doe onboarded to safesave successfully</h1>
                <h1>Account Number: XXXXXXXXXX</h1>
                
                <div className="mt-5 flex justify-center text-center text-orange-500">
                    <Link href='/create'>Onboard new Cusotmer</Link>
                </div>
            </div>
        </section>
    </main> */}
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
          <div className='p-4'>
          <div className='bg-white rounded-lg p-4 flex justify-center items-center'>
          <p>Hello, John Doe, your A/C is XXXXXXXXXX</p>
          <p>Onboard another Customer</p>
          </div>
          </div>
        </div>
    </main>
    </> );
}
 
export default CustomerCreated;