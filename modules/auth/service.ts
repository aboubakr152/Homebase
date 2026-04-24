import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const authService = {
  session: () => getServerSession(authOptions)
};
