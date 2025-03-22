"use client";
import { useState } from "react";
import { useTaskStore } from "@/app/store/useTaskStore";

export default function AddTask() {
  const [text, setText] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText(""); // Clear input after adding
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add a Task</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
