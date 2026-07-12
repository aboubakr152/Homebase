'use client';

import { useMemo, useState } from 'react';
import { amazonHref, type Product } from '@/lib/products';
import { isValidAmazonOrderNumber, type SatisfactionOption } from '@/lib/validation';

type Step = 'intro' | 'choice' | 'satisfied' | 'fiveStar' | 'dissatisfied' | 'done';

type SubmissionResult = {
  satisfaction: SatisfactionOption;
  productName: string;
  amazonUrl?: string;
};

type IntroState = {
  customerName: string;
  customerEmail: string;
  amazonOrderNumber: string;
};

const emptyIntro: IntroState = {
  customerName: '',
  customerEmail: '',
  amazonOrderNumber: ''
};

export function FeedbackForm({ products, initialProductId = 'general' }: { products: Product[]; initialProductId?: string }) {
  const productOptions = useMemo(() => [{ _id: 'general', name: 'General Feedback', amazonUrlUS: '' }, ...products], [products]);
  const initialSelection = productOptions.some((product) => product._id === initialProductId) ? initialProductId : productOptions[0]._id;
  const [selectedProductId, setSelectedProductId] = useState(initialSelection);
  const selected = productOptions.find((product) => product._id === selectedProductId) || productOptions[0];
  const isGeneralFeedback = selected._id === 'general';
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
    if (!intro.customerName.trim()) {
      setStatus('Please enter your name.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(intro.customerEmail.trim())) {
      setStatus('Please enter a valid email address.');
      return;
    }
    if (!isValidAmazonOrderNumber(intro.amazonOrderNumber)) {
      setStatus('Please enter a valid Amazon order number. Dashes and spaces are okay, but it must contain 17 numbers.');
      return;
    }
    setStep('choice');
  }

  async function submitFeedback(satisfaction: SatisfactionOption, overrideMessage?: string) {
    const feedbackMessage = (overrideMessage || message).trim();
    setStatus('');
    if (feedbackMessage.length < 10) {
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
        message: feedbackMessage,
        permissionToContact: true,
        pageSource: location.href
      })
    });
    const data = await res.json();
    setBusy(false);

    if (!res.ok) {
      setStatus(Object.values(data.errors || {}).join(' '));
      return;
    }

    if (!isGeneralFeedback && satisfaction === 'Satisfied') {
      await navigator.clipboard?.writeText(feedbackMessage).catch(() => undefined);
    }

    setResult({
      satisfaction,
      productName: selected.name,
      amazonUrl: !isGeneralFeedback && satisfaction === 'Satisfied' ? amazonHref(selected) : undefined
    });
    setStep('done');
  }

  function restartForProduct(productId: string) {
    setSelectedProductId(productId);
    setIntro(emptyIntro);
    setMessage('');
    setStatus('');
    setResult(null);
    setStep('intro');
  }

  return (
    <div className="feedback-app">
      <section className="feedback-card">
        {step === 'intro' ? (
          <>
            <p className="eyebrow">The Yellow Mango Feedback</p>
            <h2>Welcome to The Yellow Mango</h2>
            <p>Tell us about your experience. We use this private feedback to improve our products and support.</p>
            <label>Product<select value={selectedProductId} onChange={(event) => restartForProduct(event.target.value)}>{productOptions.map((product) => <option key={product._id} value={product._id}>{product.name}</option>)}</select></label>
            <label>Name<input value={intro.customerName} onChange={(e) => updateIntro('customerName', e.target.value)} placeholder="Your full name" autoComplete="name" /></label>
            <label>Email address<input value={intro.customerEmail} onChange={(e) => updateIntro('customerEmail', e.target.value)} placeholder="you@example.com" type="email" autoComplete="email" /></label>
            <label>Amazon Order Number<input value={intro.amazonOrderNumber} onChange={(e) => updateIntro('amazonOrderNumber', e.target.value)} placeholder="e.g., 112-1234567-1234567" autoComplete="off" /></label>
            <button className="feedback-button" type="button" onClick={continueToChoice}>Continue</button>
            {status ? <p className="feedback-error" role="alert">{status}</p> : null}
          </>
        ) : null}

        {step === 'choice' ? (
          <>
            <h2>How was your experience?</h2>
            <p>Selected product: <strong>{selected.name}</strong></p>
            <div className="feedback-choice">
              <button className="feedback-button ok" type="button" onClick={() => { setMessage(''); setStep('satisfied'); }}>I was Satisfied</button>
              <button className="feedback-button bad" type="button" onClick={() => { setMessage(''); setStep('dissatisfied'); }}>I was Dissatisfied</button>
            </div>
          </>
        ) : null}

        {step === 'satisfied' ? (
          <>
            <h2>Great! Mind sharing a few words?</h2>
            <p>Your private feedback helps us understand what customers value most.</p>
            <label>Your feedback<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your feedback here…" /></label>
            <button className="feedback-button ok" type="button" onClick={() => {
              if (message.trim().length < 10) {
                setStatus('Please write a short message with at least 10 characters.');
                return;
              }
              setStatus('');
              setStep('fiveStar');
            }}>Continue</button>
            {status ? <p className="feedback-error" role="alert">{status}</p> : null}
          </>
        ) : null}

        {step === 'fiveStar' ? (
          <>
            <h2>Would you give this product a 5 star review?</h2>
            <div className="feedback-choice two-col">
              <button className="feedback-button ok" type="button" disabled={busy} onClick={() => submitFeedback('Satisfied')}>{busy ? 'Submitting…' : 'Yes'}</button>
              <button className="feedback-button bad" type="button" disabled={busy} onClick={() => submitFeedback('Not Satisfied')}>{busy ? 'Submitting…' : 'No'}</button>
            </div>
            {status ? <p className="feedback-error" role="alert">{status}</p> : null}
          </>
        ) : null}

        {step === 'dissatisfied' ? (
          <>
            <h2>We&apos;re sorry — help us make it right</h2>
            <p>We genuinely appreciate the chance to understand what went wrong.</p>
            <label>Your feedback<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what went wrong…" /></label>
            <button className="feedback-button bad" type="button" disabled={busy} onClick={() => submitFeedback('Not Satisfied')}>{busy ? 'Submitting…' : 'Submit'}</button>
            {status ? <p className="feedback-error" role="alert">{status}</p> : null}
          </>
        ) : null}

        {step === 'done' && result ? (
          <>
            {result.satisfaction === 'Satisfied' && result.amazonUrl ? (
              <>
                <h2>We&apos;ve got your order number.</h2>
                <p>Your feedback has been copied to your clipboard. Once you open the Leave Amazon Review page, simply click paste and submit. Pictures and videos are highly appreciated.</p>
                <p className="feedback-note">Your review means the world to us. Thank you for choosing The Yellow Mango.</p>
                <a className="feedback-button" href={result.amazonUrl} target="_blank" rel="noopener noreferrer">Leave Amazon Review</a>
              </>
            ) : (
              <>
                <h2>We&apos;ve got your order number.</h2>
                <p>Thank you for your feedback. We are genuinely grateful because it helps us improve The Yellow Mango products and customer experience.</p>
              </>
            )}
          </>
        ) : null}
      </section>
    </div>
  );
}
