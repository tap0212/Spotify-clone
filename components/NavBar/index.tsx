import { useIsLoggedIn } from '@/hooks/useIsLoggedIn'
import React, { Dispatch, SetStateAction, useEffect } from 'react'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=6967118919a94b00a606d53035a71056&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
export default function NavBar({searchKey, setSearchKey, isSearchActive}: {searchKey: string, setSearchKey: Dispatch<SetStateAction<string>>, isSearchActive: boolean}) {
    const isLoggedIn = useIsLoggedIn()    
  return (
    <div className='h-16 p-4 flex justify-between w-full items-center'>
      <p className='font-semibold text-xl'>Spotify</p>
      {isSearchActive && <input className='bg-grey-light px-4 py-2 rounded-lg border border-primary outline-none' value={searchKey} onChange={(e) => {
        setSearchKey(e.target.value)
      }} />}
      {!isLoggedIn && <div>
          <a href={AUTH_URL}>
              <button className='bg-white text-black px-4 py-2 rounded-full font-semibold' >Log in</button>
          </a>
      </div>}
    </div>
  )
}
