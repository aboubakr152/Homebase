import { prisma } from '@/lib/prisma';

export const activityService = {
  recent: async () => {
    const [tasks, comments, notifications] = await Promise.all([
      prisma.task.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.comment.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.notification.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
    ]);

    return { tasks, comments, notifications };
  }
};
