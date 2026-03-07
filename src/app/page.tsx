'use client';

import { useStore } from '@/store/useStore';
import { VaultDashboard } from '@/components/vault/VaultDashboard';
import { WorkspaceView } from '@/components/workspace/WorkspaceView';

export default function Home() {
  const activeProjectId = useStore((s) => s.activeProjectId);

  // If a project is selected, show the workspace editor
  if (activeProjectId) {
    return <WorkspaceView />;
  }

  // Otherwise show the Vault dashboard
  return <VaultDashboard />;
}
