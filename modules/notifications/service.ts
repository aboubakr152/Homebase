import { prisma } from '@/lib/prisma';

export const notificationsService = {
  listByUser: (userId: string) =>
    prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
};
