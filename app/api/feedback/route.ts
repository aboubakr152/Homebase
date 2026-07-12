import { NextResponse } from 'next/server';
import { validateFeedback } from '@/lib/validation';

async function notifyOwner(row: Record<string, unknown>) {
  const recipient = process.env.FEEDBACK_NOTIFICATION_EMAIL || 'theyellowmangostore@gmail.com';
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.FEEDBACK_FROM_EMAIL || 'The Yellow Mango <feedback@theyellowmango.com>',
      to: [recipient],
      subject: `New ${row.satisfaction} feedback for ${row.product_name}`,
      text: [
        'A new private website feedback submission was received.',
        '',
        `Product: ${row.product_name}`,
        `Satisfaction: ${row.satisfaction}`,
        `Category: ${row.feedback_category}`,
        `Customer: ${row.customer_name}`,
        `Email: ${row.customer_email || 'Not provided'}`,
        `Amazon order number: ${row.amazon_order_number}`,
        `Variant: ${row.product_variant || 'Not provided'}`,
        `Rating: ${row.rating || 'Not provided'}`,
        `Permission to contact: ${row.permission_to_contact ? 'Yes' : 'No'}`,
        '',
        `Message: ${row.message}`
      ].join('\n')
    })
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const result = validateFeedback(payload);
  if (!result.valid) return NextResponse.json({ errors: result.errors }, { status: 400 });

  const row = {
    product_id: payload.productId,
    product_name: payload.productName,
    feedback_category: payload.feedbackCategory,
    customer_name: payload.customerName,
    customer_email: payload.customerEmail || null,
    amazon_order_number: payload.amazonOrderNumber,
    product_variant: payload.productVariant || null,
    rating: payload.rating || null,
    satisfaction: payload.satisfaction,
    message: payload.message,
    uploaded_image_url: null,
    permission_to_contact: Boolean(payload.permissionToContact),
    submission_status: 'New',
    page_source: payload.pageSource || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabaseResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/feedback_submissions`, {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(row)
    });

    if (!supabaseResponse.ok) {
      return NextResponse.json({ errors: { storage: 'Feedback could not be stored. Please try again.' } }, { status: 502 });
    }
  }

  await notifyOwner(row);
  return NextResponse.json({ ok: true });
}
