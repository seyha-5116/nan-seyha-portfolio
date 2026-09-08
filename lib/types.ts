export type ProjectStatus = "LIVE" | "IN_DEVELOPMENT";

export interface Step {
  index: string;
  title: string;
  description: string;
}

export interface ProjectSummary {
  slug: string;
  name: string;
  description: string;
  techTags: string[];
  status: ProjectStatus;
  liveUrl: string | null;
  repoUrl: string | null;
  image: string | null;
}

export interface ContactFormState {
  success?: boolean;
  error?: string | null;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  sentAt?: string;
  name?: string;
  message?: string;
}