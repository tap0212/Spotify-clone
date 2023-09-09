import { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ accessToken, trackUri }: {accessToken: string, trackUri: string}) {
  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])
    console.log({trackUri, accessToken, play});
    
  if (!accessToken) return null
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        bgColor: '#212121',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        savedColor: '#fff',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  )
}