import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useAuthStore from "../stores/zustand/AuthStore"

const SuccessAuth = () => {
    const [params] = useSearchParams()
    const token = params.get('token')
    const id = params.get('id')
    const username = params.get('username')
    const email = params.get('email')
    const { updateUser } = useAuthStore()

    const navigate = useNavigate()

    useEffect(() => {
        if (token && id && username && email) {
            localStorage.setItem('token', token);

            const user = {
                id, username, email
            };

            updateUser(user);
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, []);

    return (
        <p>Login in corso</p>
    )
}

export default SuccessAuth