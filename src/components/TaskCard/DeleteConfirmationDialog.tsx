import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AxiosCustomError, deleteTask } from "@/services/axios";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CONSTS } from "@/config/consts";

interface DeleteConfirmationDialogProps {
  taskId: number;
  onTaskDeleted: () => void;
  onCancel: () => void;
}

const DeleteConfirmationDialog = ({
  taskId,
  onTaskDeleted,
  onCancel,
}: DeleteConfirmationDialogProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast(CONSTS.toast.sessionExpired);
      navigate("/");
      return;
    }

    try {
      await deleteTask(taskId, token);
      toast({
        title: "Tarefa Excluída",
        description: "A tarefa foi excluída com sucesso!",
      });
      onTaskDeleted();
      onCancel();
    } catch (error) {
      if (
        (error as AxiosCustomError).response?.data?.code === "token_not_valid"
      ) {
        toast(CONSTS.toast.sessionExpired);
        return navigate("/");
      }
      toast(CONSTS.toast.noTaskDeleted);
    }
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="w-[80%] sm:w-full">
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
        </DialogHeader>
        <p>Tem certeza que deseja excluir esta tarefa?</p>
        <DialogFooter className="gap-2">
          <Button variant="destructive" onClick={handleDelete}>
            Excluir
          </Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
