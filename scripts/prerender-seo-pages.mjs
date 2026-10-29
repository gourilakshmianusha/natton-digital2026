import fs from 'node:fs';
import path from 'node:path';

const serviceContent = JSON.parse(fs.readFileSync(path.resolve('assets/services/nattondigital_all_services_content.json'), 'utf8'));
const serviceRoutes = ['services', ...serviceContent.map(service => `services/${service.url?.split('/').filter(Boolean).at(-1) || service.slug || service.id}`)];
const routes = [...serviceRoutes, 'home','compare','free-tools','careers','webinars','guides','case-studies','blog','ai-readiness-assessment','roi-calculator','about','why-natton-digital','our-process','book-demo','resources','integrations','pricing','contact','privacy-policy','terms-of-platform','admin','solutions/ai-growth-marketing','solutions/ai-marketing-saas','solutions/crm-ai-automation','solutions/conversational-ai','solutions/whatsapp-automation','solutions/ai-agents','solutions/ai-calling-agents','solutions/cloud-telephony','solutions/rcs-messaging','products/growth-os','products/growthos','products/ai-marketing-platform','products/business-os','products/businessos','products/agentic-os','products/agenticos','industries/healthcare','industries/education','industries/real-estate','industries/manufacturing','industries/retail','industries/retail-ecommerce','industries/professional-services'];
const dist = path.resolve('dist');
const homeHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
// SITE_URL is the canonical public domain on any host. Netlify supplies URL and
// Vercel supplies VERCEL_URL automatically when SITE_URL is not configured.
const origin = (process.env.SITE_URL || process.env.URL || (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) || 'https://nattondigital.com').replace(/\/$/, '');

for (const route of routes) {
  const image = `${origin}/seo/feature-${route.replaceAll('/', '-')}.png`;
  const html = route === 'solutions/ai-growth-marketing'
    ? `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=/services/ai-growth-marketing"><link rel="canonical" href="${origin}/services/ai-growth-marketing"><title>AI Growth Marketing | Natton Digital</title></head><body><a href="/services/ai-growth-marketing">Explore AI Growth Marketing</a></body></html>`
    : homeHtml.replace(/https?:\/\/[^/]+\/seo\/feature-home\.png/g, image);
  const file = route === 'home' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
