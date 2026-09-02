/**
 * Payload CMS Native Response Types
 * Mirrors the exact JSON envelope and payload structure returned by Payload CMS v3 REST API.
 */

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PayloadMedia {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
  filesize?: number;
}

// Localized fields will be resolved to string by Payload when ?locale=XX is passed

// Relationships for Blog
export interface PayloadAuthor {
  id: string;
  name: string;
  avatar?: PayloadMedia;
}

export interface PayloadCategory {
  id: string;
  name: string;
}

export interface PayloadTag {
  id: string;
  name: string;
}

export interface PayloadTenant {
  id: string;
  name: string;
}

// 1. Team Member Interface (Payload CMS Collection)
export interface TeamMemberDoc {
  id: string;
  photo: PayloadMedia;
  name: string;
  position: string;
  linkedin?: string;
  email?: string;
}

// 2. Blog Post Interface (Payload CMS Collection)
export interface BlogPostDoc {
  id: string;
  
  // Contenido Principal
  title: string;
  excerpt?: string;
  heroImage: PayloadMedia;
  content: any[]; // Bloques Dinámicos (RichText, Images, etc.)
  theme?: 'light' | 'dark';
  
  // Clasificación & Metadatos
  author: PayloadAuthor;
  category: PayloadCategory;
  tags: PayloadTag[];
  tenant?: PayloadTenant;
  
  publishedAt: string;
  readingTimeMinutes?: number;
  featuredPost?: boolean;
  slug: string;
  
  // SEO Avanzado
  meta?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: PayloadMedia;
    twitterImage?: PayloadMedia;
  };
}

// 3. Reel Interface (Payload CMS Collection)
export interface ReelDoc {
  id: string;
  title: string;
  description: string;
  youtubeLink: string;
  coverImage?: PayloadMedia;
}
