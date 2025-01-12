import { useEffect, useState } from 'react';
import { CreateTask } from '../../../../../ui/createTask/createTask';
import axios from 'axios';
import './visualProject.css';


export const VisualProject = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('Id');  
    const [selectedProject, setSelectedProject] = useState(null); // Estado para el proyecto seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal para la tarea

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Asegúrate de pasar correctamente el userId
                const response = await axios.get(`http://localhost:3000/api/projects/${userId}`);
                setProjects(response.data);
            } catch (err) {
                setError('Error al obtener los proyectos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId]);  

    // Abrir el modal para crear una nueva tarea y guardar el ID del proyecto en localStorage
    const handleopenmodal = (project) => {
        // Guarda el ID del proyecto seleccionado en el localStorage
        localStorage.setItem('selectedProjectId', project.id);

        setSelectedProject(project);
        setIsModalOpen(true);
    };

    if (loading) return <div>Cargando proyectos...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div >
        
            <div className='container-projects'>
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project.id} className='card'>
                            {/* Cuando se hace clic en el botón, se pasa el proyecto correcto */}
                            <button onClick={() => handleopenmodal(project)}>+</button>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay proyectos para este usuario.</p>
                )}
            </div>

            {/* Modal para crear una nueva tarea */}
            {isModalOpen && (
                <CreateTask 
                    projectId={selectedProject?.id}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};