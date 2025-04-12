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
import { parseStatuses } from "@/services/helpers/parseStatuses";
import { Badge } from "../ui/badge";
import { parseBadgesColors } from "@/services/helpers/parseBadges";

interface TaskViewProps {
  task: Task;
  onEdit: () => void;
  onTaskUpdated: () => void;
}

const TaskView = ({ task, onEdit, onTaskUpdated }: TaskViewProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Card className="border rounded-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">{task.title}</h3>
      </CardHeader>
      <CardContent>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Status:{" "}
          <Badge className={parseBadgesColors(task.status)} variant="secondary">
            {parseStatuses(task.status)}
          </Badge>
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button onClick={onEdit}>Editar</Button>
        <Button variant="destructive" onClick={() => setIsDeleting(true)}>
          Excluir
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
