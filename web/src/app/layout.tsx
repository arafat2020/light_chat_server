import { ClerkProvider } from '@clerk/nextjs'
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className='w-screen h-screen bg-slate-900'>{children}</body>
      </html>
    </ClerkProvider>
  )
}
