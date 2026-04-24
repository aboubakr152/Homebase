import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  projectId: z.string().min(1),
  assigneeId: z.string().optional()
});
