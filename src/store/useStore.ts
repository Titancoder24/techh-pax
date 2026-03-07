import { create } from 'zustand';
import type { Project, Garment, Fabric, Trim, Annotation, ChatMessage, GarmentVersion, Measurement, TimelineEvent } from '@/types';

// ─── Mock Data ─────────────────────────────────────────────────

const MOCK_FABRICS: Fabric[] = [
  { id: 'f1', name: 'Cotton Fleece', type: 'cotton_fleece', weight: 400, composition: '100% Cotton', stretch: 'low', weaveType: 'knit', color: '#1a1a1a', supplierName: 'TextileCo' },
  { id: 'f2', name: 'French Terry', type: 'french_terry', weight: 320, composition: '80% Cotton 20% Polyester', stretch: 'medium', weaveType: 'knit', color: '#f5f5dc', supplierName: 'FabricWorld' },
  { id: 'f3', name: 'Denim 12oz', type: 'denim', weight: 407, composition: '100% Cotton', stretch: 'none', weaveType: 'twill', color: '#1560a8', supplierName: 'DenimMills' },
  { id: 'f4', name: 'Ripstop Nylon', type: 'nylon', weight: 70, composition: '100% Nylon', stretch: 'none', weaveType: 'plain', color: '#2d2d2d', supplierName: 'TechFabrics' },
  { id: 'f5', name: 'Cotton Jersey', type: 'cotton_jersey', weight: 180, composition: '100% Cotton', stretch: 'medium', weaveType: 'knit', color: '#ffffff', supplierName: 'JerseyInc' },
  { id: 'f6', name: 'Polar Fleece', type: 'polar_fleece', weight: 280, composition: '100% Polyester', stretch: 'low', weaveType: 'knit', color: '#3b3b3b', supplierName: 'FleeceHouse' },
];

const MOCK_TRIMS: Trim[] = [
  { id: 't1', name: 'Metal Zipper YKK', type: 'zipper', material: 'Metal', color: '#c0c0c0', size: '60cm' },
  { id: 't2', name: 'Snap Button', type: 'button', material: 'Brass', color: '#b87333', size: '15mm' },
  { id: 't3', name: 'Cotton Drawstring', type: 'drawstring', material: 'Cotton', color: '#1a1a1a', size: '6mm' },
  { id: 't4', name: 'Woven Label', type: 'label', material: 'Polyester', color: '#000000', size: '4x2cm' },
  { id: 't5', name: 'Elastic Band', type: 'elastic', material: 'Rubber/Polyester', color: '#1a1a1a', size: '3cm' },
  { id: 't6', name: 'Metal Rivet', type: 'rivet', material: 'Brass', color: '#b87333', size: '8mm' },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Oversized Hoodie',
    collection: 'Fall 2026',
    season: 'FW26',
    category: 'Streetwear',
    targetMarket: 'Youth',
    status: 'design',
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-03-05T14:30:00Z',
  },
  {
    id: 'p2',
    name: 'Denim Jacket',
    collection: 'Fall 2026',
    season: 'FW26',
    category: 'Outerwear',
    targetMarket: 'Unisex',
    status: 'prototype',
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-03-06T11:00:00Z',
  },
  {
    id: 'p3',
    name: 'Athletic Shorts',
    collection: 'Summer 2026',
    season: 'SS26',
    category: 'Activewear',
    targetMarket: 'Men',
    status: 'sample_1',
    createdAt: '2026-02-01T08:00:00Z',
    updatedAt: '2026-03-04T16:00:00Z',
  },
  {
    id: 'p4',
    name: 'Winter Coat',
    collection: 'Fall 2026',
    season: 'FW26',
    category: 'Outerwear',
    targetMarket: 'Women',
    status: 'production',
    createdAt: '2025-11-10T10:00:00Z',
    updatedAt: '2026-03-07T09:00:00Z',
  },
];

const MOCK_GARMENTS: Garment[] = [
  {
    id: 'g1',
    name: 'Oversized Hoodie – Black',
    description: 'Drop shoulder oversized hoodie with kangaroo pocket',
    garmentType: 'hoodie',
    constructionType: 'cut_and_sew',
    status: 'in_review',
    colorways: ['#1a1a1a', '#f5f5dc', '#8b0000'],
    projectId: 'p1',
    createdAt: '2026-02-15T10:00:00Z',
    updatedAt: '2026-03-05T14:30:00Z',
  },
];

