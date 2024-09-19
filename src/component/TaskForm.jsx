import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../features/tasks/tasksSlice";
import { useEffect } from "react";

const TaskForm = ({ taskToEdit, clearEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [status, setStatus] = useState('To-do');

    const dispatch = useDispatch();

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setPriority(taskToEdit.priority);
            setStatus(taskToEdit.status);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (taskToEdit) {
            dispatch(editTask({ id: taskToEdit.id, title, description, priority, status }))
            clearEdit();
        } else {
            dispatch(addTask({ id: Date.now(), title, description, priority, status }))
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            status
        };

        setTitle('');
        setDescription('');
        setPriority('LOW');
        setStatus('To-do');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-3">
                <label className="block text-sm font-bold">title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-2 py-1 border-rounded" placeholder="Enter task title" required />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-bold">description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-2 py-1 border-rounded" placeholder="Enter task description" required />
            </div>
            <div className="mb-3">
                <label className="block text-sm font-bold">description</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-2 py-1 border-rounded" required>
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="block text-sm font-bold">description</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-2 py-1 border-rounded" required>
                    <option>To-Do</option>
                    <option>In Progress</option>
                    <option>Done</option>
                </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"> {taskToEdit ? 'Update Task' : 'Add Task'}</button>
        </form>
    )
}

export default TaskForm;
