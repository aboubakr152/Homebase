import { NextResponse } from 'next/server';
import { validateFeedback } from '@/lib/validation';
export async function POST(request: Request) {
  const payload = await request.json();
  const result = validateFeedback(payload);
  if (!result.valid) return NextResponse.json({ errors: result.errors }, { status: 400 });
  const row = { product_id: payload.productId, product_name: payload.productName, feedback_category: payload.feedbackCategory, customer_name: payload.customerName, customer_email: payload.customerEmail, amazon_order_number: payload.amazonOrderNumber || null, product_variant: payload.productVariant || null, rating: payload.rating, message: payload.message, uploaded_image_url: null, permission_to_contact: Boolean(payload.permissionToContact), submission_status: 'New', page_source: payload.pageSource || null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/feedback_submissions`, { method: 'POST', headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(row) });
  }
  return NextResponse.json({ ok: true });
}