const MOCK_MEASUREMENTS: Measurement[] = [
  { id: 'm1', garmentId: 'g1', size: 'S', chest: 54, length: 70, sleeveLength: 62, shoulderWidth: 52, unit: 'cm', tolerance: 0.5 },
  { id: 'm2', garmentId: 'g1', size: 'M', chest: 57, length: 72, sleeveLength: 64, shoulderWidth: 54, unit: 'cm', tolerance: 0.5 },
  { id: 'm3', garmentId: 'g1', size: 'L', chest: 60, length: 74, sleeveLength: 66, shoulderWidth: 56, unit: 'cm', tolerance: 0.5 },
  { id: 'm4', garmentId: 'g1', size: 'XL', chest: 63, length: 76, sleeveLength: 68, shoulderWidth: 58, unit: 'cm', tolerance: 0.5 },
];

const MOCK_ANNOTATIONS: Annotation[] = [
  { id: 'a1', garmentId: 'g1', authorId: 'u1', content: 'Increase sleeve length by 2cm', posX: 1.2, posY: 0.5, posZ: 0.3, status: 'open', createdAt: '2026-03-05T10:00:00Z' },
  { id: 'a2', garmentId: 'g1', authorId: 'u2', content: 'Move pocket placement upward by 1cm', posX: 0, posY: -0.3, posZ: 0.8, status: 'open', createdAt: '2026-03-05T11:30:00Z' },
  { id: 'a3', garmentId: 'g1', authorId: 'u1', content: 'Change rib material to 2x2 rib', posX: -0.5, posY: -1.2, posZ: 0.1, status: 'resolved', createdAt: '2026-03-04T09:00:00Z' },
];

const MOCK_MESSAGES: ChatMessage[] = [
  { id: 'c1', garmentId: 'g1', authorId: 'u1', content: 'Please increase sleeve width by 1cm', messageType: 'text', createdAt: '2026-03-05T10:00:00Z' },
  { id: 'c2', garmentId: 'g1', authorId: 'u2', content: 'Approved. Updated in version 2.', messageType: 'text', createdAt: '2026-03-05T10:15:00Z' },
  { id: 'c3', garmentId: 'g1', authorId: 'u1', content: 'Looks good. Proceed with sample.', messageType: 'text', createdAt: '2026-03-05T10:30:00Z' },
];

const MOCK_VERSIONS: GarmentVersion[] = [
  { id: 'v1', garmentId: 'g1', authorId: 'u1', versionNum: 1, changeNote: 'Initial concept – oversized hoodie black colorway', createdAt: '2026-02-15T10:00:00Z' },
  { id: 'v2', garmentId: 'g1', authorId: 'u1', versionNum: 2, changeNote: 'Fabric changed to 400 GSM cotton fleece', createdAt: '2026-02-20T14:00:00Z' },
  { id: 'v3', garmentId: 'g1', authorId: 'u2', versionNum: 3, changeNote: 'Sleeve length adjusted +2cm, pocket moved up', createdAt: '2026-03-01T11:00:00Z' },
  { id: 'v4', garmentId: 'g1', authorId: 'u1', versionNum: 4, changeNote: 'Final design approved – ready for tech pack', createdAt: '2026-03-05T14:30:00Z' },
];

const MOCK_TIMELINE: TimelineEvent[] = [
  { id: 'te1', garmentId: 'g1', stage: 'concept', title: 'Concept Approved', status: 'completed', completedAt: '2026-02-16T10:00:00Z', createdAt: '2026-02-15T10:00:00Z' },
  { id: 'te2', garmentId: 'g1', stage: 'design', title: 'Design Finalized', status: 'completed', completedAt: '2026-03-05T14:30:00Z', createdAt: '2026-02-15T10:00:00Z' },
  { id: 'te3', garmentId: 'g1', stage: 'pattern', title: 'Pattern Creation', status: 'in_progress', createdAt: '2026-03-05T15:00:00Z' },
  { id: 'te4', garmentId: 'g1', stage: 'prototype', title: 'Prototype Development', status: 'pending', createdAt: '2026-03-05T15:00:00Z' },
  { id: 'te5', garmentId: 'g1', stage: 'sample_1', title: 'First Sample Review', status: 'pending', createdAt: '2026-03-05T15:00:00Z' },
  { id: 'te6', garmentId: 'g1', stage: 'sample_2', title: 'Final Sample Review', status: 'pending', createdAt: '2026-03-05T15:00:00Z' },
  { id: 'te7', garmentId: 'g1', stage: 'production', title: 'Production Start', status: 'pending', createdAt: '2026-03-05T15:00:00Z' },
];

