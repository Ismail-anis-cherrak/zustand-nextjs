import { create } from "zustand"

type Task = { 
    id: Number,
    text: String,
    completed: Boolean
}

type TaskStore = {
    tasks: Task[],
    addTask: (text: String) => void,
    toggleTask:(id: Number) => void,
    removeTask:(id: Number) => void,
}

export const useTaskStore = create <TaskStore> ((set)=>({

    tasks: [],
    
    addTask: (text: String)=>
        set ((state: TaskStore)=>({
            tasks: [...state.tasks, {id:Date.now(),text,completed:false}],
        })),
    
    toggleTask: (id: Number)=>
        set ((state: TaskStore)=>({
            tasks: state.tasks.map((task)=>task.id === id ? { ...task, completed: !task.completed } : task),
        })),
    
    removeTask: (id: Number)=>
        set ((state: TaskStore)=>({
            tasks: state.tasks.filter((task)=> task.id  !== id),
        })),

}))