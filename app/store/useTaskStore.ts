"use client";
import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/tasks";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskStore = {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  // Fetch tasks from API
  fetchTasks: async () => {
    const response = await axios.get(API_URL);
    set({ tasks: response.data });
  },

  // Add new task
  addTask: async (title) => {
    const newTask = { title, completed: false };
    const response = await axios.post(API_URL, newTask);
    set((state) => ({ tasks: [...state.tasks, response.data] }));
  },

  // Toggle task completion
  toggleTask: async (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      return { tasks: updatedTasks };
    });

    // Update API
    const taskToUpdate = await axios.get(`${API_URL}/${id}`);
    await axios.put(`${API_URL}/${id}`, {
      ...taskToUpdate.data,
      completed: !taskToUpdate.data.completed,
    });
  },

  // Remove task
  removeTask: async (id) => {
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
    await axios.delete(`${API_URL}/${id}`);
  },
}));
