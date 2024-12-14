import { useEffect, useState } from "react"
import User from "../types/User"
import { jwtDecode } from "jwt-decode"
import useAuthStore from "../stores/zustand/AuthStore"

const useTokenPayload = () => {
    const { updateUser } = useAuthStore()
    const [user, setUser] = useState<User | null>(null)

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
}

export default useTokenPayload