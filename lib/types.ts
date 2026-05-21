export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  provider?: string;
  avatar?: string;
  createdAt: Date;
}

export interface SectionScores {
  summary: number;
  skills: number;
  experience: number;
  education: number;
  formatting: number;
}

export interface Analysis {
  _id?: string;
  userId?: string;
  resumeText: string;
  jobDescription?: string;
  jobTitle?: string;
  atsScore: number;
  sectionScores: SectionScores;
  keywords: { found: string[]; missing: string[] };
  suggestions: string[];
  tone: string;
  bulletStrength: number;
  isPublic: boolean;
  aiMode: "rule-based" | "OpenRouter";
  createdAt: Date;
}

export interface CoverLetter {
  _id?: string;
  userId: string;
  analysisId?: string;
  jobTitle: string;
  company: string;
  content: string;
  createdAt: Date;
}

export interface Blog {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
  };
  summary: string;
  experience: {
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    tech: string;
    url?: string;
  }[];
}

export const EMPTY_RESUME: ResumeData = {
  personalInfo: { name: "", email: "", phone: "", location: "" },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
};
