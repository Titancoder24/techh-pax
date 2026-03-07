'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Check, Plus, MapPin } from 'lucide-react';

export function AnnotationList() {
  const { annotations, addAnnotation, resolveAnnotation, currentUser } = useStore();
  const [newContent, setNewContent] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'resolved'>('all');

  const filtered = annotations.filter((a) => {
    if (filter === 'open') return a.status === 'open';
    if (filter === 'resolved') return a.status === 'resolved';
    return true;
  });

  const handleAdd = () => {
    if (!newContent.trim()) return;
    addAnnotation({
      garmentId: 'g1',
      authorId: currentUser.id,
      content: newContent.trim(),
      posX: Math.random() * 2 - 1,
      posY: Math.random() * 2 - 1,
      posZ: 0.5,
      status: 'open',
    });
    setNewContent('');
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-2xl m-3 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Annotations</h3>
        <div className="flex gap-1">
          {(['all', 'open', 'resolved'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                filter === f ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {filtered.map((ann) => (
          <div key={ann.id} className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-red-400" />
                <StatusBadge status={ann.status} />
              </div>
              {ann.status === 'open' && (
                <button
                  onClick={() => resolveAnnotation(ann.id)}
                  className="text-green-500 hover:text-green-400"
                  title="Resolve"
                >
                  <Check size={14} />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-200">{ann.content}</p>
            <p className="text-[10px] text-gray-500 mt-2">{formatTime(ann.createdAt)}</p>
          </div>
        ))}
      </div>

      {/* Add new annotation */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add annotation..."
            className="flex-1 bg-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 rounded-lg px-3 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
