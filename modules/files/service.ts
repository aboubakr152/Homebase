import { prisma } from '@/lib/prisma';

export const filesService = {
  listByProject: (projectId: string) =>
    prisma.fileAsset.findMany({ where: { projectId }, orderBy: { createdAt: 'desc' } })
};
