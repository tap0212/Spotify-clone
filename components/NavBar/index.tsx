import React from 'react'

export default function NavBar() {
  return (
    <div className='h-16 p-4 flex justify-between w-full items-center'>
        <p className='font-semibold text-xl'>Spotify</p>
        <div>
            <button className='bg-white text-black px-4 py-2 rounded-full font-semibold' >Log in</button>
        </div>
    </div>
  )
}
