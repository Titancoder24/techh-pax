'use client';

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  concept: { bg: 'bg-slate-700', text: 'text-slate-200', label: 'CONCEPT' },
  design: { bg: 'bg-blue-600', text: 'text-blue-100', label: 'DESIGN' },
  pattern: { bg: 'bg-purple-600', text: 'text-purple-100', label: 'PATTERN' },
  prototype: { bg: 'bg-amber-600', text: 'text-amber-100', label: 'PROTOTYPE' },
  sample_1: { bg: 'bg-orange-600', text: 'text-orange-100', label: 'SAMPLE 1' },
  sample_2: { bg: 'bg-pink-600', text: 'text-pink-100', label: 'SAMPLE 2' },
  production: { bg: 'bg-green-600', text: 'text-green-100', label: 'PRODUCTION' },
  draft: { bg: 'bg-gray-600', text: 'text-gray-100', label: 'DRAFT' },
  in_review: { bg: 'bg-yellow-600', text: 'text-yellow-100', label: 'IN REVIEW' },
  approved: { bg: 'bg-green-600', text: 'text-green-100', label: 'APPROVED' },
  in_production: { bg: 'bg-emerald-600', text: 'text-emerald-100', label: 'IN PRODUCTION' },
  pending: { bg: 'bg-gray-600', text: 'text-gray-200', label: 'PENDING' },
  in_progress: { bg: 'bg-blue-600', text: 'text-blue-100', label: 'IN PROGRESS' },
  completed: { bg: 'bg-green-600', text: 'text-green-100', label: 'COMPLETED' },
  open: { bg: 'bg-red-600', text: 'text-red-100', label: 'OPEN' },
  resolved: { bg: 'bg-green-600', text: 'text-green-100', label: 'RESOLVED' },
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? { bg: 'bg-gray-600', text: 'text-gray-100', label: status.toUpperCase() };
  return (
    <span className={`${style.bg} ${style.text} px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase`}>
      {style.label}
    </span>
  );
}
