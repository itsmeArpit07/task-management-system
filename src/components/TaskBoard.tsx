import { Task } from '../types/task';
import { TaskList } from './TaskList';

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

export function TaskBoard({ tasks, onEdit, onDelete, onStatusChange }: TaskBoardProps) {
  const tasksByPriority = {
    high: tasks.filter(task => task.priority === 'high'),
    medium: tasks.filter(task => task.priority === 'medium'),
    low: tasks.filter(task => task.priority === 'low')
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-red-400 flex items-center">
          <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
          High Priority
        </h2>
        <TaskList
          tasks={tasksByPriority.high}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-yellow-400 flex items-center">
          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
          Medium Priority
        </h2>
        <TaskList
          tasks={tasksByPriority.medium}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-green-400 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
          Low Priority
        </h2>
        <TaskList
          tasks={tasksByPriority.low}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </div>
    </div>
  );
}