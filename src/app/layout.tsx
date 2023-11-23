import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

import Providers from '../components/Providers'
import StaffVerification from '../components/StaffVerification'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'SafeSave Customer Onbording Portal',
  description: 'Portal for SafeSave Customer Onboarding',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>
          <main className='h-screen lg:grid lg:grid-cols-2'>
            <div className='hidden lg:flex lg:justify-center px-6 lg:items-center bg-red-100'>
              <div className='font-semibold text-blue-700'>
                <h1 className='text-2xl'>SafeSave by AstraPolaris</h1>

                <p className='mt-5'>
                  Introducing SafeSave Cash, an advanced online platform
                  developed by the Innovation and Technology Team at Astra
                  Polaris Microfinance Bank. This cutting-edge solution empowers
                  marketers to seamlessly onboard new customers on-the-go,
                  ensuring a swift and hassle-free registration process. <br />{' '}
                  To initiate, kindly provide your staff credentials for
                  registration. Upon successful login, you can effortlessly
                  register a new customer by inputting their essential details
                  including BVN, Date of Birth, and Gender. This seamless
                  process will promptly generate a unique account number for the
                  new customer. <br /> With SafeSave Cash, you gain the
                  convenience of initiating daily collections, while also having
                  the option to effortlessly post updates on the MBM app for
                  your customers. Experience efficiency and simplicity like
                  never before with SafeSave Cash, brought to you by Astra
                  Polaris Microfinance Banks dedicated Innovation and Technology
                  Team.{' '}
                </p>
              </div>
            </div>

            <div className='h-full relative'>{children}</div>
          </main>

          <Toaster position='top-right' richColors />
        </Providers>
      </body>
    </html>
  )
}
