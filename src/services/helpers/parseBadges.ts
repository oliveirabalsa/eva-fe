import { Status } from "@/components/TaskCard/types";

export const parseBadgesColors = (status: Status) => {
  const options: Record<Status, string> = {
    TODO: "bg-gray-400 hover:bg-gray-500",
    IN_PROGRESS: "bg-cyan-400 hover:bg-cyan-500",
    DONE: "bg-green-400 hover:bg-green-500",
  };

  return options[status];
};
