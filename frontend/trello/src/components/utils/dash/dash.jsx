import { DashHome } from "../../layout/dashboard/layoutsMenu/home/home"
import { DashProjects } from "../../layout/dashboard/layoutsMenu/projects/projects"
import { DashCalendary } from "../../layout/dashboard/layoutsMenu/calendary/calendary"


export const Dash = ({componentSelect}) => {
    const renderComponent = () =>{
        switch(componentSelect){
            case "Home":
                return <DashHome />
            case "Projects":
                return <DashProjects />
            case "Calendary":
                return <DashCalendary />
            default:
                return <DashHome />
        }
    };
    return <div>{renderComponent}</div>
}
    
