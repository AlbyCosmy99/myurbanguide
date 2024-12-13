import SectionContainer from "../components/SectionContainer"
import useAuthStore from "../stores/zustand/AuthStore"

const DashBoard = () => {
    const { username, email } = useAuthStore()

    return (
        <SectionContainer>
            <h2 className="text-3xl font-bold pb-8 text-[#E29C00]">{`Benvenuto, ${username}`}</h2>
            <p>{email}</p>
        </SectionContainer>

    )
}

export default DashBoard