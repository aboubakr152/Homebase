import { prisma } from '@/lib/prisma';

export const commentsService = {
  listByTask: (taskId: string) =>
    prisma.comment.findMany({ where: { taskId }, include: { author: true }, orderBy: { createdAt: 'desc' } })
};
