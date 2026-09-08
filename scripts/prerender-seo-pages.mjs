import fs from 'node:fs';
import path from 'node:path';

const routes = ['compare','free-tools','careers','webinars','guides','case-studies','blog','ai-readiness-assessment','roi-calculator','about','why-natton-digital','our-process','book-demo','resources','integrations','pricing','contact','privacy-policy','terms-of-platform','admin','solutions/ai-growth-marketing','solutions/ai-marketing-saas','solutions/crm-ai-automation','solutions/conversational-ai','solutions/whatsapp-automation','solutions/ai-agents','solutions/ai-calling-agents','solutions/cloud-telephony','solutions/rcs-messaging','products/growth-os','products/growthos','products/ai-marketing-platform','products/business-os','products/businessos','products/agentic-os','products/agenticos','industries/healthcare','industries/education','industries/real-estate','industries/manufacturing','industries/retail','industries/retail-ecommerce','industries/professional-services'];
const dist = path.resolve('dist');
const homeHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const origin = 'https://natton-digital2026-vlvu.vercel.app';

for (const route of routes) {
  const image = `${origin}/seo/feature-${route.replaceAll('/', '-')}.png`;
  const html = homeHtml.replaceAll(`${origin}/seo/feature-home.png`, image);
  const file = path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
