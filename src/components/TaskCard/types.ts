export type Status = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id?: number;
  title: string;
  description?: string;
  status: Status;
  responsible?: number;
};
