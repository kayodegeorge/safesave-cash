import Link from "next/link";

const CustomerCreated = () => {
    return ( <>
    <main className="flex flex-col sm:flex-row w-full justify-center items-center min-h-screen text-[16px] font-poppins bg-red-400 bg-cover bg-[url(../public/astra-masked.jpg)] sm:bg-[url(../public/astra-masked.jpg)]">
        <section className="flex justify-center bg-white shadow-md rounded-lg w-[50%] p-8">
            <div className="text-gray-700">
                <h1>Customer John Doe onboarded to safesave successfully</h1>
                <h1>Account Number: XXXXXXXXXX</h1>
                
                <div className="mt-5 flex justify-center text-center text-orange-500">
                    <Link href='/create'>Onboard new Cusotmer</Link>
                </div>
            </div>
        </section>
    </main>
    </> );
}
 
export default CustomerCreated;