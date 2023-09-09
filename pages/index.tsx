import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import { useAuth } from '@/hooks/useAuth'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [spotifyWindowParamCode, setSpotifyWindowParamCode] = useState<string>('')
  const [refreshToken] = useAuth(spotifyWindowParamCode)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code')
    if(code){
      setSpotifyWindowParamCode(code)
    }
  }, [])
  return (
    <main
      className={`flex min-h-screen justify-between ${inter.className}`}
    >
      <div className='w-1/3'>
        <SideBar />
      </div>
      <div className='flex flex-1'> 
        <NavBar />
      </div>
    </main>
  )
}
