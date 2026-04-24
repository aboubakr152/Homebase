import type { TaskStatus } from '@prisma/client';

export type DashboardSnapshot = {
  organizations: number;
  users: number;
  projects: number;
  tasks: number;
  doneTasks: number;
  inProgressTasks: number;
  statuses: Record<TaskStatus, number>;
};
