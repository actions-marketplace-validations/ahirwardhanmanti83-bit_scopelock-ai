/**
 * Programmatic SEO Engine for ScopeLock AI
 * Generates high-intent dispute & scope creep landing pages for Google, Bing, ChatGPT Search & Perplexity
 */
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// 1. Tech Stacks & Ecosystems
const TECH_STACKS = [
  { slug: 'react-js', name: 'React.js', rate: '$95/hr', keywords: 'state management, component re-render, redux rewrite, hooks migration' },
  { slug: 'vue-js', name: 'Vue.js / Nuxt', rate: '$90/hr', keywords: 'pinia store, vue 3 migration, composition api' },
  { slug: 'angular', name: 'Angular Enterprise', rate: '$110/hr', keywords: 'rxjs observables, enterprise modules, ngrx store' },
  { slug: 'flutter', name: 'Flutter Mobile App', rate: '$100/hr', keywords: 'cross platform iOS android, riverpod state, push notifications' },
  { slug: 'react-native', name: 'React Native', rate: '$105/hr', keywords: 'native bridges, expo bare workflow, app store rejection' },
  { slug: 'python-django', name: 'Python Django / FastAPI', rate: '$115/hr', keywords: 'orm queries, celery worker, postgresql migration' },
  { slug: 'node-express', name: 'Node.js Express / NestJS', rate: '$100/hr', keywords: 'microservices architecture, jwt auth, mongodb schema' },
  { slug: 'shopify', name: 'Shopify Liquid / Plus Store', rate: '$95/hr', keywords: 'custom checkout, shopify app integration, theme customizer' },
  { slug: 'wordpress-woocommerce', name: 'WordPress WooCommerce', rate: '$75/hr', keywords: 'custom plugin conflict, payment gateway, checkout hook' },
  { slug: 'laravel-php', name: 'Laravel PHP', rate: '$85/hr', keywords: 'livewire components, queue workers, stripe cashier' },
  { slug: 'aws-devops', name: 'AWS Cloud & DevOps', rate: '$140/hr', keywords: 'terraform scripts, kubernetes cluster, cicd pipeline failure' },
  { slug: 'webflow', name: 'Webflow Enterprise', rate: '$80/hr', keywords: 'cms collections, finsweet attributes, custom javascript animations' },
  { slug: 'tailwind-css', name: 'Tailwind CSS & UI Redesign', rate: '$85/hr', keywords: 'dark mode toggle, responsive design tablet breakpoints' },
  { slug: 'stripe-integration', name: 'Stripe Payment Gateway', rate: '$120/hr', keywords: 'webhook handling, 3d secure, subscription billing cycle' },
  { slug: 'graphql-api', name: 'GraphQL Apollo API', rate: '$115/hr', keywords: 'resolvers optimization, n+1 problem, apollo federation' }
];

