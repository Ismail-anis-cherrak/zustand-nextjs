"use client";
import { useEffect } from "react";
import { useTaskStore } from "@/app/store/useTaskStore";

export const TaskList = () => {
  const { tasks, fetchTasks, toggleTask, removeTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Tasks list:</h2>
      {tasks.length === 0 ? (
        <h2>No tasks here yet...</h2>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded"
            >
              <span
                className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.title}
              </span>

              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => removeTask(task.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
