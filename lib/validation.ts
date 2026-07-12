import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string().min(1),
  assigneeId: z.string().optional().nullable()
});

export const feedbackCategories = ['General Feedback','Product Experience','Suggestion','Product Question','Quality Concern','Missing or Damaged Item','Instructions or Setup','Website Feedback','Other'] as const;
export type FeedbackCategory = (typeof feedbackCategories)[number];

export type FeedbackPayload = {
  productId: string;
  productName: string;
  feedbackCategory: FeedbackCategory;
  customerName: string;
  customerEmail: string;
  amazonOrderNumber?: string;
  productVariant?: string;
  rating: number;
  message: string;
  permissionToContact: boolean;
  pageSource?: string;
  website?: string;
};

export function validateFeedback(input: Partial<FeedbackPayload>) {
  const errors: Record<string, string> = {};
  if (input.website) errors.website = 'Spam detected.';
  if (!input.productName) errors.productName = 'Choose a product or General Feedback.';
  if (!input.feedbackCategory || !feedbackCategories.includes(input.feedbackCategory)) errors.feedbackCategory = 'Choose a feedback category.';
  if (!input.customerName || input.customerName.trim().length < 2) errors.customerName = 'Enter your full name.';
  if (!input.customerEmail || !/^\S+@\S+\.\S+$/.test(input.customerEmail)) errors.customerEmail = 'Enter a valid email address.';
  if (!input.rating || input.rating < 1 || input.rating > 5) errors.rating = 'Choose a rating from 1 to 5.';
  if (!input.message || input.message.trim().length < 10) errors.message = 'Please enter at least 10 characters.';
  return { valid: Object.keys(errors).length === 0, errors };
}