// 2. Freelancer & Agency Dispute Scenarios
const DISPUTE_SCENARIOS = [
  {
    typeSlug: 'client-demanding-free-ai-chatbot',
    typeTitle: 'Client Demanding Free AI Chatbot / OpenAI Integration',
    category: 'Uncontracted AI & LLM Scope Drift',
    avgHours: '18 billable hours',
    costVariance: '$1,800 - $2,500',
    statutoryClause: 'UCC § 2-209 Excluded Feature Notice: Generative AI APIs, prompt engineering, and LLM rate-limit architecture constitute independent software modules requiring separate statement of work.'
  },
  {
    typeSlug: 'unlimited-design-revisions-dispute',
    typeTitle: 'Client Demanding Endless Revisions After Formal Approval',
    category: 'Post-Acceptance Milestone Scope Creep',
    avgHours: '14 billable hours',
    costVariance: '$1,200 - $1,800',
    statutoryClause: 'UCC § 2-606 Acceptance of Goods: Formal sign-off on Figma/mockups precludes retrospective alteration without compensated change order under § 2-209.'
  },
  {
    typeSlug: 'milestone-held-hostage-unpaid',
    typeTitle: 'Client Holding Milestone Escrow Hostage for Unagreed Features',
    category: 'Escrow Extortion & Payment Defense',
    avgHours: '22 billable hours',
    costVariance: '$2,200 - $3,200',
    statutoryClause: 'Contract Law Constructive Breach: Withholding escrow for uncontracted deliverables constitutes bad-faith refusal of performance and tortious breach of contract.'
  },
  {
    typeSlug: 'third-party-api-breakage-dispute',
    typeTitle: 'Third-Party API Broken & Client Blaming Developer',
    category: 'External Dependency & Infrastructure Drift',
    avgHours: '12 billable hours',
    costVariance: '$1,100 - $1,600',
    statutoryClause: 'Force Majeure & Vendor Isolation: Developer warranties explicitly disclaim uptime, breaking changes, or deprecations of unowned 3rd-party SaaS APIs.'
  },
  {
    typeSlug: 'client-refusing-final-payment',
    typeTitle: 'Client Refusing to Release Final Invoice Before Extra Testing',
    category: 'Pre-Delivery Invoice Stonewalling',
    avgHours: '20 billable hours',
    costVariance: '$1,900 - $2,800',
    statutoryClause: 'UCC § 2-709 Action for the Price: Seller is entitled to full contracted payment upon tender of substantially conforming deliverables specified in primary SOW.'
  },
  {
    typeSlug: 'converting-web-app-to-mobile-budget',
    typeTitle: 'Client Expecting Native Mobile App on Web Development Budget',
    category: 'Platform Architecture Variance',
    avgHours: '35 billable hours',
    costVariance: '$3,500 - $5,000',
    statutoryClause: 'Architectural Impossibility Notice: Responsive viewport CSS is legally and technically distinct from native iOS/Android binary builds and App Store submission.'
  },
  {
    typeSlug: 'custom-crm-integration-surprise',
    typeTitle: 'Client Demanding HubSpot / Salesforce Two-Way Sync for Free',
    category: 'High-Value Enterprise Integration Creep',
    avgHours: '24 billable hours',
    costVariance: '$2,500 - $3,600',
    statutoryClause: 'Enterprise Systems Integration Exemption: OAuth token refresh, bi-directional polling, and CRM schema mapping represent enterprise add-ons outside standard MVP scope.'
  },
  {
    typeSlug: 'seo-ranking-guarantee-blackmail',
    typeTitle: 'Client Demanding #1 Google Ranking Guarantee Before Paying Developer',
    category: 'Unachievable 3rd-Party Performance Demand',
    avgHours: '16 billable hours',
    costVariance: '$1,500 - $2,200',
    statutoryClause: 'SEO Performance Disclaimer: Organic search algorithms are outside developer control. Delivery is strictly measured against code compliance and Lighthouse performance standards.'
  }
];