// ─── Store ─────────────────────────────────────────────────────

interface AppState {
  // Current user
  currentUser: { id: string; name: string; role: string; avatar?: string };

  // Projects (Vault)
  projects: Project[];
  activeProjectId: string | null;
  setActiveProject: (id: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;

  // Garments
  garments: Garment[];
  activeGarmentId: string | null;
  setActiveGarment: (id: string) => void;

  // Assets
  fabrics: Fabric[];
  trims: Trim[];

  // Measurements
  measurements: Measurement[];
  updateMeasurement: (id: string, data: Partial<Measurement>) => void;

  // Annotations
  annotations: Annotation[];
  addAnnotation: (annotation: Omit<Annotation, 'id' | 'createdAt'>) => void;
  resolveAnnotation: (id: string) => void;

  // Chat
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, 'id' | 'createdAt'>) => void;

  // Versions
  versions: GarmentVersion[];

  // Timeline
  timeline: TimelineEvent[];
  updateTimelineStatus: (id: string, status: 'pending' | 'in_progress' | 'completed') => void;

  // Editor state
  selectedFabricId: string | null;
  setSelectedFabric: (id: string | null) => void;
  selectedTrimId: string | null;
  setSelectedTrim: (id: string | null) => void;
  editorTab: 'devices' | 'elements' | 'motion' | 'lens';
  setEditorTab: (tab: 'devices' | 'elements' | 'motion' | 'lens') => void;
  rightPanelTab: 'properties' | 'measurements' | 'techpack';
  setRightPanelTab: (tab: 'properties' | 'measurements' | 'techpack') => void;

  // AI Design
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: { id: 'u1', name: 'Maya Chen', role: 'designer', avatar: undefined },

  projects: MOCK_PROJECTS,
  activeProjectId: null,
  setActiveProject: (id) => set({ activeProjectId: id }),
  addProject: (project) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          ...project,
          id: `p${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  garments: MOCK_GARMENTS,
  activeGarmentId: 'g1',
  setActiveGarment: (id) => set({ activeGarmentId: id }),

  fabrics: MOCK_FABRICS,
  trims: MOCK_TRIMS,

  measurements: MOCK_MEASUREMENTS,
  updateMeasurement: (id, data) =>
    set((state) => ({
      measurements: state.measurements.map((m) => (m.id === id ? { ...m, ...data } : m)),
    })),

  annotations: MOCK_ANNOTATIONS,
  addAnnotation: (annotation) =>
    set((state) => ({
      annotations: [
        ...state.annotations,
        { ...annotation, id: `a${Date.now()}`, createdAt: new Date().toISOString() },
      ],
    })),
  resolveAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a)),
    })),

  messages: MOCK_MESSAGES,
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, { ...msg, id: `c${Date.now()}`, createdAt: new Date().toISOString() }],
    })),

  versions: MOCK_VERSIONS,

  timeline: MOCK_TIMELINE,
  updateTimelineStatus: (id, status) =>
    set((state) => ({
      timeline: state.timeline.map((t) =>
        t.id === id ? { ...t, status, completedAt: status === 'completed' ? new Date().toISOString() : t.completedAt } : t
      ),
    })),

  selectedFabricId: null,
  setSelectedFabric: (id) => set({ selectedFabricId: id }),
  selectedTrimId: null,
  setSelectedTrim: (id) => set({ selectedTrimId: id }),
  editorTab: 'elements',
  setEditorTab: (tab) => set({ editorTab: tab }),
  rightPanelTab: 'properties',
  setRightPanelTab: (tab) => set({ rightPanelTab: tab }),

  aiPrompt: '',
  setAiPrompt: (prompt) => set({ aiPrompt: prompt }),
  isGenerating: false,
  setIsGenerating: (val) => set({ isGenerating: val }),
}));
