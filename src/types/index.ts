export interface Paper {
  id: string;
  board: string;
  class: string;
  subject: string;
  year: string;
  type: 'Annual' | 'Supply';
  viewUrl: string;
  slug: string;
  isNew: boolean;
}

export interface FilterState {
  classes: string[];
  subjects: string[];
  types: string[];
  search: string;
}

export interface PaperRequest {
  name: string;
  whatsapp: string;
  class: string;
  subject: string;
  year: string;
  board: string;
  submittedAt: string;
}
