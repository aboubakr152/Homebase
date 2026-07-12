'use client';

import { useMemo, useState } from 'react';
import { amazonHref, type Product } from '@/lib/products';
import { feedbackCategories, satisfactionOptions, type SatisfactionOption } from '@/lib/validation';

type SubmissionResult = {
  satisfaction: SatisfactionOption;
  productName: string;
  amazonUrl: string;
};

export function FeedbackForm({ products }: { products: Product[] }) {
  const tabs = useMemo(() => [{ _id: 'general', name: 'General Feedback', amazonUrlUS: 'https://www.amazon.com/s?k=The+Yellow+Mango' }, ...products], [products]);
  const [selected, setSelected] = useState(tabs[0]);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus('');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        productId: selected._id,
        productName: selected.name,
        permissionToContact: form.get('permissionToContact') === 'on',
        rating: form.get('rating') ? Number(form.get('rating')) : undefined,
        pageSource: location.href
      })
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setStatus(Object.values(data.errors || {}).join(' '));
      return;
    }
    setResult({
      satisfaction: String(form.get('satisfaction')) as SatisfactionOption,
      productName: selected.name,
      amazonUrl: amazonHref(selected)
    });
  }

  if (result) {
    const satisfied = result.satisfaction === 'Satisfied';
    return (
      <section className="feedback-confirmation" aria-live="polite">
        <p className="eyebrow">Feedback received</p>
        <h2>{satisfied ? 'Thank you for sharing your experience.' : 'Thank you for helping us improve.'}</h2>
        <p>
          We have received your order number and your private feedback for <strong>{result.productName}</strong>. Your comments will be reviewed by The Yellow Mango team and used to improve our products and customer experience.
        </p>
        {satisfied ? (
          <p>
            If you would like to leave public feedback on Amazon, you may visit the product listing below. Please share only your honest experience. This website does not provide cashback, refunds, gifts, discounts or any other incentive for Amazon reviews.
          </p>
        ) : (
          <p>
            We are genuinely grateful for the opportunity to learn what did not meet your expectations. Feedback submitted here remains private unless you explicitly approve otherwise.
          </p>
        )}
        <div className="actions">
          {satisfied ? <a className="btn btn-primary" href={result.amazonUrl} target="_blank" rel="noopener noreferrer">View on Amazon</a> : null}
          <button className="btn btn-secondary" type="button" onClick={() => setResult(null)}>Submit More Feedback</button>
        </div>
        <p className="notice">The Yellow Mango does not request or reward Amazon reviews. Purchases and Amazon reviews are managed by Amazon.com.</p>
      </section>
    );
  }

  return (
    <div className="feedback-layout">
      <div className="tabs" role="tablist" aria-label="Feedback products">
        {tabs.map((tab) => (
          <button type="button" role="tab" aria-selected={selected._id === tab._id} className={selected._id === tab._id ? 'active' : ''} key={tab._id} onClick={() => setSelected(tab)}>
            {tab.name}
          </button>
        ))}
      </div>
      <form className="form" onSubmit={submit}>
        <p className="notice">
          Selected product: <strong>{selected.name}</strong>. Do not include payment details, passwords or sensitive personal information. Feedback here stays separate from Amazon reviews, and no incentive is offered for Amazon reviews.
        </p>
        <input type="text" name="website" className="honeypot" tabIndex={-1} autoComplete="off" />
        <label>Feedback category<select name="feedbackCategory" required defaultValue="Product Experience">{feedbackCategories.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label>Full name<input name="customerName" required minLength={2} autoComplete="name" /></label>
        <label>Email address (optional)<input name="customerEmail" type="email" autoComplete="email" /></label>
        <label>Amazon order number<input name="amazonOrderNumber" required autoComplete="off" /></label>
        <label>Product color or model (optional)<input name="productVariant" /></label>
        <fieldset className="choice-fieldset">
          <legend>Were you satisfied?</legend>
          {satisfactionOptions.map((option) => (
            <label className="checkbox" key={option}><input type="radio" name="satisfaction" value={option} required /> {option}</label>
          ))}
        </fieldset>
        <label>Optional rating<select name="rating"><option value="">Choose rating</option>{[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r}</option>)}</select></label>
        <label>Feedback message<textarea name="message" required minLength={10} rows={6} placeholder="Tell us what worked well or what we can improve." /></label>
        <label>Image upload (optional)<input name="image" type="file" accept="image/*" disabled /><span className="small muted">Image storage can be enabled after the private Supabase bucket is configured.</span></label>
        <label className="checkbox"><input type="checkbox" name="permissionToContact" /> Permission to contact me about this feedback.</label>
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Submitting…' : 'Submit Feedback'}</button>
        {status && <p className="form-status" role="alert">{status}</p>}
      </form>
    </div>
  );
}
