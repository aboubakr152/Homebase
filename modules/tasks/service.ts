import { TaskStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { createTaskSchema } from '@/lib/validation';

export const tasksService = {
  list: () =>
    prisma.task.findMany({
      include: { assignee: true, project: true, comments: true },
      orderBy: { createdAt: 'desc' }
    }),
  create: async (input: unknown) => {
    const payload = createTaskSchema.parse(input);
    return prisma.task.create({
      data: {
        ...payload,
        status: TaskStatus.TODO
      }
    });
  },
  updateStatus: (taskId: string, status: TaskStatus) =>
    prisma.task.update({ where: { id: taskId }, data: { status } })
};
