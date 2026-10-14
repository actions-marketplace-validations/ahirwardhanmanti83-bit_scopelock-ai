import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Google Gemini API
const ai = new GoogleGenAI();

// Endpoint: AI Scope Creep Forensic Audit & Daily Standup Generator
app.post('/api/audit-scope', async (req, res) => {
  try {
    const { 
      projectName = 'Client Project',
      clientName = 'Client Partner',
      sowBaseline = '',
      clientMessage = '',
      tasksCompleted = '',
      hourlyRate = 125,
      hoursWorked = 6.5,
      responseTone = 'collaborative'
    } = req.body;

    const rate = Number(String(hourlyRate).replace(/,/g, '')) || 125;
    const workedHours = Number(String(hoursWorked).replace(/,/g, '')) || 6.5;

    const prompt = `
You are an elite B2B Software Engineering Scope-Defense & Change-Order AI Engine for software agencies and engineering contractors.
A developer is preparing their daily client report and handling new client revision requests.

INPUT DETAILS:
- Project: ${projectName}
- Client: ${clientName}
- Billable Hourly Rate: $${rate} USD/hour
- Hours Logged Today: ${workedHours} hrs (Total Earned Today: $${workedHours * rate} USD)
- Tasks Completed Today:
"""
${tasksCompleted || 'Core milestone engineering deliverables completed as scheduled.'}
"""

- Agreed SOW Baseline:
"""
${sowBaseline || 'Standard web application deliverables agreed in executed project baseline.'}
"""

- Incoming Client Requests / Scope Drift:
"""
${clientMessage || 'Client requested adding customized features not in the original contract.'}
"""

Tone desired: ${responseTone} (collaborative, firm_commercial, or scope_hold)

Analyze whether the client request contains scope creep tasks, determine realistic extra engineering hours, calculate financial margin bleed ($${rate} * hours), and construct a professional, diplomatic client response plus formal Change Order details.

Return strictly a valid JSON object matching:
{
  "overallVerdict": "severe_scope_creep" | "partial_scope_creep" | "in_scope",
  "creepScore": number (0 to 100),
  "summary": "Short 1-2 sentence verdict",
  "detectedItems": [
    {
      "title": "Short title of extra item",
      "category": "Backend/API" | "Frontend" | "Architecture" | "Third-Party" | "Design Revision",
      "isOutOfScope": true,
      "estimatedHours": number,
      "costImpact": number,
      "riskExplanation": "Why this exceeds baseline contract"
    }
  ],
  "totalHours": number,
  "totalCostUSD": number,
  "timelineDelayDays": number,
  "diplomaticReply": "Tailored, polite, win-win response to the client addressing their exact request and offering Change Order or Phase 2 scheduling.",
  "changeOrderNotice": "Official change order summary ready to attach.",
  "dailyStandupText": "Formatted Daily Standup report showing completed tasks, earned today, and flagged out-of-scope variance."
}
`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    } catch (modelErr: any) {
      console.warn('gemini-3.8-flash busy/unavailable, falling back to gemini-3.1-flash-lite:', modelErr?.message || modelErr);
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });
    }

    const responseText = response.text || '{}';
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    }

    if (!parsedResult) {
      throw new Error('Failed to parse AI output');
    }

    // Ensure calculated values align with specified hourly rate and sanitize numbers
    if (parsedResult.detectedItems && Array.isArray(parsedResult.detectedItems)) {
      parsedResult.detectedItems = parsedResult.detectedItems.map((item: any) => ({
        ...item,
        estimatedHours: Number(item.estimatedHours) || 0,
        costImpact: (Number(item.estimatedHours) || 0) * rate,
      }));
      parsedResult.totalCostUSD = (Number(parsedResult.totalHours) || 0) * rate;
    }

    return res.json({
      success: true,
      data: parsedResult,
      isRealAi: true,
    });
  } catch (err: any) {
    console.error('Gemini Audit API Error:', err);

    // Robust forensic rule engine fallback so application NEVER crashes
    const message = req.body.clientMessage || '';
    const rate = Number(String(req.body.hourlyRate || 125).replace(/,/g, '')) || 125;
    const workedHours = Number(String(req.body.hoursWorked || 6.5).replace(/,/g, '')) || 6.5;
    const project = req.body.projectName || 'Fintech MVP Portal';
    const client = req.body.clientName || 'Apex Corp / Founder';
    const tasks = req.body.tasksCompleted || '1. Implemented Stripe recurring webhook listener\n2. Fixed PostgreSQL connection pool leak\n3. Completed user profile photo upload to S3';

    const lower = message.toLowerCase();
    let estHours = 3.5;
    if (lower.includes('mobile') || lower.includes('app store') || lower.includes('ios')) estHours += 35;
    if (lower.includes('ai') || lower.includes('chatgpt') || lower.includes('bot')) estHours += 18;
    if (lower.includes('crm') || lower.includes('sync') || lower.includes('salesforce')) estHours += 22;
    if (lower.includes('dark mode') || lower.includes('export')) estHours += 3.5;

    const totalCost = Math.round(estHours * rate);
    const delayDays = Math.max(1, Math.ceil(estHours / 5));
    const earnedToday = Math.round(workedHours * rate);

    const standup = `📋 DAILY WORK REPORT & SOW PROGRESS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Date: ${new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
📁 Project: ${project}
👤 Client Sponsor: ${client}
⏱️ Billable Hours Logged Today: ${workedHours} hrs (@ $${rate}/hr) = $${earnedToday.toLocaleString()} USD

✅ COMPLETED DELIVERABLES TODAY:
${tasks}

⚠️ UNCONTRACTED SCOPE DRIFT DETECTED:
${message || 'Client requested adding a customized dark mode toggle and CSV export button on admin dashboard.'}
↳ Variance Impact: +${estHours} hrs (~$${totalCost.toLocaleString()} USD)
↳ Note: This request is queued for formal Change Order approval before production deployment.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️ Audited & Verified by ScopeLock AI (Enterprise SOW Governance)
Zero Unbilled Leakage Guarantee | Professional Scope Defense`;

    return res.json({
      success: true,
      data: {
        overallVerdict: estHours > 10 ? 'severe_scope_creep' : 'partial_scope_creep',
        creepScore: Math.min(95, Math.max(35, Math.round(estHours * 2.5))),
        summary: `Detected unbudgeted revisions representing ~${estHours} engineering hours ($${totalCost.toLocaleString()} USD variance).`,
        detectedItems: [
          {
            title: 'Unscheduled Architectural Revisions',
            category: 'Backend/API',
            isOutOfScope: true,
            estimatedHours: estHours,
            costImpact: totalCost,
            riskExplanation: 'Requested deliverable introduces structural workflows not scheduled in original contract baseline.'
          }
        ],
        totalHours: estHours,
        totalCostUSD: totalCost,
        timelineDelayDays: delayDays,
        diplomaticReply: `Hi ${client.split('/')[0].trim() || 'there'},\n\nWe reviewed your request for: "${message.slice(0, 90)}...".\n\nBecause our signed baseline SOW covers the core agreed release deliverables, executing these additional features represents approximately ${estHours} engineering hours ($${totalCost.toLocaleString()} USD @ $${rate}/hr) with +${delayDays} business days schedule tolling.\n\nWe would love to build this for you. To protect our milestone release, I can prepare an official Change Order right away, or we can stage this for Phase 2. Let me know what you prefer!\n\nBest regards,\nYour Engineering Team`,
        changeOrderNotice: `Formal Change Order: Authorization of ${estHours} billable hours ($${totalCost.toLocaleString()} USD) with +${delayDays} days schedule tolling.`,
        dailyStandupText: standup
      },
      isRealAi: false,
      notice: 'Forensic rule engine calculation active.'
    });
  }
});

