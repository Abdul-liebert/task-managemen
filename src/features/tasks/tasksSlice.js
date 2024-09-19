import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        {id: 1, title:'Learn Redux', description:'Study components and hooks', priority: 'HIGH', status: 'To-Do'},
        {id: 2, title:'Learn Redux', description:'Study components and hooks', priority: 'HIGH', status: 'To-Do'}, 
    ],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        editTask: (state, action) => {
            const {id, title, description, priority, status} = action.payload;
            const task= state.tasks.find(task => task.id === id);
            if(task){
                task.title = title;
                task.description = description;
                task.priority = priority;
                task.status = status;
            }
        },
        removeTask: (state, action) => {    
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
})

export const {addTask, editTask, removeTask} = tasksSlice.actions;
export default tasksSlice.reducer;