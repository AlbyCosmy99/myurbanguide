import { useEffect } from "react"
import User from "../types/User"
import { jwtDecode } from "jwt-decode"
import useAuthStore from "../stores/zustand/AuthStore"
import { useNavigate } from "react-router-dom"

const useTokenPayload = () => {
    const { updateUser } = useAuthStore()

    const navigate = useNavigate()

    /*
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch('http://localhost:3030/users/token/check', {
                method: 'post',
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
                .then(res => {
                    if (!res.ok) {
                        localStorage.removeItem('token')
                        updateUser(null)
                        setUser(null)
                    } else {
                        const user = jwtDecode<User>(token);
                        updateUser(user)
                        setUser(null)

                    }
                })
                .catch(() => {
                    localStorage.removeItem('token')
                    updateUser(null)
                    setUser(null)

                })
        }
        else {
            localStorage.removeItem('token')
            updateUser(null)

        }
    }, [])

    return user
    */

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch('http://localhost:3030/users/token/check', {
                method: 'post',
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
                .then(res => {
                    if (!res.ok) {
                        localStorage.removeItem('token')
                        updateUser(null)
                        navigate('/')
                    } else {
                        const user = jwtDecode<User>(token);
                        updateUser(user)
                    }
                })
                .catch(() => {
                    localStorage.removeItem('token')
                    updateUser(null)
                    navigate('/')
                })
        }
        else {
            localStorage.removeItem('token')
            updateUser(null)
            navigate('/')
        }
    }, [])
}

export default useTokenPayload