import { useCallback } from "react";
import { Status, Task } from "@/components/TaskCard/types";
import TaskCard from "@/components/TaskCard/TaskCard";
import { AxiosCustomError, updateTask } from "@/services/axios";
import { useToast } from "@/hooks/use-toast";
import { CONSTS } from "@/config/consts";
import { useNavigate } from "react-router-dom";
import { FiClock, FiCheckCircle, FiList } from "react-icons/fi";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const statuses: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

const statusConfig: Record<
  Status,
  { label: string; icon: React.ReactNode; bgColor: string; borderColor: string }
> = {
  TODO: {
    label: "A fazer",
    icon: <FiList className="h-5 w-5 text-blue-600" />,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  IN_PROGRESS: {
    label: "Em progresso",
    icon: <FiClock className="h-5 w-5 text-amber-600" />,
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
  },
  DONE: {
    label: "Feito",
    icon: <FiCheckCircle className="h-5 w-5 text-green-600" />,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
};

const KanbanBoard = ({ tasks, onTaskUpdated }: KanbanBoardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData("taskId", task.id!.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>, status: Status) => {
      e.preventDefault();
      const taskId = Number(e.dataTransfer.getData("taskId"));
      const taskToUpdate = tasks.find((t) => t.id === taskId);

      if (!taskToUpdate || taskToUpdate.status === status) return;

      const token = localStorage.getItem("token");
      if (!token) {
        toast(CONSTS.toast.sessionExpired);
        navigate("/");
        return;
      }

      try {
        await updateTask(taskId, { ...taskToUpdate, status }, token);
        onTaskUpdated();
      } catch (error) {
        if (
          (error as AxiosCustomError).response?.data?.code === "token_not_valid"
        ) {
          toast(CONSTS.toast.sessionExpired);
          navigate("/");
          return;
        }

        toast({
          title: "Erro",
          description: "Não foi possível mover a tarefa.",
          variant: "destructive",
        });
      }
    },
    [tasks, onTaskUpdated, toast, navigate]
  );

  const getTasksByStatus = (status: Status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statuses.map((status) => {
        const { label, icon, bgColor, borderColor } = statusConfig[status];
        return (
          <div
            key={status}
            className={`${bgColor} p-4 rounded-lg border ${borderColor} shadow-sm`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3 className="font-medium text-lg mb-4 pb-2 border-b flex items-center gap-2">
              {icon}
              <span>{label}</span>
              <span className="ml-auto bg-white text-gray-700 text-sm py-0.5 px-2 rounded-full">
                {getTasksByStatus(status).length}
              </span>
            </h3>
            <div className="space-y-3">
              {getTasksByStatus(status).map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  className="cursor-move"
                >
                  <TaskCard task={task} onTaskUpdated={onTaskUpdated} />
                </div>
              ))}
              {getTasksByStatus(status).length === 0 && (
                <div className="text-center text-gray-500 py-6 bg-white bg-opacity-50 rounded border border-dashed">
                  Nenhuma tarefa
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