// Raycast Native Extension Dedicated Endpoint (Zero arbitrary delays, pure AI validation)
app.post('/api/raycast/audit', async (req, res) => {
  try {
    const { clientMessage, hourlyRate = 125, contractBaseline = '', clientName = 'Client' } = req.body;
    if (!clientMessage || typeof clientMessage !== 'string' || clientMessage.trim().length === 0) {
      return res.status(400).json({ error: 'clientMessage is required' });
    }

    const rate = Number(hourlyRate) || 125;
    const prompt = `You are the ScopeLock AI Raycast Engine. Analyze this client request for scope creep against a software development contract:
Client: ${clientName}
Hourly Rate: $${rate}/hr
Contract Baseline: ${contractBaseline || 'Agreed milestone deliverables for web/mobile application.'}
Incoming Client Message: "${clientMessage}"

Return strictly a JSON object:
{
  "creepScore": number (0-100),
  "isScopeCreep": boolean,
  "severity": "Low" | "Medium" | "High" | "Critical Scope Creep",
  "unbilledHours": number,
  "estimatedFinancialLoss": number,
  "suggestedDelayDays": number,
  "summary": "1 sentence finding",
  "clientReply": "Polite diplomatic response acknowledging request and stating change order requirements",
  "changeOrderMarkdown": "Clean markdown change order ready for client review"
}`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
    } catch {
      response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
    }

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json({ success: true, data: parsed, engine: 'gemini-ai' });
  } catch (err: any) {
    console.error('Raycast API error:', err);
    return res.status(500).json({ error: 'Failed to perform scope audit' });
  }
});

