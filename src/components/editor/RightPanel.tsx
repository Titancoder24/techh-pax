'use client';

import { useStore } from '@/store/useStore';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RotateCcw, Maximize, RefreshCw, Plus, Minus } from 'lucide-react';

export function RightPanel() {
  const { rightPanelTab, setRightPanelTab, garments, measurements, updateMeasurement, fabrics } = useStore();
  const garment = garments[0];

  return (
    <div className="w-[320px] bg-gray-900 rounded-2xl m-3 p-4 flex flex-col text-white overflow-y-auto">
      {/* Export button */}
      <button className="w-full bg-white text-gray-900 font-bold text-sm tracking-wider uppercase py-3 rounded-xl mb-3 hover:bg-gray-100 transition-colors">
        Upgrade to Export
      </button>

      <div className="text-center text-[10px] text-yellow-500 tracking-widest uppercase mb-4">
        • Pro 4K Render •
      </div>

      {/* Tab buttons */}
      <div className="flex gap-1 mb-4">
        {(['properties', 'measurements', 'techpack'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setRightPanelTab(tab)}
            className={`flex-1 text-[10px] font-bold tracking-wider uppercase py-2 rounded-lg transition-all ${
              rightPanelTab === tab ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab === 'techpack' ? 'Tech Pack' : tab}
          </button>
        ))}
      </div>

      {rightPanelTab === 'properties' && garment && (
        <div className="space-y-4">
          {/* Canvas Settings */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Canvas Settings</h3>

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400">Zoom Level</span>
              <span className="text-xs font-bold">8.0x</span>
            </div>
            <input type="range" className="w-full mb-4 accent-white" min={1} max={20} defaultValue={8} />

            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400">Tilt Angle</span>
              <button className="text-gray-500 hover:text-white"><Plus size={14} /></button>
            </div>
            <input type="range" className="w-full mb-4 accent-white" min={0} max={90} defaultValue={15} />
          </div>

          {/* Precision Mode */}
          <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">✦</span>
              <span className="text-xs font-bold tracking-wider uppercase">Precision Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
              </div>
              <Minus size={14} className="text-gray-500" />
            </div>
          </div>

          {/* Garment Properties */}
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Garment Properties</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Name</label>
                <p className="text-sm font-medium">{garment.name}</p>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Type</label>
                <p className="text-sm">{garment.garmentType.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Status</label>
                <StatusBadge status={garment.status} />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Colorways</label>
                <div className="flex gap-2">
                  {garment.colorways?.map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-gray-700 cursor-pointer hover:border-white"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <button className="w-7 h-7 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 hover:border-gray-400">
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Fabric Spec */}
          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Fabric Specification</h3>
            <div className="bg-gray-800 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-400">Fabric</span><span>Cotton Fleece</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Weight</span><span>400 GSM</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Composition</span><span>100% Cotton</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Construction</span><span>Cut & Sew</span></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mt-2">
            <button className="flex-1 bg-gray-800 rounded-lg p-2 flex items-center justify-center text-gray-400 hover:text-white">
              <RotateCcw size={16} />
            </button>
            <button className="flex-1 bg-gray-800 rounded-lg p-2 flex items-center justify-center text-gray-400 hover:text-white">
              <RefreshCw size={16} />
            </button>
            <button className="flex-1 bg-gray-800 rounded-lg p-2 flex items-center justify-center text-gray-400 hover:text-white">
              <Maximize size={16} />
            </button>
          </div>

          {/* Warning */}
          <div className="bg-gray-800 rounded-lg p-3 border-l-2 border-yellow-500">
            <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">• Changing Main Layout?</p>
            <p className="text-[10px] text-gray-500 mt-1">
              If you change the main layout all animations will be reset to default transforms.
            </p>
          </div>
        </div>
      )}

      {rightPanelTab === 'measurements' && (
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Size Grading Table</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 border-b border-gray-700">
                  <th className="text-left p-2 font-bold">Size</th>
                  <th className="text-right p-2">Chest</th>
                  <th className="text-right p-2">Length</th>
                  <th className="text-right p-2">Sleeve</th>
                  <th className="text-right p-2">Shoulder</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((m) => (
                  <tr key={m.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                    <td className="p-2 font-bold text-blue-400">{m.size}</td>
                    <td className="p-2 text-right">{m.chest ?? '-'}</td>
                    <td className="p-2 text-right">{m.length ?? '-'}</td>
                    <td className="p-2 text-right">{m.sleeveLength ?? '-'}</td>
                    <td className="p-2 text-right">{m.shoulderWidth ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-500 mt-2">All measurements in cm • Tolerance: ±0.5cm</p>
        </div>
      )}

      {rightPanelTab === 'techpack' && (
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Auto-Generated Tech Pack</h3>

          <div className="space-y-3">
            {[
              { title: 'Flat Sketch', desc: 'Front & back views from 3D model' },
              { title: 'Measurement Tables', desc: 'Size grading for all sizes' },
              { title: 'Material Specifications', desc: 'Fabric, weight, supplier' },
              { title: 'Construction Notes', desc: 'Stitch types, assembly order' },
              { title: 'Bill of Materials', desc: 'Complete materials list' },
            ].map((section) => (
              <div key={section.title} className="bg-gray-800 rounded-lg p-3">
                <p className="text-xs font-bold">{section.title}</p>
                <p className="text-[10px] text-gray-500">{section.desc}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Construction Notes</h3>
            <div className="bg-gray-800 rounded-lg p-3 space-y-1 text-xs text-gray-300">
              <p>• Double stitch on sleeve seams</p>
              <p>• 2x2 rib knit cuffs and hem</p>
              <p>• Coverstitched kangaroo pocket</p>
              <p>• YKK zipper on hood (optional)</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Export</h3>
            <div className="grid grid-cols-3 gap-2">
              {['PDF', 'CSV', '3D File'].map((fmt) => (
                <button
                  key={fmt}
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
