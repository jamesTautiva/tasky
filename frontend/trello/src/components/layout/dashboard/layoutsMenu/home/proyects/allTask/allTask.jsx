import { useEffect, useState } from 'react'
import './allTask.css'
import axios from 'axios'

export const AllTask = () => {
        const [task, setTask] = useState([])
        const [loading, setLoading] = useState(true); 
        const [error, setError] = useState(null);

        useEffect(() => {
            const userId = localStorage.getItem('Id');
            const fetchTask = async () => {
                setLoading(true)
                try {
                    const response = await axios.get(`http://localhost:3000/api/tasks?user_id=${userId}`);
                    setTask(response.data)
                    setLoading(false)
                    console.log(response.data)
                } catch (error) {
                    setError(error.message)
                    setLoading(false)
                    console.error(error)
                }
            };
            fetchTask();
        },[]);

        if (loading) return <div>Loading...</div>
        if (error) return <div>Error: {error}</div>
        
        return (
            <div className="task-container">
                {task.map(t => (
                    <div key={t.id} className="task-card">
                        <h2>{t.title}</h2>
                        <p>{t.description}</p>
                        <p>{t.status}</p>
                    </div>
                ))}
            </div>
        )

    }
    

