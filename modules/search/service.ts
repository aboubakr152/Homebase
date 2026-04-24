import { prisma } from '@/lib/prisma';

export const searchService = {
  global: async (query: string) => {
    const [projects, tasks, users] = await Promise.all([
      prisma.project.findMany({ where: { name: { contains: query } }, take: 5 }),
      prisma.task.findMany({ where: { title: { contains: query } }, take: 5 }),
      prisma.user.findMany({ where: { name: { contains: query } }, take: 5 })
    ]);

    return { projects, tasks, users };
  }
};
