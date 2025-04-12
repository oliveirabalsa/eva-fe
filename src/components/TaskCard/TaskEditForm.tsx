import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status, Task } from "./types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AxiosCustomError, updateTask } from "@/services/axios";
import { CONSTS } from "@/config/consts";

interface TaskEditFormProps {
  task: Task;
  onTaskUpdated: () => void;
  onCancel: () => void;
}

const TaskEditForm = ({ task, onTaskUpdated, onCancel }: TaskEditFormProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<Status>(task.status);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast(CONSTS.toast.sessionExpired);
      navigate("/");
      return;
    }

    try {
      await updateTask(task.id!, { title, description, status }, token);
      onTaskUpdated();
      onCancel();
    } catch (error) {
      if (
        (error as AxiosCustomError).response?.data?.code === "token_not_valid"
      ) {
        toast(CONSTS.toast.sessionExpired);
        return navigate("/");
      }
      return toast(CONSTS.toast.noTaskUpdated);
    }
  };

  return (
    <div className="p-4 space-y-2">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <Select
        value={status}
        onValueChange={(value: Status) => setStatus(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TODO">A fazer</SelectItem>
          <SelectItem value="IN_PROGRESS">Em progresso</SelectItem>
          <SelectItem value="DONE">Feito</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-4 mt-6">
        <Button onClick={handleUpdate}>Salvar</Button>
        <Button variant="destructive" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default TaskEditForm;