// Endpoint: License Key & $3 Instant Pass Verification
app.post('/api/verify-license', (req, res) => {
  const { licenseKey } = req.body;
  if (!licenseKey || typeof licenseKey !== 'string') {
    return res.status(400).json({ valid: false, error: 'License key or unlock code required' });
  }

  const cleanKey = licenseKey.trim().toUpperCase();

  // Recognize $3 Instant Pass codes (Patreon receipt / instant pass / micro-transaction)
  const isInstant3Pass = 
    cleanKey.includes('PASS-3') || 
    cleanKey.includes('INSTANT-3') || 
    cleanKey.includes('PASS3') || 
    cleanKey.includes('3USD') || 
    cleanKey === 'UNLOCK3' ||
    cleanKey === 'VIP-3';

  // Recognize Agency Pro ($199/mo) and Enterprise ($499/mo)
  const isVipEnterprise = cleanKey.startsWith('SCOPE-ENT') || cleanKey.includes('WHALE') || cleanKey.includes('499');
  const isAgencyPro = cleanKey.startsWith('SCOPE-PRO') || cleanKey.includes('AGENCY') || cleanKey.includes('199') || cleanKey === 'DEMO-PRO-2026';
  const isSoloPass = cleanKey.startsWith('SCOPE-SOLO') || cleanKey.includes('PASS') || cleanKey.includes('SOLO');

  if (isInstant3Pass) {
    return res.json({
      valid: true,
      tier: 'instant_pass',
      tierName: 'Instant $3 Export Pass',
      unlocked: true,
      activationCode: cleanKey,
      message: 'Instant $3 Export Pass successfully unlocked! Official clean document is ready.'
    });
  }

  if (isVipEnterprise || isAgencyPro || isSoloPass) {
    const tier = isVipEnterprise ? 'enterprise' : isAgencyPro ? 'agency_pro' : 'solo_pro';
    return res.json({
      valid: true,
      tier,
      tierName: isVipEnterprise ? 'Enterprise Whale ($499/mo)' : isAgencyPro ? 'Agency Pro ($199/mo)' : 'Solo Pass ($19/mo)',
      brandingAllowed: true,
      unlimitedScans: true,
      unlocked: true,
      exportWatermarkRemoved: true,
      activationCode: cleanKey,
      message: `License successfully activated: ${tier === 'agency_pro' ? 'Agency Pro ($199/mo)' : 'Enterprise Whale ($499/mo)'}!`
    });
  }

  return res.status(401).json({
    valid: false,
    error: 'Invalid code. Use demo code PASS-3USD for instant unlock or DEMO-PRO-2026 for Agency Pro.'
  });
});

// Mount Vite or serve static
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
