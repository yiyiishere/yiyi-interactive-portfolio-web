
import { DATA_SOURCES } from '../constants.ts';
import { QASection, KeywordData, EvidenceData } from '../types.ts';

// Add explicit return type to fetchData to ensure data is correctly typed
export const fetchData = async (): Promise<{
  keywords: KeywordData;
  evidence: EvidenceData;
  qaSections: QASection[];
}> => {
  const [qaRes, keywordsRes, evidenceRes] = await Promise.all([
    fetch(DATA_SOURCES.QA_MARKDOWN),
    fetch(DATA_SOURCES.KEYWORDS_JSON),
    fetch(DATA_SOURCES.EVIDENCE_JSON),
  ]);

  if (!qaRes.ok || !keywordsRes.ok || !evidenceRes.ok) {
    throw new Error('Failed to fetch one or more data sources.');
  }

  const qaText = await qaRes.text();
  // Assert JSON responses as the expected types to avoid 'unknown' inference
  const keywords = await keywordsRes.json() as KeywordData;
  const evidence = await evidenceRes.json() as EvidenceData;

  const qaSections = parseMarkdown(qaText);

  return {
    keywords,
    evidence,
    qaSections,
  };
};

const parseMarkdown = (markdown: string): QASection[] => {
  // Split by "## " at the start of lines
  const parts = markdown.split(/^##\s+/m);
  
  // The first part before any "## " heading is usually the main title (#) or empty
  // We skip it and process the rest
  return parts.slice(1).map((section) => {
    const lines = section.split('\n');
    const title = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();
    return { title, body };
  });
};
