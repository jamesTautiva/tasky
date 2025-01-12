import './projects.css'
import { useLocation } from 'react-router-dom'

export const DashProjects = () =>{
    const {state} = useLocation();
    



    return (
        <div className="home">
            <h1>Welcome to Trello App</h1>
            <p>This is your dashboard Projects.</p>
        </div>
    )
}