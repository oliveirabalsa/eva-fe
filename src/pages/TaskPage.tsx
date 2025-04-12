import { useCallback, useEffect, useState } from "react";
import TaskDialog from "@/components/TaskDialog/TaskDialog";
import TaskFilters from "@/components/TaskFilters/TaskFilters";
import { AxiosCustomError, fetchTasks } from "@/services/axios";
import { Task } from "@/components/TaskCard/types";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CONSTS } from "@/config/consts";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import KanbanBoard from "@/components/KanbanBoard";

const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{ title?: string; status?: string }>({
    title: "",
    status: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<{
    search?: string;
  }>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadTasks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast(CONSTS.toast.sessionExpired);
      navigate("/");
      return;
    }

    try {
      const { data } = await fetchTasks(token, appliedFilters);
      setTasks(data);
    } catch (error) {
      console.error(error);
      if (
        (error as AxiosCustomError).response?.data?.code === "token_not_valid"
      ) {
        toast(CONSTS.toast.sessionExpired);
        navigate("/");
      } else {
        toast(CONSTS.toast.noTasksLoaded);
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, toast, appliedFilters]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast(CONSTS.toast.loggedOut);
    navigate("/");
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    const searchQuery = [filters.title, filters.status]
      .filter(Boolean)
      .join(" ");
    setAppliedFilters({ search: searchQuery });
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <div className="max-w-screen-xl mx-auto">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Tarefas</h1>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <FiLogOut className="text-xl" />
            Sair
          </Button>
        </header>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 items-end justify-between">
              <div className="w-full sm:w-[90%]">
                <TaskFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
              <TaskDialog onTaskCreated={loadTasks} />
            </div>
            <KanbanBoard tasks={tasks} onTaskUpdated={loadTasks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
