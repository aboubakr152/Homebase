import { prisma } from '@/lib/prisma';

export const projectsService = {
  list: () => prisma.project.findMany({ include: { tasks: true, files: true } }),
  create: (data: { name: string; description?: string; organizationId: string }) =>
    prisma.project.create({ data })
};
