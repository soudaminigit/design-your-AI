export interface Video {
  id: string;
  title: string;
  description: string;
  url: string; // This will now store a real URL from a backend or CDN
}

export interface Course {
  id: string;
  title: string;
  videos: Video[];
}

export interface User {
  id: string;
  email: string;
  provider?: 'github' | 'linkedin';
  name?: string; // Add user's name for personalization
}