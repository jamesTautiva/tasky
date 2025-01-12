import './dashboard.css'
import { HeaderDash } from '../../layout/dashboard/headerDash/headerDash'
import { MenuLayout } from '../../layout/dashboard/menu/menuLayout'


export const Dashboard = ()=>{
    return (
        <section className="section-dashboard">
            <div >
            <HeaderDash />
            </div>
            <div>
            <MenuLayout />
            </div>
        </section>

    )
}

