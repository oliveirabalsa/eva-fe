import { Status } from "@/components/TaskCard/types";

export const parseStatuses = (status: Status) => {
  const statuses: Record<Status, string> = {
    TODO: "A fazer",
    IN_PROGRESS: "Em progresso",
    DONE: "Feito",
  };
  return statuses[status];
};
