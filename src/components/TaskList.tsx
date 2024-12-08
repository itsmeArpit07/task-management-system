import { format } from 'date-fns';
import { CheckCircle, Clock, Edit2, Trash2, User } from 'lucide-react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const priorityColors = {
  low: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400'
};

const statusColors = {
  pending: 'bg-gray-500/20 text-gray-400',
  'in-progress': 'bg-blue-500/20 text-blue-400',
  completed: 'bg-purple-500/20 text-purple-400'
};

export function TaskList({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-card rounded-lg p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{task.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{task.description}</p>
              
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
                
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>

                <span className="inline-flex items-center text-sm text-gray-400">
                  <Clock className="mr-1.5 h-4 w-4" />
                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </span>

                {task.assignedTo && (
                  <span className="inline-flex items-center text-sm text-gray-400">
                    <User className="mr-1.5 h-4 w-4" />
                    {task.assignedTo}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                className="p-1.5 rounded-full hover:bg-green-500/20 text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-full hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    onDelete(task.id);
                  }
                }}
                className="p-1.5 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}