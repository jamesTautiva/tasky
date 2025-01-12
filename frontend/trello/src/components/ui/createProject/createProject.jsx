import { useState } from 'react'
import './createProject.css'
import { Link } from 'react-router-dom'
import { useNavigate  } from 'react-router-dom'
import  axios  from 'axios'
import { CreateTask } from '../createTask/createTask'




export const CreateProject = ()=>{
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        user_id: '',  
    })
    const [error, setError] = useState(null);
    const [openWindow, setOpenWindow] = useState(false);
    const [showTask, setTask] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    // traer ususario logueado
    const user = localStorage.getItem('Id')
    // enviar al localStorage el elemento selecionado con el id del form


    if (!user) {
        navigate('/login')
        return null
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/projects', {
                name: formData.name,
                description: formData.description,
                user_id: user,
            });
            console.log('Proyecto creado:', response.data);
            setOpenWindow(false)
            setTask(true)
            navigate('/dashboard')
        } catch(err){
            // especificar el error
            setError('Error al crear el proyecto')
        }
    }

    // abrir ventana create project al oprimir new project
    const openWindowCreateProject = () => {
        setOpenWindow(!openWindow)
    }

    const handleShowTask = () => {
        setTask(!showTask)
    }


    return (
        <section>
            <div className='create-proyect'>
                <Link className='Link' onClick={openWindowCreateProject}>
                    <h2>New Project</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </Link>
            </div>
            {openWindow && 
            <div className='window-create'>
            <h2>Create project</h2>
            <form action=""onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />
                            <input
                type="text"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <p>{error}</p>
                <button type="submit" >Create Project</button>
            </form>
            
        </div>}

        {showTask && 
            <CreateTask />
        }
        </section>
        
    )
}

