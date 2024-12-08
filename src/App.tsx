import { useState } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import { Task } from './types/task';
import { TaskForm } from './components/TaskForm';
import { TaskBoard } from './components/TaskBoard';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, newTask]);
    setIsFormOpen(false);
    toast.success('Task created successfully!');
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === editingTask.id 
        ? { 
            ...task, 
            ...taskData, 
            updatedAt: new Date().toISOString() 
          }
        : task
    );
    
    setTasks(updatedTasks);
    setEditingTask(null);
    toast.success('Task updated successfully!');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success('Task deleted successfully!');
  };

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, status, updatedAt: new Date().toISOString() }
        : task
    );
    setTasks(updatedTasks);
    toast.success('Task status updated!');
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      <header className="glass-morphism">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ListTodo className="h-8 w-8 text-indigo-400" />
              <h1 className="ml-3 text-2xl font-bold text-white">Task Management System</h1>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(isFormOpen || editingTask) && (
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass-morphism rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-4 text-white">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <TaskForm
                onSubmit={editingTask ? handleEditTask : handleCreateTask}
                initialData={editingTask || undefined}
                isEditing={!!editingTask}
              />
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingTask(null);
                }}
                className="mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <TaskBoard
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </main>
    </div>
  );
}

export default App;