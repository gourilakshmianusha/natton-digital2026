import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 4173);
const distDirectory = path.join(__dirname, 'dist');
const indexFile = path.join(distDirectory, 'index.html');
const siteOrigin = 'https://nattondigital.com';

const validRoutes = new Set([
  '/',
  '/compare',
  '/free-tools',
  '/careers',
  '/webinars',
  '/guides',
  '/case-studies',
  '/blog',
  '/ai-readiness-assessment',
  '/roi-calculator',
  '/about',
  '/why-natton-digital',
  '/our-process',
  '/book-demo',
  '/resources',
  '/integrations',
  '/pricing',
  '/contact',
  '/privacy-policy',
  '/terms-of-platform',
  '/admin',
  '/admin',
  '/solutions/ai-growth-marketing',
  '/solutions/ai-marketing-saas',
  '/solutions/crm-ai-automation',
  '/solutions/conversational-ai',
  '/solutions/whatsapp-automation',
  '/solutions/ai-agents',
  '/solutions/ai-calling-agents',
  '/solutions/cloud-telephony',
  '/solutions/rcs-messaging',
  '/products/growth-os',
  '/products/growthos',
  '/products/ai-marketing-platform',
  '/products/business-os',
  '/products/businessos',
  '/products/agentic-os',
  '/products/agenticos',
  '/industries/healthcare',
  '/industries/education',
  '/industries/real-estate',
  '/industries/manufacturing',
  '/industries/retail',
  '/industries/retail-ecommerce',
  '/industries/professional-services'
]);

app.use(express.static(distDirectory, { extensions: false }));

app.get('*', (request, response) => {
  const requestPath = request.path.replace(/\/+$/, '') || '/';

  if (validRoutes.has(requestPath)) {
    const routeSlug = requestPath === '/' ? 'home' : requestPath.slice(1).replace(/\//g, '-');
    const imageUrl = `${siteOrigin}/seo/feature-${routeSlug}.png`;
    const html = fs.readFileSync(indexFile, 'utf8')
      .replaceAll(`${siteOrigin}/seo/feature-home.png`, imageUrl);
    return response.status(200).type('html').send(html);
  }

  return response.status(404).sendFile(indexFile);
});

app.listen(port, () => {
  console.log(`Natton Digital server listening on port ${port}`);
});
