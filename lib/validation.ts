import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  projectId: z.string().min(1),
  assigneeId: z.string().optional().nullable()
});

export const feedbackCategories = [
  'General Feedback',
  'Product Experience',
  'Suggestion',
  'Product Question',
  'Quality Concern',
  'Missing or Damaged Item',
  'Instructions or Setup',
  'Website Feedback',
  'Other'
] as const;

export const satisfactionOptions = ['Satisfied', 'Not Satisfied'] as const;

export type FeedbackCategory = (typeof feedbackCategories)[number];
export type SatisfactionOption = (typeof satisfactionOptions)[number];

export type FeedbackPayload = {
  productId: string;
  productName: string;
  feedbackCategory: FeedbackCategory;
  customerName: string;
  customerEmail: string;
  amazonOrderNumber: string;
  productVariant?: string;
  rating?: number;
  satisfaction: SatisfactionOption;
  message: string;
  permissionToContact: boolean;
  pageSource?: string;
  website?: string;
};

export function getAmazonOrderDigits(orderNumber = '') {
  return orderNumber.replace(/\D/g, '');
}

export function isValidAmazonOrderNumber(orderNumber = '') {
  return getAmazonOrderDigits(orderNumber).length === 17;
}

export function validateFeedback(input: Partial<FeedbackPayload>) {
  const errors: Record<string, string> = {};
  if (input.website) errors.website = 'Spam detected.';
  if (!input.productName) errors.productName = 'Choose a product or General Feedback.';
  if (!input.feedbackCategory || !feedbackCategories.includes(input.feedbackCategory)) errors.feedbackCategory = 'Choose a feedback category.';
  if (!input.customerName || input.customerName.trim().length < 2) errors.customerName = 'Enter your full name.';
  if (!input.customerEmail || !/^\S+@\S+\.\S+$/.test(input.customerEmail)) errors.customerEmail = 'Enter a valid email address.';
  if (!input.amazonOrderNumber || !isValidAmazonOrderNumber(input.amazonOrderNumber)) errors.amazonOrderNumber = 'Enter a valid Amazon order number with 17 digits.';
  if (!input.satisfaction || !satisfactionOptions.includes(input.satisfaction)) errors.satisfaction = 'Choose whether you were satisfied or not satisfied.';
  if (input.rating !== undefined && (input.rating < 1 || input.rating > 5)) errors.rating = 'Choose a rating from 1 to 5.';
  if (!input.message || input.message.trim().length < 10) errors.message = 'Please enter at least 10 characters.';
  return { valid: Object.keys(errors).length === 0, errors };
}
