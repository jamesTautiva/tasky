import './createTask.css';
import React, { useState } from 'react';
import axios from 'axios';

export const CreateTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        due_date: '',
        status: 'pending',  // Default status
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const userId = localStorage.getItem('Id'); // Assuming 'Id' is stored in localStorage
    const selectProject = localStorage.getItem('SelectProjectId');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the required fields
        if (!formData.title || !formData.due_date || !userId) {
            setError('Title, Due Date, and User ID are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/tasks', {
                title: formData.title,
                description: formData.description,
                due_date: formData.due_date,
                status: formData.status,
                assigned_user_id: userId,
                project_id: selectProject, 
            });

            setSuccessMessage('Task created successfully!');
            setError(null); // Clear any previous errors
            console.log(response.data);

            
            
            
            // restablecer pagina
            window.location.href = '/dashboard'; // Redirect to dashboard page
         // Log server response for debugging
        } catch (error) {
            setError('Error creating task. Please try again.');
            setSuccessMessage(''); // Clear success message if there's an error
            console.error(error); // More detailed error logging
        }
    };

    return (
        <div className='create-task'>
            <h2>Create New Task</h2>
            {/* Display success or error message */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Task creation form */}
            <form onSubmit={handleSubmit}>
                <div>
                    
                    <input
                        placeholder="Title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <textarea
                    placeholder="Description"
                        rows="4"
                        cols="50"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        placeholder="Due Date (YYYY-MM-DD)"
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>

                    <select
                    placeholder="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};