import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Status } from "@/components/TaskCard/types";
import { createTask } from "@/services/axios";
import { useToast } from "@/hooks/use-toast";
import { FiPlus } from "react-icons/fi";

interface TaskDialogProps {
  onTaskCreated: () => void;
}

const TaskDialog = ({ onTaskCreated }: TaskDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("TODO");
  const { toast } = useToast();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Erro de Autenticação",
        description: "Faça login para criar uma tarefa.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createTask({ title, description, status, responsible: 1 }, token);
      toast({
        title: "Tarefa Criada",
        description: "Sua nova tarefa foi criada com sucesso!",
      });
      setTitle("");
      setDescription("");
      setStatus("TODO");
      setIsDialogOpen(false);
      onTaskCreated();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a tarefa.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full mr-auto sm:ml-auto">
          <FiPlus children className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Tarefa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Select
            value={status}
            onValueChange={(value: Status) => setStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODO">A Fazer</SelectItem>
              <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
              <SelectItem value="DONE">Concluído</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">
            Criar Tarefa
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
