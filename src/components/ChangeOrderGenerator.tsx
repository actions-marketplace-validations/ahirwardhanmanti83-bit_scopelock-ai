import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Building2, 
  Crown, 
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ChangeOrderDocument, LicenseState } from '../types';

interface ChangeOrderGeneratorProps {
  initialDocument?: Partial<ChangeOrderDocument>;
  license: LicenseState;
  onOpenPricing: () => void;
}

export const ChangeOrderGenerator: React.FC<ChangeOrderGeneratorProps> = ({
  initialDocument,
  license,
  onOpenPricing
}) => {
  const [doc, setDoc] = useState<ChangeOrderDocument>({
    changeOrderNumber: initialDocument?.changeOrderNumber || 'CO-2026-001',
    date: new Date().toISOString().split('T')[0],
    agencyName: license.agencyName || initialDocument?.agencyName || 'Digital Studio & Engineering Ltd.',
    clientName: initialDocument?.clientName || 'Apex Commerce Corporation',
    projectName: initialDocument?.projectName || 'Customer Cloud Portal & Mobile MVP',
    hourlyRate: initialDocument?.hourlyRate || 125,
    totalHours: initialDocument?.totalHours || 28,
    totalCost: initialDocument?.totalCost || 3500,
    timelineExtensionDays: initialDocument?.timelineExtensionDays || 6,
    items: initialDocument?.items && initialDocument.items.length > 0 ? initialDocument.items : [
      { description: 'Native push notification container for iOS and Android', hours: 14, cost: 1750 },
      { description: 'Automated two-way webhook sync with Salesforce CRM', hours: 10, cost: 1250 },
      { description: 'International multi-currency Stripe checkout tax compliance', hours: 4, cost: 500 }
    ],
    clientSignatoryName: 'Authorized Client Executive',
    agencySignatoryName: 'Lead Agency Partner',
    paymentTerms: '50% upon change order execution, 50% upon milestone completion. Delivery timeline is extended automatically.'
  });

  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdown = () => {
    return `# FORMAL CHANGE ORDER AMENDMENT #${doc.changeOrderNumber}
**Date:** ${doc.date}
**Project:** ${doc.projectName}
**Agency:** ${doc.agencyName}
**Client:** ${doc.clientName}

---

## 1. Summary of Scope Variance
This Change Order authorizes the following unscheduled deliverables outside the original Statement of Work (SOW):

${doc.items.map((item, idx) => `${idx + 1}. **${item.description}** — ${item.hours} hrs ($${item.cost.toLocaleString()} USD)`).join('\n')}

---

## 2. Financial & Timeline Impact
- **Total Additional Hours:** ${doc.totalHours} billable hours (@ $${doc.hourlyRate}/hr)
- **Total Additional Investment:** $${doc.totalCost.toLocaleString()} USD
- **Schedule Tolling & Extension:** +${doc.timelineExtensionDays} business days added to launch milestone

---

## 3. Commercial Terms & Ratification
${doc.paymentTerms}

---
**Approved & Accepted By:**
Agency Representative: ____________________  Date: ____________
Client Representative: ____________________  Date: ____________

*Prepared via ScopeLock Professional Change Order Engine (Not formal legal advice).*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 uppercase">
              B2B Contract Amendment Engine
            </span>
            {license.isPro && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Crown className="w-3 h-3" />
                <span>Custom Agency White-Label Active</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Professional Change Order Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Generate formal, audit-ready change orders that clients sign without friction. Protect your profit margins and lock milestone schedules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text / Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-850">
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
            Your Agency Name {license.isPro ? '(White-Label)' : ''}
          </label>
          <input
            type="text"
            value={doc.agencyName}
            onChange={(e) => setDoc({ ...doc, agencyName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
            Client Company Name
          </label>
          <input
            type="text"
            value={doc.clientName}
            onChange={(e) => setDoc({ ...doc, clientName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
            Project Deliverable Title
          </label>
          <input
            type="text"
            value={doc.projectName}
            onChange={(e) => setDoc({ ...doc, projectName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* The Official Change Order Document Card (Designed for Screen & Print) */}
      <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-300 max-w-4xl mx-auto space-y-8 font-sans print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-slate-900 pb-6 gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-indigo-700 uppercase font-mono">
              FORMAL SOW AMENDMENT
            </span>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 mt-1">
              CHANGE ORDER
            </h1>
            <p className="text-sm text-slate-600 font-medium mt-0.5">
              Ref: <span className="font-mono font-bold text-slate-900">{doc.changeOrderNumber}</span>
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
            <p><strong>Effective Date:</strong> {doc.date}</p>
            <p><strong>Issuing Agency:</strong> {doc.agencyName}</p>
            <p><strong>Client Entity:</strong> {doc.clientName}</p>
          </div>
        </div>

        {/* Scope Variance Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
            1. Uncontracted Deliverables & Engineering Specifications
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono">
                  <th className="py-2 font-bold">#</th>
                  <th className="py-2 font-bold">Scope Description</th>
                  <th className="py-2 font-bold text-right">Est. Dev Hours</th>
                  <th className="py-2 font-bold text-right">Investment (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doc.items.map((item, idx) => (
                  <tr key={idx} className="text-slate-800">
                    <td className="py-2.5 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 font-medium">{item.description}</td>
                    <td className="py-2.5 font-mono text-right">{item.hours} hrs</td>
                    <td className="py-2.5 font-mono font-bold text-right">${item.cost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Variance Totals */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Total Out-of-Scope Hours</span>
            <span className="text-lg font-black font-mono text-slate-900">{doc.totalHours} hrs</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Schedule Timeline Tolling</span>
            <span className="text-lg font-black font-mono text-indigo-700">+{doc.timelineExtensionDays} Business Days</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Total Additional Fee</span>
            <span className="text-xl font-black font-mono text-emerald-700">${doc.totalCost.toLocaleString()} USD</span>
          </div>
        </div>

        {/* Commercial Terms & Ratification */}
        <div className="space-y-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
          <h4 className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
            2. Commercial Authorization Terms
          </h4>
          <p>{doc.paymentTerms}</p>
          <p className="text-[10px] text-slate-500 italic">
            This document represents a commercial contract variation between the participating parties. Work on items listed above commences upon mutual execution.
          </p>
        </div>

        {/* Signatures Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t-2 border-slate-900 pt-8 mt-6">
          <div className="space-y-6">
            <span className="text-xs font-bold text-slate-900 uppercase block">
              For Issuing Agency ({doc.agencyName})
            </span>
            <div className="border-b border-slate-400 h-8" />
            <div className="flex justify-between text-xs text-slate-600">
              <span>Signature & Date</span>
              <span>Name: {doc.agencySignatoryName}</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold text-slate-900 uppercase block">
              For Client ({doc.clientName})
            </span>
            <div className="border-b border-slate-400 h-8" />
            <div className="flex justify-between text-xs text-slate-600">
              <span>Authorized Signature & Date</span>
              <span>Name: {doc.clientSignatoryName}</span>
            </div>
          </div>
        </div>

        {/* Footer Seal */}
        <div className="text-center pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
          Generated via ScopeLock AI • Enterprise SOW Scope Defense System
        </div>
      </div>
    </div>
  );
};
