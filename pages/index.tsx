import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import { useAuth } from '@/hooks/useAuth'
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import SpotifyWebApi from "spotify-web-api-node"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {msToMinSec} from '../utils'
const inter = Inter({ subsets: ['latin'] })
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
})
interface SearchResults {
  artist: string;
  title: string;
  uri: string;
  albumUrl: {
    height: number;
    width: number;
    url: string;
  };
  id: string
  duration: number
}
export default function Home() {
  const [spotifyWindowParamCode, setSpotifyWindowParamCode] = useState<string>('')
  const [searchKey, setSearchKey] = useState<string>('mc')
  const [searchResults, setSearchResults] = useState<SearchResults[] | undefined>([])
  const [refreshToken] = useAuth(spotifyWindowParamCode)
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false)
  const accessToken = useIsLoggedIn()
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    if (!accessToken) return    
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code')
    if(code){
      setSpotifyWindowParamCode(code)
    }
  }, [])
  useEffect(() => {
    if(!searchKey) return setSearchResults([])
    if(!accessToken) return
    spotifyApi.searchTracks(searchKey ?? 'top').then(res => {
      setSearchResults(res.body.tracks?.items.map(track => {
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[0],
          id: track.id,
          duration: track.duration_ms
        }
      }))
    }).catch(error => {
      console.log({error});
    })
  }, [accessToken, searchKey])  
  const toggleSearch = () => {
    setIsSearchActive(prev => !prev)
  }
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  return (
    <main
      className={`flex min-h-screen justify-between ${inter.className}`}
    >
      <div className='w-1/3'>
        <SideBar toggleSearch={toggleSearch} isSearchActive={isSearchActive} />
      </div>
      <div className='flex flex-col flex-1'>
      {/* Your other components */}
      <div className='p-4'>
        {searchResults?.length && (
          <>
            <h1 className='text-xl font-semibold my-4'>Songs</h1>
            <div className='flex flex-wrap gap-8'>
              {searchResults?.map((track, index) => (
                <div
                  key={track.id}
                  className='w-[30%] p-4 bg-grey-dark rounded-2xl cursor-pointer relative'
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={track.albumUrl.url} alt={track.title} />
                  <h1 className='mt-2'>{track.title}</h1>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-grey-fade'>{track.artist}</p>
                    <p className='text-sm text-grey-fade'>
                      {msToMinSec(track.duration)}
                    </p>
                  </div>
                  <div
                    className={`absolute right-8 bottom-20 h-12 w-12 bg-primary flex items-center justify-center rounded-full ${
                      hoveredIndex === index ? 'visible' : 'hidden'
                    }`}
                  >
                    <ArrowRightIcon style={{ color: 'black', fontSize: 46 }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </main>
  )
}

