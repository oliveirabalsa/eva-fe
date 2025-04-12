import { useState } from "react";
import { Task } from "./types";
import TaskEditForm from "./TaskEditForm";
import TaskView from "./TaskView";

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
}

const TaskCard = ({ task, onTaskUpdated }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <TaskEditForm
          task={task}
          onTaskUpdated={onTaskUpdated}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <TaskView
          task={task}
          onEdit={() => setIsEditing(true)}
          onTaskUpdated={onTaskUpdated}
        />
      )}
    </>
  );
};

export default TaskCard;
