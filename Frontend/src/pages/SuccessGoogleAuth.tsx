import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import useAuthStore from "../stores/zustand/AuthStore"
import SectionContainer from "../components/SectionContainer"

const SuccessGoogleAuth = () => {
    const [params] = useSearchParams()
    const token = params.get('token')
    const id = params.get('id')
    const username = params.get('username')
    const email = params.get('email')
    const { updateUser } = useAuthStore()

    const navigate = useNavigate()

    useEffect(() => {
        if (token && id && username && email) {
            console.log(token)
            localStorage.setItem('token', token);

            const newUser = {
                id, username, email
            };
            updateUser(newUser);
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, []);

    return (
        <SectionContainer>
            <p>Login in corso</p>
        </SectionContainer>
    )


}

export default SuccessGoogleAuth