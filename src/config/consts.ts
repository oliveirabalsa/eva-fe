type ToastProps = {
  title: string;
  description: string;
  variant?: "destructive" | "default" | null | undefined;
};

type Consts = {
  toast: {
    noTaskCreated: ToastProps;
    noTaskUpdated: ToastProps;
    noTaskDeleted: ToastProps;
    noTasksLoaded: ToastProps;
    sessionExpired: ToastProps;
    loggedOut: ToastProps;
  };
};

export const CONSTS: Consts = {
  toast: {
    noTaskCreated: {
      title: "Erro",
      description: "Não foi possível criar a tarefa.",
      variant: "destructive",
    },
    noTaskUpdated: {
      title: "Erro",
      description: "Não foi possível atualizar a tarefa.",
      variant: "destructive",
    },
    noTaskDeleted: {
      title: "Erro",
      description: "Não foi possível excluir a tarefa.",
      variant: "destructive",
    },
    noTasksLoaded: {
      title: "Erro",
      description: "Não foi possível carregar as tarefas.",
      variant: "destructive",
    },
    sessionExpired: {
      title: "Sessão Expirada",
      description: "Sua sessão expirou. Por favor, faça login novamente.",
      variant: "destructive",
    },
    loggedOut: {
      title: "Sessão Encerrada",
      description: "Você foi desconectado com sucesso.",
    },
  },
};
