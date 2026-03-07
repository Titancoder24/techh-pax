'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Plus, Clock, Download, MoreHorizontal, Settings, Grid3X3, Box } from 'lucide-react';
import { NewProjectModal } from './NewProjectModal';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return '1d ago';
  return `${days}d ago`;
}

export function VaultDashboard() {
  const { projects, currentUser, setActiveProject } = useStore();
  const [showNewProject, setShowNewProject] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-14 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-4 z-50">
        <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold">
          {currentUser.name.charAt(0)}
        </div>
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mt-4 text-gray-600 cursor-pointer hover:bg-gray-200">
          <Grid3X3 size={16} />
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100">
          <Plus size={16} />
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100">
          <Box size={16} />
        </div>
        <div className="flex-1" />
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100">
          <Settings size={16} />
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
      </div>

      {/* Main Content */}
      <div className="ml-14 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
              Your Vault
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {projects.length} of 50 project slots used
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 border border-gray-200 rounded-full px-4 py-2">
              Local-First Storage
            </span>
            <button
              onClick={() => setShowNewProject(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold tracking-wider uppercase px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              New Project
            </button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Initialize Card */}
          <button
            onClick={() => setShowNewProject(true)}
            className="border-2 border-dashed border-gray-200 rounded-2xl h-[280px] flex flex-col items-center justify-center gap-4 hover:border-gray-400 transition-colors group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-gray-500 transition-colors">
              <Plus size={24} className="text-gray-400 group-hover:text-gray-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-black tracking-wider uppercase text-gray-700">Initialize</p>
              <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">New 3D Workspace</p>
            </div>
          </button>

          {/* Project Cards */}
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group relative"
            >
              {/* Three-dot menu */}
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <MoreHorizontal size={16} />
              </button>

              {/* Preview Area */}
              <div className="h-[160px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <Box size={48} className="text-gray-300" />
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={project.status} />
                  <span className="w-2 h-2 rounded-full bg-gray-800" />
                </div>
                <h3 className="text-sm font-black tracking-tight uppercase text-gray-900">
                  {project.name}
                </h3>
                {project.collection && (
                  <p className="text-xs text-gray-400 mt-0.5">{project.collection}</p>
                )}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {timeAgo(project.updatedAt)}
                  </div>
                  <Download size={14} className="text-gray-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} />}
    </div>
  );
}
