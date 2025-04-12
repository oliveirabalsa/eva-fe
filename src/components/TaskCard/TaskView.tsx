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
    <Card className="border border-primary/20 rounded-md shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardHeader className="py-3 px-4 border-b border-primary/10">
        <h3 className="text-base font-medium text-primary/90">{task.title}</h3>
      </CardHeader>
      <CardContent className="py-2 px-4">
        {task.description ? (
          <p className="text-sm text-primary/70">{task.description}</p>
        ) : (
          <p className="text-sm text-primary/40 italic">Sem descrição</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end py-2 px-4 gap-2 border-t border-primary/10">
        <Button
          size="sm"
          variant="ghost"
          onClick={onEdit}
          className="hover:bg-primary/5 text-primary/80"
        >
          <FiEdit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:bg-destructive/10"
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
