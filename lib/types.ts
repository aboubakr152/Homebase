export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type DashboardSnapshot = { organizations: number; users: number; projects: number; tasks: number; doneTasks: number; inProgressTasks: number; statuses: Record<TaskStatus, number>; };
