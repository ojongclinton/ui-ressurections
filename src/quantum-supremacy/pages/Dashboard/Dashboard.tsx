import { classNames } from '../../constants/helpers'
import { colorSystem } from '../../constants/colors'
import DashboardLayout from '../../layout/DashboardLayout'
import LeftSection from './components/LeftSection'
import RightSection from './components/RightSection'


function Dashboard() {
    return (
        <div style={{ backgroundColor: colorSystem.background }} className={classNames(`min-h-screen text-white font-poppins`)}>
            <div>
                <DashboardLayout leftSection={<LeftSection />} rightSection={<RightSection />} />
            </div>
        </div>
    )
}

export default Dashboard
