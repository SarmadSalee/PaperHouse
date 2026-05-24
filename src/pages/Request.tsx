import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CLASSES } from '../data/papers';

export default function Request() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    class: '',
    subject: searchParams.get('subject') ?? '',
    year: '',
    board: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.whatsapp.trim()) errs.whatsapp = 'WhatsApp number is required';
    if (!form.class) errs.class = 'Please select a class';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const existing = JSON.parse(localStorage.getItem('ph-requests') ?? '[]');
    localStorage.setItem('ph-requests', JSON.stringify([...existing, { ...form, submittedAt: new Date().toISOString() }]));
    setSubmitted(true);
  }

  function field(id: keyof typeof form) {
    return {
      value: form[id],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(f => ({ ...f, [id]: e.target.value }));
        setErrors(err => { const n = { ...err }; delete n[id]; return n; });
      },
    };
  }

  const inputCls = (id: string) =>
    `w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
      errors[id]
        ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
        : 'border-gray-200 dark:border-gray-600 focus:border-green-400 focus:ring-green-400/20'
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">JazakAllah! ✅</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            We received your request and will add it within <span className="font-semibold text-green-600">48 hours!</span>
          </p>
          <a href="/browse" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition-colors">
            Browse Papers
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <span className="text-5xl mb-3 block">📬</span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Request a Past Paper 📬</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Can't find what you need? Tell us and we'll add it within 48 hours!</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Your Name</label>
              <input type="text" placeholder="Ahmed Khan" className={inputCls('name')} {...field('name')} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">WhatsApp Number</label>
              <input type="tel" placeholder="03XX-XXXXXXX" className={inputCls('whatsapp')} {...field('whatsapp')} />
              {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Class</label>
              <select className={inputCls('class')} {...field('class')}>
                <option value="">Select Class</option>
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
              {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
              <input type="text" placeholder="e.g. Chemistry" className={inputCls('subject')} {...field('subject')} />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Year</label>
              <input type="text" placeholder="e.g. 2023" className={inputCls('year')} {...field('year')} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Board</label>
              <input type="text" placeholder="e.g. BISE Lahore" className={inputCls('board')} {...field('board')} />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 text-base"
            >
              Send Request 🚀
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          Your number is only used to notify you. No spam, ever.
        </p>
      </div>
    </div>
  );
}
