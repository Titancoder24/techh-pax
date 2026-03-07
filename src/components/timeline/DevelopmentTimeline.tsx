'use client';

import { useStore } from '@/store/useStore';
import { Check, Circle, Loader2 } from 'lucide-react';

export function DevelopmentTimeline() {
  const { timeline, updateTimelineStatus } = useStore();

  const getIcon = (status: string) => {
    if (status === 'completed') return <Check size={14} className="text-green-400" />;
    if (status === 'in_progress') return <Loader2 size={14} className="text-blue-400 animate-spin" />;
    return <Circle size={14} className="text-gray-600" />;
  };

  const getLineColor = (status: string) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'in_progress') return 'bg-blue-500';
    return 'bg-gray-700';
  };

  return (
    <div className="bg-gray-900 rounded-2xl mx-3 mb-3 p-4">
      <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Development Timeline</h3>
      <div className="flex items-center gap-0">
        {timeline.map((event, index) => (
          <div key={event.id} className="flex items-center flex-1">
            {/* Node */}
            <button
              onClick={() => {
                const nextStatus = event.status === 'pending' ? 'in_progress' : event.status === 'in_progress' ? 'completed' : 'pending';
                updateTimelineStatus(event.id, nextStatus as 'pending' | 'in_progress' | 'completed');
              }}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 cursor-pointer hover:scale-110 transition-transform ${
                event.status === 'completed'
                  ? 'bg-green-500/20 border-green-500'
                  : event.status === 'in_progress'
                  ? 'bg-blue-500/20 border-blue-500'
                  : 'bg-gray-800 border-gray-700'
              }`}
            >
              {getIcon(event.status)}
            </button>

            {/* Connector line */}
            {index < timeline.length - 1 && (
              <div className={`flex-1 h-0.5 ${getLineColor(event.status)}`} />
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex mt-2">
        {timeline.map((event) => (
          <div key={event.id} className="flex-1 pr-2">
            <p className={`text-[9px] font-bold uppercase tracking-wider ${
              event.status === 'completed' ? 'text-green-400' :
              event.status === 'in_progress' ? 'text-blue-400' : 'text-gray-600'
            }`}>
              {event.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
