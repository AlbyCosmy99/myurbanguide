import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const SuccessAuth = () => {
    const [params] = useSearchParams()
    const token = params.get('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            //navigate('/dashboard')
        } else {
            //navigate('/')
        }
    }, [])

    return (
        <p>Login in corso</p>
    )
}

export default SuccessAuth