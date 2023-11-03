import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { Toaster } from 'sonner'
import './globals.css'

import Providers from '../components/Providers'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'SafeSave Customer Onbording Portal',
  description: 'Portal for SafeSave Customer Onbording',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>
          <main className='h-screen lg:grid lg:grid-cols-2'>
            <div className='hidden lg:flex lg:justify-center px-6 lg:items-center bg-red-100'>
              <div className='font-semibold text-blue-700'>
                <h1 className='text-2xl'>SafeSave by AstraPolaris</h1>

                <p className='mt-5'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae pariatur vitae aut sapiente, inventore distinctio
                  numquam soluta quasi hic exercitationem velit earum odio culpa
                  obcaecati incidunt a amet, reiciendis explicabo.
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
