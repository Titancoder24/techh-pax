'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { X } from 'lucide-react';
import type { ProjectStatus } from '@/types';

const CATEGORIES = ['Streetwear', 'Outerwear', 'Activewear', 'Casual', 'Formal', 'Denim', 'Knitwear'];
const SEASONS = ['SS26', 'FW26', 'SS27', 'FW27'];
const MARKETS = ['Youth', 'Men', 'Women', 'Unisex', 'Kids'];

export function NewProjectModal({ onClose }: { onClose: () => void }) {
  const addProject = useStore((s) => s.addProject);
  const [form, setForm] = useState({
    name: '',
    collection: '',
    season: 'FW26',
    category: 'Streetwear',
    targetMarket: 'Unisex',
  });

  const handleCreate = () => {
    if (!form.name.trim()) return;
    addProject({ ...form, status: 'concept' as ProjectStatus });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black uppercase tracking-tight">New Garment Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Garment Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Oversized Hoodie"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Collection</label>
            <input
              type="text"
              value={form.collection}
              onChange={(e) => setForm({ ...form, collection: e.target.value })}
              placeholder="e.g., Fall 2026"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Season</label>
              <select
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SEASONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Market</label>
              <select
                value={form.targetMarket}
                onChange={(e) => setForm({ ...form, targetMarket: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {MARKETS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!form.name.trim()}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-bold uppercase tracking-wider hover:bg-blue-700 disabled:opacity-40"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