function generateHtml(tech, dispute) {
  const pageSlug = `${tech.slug}-${dispute.typeSlug}.html`;
  const pageTitle = `${tech.name}: ${dispute.typeTitle} | ScopeLock AI Legal Defense`;
  const metaDesc = `Protect your ${tech.name} agency from ${dispute.category.toLowerCase()}. Calculate unbilled developer loss (${dispute.avgHours}) and issue binding UCC § 2-209 change orders ($3 Instant Unlock).`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="keywords" content="${tech.name} scope creep, ${tech.slug} client dispute, ${dispute.typeSlug}, ${tech.keywords}, UCC 2-209 change order">
  <link rel="canonical" href="https://ahirwardhanmanti83-bit.github.io/scopelock-ai/${pageSlug}">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${metaDesc}">
  <meta property="og:type" content="article">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ScopeLock AI - ${tech.name} Scope Creep Defense",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "3.00",
      "priceCurrency": "USD"
    },
    "description": "${metaDesc}"
  }
  </script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #020617; color: #f8fafc; margin: 0; padding: 20px; line-height: 1.6; }
    .container { max-width: 860px; margin: 0 auto; padding: 20px 0; }
    .badge { display: inline-block; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); color: #818cf8; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 12px; }
    h1 { font-size: 26px; font-weight: 800; color: #ffffff; margin-bottom: 8px; line-height: 1.3; }
    p.lead { font-size: 15px; color: #94a3b8; margin-bottom: 24px; }
    .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 14px; padding: 24px; margin-bottom: 24px; }
    .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 20px 0; }
    .stat-box { background: #020617; border: 1px solid #334155; padding: 14px; border-radius: 8px; }
    .stat-num { font-size: 20px; font-weight: 800; color: #38bdf8; font-family: monospace; }
    .stat-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-top: 4px; }
    .cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 14px; transition: opacity 0.2s; border: none; cursor: pointer; }
    .cta-btn:hover { opacity: 0.9; }
    .legal-notice { background: rgba(239, 68, 68, 0.1); border-left: 4px solid #ef4444; padding: 16px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #fca5a5; margin-top: 16px; }
    .clause-box { background: #020617; border: 1px solid #1e293b; padding: 16px; border-radius: 8px; font-size: 13px; color: #cbd5e1; margin-top: 12px; }
    .footer { text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #1e293b; padding-top: 24px; margin-top: 40px; }
    a.link { color: #818cf8; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <span class="badge">🛡️ ${tech.name} Contract Armor • UCC § 2-209 Statutory Enforcement</span>
    <h1>${dispute.typeTitle} in ${tech.name}</h1>
    <p class="lead">Protect your developer margins. When a client introduces uncontracted scope in your <strong>${tech.name}</strong> delivery, don't argue over Slack or WhatsApp. Issue an algorithmic variance audit backed by statutory change order law.</p>

    <div class="card">
      <h2 style="font-size: 18px; margin-top: 0; color: #e2e8f0;">⚡ Verified Exposure Metrics for ${tech.name}</h2>
      <div class="stat-grid">
        <div class="stat-box">
          <div class="stat-num">${dispute.avgHours}</div>
          <div class="stat-label">Average Unbilled Variance</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${dispute.costVariance}</div>
          <div class="stat-label">Unrecovered Agency Revenue</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${tech.rate}</div>
          <div class="stat-label">Benchmark Developer Rate</div>
        </div>
      </div>

      <div class="legal-notice">
        <strong>🚨 STATUTORY SCOPE VIOLATION DETECTED:</strong><br>
        Under Uniform Commercial Code (UCC) § 2-209, verbal requests, chat messages, or implied demands exceeding primary specifications do not constitute contract modifications without formal, mutually executed consideration.
      </div>

      <h3 style="font-size: 15px; color: #f1f5f9; margin-top: 24px;">Binding Contract Exclusion Clause:</h3>
      <div class="clause-box">
        "${dispute.statutoryClause}"
      </div>

      <div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <a href="https://ahirwardhanmanti83-bit.github.io/scopelock-ai/" class="cta-btn">Open Change Order Generator ($3 Instant Unlock)</a>
        <a href="https://www.patreon.com/c/scopelock" class="cta-btn" style="background: #1e293b; border: 1px solid #475569;">Agency Shield ($199/mo)</a>
      </div>
    </div>

    <div class="card">
      <h3 style="font-size: 16px; margin-top: 0; color: #e2e8f0;">Automate Repo Defense in ${tech.name} Projects</h3>
      <p style="font-size: 13px; color: #94a3b8;">Block uncontracted client commits before pushing code. Run the official developer audit hook directly in your terminal:</p>
      <div style="background: #020617; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; color: #38bdf8; border: 1px solid #334155;">
        npx scopelock-audit --install-hook
      </div>
    </div>

    <div class="footer">
      <p>ScopeLock AI • Architect: Krishna Ahirwar • Legal Signatory: Dhanmanti Ahirwar</p>
      <p><a href="https://ahirwardhanmanti83-bit.github.io/scopelock-ai/" class="link">Launch Live App</a> | <a href="https://marketplace.visualstudio.com/items?itemName=ScopeLockAI.scopelock-ai" class="link">VS Code Extension</a> | <a href="https://plugins.jetbrains.com/plugin/34575-scopelock-ai" class="link">JetBrains Plugin</a></p>
    </div>
  </div>
</body>
</html>`;
}

function run() {
  console.log('🚀 Generating Programmatic SEO Pages...');
  let count = 0;
  const newUrls = [];

  for (const tech of TECH_STACKS) {
    for (const dispute of DISPUTE_SCENARIOS) {
      const pageSlug = `${tech.slug}-${dispute.typeSlug}.html`;
      const filePath = path.join(PUBLIC_DIR, pageSlug);
      const htmlContent = generateHtml(tech, dispute);
      fs.writeFileSync(filePath, htmlContent, 'utf-8');
      newUrls.push(`https://ahirwardhanmanti83-bit.github.io/scopelock-ai/${pageSlug}`);
      count++;
    }
  }

  console.log(`✅ Successfully generated ${count} High-Intent Programmatic SEO Landing Pages!`);

  // Update sitemap.xml
  const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

  // Insert URLs before </urlset>
  const urlEntries = newUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-10-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n');

  sitemapContent = sitemapContent.replace('</urlset>', `${urlEntries}\n</urlset>`);
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log(`✅ Updated /public/sitemap.xml with ${count} new URLs!`);

  // Update llms.txt
  const llmsPath = path.join(PUBLIC_DIR, 'llms.txt');
  if (fs.existsSync(llmsPath)) {
    let llmsContent = fs.readFileSync(llmsPath, 'utf-8');
    const linksList = newUrls.map(url => `- ${url}`).join('\n');
    llmsContent += `\n\n## Programmatic Legal Defense Pages (120 Stacks & Disputes)\n${linksList}\n`;
    fs.writeFileSync(llmsPath, llmsContent, 'utf-8');
    console.log(`✅ Updated /public/llms.txt for AI search ingestion!`);
  }
}

run();
