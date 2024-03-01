import Sidebar from '@/components/sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/supabaseproviders'
import UserProvider from '@/providers/userprovider'
import ModalProvider from '@/providers/modalprovider'
import ToasterProvider from '@/providers/toasterprovider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/player'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Happy Listening',
}
export const revalidate=0;

export default  async function RootLayout({
  children,
}: { 
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
      <ToasterProvider/> 
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
          <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
