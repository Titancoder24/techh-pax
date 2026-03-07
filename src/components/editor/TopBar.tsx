'use client';

import { useStore } from '@/store/useStore';
import { Box, Save, Share2, Sun } from 'lucide-react';

export function TopBar() {
  const { garments, setActiveProject } = useStore();
  const garment = garments[0];

  return (
    <div className="h-14 flex items-center justify-between px-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
      {/* Left – project info */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveProject('')}
          className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white"
        >
          <Box size={16} />
        </button>
        <div>
          <p className="text-sm font-bold text-white">{garment?.name ?? 'Untitled Space'}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">NextGen Editor • Local Vault</p>
        </div>
      </div>

      {/* Center – commit */}
      <button className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full text-xs text-gray-300 font-bold tracking-wider uppercase hover:bg-gray-700">
        <Save size={14} />
        Commit to Vault
      </button>

      {/* Right – actions */}
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white">
          <Sun size={16} />
        </button>
        <button className="bg-gray-800 px-4 py-2 rounded-full text-xs text-gray-300 font-bold tracking-wider flex items-center gap-2 hover:bg-gray-700">
          <Share2 size={14} />
          Share
        </button>
      </div>
    </div>
  );
}
