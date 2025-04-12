import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Task } from "./types";
import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface TaskViewProps {
  task: Task;
  onEdit: () => void;
  onTaskUpdated: () => void;
}

const TaskView = ({ task, onEdit, onTaskUpdated }: TaskViewProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Card className="border rounded-md shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="py-3 px-4">
        <h3 className="text-base font-medium">{task.title}</h3>
      </CardHeader>
      <CardContent className="py-2 px-4">
        <p className="text-sm text-gray-600">{task.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end py-2 px-4 gap-2">
        <Button size="sm" variant="ghost" onClick={onEdit}>
          <FiEdit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-red-500"
          onClick={() => setIsDeleting(true)}
        >
          <FiTrash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
      {isDeleting && (
        <DeleteConfirmationDialog
          taskId={task.id!}
          onCancel={() => setIsDeleting(false)}
          onTaskDeleted={onTaskUpdated}
        />
      )}
    </Card>
  );
};

export default TaskView;
