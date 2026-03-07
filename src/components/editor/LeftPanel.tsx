'use client';

import { useStore } from '@/store/useStore';

const GARMENT_LIBRARY = [
  { id: 'gl1', name: 'Basic T-Shirt', type: 't_shirt' },
  { id: 'gl2', name: 'Oversized Hoodie', type: 'hoodie' },
  { id: 'gl3', name: 'Straight Jeans', type: 'pants' },
  { id: 'gl4', name: 'Denim Jacket', type: 'denim_jacket' },
  { id: 'gl5', name: 'Bomber Jacket', type: 'bomber' },
  { id: 'gl6', name: 'Athletic Shorts', type: 'shorts' },
];

const TABS = [
  { key: 'devices' as const, label: 'Devices' },
  { key: 'elements' as const, label: 'Elements' },
  { key: 'motion' as const, label: 'Motion' },
  { key: 'lens' as const, label: 'Lens' },
];

export function LeftPanel() {
  const { editorTab, setEditorTab, fabrics, trims, selectedFabricId, setSelectedFabric, selectedTrimId, setSelectedTrim } = useStore();

  return (
    <div className="w-[340px] bg-gray-900 rounded-2xl m-3 p-4 flex flex-col text-white overflow-hidden">
      {/* Tab Bar */}
      <div className="flex bg-gray-800 rounded-full p-1 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setEditorTab(tab.key)}
            className={`flex-1 text-xs font-bold tracking-wider uppercase py-2 rounded-full transition-all ${
              editorTab === tab.key
                ? 'bg-white text-gray-900'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {editorTab === 'devices' && (
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Garment Library</h3>
          <div className="space-y-2">
            {GARMENT_LIBRARY.map((g) => (
              <div key={g.id} className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors">
                <p className="text-sm font-medium">{g.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{g.type.replace('_', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {editorTab === 'elements' && (
        <div className="flex-1 overflow-y-auto">
          {/* Fabric Library */}
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Fabrics ({fabrics.length})</h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {fabrics.map((fabric) => (
              <button
                key={fabric.id}
                onClick={() => setSelectedFabric(fabric.id === selectedFabricId ? null : fabric.id)}
                className={`aspect-square rounded-lg border-2 transition-all flex flex-col items-center justify-center p-1 ${
                  selectedFabricId === fabric.id
                    ? 'border-blue-500 bg-gray-700'
                    : 'border-transparent bg-gray-800 hover:border-gray-600'
                }`}
                title={`${fabric.name} - ${fabric.weight}GSM`}
              >
                <div
                  className="w-6 h-6 rounded-full mb-1"
                  style={{ backgroundColor: fabric.color ?? '#666' }}
                />
                <span className="text-[8px] text-gray-400 text-center leading-tight truncate w-full">
                  {fabric.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Selected fabric detail */}
          {selectedFabricId && (() => {
            const fabric = fabrics.find((f) => f.id === selectedFabricId);
            if (!fabric) return null;
            return (
              <div className="bg-gray-800 rounded-lg p-3 mb-6">
                <p className="text-sm font-bold mb-2">{fabric.name}</p>
                <div className="space-y-1 text-xs text-gray-400">
                  <p>Weight: <span className="text-white">{fabric.weight} GSM</span></p>
                  <p>Composition: <span className="text-white">{fabric.composition}</span></p>
                  <p>Stretch: <span className="text-white">{fabric.stretch ?? 'None'}</span></p>
                  {fabric.supplierName && <p>Supplier: <span className="text-white">{fabric.supplierName}</span></p>}
                </div>
              </div>
            );
          })()}

          {/* Trim Library */}
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Trims ({trims.length})</h3>
          <div className="space-y-2">
            {trims.map((trim) => (
              <button
                key={trim.id}
                onClick={() => setSelectedTrim(trim.id === selectedTrimId ? null : trim.id)}
                className={`w-full text-left bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors ${
                  selectedTrimId === trim.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <p className="text-sm font-medium">{trim.name}</p>
                <p className="text-[10px] text-gray-500">
                  {trim.type.toUpperCase()} {trim.size && `• ${trim.size}`}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {editorTab === 'motion' && (
        <div className="text-gray-500 text-sm text-center mt-8">
          <p className="font-bold mb-2">Motion Controls</p>
          <p className="text-xs">Animation keyframes and transitions for garment presentation</p>
        </div>
      )}

      {editorTab === 'lens' && (
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Pro Camera</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['Front', 'Back', 'Side'].map((angle) => (
              <div key={angle} className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-[10px] text-gray-500">{angle}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 my-4" />
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Environments (30)</h3>
          <div className="grid grid-cols-5 gap-2">
            {[
              '#1a1a1a', '#a0a0a0', '#2d2d2d', '#3b82f6', '#8b5cf6',
              '#ef4444', '#eab308', '#f97316', '#ec4899', '#06b6d4',
              '#22c55e', '#a855f7', '#06b6d4', '#f472b6', '#10b981',
              '#94a3b8', '#64748b', '#1e293b', '#6366f1', '#334155',
              '#1e1b4b', '#ec4899', '#be185d', '#1e40af', '#f59e0b',
            ].map((color, i) => (
              <button
                key={i}
                className="aspect-square rounded-lg border-2 border-transparent hover:border-white/30 transition-all"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bottom status bar */}
      <div className="mt-auto pt-4 border-t border-gray-800 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-[10px] text-gray-500 tracking-widest uppercase">
          Neural GPU Engine: Active • Zero Latency Mode
        </span>
      </div>
    </div>
  );
}
