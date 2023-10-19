import {useEffect, useState} from "react";
import api from "../service/axios/axiosClient";

export function useAuth() {
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})

    const hasAccessToken = localStorage.getItem("access_token") ?? false;

    useEffect(() => {
        console.log('hasAccessToken', hasAccessToken)
        if(hasAccessToken) {
            const token = localStorage.getItem("access_token")
            setIsLoading(true)
            api.get('/auth/user', {headers: {'Authorization': `Bearer ${token}`}}).then((res) => {
                console.log('auth res', res)
                if(res?.data?.uuid) {
                    setIsAuth(true)
                    setUser({...res.data, token})
                }
                setIsLoading(false)
            }).catch(function (error) {
                console.log('auth error', error)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [hasAccessToken])
    return {isLoading, isAuth, user}
}