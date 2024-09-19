import { useDispatch } from "react-redux";
import { removeTask } from "../features/tasks/tasksSlice";
import { Draggable } from "react-beautiful-dnd";


const getPriorityColor = (priority) => {
    switch (priority) {
        case "HIGH":
            return "bg-violet-200";
        case "MEDIUM":
            return "bg-yellow-200"
        case "LOW":
            return "bg-green-200"
        default:
            return "bg-gray-100"
    }
}
const TaskCard = ({ task, onEdit, index }) => {
    const dispatch = useDispatch();
    const priorityColor = getPriorityColor(task.priority);
    const handleDelete = () => {
        dispatch(removeTask(task.id));
    }

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (

                <div className={`p-4 ${priorityColor} rounded-lg shadow-md mb-4`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p className="text-sm text-gray-700">{task.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Priority: {task.priority}</p>
                    <button onClick={handleDelete} className="mt-2 text-red-500 text-sm">Delete</button>
                    <button onClick={() => onEdit(task)} className="mt-2 text-blue-500 text-sm">Edit</button>
                </div>
            )}
        </Draggable>
    )
}


export default TaskCard;