import { prisma } from '@/lib/prisma';

export const usersService = {
  list: () => prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } })
};
