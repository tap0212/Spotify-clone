import { useEffect, useState } from "react"

export const useIsLoggedIn = () => {
    const [accessToken, setAccessToken] = useState<string>('')
    useEffect(() => {
        setAccessToken(window.localStorage.getItem('accessToken') ?? '')
    }, [])
    return accessToken
}