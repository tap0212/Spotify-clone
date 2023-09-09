import type { NextApiRequest, NextApiResponse } from 'next';
import SpotifyWebApi from 'spotify-web-api-node';

type Data = {
  accessToken: string;
  expiresIn: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
      refreshToken,
    });

    const data = await  spotifyApi.refreshAccessToken()
    res.status(200).json({
      accessToken: data.body.access_token,
      expiresIn: data.body.expires_in,
    });
  } catch (error) {
    console.log({error});
    
    res.status(400).json({ error: 'An error occurred' });
  }
}
