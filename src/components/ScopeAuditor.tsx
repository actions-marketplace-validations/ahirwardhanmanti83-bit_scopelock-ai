import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw,
  FileCheck2,
  Calendar
} from 'lucide-react';
import { ScopeAuditResult } from '../types';
import { getApiUrl } from '../utils/api';

interface ScopeAuditorProps {
  onLoadIntoChangeOrder: (audit: ScopeAuditResult, hourlyRate: number) => void;
}

const PRESET_MESSAGES = [
  {
    label: 'Native Mobile App on Web Budget',
    sow: 'Responsive Web Application built in React. Standard web browsers supported. No native iOS or Android deployment.',
    message: 'Hey, we assumed responsive meant it would also be downloadable on Apple App Store and Google Play Store. Can you quickly export the React code into mobile APK and iOS app? We launch on Monday!'
  },
  {
    label: 'Free ChatGPT / AI Integration',
    sow: 'Customer ticket management portal with MySQL database storage and static email notification triggers.',
    message: 'Can we just connect ChatGPT to the user dashboard so it auto-answers customer support tickets? It is just an API key toggle right? Shouldn\'t take more than 30 minutes.'
  },
  {
    label: 'Endless Redesigns After Sign-off',
    sow: 'Figma UI design approved on Sept 15 with 2 scheduled revision rounds completed and accepted.',
    message: 'We had a board meeting and we don\'t like the typography or color palette anymore. Let\'s try 4 completely new creative concepts with dark mode and custom 3D animations.'
  }
];

export const ScopeAuditor: React.FC<ScopeAuditorProps> = ({ onLoadIntoChangeOrder }) => {
  const [sowBaseline, setSowBaseline] = useState(
    '1. Responsive web frontend in React/Next.js\n2. User authentication (Email + Password)\n3. Stripe single card checkout\n4. PostgreSQL database with 5 baseline schema tables'
  );
  const [clientMessage, setClientMessage] = useState(
    'Hey! We also need native mobile push notifications, bi-directional Salesforce CRM synchronization, and automatic multi-currency VAT tax calculations before launch next week.'
  );
  const [hourlyRate, setHourlyRate] = useState<number>(125);
  const [responseTone, setResponseTone] = useState<'collaborative' | 'firm_commercial' | 'scope_hold'>('collaborative');

  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<ScopeAuditResult | null>(null);
  const [copiedReply, setCopiedReply] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunAudit = async () => {
    if (!clientMessage.trim()) {
      setErrorMsg('Please enter the client message or feature request.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(getApiUrl('/api/audit-scope'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sowBaseline,
          clientMessage,
          hourlyRate,
          responseTone,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setAuditResult(json.data);
      } else {
        throw new Error(json.error || 'Audit analysis failed');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not complete audit. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReply = () => {
    if (!auditResult) return;
    navigator.clipboard.writeText(auditResult.diplomaticReply);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Google Gemini AI Forensic Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Scope Creep Forensic Auditor
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              Compare your signed contract baseline against incoming client Slack messages or emails. 
              Automatically quantify unbilled developer hours, dollar leakage, and draft diplomatic replies that protect agency margins.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block w-full md:w-auto">
              Sample Scenarios:
            </span>
            {PRESET_MESSAGES.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSowBaseline(preset.sow);
                  setClientMessage(preset.message);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: SOW & Rate */}
        <div className="lg:col-span-6 space-y-5">
          {/* Baseline SOW */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-indigo-400" />
                <span>Agreed Baseline Statement of Work (SOW)</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Contract Baseline</span>
            </div>
            <textarea
              rows={5}
              value={sowBaseline}
              onChange={(e) => setSowBaseline(e.target.value)}
              placeholder="Paste agreed deliverables, specifications, or accepted milestones..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed font-mono"
            />
            <p className="text-[11px] text-slate-400">
              Tip: List features agreed in your contract or proposal before the client asked for extras.
            </p>
          </div>

          {/* Rate and Tone Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                Agency Hourly Rate ($ USD)
              </label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-bold">$</span>
                <input
                  type="number"
                  min="20"
                  max="1000"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono font-bold"
                />
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <label className="text-[11px] font-bold text-slate-300 uppercase block mb-1">
                Client Communication Tone
              </label>
              <select
                value={responseTone}
                onChange={(e: any) => setResponseTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 mt-1 cursor-pointer font-medium"
              >
                <option value="collaborative">Collaborative & Friendly (Best for Retention)</option>
                <option value="firm_commercial">Firm Commercial (Standard Agency)</option>
                <option value="scope_hold">Scope Hold (Pause work until approved)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Client Message & Trigger */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-400" />
                <span>Incoming Client Message / Scope Request</span>
              </label>
              <span className="text-[10px] text-amber-400 font-mono">Uncontracted Request</span>
            </div>
            <textarea
              rows={5}
              value={clientMessage}
              onChange={(e) => setClientMessage(e.target.value)}
              placeholder="Paste email, WhatsApp, Upwork, or Slack messages where the client asks for modifications..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
            />
            <p className="text-[11px] text-slate-400">
              The AI parses nuances like "quick tweak", "just an API", or unexpected additions.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={handleRunAudit}
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Scanning Contract Boundaries with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Run Real AI Scope Creep Audit ($0 Free)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Results View */}
      {auditResult && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header Verdict */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                    auditResult.overallVerdict === 'severe_scope_creep'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : auditResult.overallVerdict === 'partial_scope_creep'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {auditResult.overallVerdict.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Scope Creep Risk Score: <strong>{auditResult.creepScore}/100</strong>
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1.5">{auditResult.summary}</h2>
            </div>

            <button
              onClick={() => onLoadIntoChangeOrder(auditResult, hourlyRate)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer self-start sm:self-auto hover:scale-105"
            >
              <span>Generate Official Change Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Calculated Margin Bleed</span>
                <p className="text-xl font-black text-rose-400 font-mono">
                  ${auditResult.totalCostUSD.toLocaleString()} USD
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Unbilled Engineering Time</span>
                <p className="text-xl font-black text-amber-400 font-mono">
                  ~{auditResult.totalHours} Dev Hours
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Schedule Delivery Delay</span>
                <p className="text-xl font-black text-indigo-400 font-mono">
                  +{auditResult.timelineDelayDays} Business Days
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown of Detected Tasks */}
          {auditResult.detectedItems && auditResult.detectedItems.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Detected Out-of-Scope Items ({auditResult.detectedItems.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {auditResult.detectedItems.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-100">{item.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.riskExplanation}</p>
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-850/80 font-mono">
                      <span className="text-amber-400">+{item.estimatedHours} Hours</span>
                      <span className="text-rose-400 font-bold">${item.costImpact.toLocaleString()} USD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diplomatic Client Reply Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  AI Diplomatic Client Response (Copy & Paste)
                </span>
              </div>
              <button
                onClick={handleCopyReply}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedReply ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReply ? 'Copied to Clipboard!' : 'Copy Reply'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed selection:bg-indigo-500 selection:text-white">
              {auditResult.diplomaticReply}
            </pre>

            <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/50 text-[11px] text-indigo-300 flex items-center gap-2">
              <span className="font-bold">Agency Strategy Tip:</span>
              <span>{auditResult.agencyActionTip}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
