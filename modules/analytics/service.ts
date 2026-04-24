import { TaskStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import type { DashboardSnapshot } from '@/lib/types';

export const analyticsService = {
  snapshot: async (): Promise<DashboardSnapshot> => {
    const [organizations, users, projects, tasks, grouped] = await Promise.all([
      prisma.organization.count(),
      prisma.user.count(),
      prisma.project.count(),
      prisma.task.count(),
      prisma.task.groupBy({ by: ['status'], _count: { status: true } })
    ]);

    const statuses = {
      [TaskStatus.TODO]: 0,
      [TaskStatus.IN_PROGRESS]: 0,
      [TaskStatus.DONE]: 0
    } as Record<TaskStatus, number>;

    grouped.forEach((g) => {
      statuses[g.status] = g._count.status;
    });

    return {
      organizations,
      users,
      projects,
      tasks,
      doneTasks: statuses.DONE,
      inProgressTasks: statuses.IN_PROGRESS,
      statuses
    };
  }
};
