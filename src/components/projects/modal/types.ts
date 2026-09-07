export interface ProjectSlide {
  type: 'image' | 'video' | 'mixed';
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  features?: string[];
}

export interface ModalProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  slides?: ProjectSlide[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ModalContent {
  close: string;
  viewLive: string;
  viewCode: string;
  features: string;
  technologies: string;
  next: string;
  previous: string;
}
