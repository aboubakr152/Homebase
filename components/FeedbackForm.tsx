'use client';

import { useMemo, useState } from 'react';
import { amazonHref, type Product } from '@/lib/products';
import { type SatisfactionOption } from '@/lib/validation';

type Step = 'intro' | 'choice' | 'satisfied' | 'dissatisfied' | 'done';

type SubmissionResult = {
  satisfaction: SatisfactionOption;
  productName: string;
  amazonUrl: string;
};

type IntroState = {
  customerName: string;
  customerEmail: string;
  amazonOrderNumber: string;
  productVariant: string;
};

const emptyIntro: IntroState = {
  customerName: '',
  customerEmail: '',
  amazonOrderNumber: '',
  productVariant: ''
};

export function FeedbackForm({ products }: { products: Product[] }) {
  const tabs = useMemo(() => [{ _id: 'general', name: 'General Feedback', amazonUrlUS: 'https://www.amazon.com/s?k=The+Yellow+Mango' }, ...products], [products]);
  const [selected, setSelected] = useState(tabs[0]);
  const [step, setStep] = useState<Step>('intro');
  const [intro, setIntro] = useState<IntroState>(emptyIntro);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  function updateIntro(field: keyof IntroState, value: string) {
    setIntro((current) => ({ ...current, [field]: value }));
  }

  function continueToChoice() {
    setStatus('');
    if (!intro.customerName.trim() || !intro.amazonOrderNumber.trim()) {
      setStatus('Please enter your name and Amazon order number.');
      return;
    }
    setStep('choice');
  }

  async function submitFeedback(satisfaction: SatisfactionOption) {
    setStatus('');
    if (message.trim().length < 10) {
      setStatus('Please write a short message with at least 10 characters.');
      return;
    }

    setBusy(true);
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...intro,
        productId: selected._id,
        productName: selected.name,
        feedbackCategory: 'Product Experience',
        satisfaction,
        message,
        permissionToContact: Boolean(intro.customerEmail),
        pageSource: location.href
      })
    });
    const data = await res.json();
    setBusy(false);

    if (!res.ok) {
      setStatus(Object.values(data.errors || {}).join(' '));
      return;
    }

    setResult({ satisfaction, productName: selected.name, amazonUrl: amazonHref(selected) });
    setStep('done');
  }

  function resetFlow() {
    setIntro(emptyIntro);
    setMessage('');
    setStatus('');
    setResult(null);
    setStep('intro');
  }

  return (
    <div className="feedback-app">
      <div className="feedback-tabs" role="tablist" aria-label="Feedback products">
        {tabs.map((tab) => (
          <button type="button" role="tab" aria-selected={selected._id === tab._id} className={selected._id === tab._id ? 'active' : ''} key={tab._id} onClick={() => { setSelected(tab); resetFlow(); }}>
            {tab.name}
          </button>
        ))}
      </div>

      {step === 'intro' ? (
        <section className="feedback-card">
          <p className="eyebrow">The Yellow Mango Feedback</p>
          <h2>Welcome to The Yellow Mango</h2>
          <p>Tell us about your experience with <strong>{selected.name}</strong>. We use this private feedback to improve our products and support.</p>
          <label>Name<input value={intro.customerName} onChange={(e) => updateIntro('customerName', e.target.value)} placeholder="Your full name" autoComplete="name" /></label>
          <label>Email address (optional)<input value={intro.customerEmail} onChange={(e) => updateIntro('customerEmail', e.target.value)} placeholder="you@example.com" type="email" autoComplete="email" /></label>
          <label>Amazon Order Number<input value={intro.amazonOrderNumber} onChange={(e) => updateIntro('amazonOrderNumber', e.target.value)} placeholder="e.g., 112-1234567-1234567" autoComplete="off" /></label>
          <label>Product color or model (optional)<input value={intro.productVariant} onChange={(e) => updateIntro('productVariant', e.target.value)} placeholder="Color, size, or model" /></label>
          <button className="feedback-button" type="button" onClick={continueToChoice}>Continue</button>
          {status ? <p className="feedback-error" role="alert">{status}</p> : null}
        </section>
      ) : null}

      {step === 'choice' ? (
        <section className="feedback-card">
          <h2>How was your experience?</h2>
          <p>Choose the option that best describes your experience. Both paths are private and help us improve.</p>
          <div className="feedback-choice">
            <button className="feedback-button ok" type="button" onClick={() => { setMessage(''); setStep('satisfied'); }}>I was Satisfied</button>
            <button className="feedback-button bad" type="button" onClick={() => { setMessage(''); setStep('dissatisfied'); }}>I was Dissatisfied</button>
          </div>
        </section>
      ) : null}

      {step === 'dissatisfied' ? (
        <section className="feedback-card">
          <h2>We&apos;re sorry — help us make it right</h2>
          <p>We genuinely appreciate the chance to understand what went wrong.</p>
          <label>Your feedback<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what went wrong…" /></label>
          <button className="feedback-button bad" type="button" disabled={busy} onClick={() => submitFeedback('Not Satisfied')}>{busy ? 'Submitting…' : 'Submit'}</button>
          {status ? <p className="feedback-error" role="alert">{status}</p> : null}
        </section>
      ) : null}

      {step === 'satisfied' ? (
        <section className="feedback-card">
          <h2>Great! Mind sharing a few words?</h2>
          <p>Your private feedback helps us understand what customers value most.</p>
          <label>Your feedback<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your feedback here…" /></label>
          <button className="feedback-button ok" type="button" disabled={busy} onClick={() => submitFeedback('Satisfied')}>{busy ? 'Submitting…' : 'Continue'}</button>
          {status ? <p className="feedback-error" role="alert">{status}</p> : null}
        </section>
      ) : null}

      {step === 'done' && result ? (
        <section className="feedback-card">
          <div className="feedback-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            <div>
              <strong>Thank you for your feedback.</strong>
              <p>We have received your order number and your private feedback for {result.productName}.</p>
            </div>
          </div>
          {result.satisfaction === 'Satisfied' ? (
            <>
              <h2>You can now visit Amazon if you want to leave public feedback.</h2>
              <p>Please share only your honest experience. The Yellow Mango does not provide cashback, vouchers, refunds, gifts, discounts, or any incentive for Amazon reviews.</p>
              <a className="feedback-button" href={result.amazonUrl} target="_blank" rel="noopener noreferrer">View on Amazon</a>
            </>
          ) : (
            <>
              <h2>We&apos;re genuinely grateful.</h2>
              <p>Your feedback will help us improve The Yellow Mango products and customer experience.</p>
            </>
          )}
          <button className="feedback-button secondary" type="button" onClick={resetFlow}>Submit Another Response</button>
        </section>
      ) : null}
    </div>
  );
}
