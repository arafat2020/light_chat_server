import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';
import ServerSideBar from '@/components/ServerSideBar';
import ChannelSideBar from '@/components/ChannelSideBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='w-screen h-screen bg-zinc-800'>
          <div className='w-full h-full flex'>
            <ServerSideBar />
            <ChannelSideBar/>
            <div className='flex-grow'>
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
