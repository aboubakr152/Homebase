import { prisma } from '@/lib/prisma';

export const organizationsService = {
  list: () => prisma.organization.findMany({ include: { users: true, projects: true } })
};
