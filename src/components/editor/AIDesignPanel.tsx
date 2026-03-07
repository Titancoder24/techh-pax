'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Sparkles, Upload, Wand2, Loader2 } from 'lucide-react';

const QUICK_PROMPTS = [
  'Oversized hoodie, drop shoulder, kangaroo pocket, 400gsm cotton',
  'Denim jacket, classic fit, brass buttons, indigo wash',
  'Athletic shorts, mesh panels, elastic waistband, reflective details',
  'Bomber jacket, satin finish, ribbed cuffs, zip front',
];

export function AIDesignPanel({ onClose }: { onClose: () => void }) {
  const { aiPrompt, setAiPrompt, isGenerating, setIsGenerating } = useStore();
  const [activeTab, setActiveTab] = useState<'prompt' | 'upload'>('prompt');

  const handleGenerate = () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">AI Design Studio</h2>
              <p className="text-[10px] text-gray-500">Generate garments from text or upload files</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-sm">Close</button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-4 gap-2">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase ${
              activeTab === 'prompt' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            <Wand2 size={14} />
            AI Prompt
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase ${
              activeTab === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
            }`}
          >
            <Upload size={14} />
            Upload Files
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'prompt' && (
            <div>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe your garment in detail...&#10;&#10;Example: Oversized hoodie, 400gsm cotton fleece, drop shoulder, kangaroo pocket, ribbed cuffs, black colorway"
                className="w-full h-40 bg-gray-800 rounded-xl p-4 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Quick prompts */}
              <div className="mt-4">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Quick Prompts</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setAiPrompt(prompt)}
                      className="bg-gray-800 hover:bg-gray-700 text-gray-400 text-xs px-3 py-1.5 rounded-full transition-colors"
                    >
                      {prompt.split(',')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI generates */}
              <div className="mt-4 bg-gray-800 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">AI Will Generate</p>
                <div className="grid grid-cols-3 gap-3">
                  {['Flat Sketches', '3D Preview', 'Fabric Suggestions'].map((item) => (
                    <div key={item} className="bg-gray-700/50 rounded-lg p-3 text-center">
                      <Sparkles size={16} className="text-purple-400 mx-auto mb-1" />
                      <p className="text-[10px] text-gray-300 font-bold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!aiPrompt.trim() || isGenerating}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm tracking-wider uppercase py-3 rounded-xl flex items-center justify-center gap-2 hover:from-purple-700 hover:to-pink-700 disabled:opacity-40 transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    Generate Garment
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-gray-500 transition-colors cursor-pointer">
                <Upload size={32} className="text-gray-500 mx-auto mb-3" />
                <p className="text-sm text-gray-300 font-bold mb-1">Drop files here or click to upload</p>
                <p className="text-xs text-gray-500">Supports CLO 3D, Browzwear, Illustrator (.ai, .svg, .zprj, .bw)</p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {['CLO 3D', 'Browzwear', 'Illustrator'].map((source) => (
                  <div key={source} className="bg-gray-800 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-700">
                    <p className="text-xs font-bold text-gray-300">{source}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Import</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
