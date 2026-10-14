export interface ScopeDetectedItem {
  title: string;
  category: 'Architecture' | 'Frontend' | 'Backend/API' | 'Third-Party' | 'Design Revision';
  isOutOfScope: boolean;
  estimatedHours: number;
  costImpact: number;
  riskExplanation: string;
}

export interface ScopeAuditResult {
  overallVerdict: 'in_scope' | 'partial_scope_creep' | 'severe_scope_creep';
  creepScore: number;
  summary: string;
  detectedItems: ScopeDetectedItem[];
  totalHours: number;
  totalCostUSD: number;
  timelineDelayDays: number;
  diplomaticReply: string;
  changeOrderNotice?: string;
  dailyStandupText?: string;
}

export interface LicenseState {
  isPro: boolean;
  isInstantUnlocked: boolean;
  tier: 'free' | 'instant_pass' | 'solo_pro' | 'agency_pro' | 'enterprise';
  tierName: string;
  agencyName?: string;
  agencyLogo?: string;
}

export interface ChangeOrderDocument {
  changeOrderNumber: string;
  date: string;
  agencyName: string;
  clientName: string;
  projectName: string;
  hourlyRate: number;
  totalHours: number;
  totalCost: number;
  timelineExtensionDays: number;
  items: { description: string; hours: number; cost: number }[];
  clientSignatoryName: string;
  agencySignatoryName: string;
  paymentTerms: string;
}
