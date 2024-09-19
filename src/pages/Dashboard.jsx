import { useState } from "react";
import TaskForm from "../component/TaskForm";
import TaskList from "../component/TaskList";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editTask } from "../features/tasks/tasksSlice";


const Dashboard = () => {
    const [taskToEdit, setTaskToEdit] = useState(null)
    const tasks = useSelector((state)=>state.tasks.tasks);
    const dispatch = useDispatch();

    const handleEdit = (task) => {
        setTaskToEdit(task)
    }

    const clearEdit = () => {
        setTaskToEdit(null); // Bersihkan task setelah edit selesai
    };

    const handleDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if(!destination ) return;

        if(destination.droppableId === source.droppableId && destination.index === source.index)return; 

        const task = tasks.find((task)=> task.id === parseInt(draggableId))
        if(task){
            dispatch(editTask({
                ...task,
                status: destination.droppableId
            }))
        }

    }
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-8">Task Management Dashboard</h1>
        <TaskForm taskToEdit={taskToEdit} clearEdit={clearEdit} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <TaskList status="To-Do" onEdit={handleEdit} />
            <TaskList status="In Progress" onEdit={handleEdit} />
            <TaskList status="Done" onEdit={handleEdit} />
          </div>
        </DragDropContext>
      </div>
    )
}

export default Dashboard