import './logo.css'
import { Link } from 'react-router-dom'

export const Logo = () => {
    return (

            <div className='logo'>
            <Link to={'/'} className='link'>
                <div className='logotype'></div>
                <h1 >Taskify</h1>
            </Link>
        </div>

    )
}