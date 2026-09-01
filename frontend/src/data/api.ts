import { BlogPostDoc, PayloadResponse, ReelDoc, TeamMemberDoc } from './types';

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

/**
 * Helper to fetch data from Payload CMS API
 */
async function fetchFromPayload<T>(endpoint: string, locale: string, revalidate: number = 60): Promise<T> {
  const url = new URL(`${API_URL}/api/${endpoint}`);
  // Enviar el parámetro locale para traer contenido traducido
  // Usamos locale=all para que retorne { en, es } si queremos manejarlo en frontend, 
  // o el string directo si Payload lo resuelve. Payload 3 resuelve directamente
  // el string en el idioma solicitado cuando usamos ?locale=en.
  url.searchParams.append('locale', locale);
  // Optional: fallback locale if translation is missing
  url.searchParams.append('fallback-locale', 'es');

  try {
    const isDev = process.env.NODE_ENV === 'development';
    
    const res = await fetch(url.toString(), {
      ...(isDev ? { cache: 'no-store' } : { next: { revalidate } }),
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(`Error fetching Payload API: ${res.statusText} (${res.status})`);
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error(`[Payload API Error]: No se pudo conectar a ${url.toString()}. ¿El backend está corriendo en ${API_URL}?`, error);
    return {
      docs: [],
      totalDocs: 0,
      limit: 0,
      totalPages: 0,
      page: 1,
      pagingCounter: 0,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    } as unknown as T;
  }
}

// --- HELPERS ---

/**
 * Formats a media URL from Payload to be an absolute URL if needed.
 */
export function getMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
}

/**
 * Converts a standard YouTube URL into an embeddable URL.
 */
export function getYoutubeEmbedUrl(url: string): string {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  
  return url;
}

// --- FETCH FUNCTIONS ---

export async function getBlogPosts(locale: string, limit = 100): Promise<PayloadResponse<BlogPostDoc>> {
  return fetchFromPayload<PayloadResponse<BlogPostDoc>>(`posts?limit=${limit}&sort=-publishedAt`, locale);
}

export async function getBlogPostBySlug(slug: string, locale: string): Promise<BlogPostDoc | null> {
  const data = await fetchFromPayload<PayloadResponse<BlogPostDoc>>(`posts?where[slug][equals]=${slug}&limit=1`, locale);
  if (data.docs && data.docs.length > 0) {
    return data.docs[0];
  }
  return null;
}

export async function getTeamMembers(locale: string): Promise<PayloadResponse<TeamMemberDoc>> {
  return fetchFromPayload<PayloadResponse<TeamMemberDoc>>('team?limit=100', locale);
}

export async function getReels(locale: string): Promise<PayloadResponse<ReelDoc>> {
  return fetchFromPayload<PayloadResponse<ReelDoc>>('reels?limit=100', locale);
}

// --- FORM AND APPLICATION FUNCTIONS ---

export async function getActiveForm(locale: string): Promise<any> {
  const data = await fetchFromPayload<PayloadResponse<any>>('forms?where[isActive][equals]=true&limit=1', locale);
  if (data.docs && data.docs.length > 0) {
    return data.docs[0];
  }
  return null;
}

export async function uploadMedia(file: File): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch(`${API_URL}/api/media`, {
    method: 'POST',
    body: formData,
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const errorMessage = errorData?.errors?.[0]?.message || errorData?.message || 'Error al subir el archivo.';
    throw new Error(errorMessage);
  }
  
  return res.json();
}

export async function submitJobApplication(applicationData: any): Promise<any> {
  const res = await fetch(`${API_URL}/api/job-applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });
  
  if (!res.ok) {
    throw new Error('Failed to submit application');
  }
  
  return res.json();
}
