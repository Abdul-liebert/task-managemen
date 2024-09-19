import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '../features/tasks/tasksSlice';

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('tasksState', serializedState);
    } catch (e) {
        console.error('Could not save state', e);
    }
}

const loadFromLocalStorage = () => {
    try{
        const serializedState = localStorage.getItem('tasksState'); 
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    }catch (e) {
        console.error('could not load state', e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

export const store = configureStore(
    {
        reducer: {
            tasks: tasksReducer,
        },
        preloadedState: persistedState,
    })

    store.subscribe(()=>saveToLocalStorage(store.getState()))
