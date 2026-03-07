// ─── Core Types for AI Fashion Collaboration Platform ──────────

export type UserRole = 'brand_owner' | 'designer' | 'product_developer' | 'factory' | 'pattern_maker' | 'supplier';

export type ProjectStatus = 'concept' | 'design' | 'pattern' | 'prototype' | 'sample_1' | 'sample_2' | 'production';

export type GarmentType = 'hoodie' | 't_shirt' | 'jacket' | 'pants' | 'shorts' | 'dress' | 'coat' | 'bomber' | 'denim_jacket';

export type GarmentStatus = 'draft' | 'in_review' | 'approved' | 'in_production';

export type AnnotationStatus = 'open' | 'resolved';

export type TechPackStatus = 'draft' | 'review' | 'approved' | 'sent_to_factory';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
}

export interface Project {
  id: string;
  name: string;
  collection?: string;
  season?: string;
  category?: string;
  targetMarket?: string;
  status: ProjectStatus;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  members?: ProjectMember[];
  garments?: Garment[];
}

export interface ProjectMember {
  id: string;
  role: 'owner' | 'editor' | 'viewer' | 'factory';
  userId: string;
  projectId: string;
  user?: User;
}

export interface Garment {
  id: string;
  name: string;
  description?: string;
  garmentType: GarmentType;
  constructionType?: string;
  status: GarmentStatus;
  modelUrl?: string;
  flatSketchUrl?: string;
  colorways?: string[];
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Fabric {
  id: string;
  name: string;
  type: string;
  weight: number; // GSM
  composition: string;
  stretch?: string;
  weaveType?: string;
  color?: string;
  supplierName?: string;
  pricePerYard?: number;
  thumbnailUrl?: string;
}

export interface Trim {
  id: string;
  name: string;
  type: string;
  material?: string;
  color?: string;
  size?: string;
  supplierName?: string;
  pricePerUnit?: number;
  thumbnailUrl?: string;
}

export interface Measurement {
  id: string;
  garmentId: string;
  size: string;
  chest?: number;
  waist?: number;
  hip?: number;
  length?: number;
  sleeveLength?: number;
  shoulderWidth?: number;
  neckOpening?: number;
  hemWidth?: number;
  unit: 'cm' | 'inches';
  tolerance: number;
}

export interface PatternPiece {
  id: string;
  garmentId: string;
  name: string;
  svgPath?: string;
  grainLine?: string;
  seamAllowance: number;
  notes?: string;
}

export interface TechPack {
  id: string;
  garmentId: string;
  version: number;
  status: TechPackStatus;
  constructionNotes?: string;
  stitchType?: string;
  washInstructions?: string;
  labelPlacement?: string;
  packagingNotes?: string;
  billOfMaterials?: BillOfMaterial[];
}

export interface BillOfMaterial {
  id: string;
  techPackId: string;
  itemName: string;
  itemType: string;
  description?: string;
  quantity?: string;
  unit?: string;
  unitCost?: number;
  supplierName?: string;
}

export interface Annotation {
  id: string;
  garmentId: string;
  authorId: string;
  author?: User;
  content: string;
  posX: number;
  posY: number;
  posZ: number;
  status: AnnotationStatus;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  garmentId: string;
  authorId: string;
  author?: User;
  content: string;
  messageType: 'text' | 'image' | 'file' | 'system';
  fileUrl?: string;
  createdAt: string;
}

export interface GarmentVersion {
  id: string;
  garmentId: string;
  authorId: string;
  author?: User;
  versionNum: number;
  changeNote: string;
  snapshotUrl?: string;
  createdAt: string;
}

export interface SampleReview {
  id: string;
  garmentId: string;
  reviewerId: string;
  reviewer?: User;
  sampleNum: number;
  status: 'pending' | 'approved' | 'revision_needed';
  imageUrls?: string[];
  notes?: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  garmentId: string;
  stage: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
}
