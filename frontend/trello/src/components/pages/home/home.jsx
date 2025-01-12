import { body } from "express-validator"
import { HeaderHome } from "../../layout/home/headerHome/headerHome"
import { SectionHome } from "../../layout/home/sectionHome/sectionHome"
import './home.css'
export const Home = () => {
    
    return (
        <body className="body">
            <HeaderHome />
            <SectionHome />
        </body>

    )
}