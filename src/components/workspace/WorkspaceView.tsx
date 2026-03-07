'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { TopBar } from '@/components/editor/TopBar';
import { LeftPanel } from '@/components/editor/LeftPanel';
import { RightPanel } from '@/components/editor/RightPanel';
import { DevelopmentTimeline } from '@/components/timeline/DevelopmentTimeline';
import { VersionHistory } from '@/components/timeline/VersionHistory';
import { ChatPanel } from '@/components/collaboration/ChatPanel';
import { AnnotationList } from '@/components/collaboration/AnnotationList';
import { AIDesignPanel } from '@/components/editor/AIDesignPanel';
import { Sparkles, MessageSquare, MapPin, History, Layout } from 'lucide-react';

// Dynamic import for Three.js (client-only)
const GarmentViewer = dynamic(
  () => import('@/components/three/GarmentViewer').then((mod) => mod.GarmentViewer),
  { ssr: false, loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400">
      <div className="text-white text-center">
        <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-bold uppercase tracking-wider">Loading 3D Engine</p>
      </div>
    </div>
  )}
);

type BottomPanel = 'none' | 'chat' | 'annotations' | 'versions' | 'timeline';

export function WorkspaceView() {
  const [showAI, setShowAI] = useState(false);
  const [bottomPanel, setBottomPanel] = useState<BottomPanel>('none');

  const togglePanel = (panel: BottomPanel) => {
    setBottomPanel(bottomPanel === panel ? 'none' : panel);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-500 to-cyan-400">
      <TopBar />

      <div className="flex-1 flex min-h-0">
        {/* Left Panel */}
        <LeftPanel />

        {/* Center – 3D Viewer */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative">
            <GarmentViewer />

            {/* Floating action buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => setShowAI(true)}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
                title="AI Design"
              >
                <Sparkles size={18} />
              </button>
            </div>

            {/* Bottom toolbar */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => togglePanel('chat')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                  bottomPanel === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                }`}
                title="Chat"
              >
                <MessageSquare size={16} />
              </button>
              <button
                onClick={() => togglePanel('annotations')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                  bottomPanel === 'annotations' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                }`}
                title="Annotations"
              >
                <MapPin size={16} />
              </button>
              <button
                onClick={() => togglePanel('versions')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                  bottomPanel === 'versions' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                }`}
                title="Version History"
              >
                <History size={16} />
              </button>
              <button
                onClick={() => togglePanel('timeline')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all ${
                  bottomPanel === 'timeline' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'
                }`}
                title="Timeline"
              >
                <Layout size={16} />
              </button>
            </div>
          </div>

          {/* Bottom Panel */}
          {bottomPanel !== 'none' && (
            <div className="h-[280px] flex-shrink-0">
              {bottomPanel === 'timeline' && <DevelopmentTimeline />}
              {bottomPanel === 'versions' && <VersionHistory />}
            </div>
          )}
        </div>

        {/* Right Side Panel */}
        {bottomPanel === 'chat' ? (
          <div className="w-[340px]">
            <ChatPanel />
          </div>
        ) : bottomPanel === 'annotations' ? (
          <div className="w-[340px]">
            <AnnotationList />
          </div>
        ) : (
          <RightPanel />
        )}
      </div>

      {/* AI Design Modal */}
      {showAI && <AIDesignPanel onClose={() => setShowAI(false)} />}
    </div>
  );
}
