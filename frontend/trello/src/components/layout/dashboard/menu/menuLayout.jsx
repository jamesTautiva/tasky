import './menuLayout.css'
import { Menu } from '../../../ui/menu/menu'
import { CreateTask } from '../../../ui/createTask/createTask'
export const MenuLayout = () => {
    return (
        <section className='menu-container'>
            <Menu />
            <CreateTask />
        </section>

    )
}