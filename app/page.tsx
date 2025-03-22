import AddTask from "@/app/components/AddTask";
import { TaskList } from "@/app/components/TaskList";



export default function Home() {
    return (
      <main className="flex h-screen p-10">
        <div className="w-2/3 p-4">
          <TaskList />
        </div>
  
        <div className="w-1/3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
          <AddTask />
        </div>
      </main>
    )
}
