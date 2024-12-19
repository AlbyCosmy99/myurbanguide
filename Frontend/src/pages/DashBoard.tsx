import SectionContainer from "../components/SectionContainer"
import HeadersDashboard from "../components/navigation/Headings"
import { Outlet } from "react-router-dom"


const DashBoard = () => {

    return (
        <>
            <SectionContainer>
                <HeadersDashboard username={'Luca'} userEmail={'luca@test.it'} userTourLength={3} />
            </SectionContainer>
            <Outlet />
        </>

    )
}

export default DashBoard