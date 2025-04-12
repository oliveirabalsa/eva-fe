import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TaskFiltersProps {
  filters: { title?: string; status?: string };
  onFilterChange: (key: string, value: string) => void;
  onApplyFilters: () => void;
}

const TaskFilters = ({
  filters,
  onFilterChange,
  onApplyFilters,
}: TaskFiltersProps) => {
  return (
    <div className="space-y-4 flex  gap-4 items-baseline">
      <div className="flex gap-2">
        <Input
          placeholder="Filtrar por título"
          value={filters.title || ""}
          onChange={(e) => onFilterChange("title", e.target.value)}
        />
        <Select
          value={filters.status || "ALL"}
          onValueChange={(value) =>
            onFilterChange("status", value === "ALL" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="TODO">A Fazer</SelectItem>
            <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
            <SelectItem value="DONE">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={onApplyFilters}>Aplicar Filtros</Button>
    </div>
  );
};

export default TaskFilters;
