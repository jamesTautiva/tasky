import './home.css'
import { CreateProject } from '../../../../ui/createProject/createProject'
import { VisualProject } from './visualProject/visualProject'

export const DashHome = () =>{
    return (
        <section className="home">
            <div className='title'>
                <h1> MY DASHBOARD</h1>
                <div>
                <CreateProject />
                
                </div>
            </div>
            <div>
                <VisualProject />
            </div>

        </section>
    )
}