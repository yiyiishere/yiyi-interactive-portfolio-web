
export interface EvidenceItem {
  title: string;
  link: string;
  type: string;
  why_it_matters: string;
}

export type EvidenceData = Record<string, EvidenceItem[]>;

export type KeywordData = Record<string, string>;

export interface QASection {
  title: string;
  body: string;
}

export interface AppState {
  keywords: KeywordData | null;
  evidence: EvidenceData | null;
  qaSections: QASection[];
  loading: boolean;
  error: string | null;
}
