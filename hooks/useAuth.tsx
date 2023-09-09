import axios from "axios"
import createPersistedState from 'use-persisted-state';
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { useIsLoggedIn } from "./useIsLoggedIn";
const useAccessTokenState = createPersistedState('accessToken');
const useRefreshTokenState = createPersistedState('refreshToken');
const useExpiresInState = createPersistedState('expiresIn');

export const useAuth = (code: string) => {
    const [accessToken, setAccessToken] = useAccessTokenState('')
    const [refreshToken, setRefreshToken] = useRefreshTokenState('')
    const [expiresIn, setExpiresIn] = useExpiresInState(0)   
    const router = useRouter(); 
    const isLoggedIn = useIsLoggedIn()
    useEffect(() => {
      if(code && !isLoggedIn){            
          axios.post('/api/auth', {code}).then(res => {
              setAccessToken(res.data.accessToken)
              setRefreshToken(res.data.refreshToken)
              setExpiresIn(res.data.expiresIn)
              router.replace('/', undefined, { shallow: true });

          }).catch(err => {
              console.log({err});
              
          })
      }
    }, [code, isLoggedIn])
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
          axios
            .post("/api/refresh", {
              refreshToken,
            })
            .then(res => {
              setAccessToken(res.data.accessToken)
              setExpiresIn(res.data.expiresIn)
            })
            .catch(() => {
                setAccessToken('')
              
            })
        }, ((expiresIn as number) - 60) * 1000)
    
        return () => clearInterval(interval)
      }, [refreshToken, expiresIn, setAccessToken, setExpiresIn])
    return [accessToken]
}