import BackButton from '@/src/components/back-button'
import SignOutButton from '@/src/components/signout-button'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BackButton />
      <SignOutButton />

      {children}
    </>
  )
}
