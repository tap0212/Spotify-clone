import SideBar from '@/components/SideBar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen justify-between ${inter.className}`}
    >
      <div className='w-1/3'>
        <SideBar />
      </div>
    </main>
  )
}
