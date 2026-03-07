'use client';

import { useStore } from '@/store/useStore';
import { GitCommit } from 'lucide-react';

export function VersionHistory() {
  const { versions } = useStore();
  const sorted = [...versions].sort((a, b) => b.versionNum - a.versionNum);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gray-900 rounded-2xl mx-3 mb-3 p-4">
      <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Version History</h3>
      <div className="space-y-3">
        {sorted.map((version, index) => (
          <div key={version.id} className="flex gap-3">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index === 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-500'
              }`}>
                <GitCommit size={12} />
              </div>
              {index < sorted.length - 1 && <div className="w-px flex-1 bg-gray-800 mt-1" />}
            </div>

            {/* Content */}
            <div className="flex-1 pb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-white">V{version.versionNum}</span>
                <span className="text-[10px] text-gray-500">{formatDate(version.createdAt)}</span>
              </div>
              <p className="text-xs text-gray-400">{version.changeNote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
