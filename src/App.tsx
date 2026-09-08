import React, { lazy, Suspense, useState, useEffect } from 'react';
import { RoutePath } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import SEO from './components/SEO';
import Breadcrumbs from './components/Breadcrumbs';
import { Sparkles, CheckCircle, ShieldCheck, Cpu } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Products = lazy(() => import('./pages/Products'));
const Industries = lazy(() => import('./pages/Industries'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Blog = lazy(() => import('./pages/Blog'));
const Tools = lazy(() => import('./pages/Tools'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const WhyNattonDigital = lazy(() => import('./pages/WhyNattonDigital'));
const OurProcess = lazy(() => import('./pages/OurProcess'));
const BookDemo = lazy(() => import('./pages/BookDemo'));
const ResourcesHub = lazy(() => import('./pages/ResourcesHub'));
const Integrations = lazy(() => import('./pages/Integrations'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Compare = lazy(() => import('./pages/Compare'));
const FreeTools = lazy(() => import('./pages/FreeTools'));
const Careers = lazy(() => import('./pages/Careers'));
const Webinars = lazy(() => import('./pages/Webinars'));
const Guides = lazy(() => import('./pages/Guides'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));

const SEO_METADATA: Record<string, { title: string; description: string; image: string }> = {
  'home': {
    title: 'Natton Digital | Scale Your Business with AI-Powered Operations',
    description: 'Deploy custom-trained AI Agents, automated CRM pipelines, WhatsApp Business bots, and programmatic SEO models for 10x growth with zero manual overhead.',
    image: '/logo-dark.png'
  },
  'solutions/ai-growth-marketing': {
    title: 'AI Growth Marketing Solutions | Natton Digital',
    description: 'Automate organic & paid acquisition. Scale with programmatic SEO, AI-powered copywriting, dynamic graphics, and automatic newsletters.',
    image: '/logo-dark.png'
  },
  'solutions/ai-marketing-saas': {
    title: 'AI Marketing SaaS & Automation Platform | Natton Digital',
    description: 'Supercharge content generation with our AI Content Studio, automated SEO audit tools, and intelligent campaign performance scorer.',
    image: '/logo-dark.png'
  },
  'solutions/crm-ai-automation': {
    title: 'CRM & AI Automation SaaS Solutions | Natton Digital',
    description: 'Leverage our custom GrowthOS CRM to manage lead lifecycles, configure immediate WhatsApp pipelines, and streamline support.',
    image: '/logo-dark.png'
  },
  'solutions/conversational-ai': {
    title: 'Conversational AI Hub & Voice Automation | Natton Digital',
    description: 'Deploy natural low-latency voice bots, intelligent interactive chats, and automated customer triage pipelines.',
    image: '/logo-dark.png'
  },
  'solutions/whatsapp-automation': {
    title: 'WhatsApp Business API Automation & Chatbots | Natton Digital',
    description: 'Configure Meta-approved WhatsApp broadcast triggers, build interactive choice menus, and sync directly with GHL CRM.',
    image: '/logo-dark.png'
  },
  'solutions/ai-calling-agents': {
    title: 'AI Voice & Inbound Calling Agents | Natton Digital',
    description: 'Scale outbound calls and instant inbound qualifications with lifelike low-latency voice AI linked to your CRM data.',
    image: '/logo-dark.png'
  },
  'solutions/cloud-telephony': {
    title: 'Cloud Telephony Platform & Smart IVR | Natton Digital',
    description: 'Modern, reliable cloud telephony. Intelligent routing, multi-level IVR, call recording logs, and CRM pipeline syncing.',
    image: '/logo-dark.png'
  },
  'solutions/rcs-messaging': {
    title: 'RCS Messaging & Rich Interactive SMS | Natton Digital',
    description: 'Deliver interactive SMS containing image carousels, payment links, and call-to-actions directly to mobile screens.',
    image: '/logo-dark.png'
  },
  'solutions/ai-agents': {
    title: 'Autonomous AI Agents & n8n Workflows | Natton Digital',
    description: 'Deploy multi-agent task forces for marketing, CRM reconciliation, customer support, and automatic bookkeeping.',
    image: '/logo-dark.png'
  },
  'products/growth-os': {
    title: 'GrowthOS™ All-In-One Acquisition Suite | Natton Digital',
    description: 'Deploy our proprietary platform for scaling organic traffic, indexing thousands of SEO pages, and automating ads budgets.',
    image: '/logo-dark.png'
  },
  'products/growthos': {
    title: 'GrowthOS™ All-In-One Acquisition Suite | Natton Digital',
    description: 'Deploy our proprietary platform for scaling organic traffic, indexing thousands of SEO pages, and automating ads budgets.',
    image: '/logo-dark.png'
  },
  'products/ai-marketing-platform': {
    title: 'AI Marketing Studio & Campaign Scorer | Natton Digital',
    description: 'Instantly generate highly-converting copies, design visuals dynamically, and grade campaign relevance automatically.',
    image: '/logo-dark.png'
  },
  'products/business-os': {
    title: 'BusinessOS™ Operational Automation | Natton Digital',
    description: 'Integrate legacy CRM pipelines, accounting records, customer databases, and logistics trackers under one system.',
    image: '/logo-dark.png'
  },
  'products/businessos': {
    title: 'BusinessOS™ Operational Automation | Natton Digital',
    description: 'Integrate legacy CRM pipelines, accounting records, customer databases, and logistics trackers under one system.',
    image: '/logo-dark.png'
  },
  'products/agentic-os': {
    title: 'AgenticOS™ Multi-Agent Orchestration | Natton Digital',
    description: 'Build, govern, and monitor concurrent AI agents executing operations with custom-designed permission states.',
    image: '/logo-dark.png'
  },
  'products/agenticos': {
    title: 'AgenticOS™ Multi-Agent Orchestration | Natton Digital',
    description: 'Build, govern, and monitor concurrent AI agents executing operations with custom-designed permission states.',
    image: '/logo-dark.png'
  },
  'industries/healthcare': {
    title: 'HIPAA-Compliant AI Triage & Healthcare | Natton Digital',
    description: 'Deploy secure patient intake loops, automate reminders, and triage inquiries without exposing sensitive medical records.',
    image: '/logo-dark.png'
  },
  'industries/education': {
    title: 'AI Enrollment Counselors & Education | Natton Digital',
    description: 'Nurture applicants with WhatsApp prospectuses, automate course catalogs delivery, and coordinate campus visit bookings.',
    image: '/logo-dark.png'
  },
  'industries/real-estate': {
    title: 'AI Tour Scheduling & Real Estate CRM | Natton Digital',
    description: 'Engage house-hunting leads instantly, prequalify financial requirements, and coordinate booking slots autonomously.',
    image: '/logo-dark.png'
  },
  'industries/manufacturing': {
    title: 'AI Supply Chain Tracking & Manufacturing | Natton Digital',
    description: 'Optimize operations with automatic low-stock triggers, dispatch logs parsing, and predictive ordering pipelines.',
    image: '/logo-dark.png'
  },
  'industries/retail-ecommerce': {
    title: 'Smart Cart Recovery & Retail AI Growth | Natton Digital',
    description: 'Automate coupon distribution, retarget abandoned checkouts on WhatsApp, and triage customer refunds cleanly.',
    image: '/logo-dark.png'
  },
  'industries/retail': {
    title: 'Smart Cart Recovery & Retail AI Growth | Natton Digital',
    description: 'Automate coupon distribution, retarget abandoned checkouts on WhatsApp, and triage customer refunds cleanly.',
    image: '/logo-dark.png'
  },
  'industries/professional-services': {
    title: 'AI Onboarding & Professional Services CRM | Natton Digital',
    description: 'Build instant PDF quotation models, generate client agreements, and sync accounting pipelines with custom webhooks.',
    image: '/logo-dark.png'
  },
  'case-studies': {
    title: 'Verifiable AI & Automation Case Studies | Natton Digital',
    description: 'Read verified ROI case studies showcasing cross-industry operational scaling and massive administrative savings.',
    image: '/logo-dark.png'
  },
  'blog': {
    title: 'AI Operations, CRM & Tech Insights Blog | Natton Digital',
    description: 'Expert articles and tutorials detailing n8n workflows, WhatsApp business setups, conversational AI, and SEO strategies.',
    image: '/logo-dark.png'
  },
  'ai-readiness-assessment': {
    title: 'Free AI Readiness Assessment & Diagnostic | Natton Digital',
    description: 'Take our 6-step operational audit to benchmark your business, discover automation gaps, and get a tailored AI roadmap.',
    image: '/logo-dark.png'
  },
  'roi-calculator': {
    title: 'AI & Automation Cash ROI Calculator | Natton Digital',
    description: 'Calculate your exact monthly and annual dollar/time savings of integrating GrowthOS and n8n pipelines.',
    image: '/logo-dark.png'
  },
  'contact': {
    title: 'Contact Our AI Transformation Engineers | Natton Digital',
    description: 'Connect with Natton Digital developers. Inquire about customized CRM setups, WhatsApp pipelines, or book a strategy session.',
    image: '/logo-dark.png'
  },
  'privacy-policy': {
    title: 'Privacy Policy | Natton Digital',
    description: 'Learn how Natton Digital collects, uses, protects, and manages information across its platform and services.',
    image: '/logo-dark.png'
  },
  'terms-of-platform': {
    title: 'Terms of Platform | Natton Digital',
    description: 'Review the terms that govern access to and use of Natton Digital platform services.',
    image: '/logo-dark.png'
  },
  'admin': {
    title: 'Admin Login | Natton Digital',
    description: 'Private administration portal.',
    image: '/logo-dark.png'
  },
  'integrations': {
    title: 'Enterprise Integrations & Workflow Automation | Natton Digital',
    description: 'Explore supported CRM, communication, AI, payment, ERP, marketing, and database integrations.',
    image: '/logo-dark.png'
  },
  'about': {
    title: 'About Natton Digital | Pioneers of AI-Powered Growth',
    description: 'Learn about our mission to democratize enterprise-grade AI automation, CRM pipelines, and digital scale for MSMEs globally.',
    image: '/logo-dark.png'
  },
  'why-natton-digital': {
    title: 'Why Partner With Natton Digital? | Enterprise AI Engineers',
    description: 'We combine standard SDK engineering, rigorous security standards, and direct CRM integrations with no mock data.',
    image: '/logo-dark.png'
  },
  'our-process': {
    title: 'Our 4-Step AI & CRM Integration Process | Natton Digital',
    description: 'From initial audit to workflow blueprints mapping, custom development, and continuous operational scaling.',
    image: '/logo-dark.png'
  },
  'book-demo': {
    title: 'Schedule a 1-on-1 AI Strategy Call | Natton Digital',
    description: 'Book a personalized demonstration of GrowthOS, n8n automation, and customized GoHighLevel workflows.',
    image: '/logo-dark.png'
  },
  'pricing': {
    title: 'Flexible AI Automation Pricing & Packages | Natton Digital',
    description: 'Clear, transparent packages for AI Marketing, Custom CRM integration, and enterprise-grade AgenticOS.',
    image: '/logo-dark.png'
  },
  'compare': {
    title: 'Natton Digital vs. Traditional Agencies | AI Operations',
    description: 'See how automated n8n pipelines and GrowthOS acquisition software stack up against slow human operational models.',
    image: '/logo-dark.png'
  },
  'free-tools': {
    title: 'Free AI Content Studio, Calculators & SOPs | Natton Digital',
    description: 'Unlock our suite of free tools including the ROI calculator, AI copywriter, SEO audit grader, and compliance checklists.',
    image: '/logo-dark.png'
  },
  'careers': {
    title: 'Careers at Natton Digital | Join the AI Revolution',
    description: 'We are hiring AI Solutions Engineers, Automation Specialists, and Growth Strategists. Join our remote team today.',
    image: '/logo-dark.png'
  },
  'webinars': {
    title: 'Webinars, Workshops & AI Bootcamps | Natton Digital',
    description: 'Register for upcoming live automation workshops, watch replay logs, and download exclusive presentation templates.',
    image: '/logo-dark.png'
  },
  'guides': {
    title: 'Ultimate AI Guides, Playbooks & SOP Library | Natton Digital',
    description: 'Master AI, automation, CRM and growth playbooks. Access our step-by-step blueprints, videos, and SOP checklists.',
    image: '/logo-dark.png'
  },
  'resources': {
    title: 'Free Marketing & AI Strategy Resources | Natton Digital',
    description: 'Browse our full resource library, diagnostic tools, pricing plans, and integration guides.',
    image: '/logo-dark.png'
  },
  
};

const getFeatureImage = (route: string): string => {
  if (route === 'home') return '/seo/feature-home.svg';
  if (route === 'contact' || route === 'book-demo') return '/seo/feature-contact.svg';
  if (route.includes('ai-growth-marketing')) return '/seo/feature-marketing.svg';
  if (route.includes('conversational-ai')) return '/seo/feature-conversation.svg';
  if (route.includes('ai-calling-agents')) return '/seo/feature-voice.svg';
  if (route.startsWith('products/')) return '/seo/feature-products.svg';
  if (route.startsWith('industries/')) return '/seo/feature-industries.svg';
  if (route === 'blog' || route === 'guides' || route === 'resources' || route === 'free-tools' || route === 'webinars' || route === 'ai-readiness-assessment' || route === 'roi-calculator') {
    return '/seo/feature-resources.svg';
  }
  if (route === 'about' || route === 'why-natton-digital' || route === 'our-process' || route === 'careers' || route === 'case-studies' || route === 'privacy-policy' || route === 'terms-of-platform') {
    return '/seo/feature-company.svg';
  }
  return '/seo/feature-automation.svg';
};

const ROUTES_WITH_PAGE_BREADCRUMBS = new Set<string>([
  'solutions/ai-growth-marketing', 'solutions/ai-marketing-saas', 'solutions/crm-ai-automation',
  'solutions/conversational-ai', 'solutions/whatsapp-automation', 'solutions/ai-agents',
  'solutions/ai-calling-agents', 'solutions/cloud-telephony', 'solutions/rcs-messaging',
  'products/growth-os', 'products/growthos', 'products/ai-marketing-platform',
  'products/business-os', 'products/businessos', 'products/agentic-os', 'products/agenticos',
  'industries/healthcare', 'industries/education', 'industries/real-estate',
  'industries/manufacturing', 'industries/retail', 'industries/retail-ecommerce',
  'industries/professional-services', 'case-studies', 'blog', 'ai-readiness-assessment',
  'roi-calculator', 'contact', 'about', 'why-natton-digital', 'our-process', 'book-demo',
  'resources', 'integrations', 'solutions', 'products', 'industries', 'tools'
]);

function getInitialLocation(): { path: RoutePath; notFound: boolean } {
  if (typeof window === 'undefined') return { path: 'home', notFound: false };

  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const hash = window.location.hash;
  if (pathname === 'admin' || hash === '#/admin' || hash.endsWith('/admin')) {
    return { path: 'admin', notFound: false };
  }
  if (!pathname) return { path: 'home', notFound: false };
  if (pathname in SEO_METADATA) return { path: pathname as RoutePath, notFound: false };
  return { path: 'home', notFound: true };
}

export default function App() {
  const initialLocation = getInitialLocation();
  const [path, setPath] = useState<RoutePath>(initialLocation.path);
  const [notFound, setNotFound] = useState(initialLocation.notFound);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = window.localStorage.getItem('natton-theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [activeBlogSEO, setActiveBlogSEO] = useState<{ title: string; description: string; image?: string } | null>(null);

  // Clear active blog SEO when leaving the blog page
  useEffect(() => {
    if (path !== 'blog') {
      setActiveBlogSEO(null);
    }
  }, [path]);

  // Sync dark mode class with document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      window.localStorage.setItem('natton-theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('natton-theme', 'light');
    }
  }, [darkMode]);

  // Sync physical URL typed by the user.
  useEffect(() => {
    const handleLocation = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      const potentialPath = pathname.replace(/^\/+|\/+$/g, '');
      if (potentialPath === 'admin' || hash === '#/admin' || hash.endsWith('/admin')) {
        setNotFound(false);
        setPath('admin');
      } else if (!potentialPath) {
        setNotFound(false);
        setPath('home');
      } else if (potentialPath in SEO_METADATA) {
        setNotFound(false);
        setPath(potentialPath as RoutePath);
      } else {
        setNotFound(true);
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Update browser location history quietly
  useEffect(() => {
    try {
      if (notFound) return;
      const currentUrl = window.location.pathname;
      const targetUrl = path === 'home' ? '/' : `/${path}`;
      if (currentUrl !== targetUrl && currentUrl !== `/index.html`) {
        window.history.pushState({}, '', targetUrl);
      }
    } catch (e) {
      // Gracefully prevent standard iframe origin errors
    }
  }, [path, notFound]);

  // Toast notification state for Google Sheet synchronization
  const [sheetToast, setSheetToast] = useState<{ show: boolean; formName: string; leadName: string; id: string } | null>(null);

  // Capture ALL forms submitted on any page automatically and write to Google Sheets!
  useEffect(() => {
    const handleGlobalFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      
      // Security: Do NOT capture admin login or moderation forms
      const isLoginForm = form.querySelector('input[type="password"]') !== null || 
                          form.id?.includes('login') || 
                          form.className?.includes('login') ||
                          form.getAttribute('action')?.includes('login');
      if (isLoginForm) return;

      // Do NOT capture interactive utility forms (chats, searches, SEO analyzers, or message replies)
      const formIdLower = (form.id || '').toLowerCase();
      const formClassLower = (form.className || '').toLowerCase();
      
      const isInteractiveUtility = 
        form.querySelector('input[type="search"]') !== null ||
        formIdLower.includes('search') ||
        formClassLower.includes('search') ||
        formIdLower.includes('chat') ||
        formClassLower.includes('chat') ||
        formIdLower.includes('reply') ||
        formClassLower.includes('reply') ||
        formIdLower.includes('message') ||
        formClassLower.includes('message') ||
        formIdLower.includes('whatsapp') ||
        formIdLower.includes('grader') ||
        formIdLower.includes('seo') ||
        formIdLower.includes('audit');

      if (isInteractiveUtility) return;

      // Check if any input is standard search or chatbot-like message input
      let hasLeadFields = false;
      let hasExcludedKeywords = false;

      const allInputs = Array.from(form.querySelectorAll('input, select, textarea'));
      for (const el of allInputs) {
        const input = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (input.type === 'submit' || input.type === 'button') continue;

        const placeholder = (('placeholder' in input ? (input as HTMLInputElement).placeholder : '') || '').toLowerCase();
        const nameOrId = ((input.name || '') + ' ' + (input.id || '')).toLowerCase();

        if (
          placeholder.includes('search') ||
          placeholder.includes('type a message') ||
          placeholder.includes('type message') ||
          placeholder.includes('type your message') ||
          placeholder.includes('write a reply') ||
          placeholder.includes('ask a question') ||
          placeholder.includes('ask ai') ||
          placeholder.includes('enter message') ||
          placeholder.includes('send message') ||
          placeholder.includes('whatsapp') ||
          placeholder.includes('chat...') ||
          nameOrId.includes('search') ||
          nameOrId.includes('query') ||
          nameOrId.includes('message_text') ||
          nameOrId.includes('chatmsg')
        ) {
          hasExcludedKeywords = true;
          break;
        }

        const typeLower = (input.type || '').toLowerCase();
        if (
          typeLower === 'email' ||
          typeLower === 'tel' ||
          nameOrId.includes('email') ||
          nameOrId.includes('phone') ||
          nameOrId.includes('tel') ||
          nameOrId.includes('contact') ||
          nameOrId.includes('mobile') ||
          nameOrId.includes('name') ||
          nameOrId.includes('company') ||
          nameOrId.includes('business') ||
          placeholder.includes('email') ||
          placeholder.includes('phone') ||
          placeholder.includes('mobile') ||
          placeholder.includes('contact') ||
          placeholder.includes('name') ||
          placeholder.includes('company') ||
          placeholder.includes('business')
        ) {
          hasLeadFields = true;
        }
      }

      if (hasExcludedKeywords) return;

      // If the form has absolutely zero lead fields and is just a single text/textarea input, ignore it
      const visibleInputs = allInputs.filter(el => {
        const input = el as HTMLInputElement;
        return input.type !== 'submit' && input.type !== 'button' && input.type !== 'hidden';
      });

      if (visibleInputs.length === 1 && !hasLeadFields) {
        return;
      }

      // Determine the form name or source
      let formName = form.getAttribute('data-form-name') || '';
      if (!formName) {
        // Try to locate heading or parent text
        const titleEl = form.querySelector('h2, h3, h4');
        if (titleEl) {
          formName = titleEl.textContent?.trim() || '';
        }
      }
      if (!formName) {
        // Fallback to active page path
        const pageTitle = path.split('/').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        formName = `${pageTitle || 'Home'} Lead Form`;
      }

      // Serialize form fields dynamically based on labels, placeholders or inputs
      const payload: Record<string, any> = {};
      const inputs = form.querySelectorAll('input, select, textarea');
      
      inputs.forEach((el) => {
        const input = el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        if (input.type === 'submit' || input.type === 'button') return;
        
        let fieldName = input.name || input.id;
        
        // 1. Resolve fieldName via label element
        if (!fieldName) {
          const closestLabel = input.closest('label');
          if (closestLabel) {
            fieldName = closestLabel.textContent?.replace(input.value || '', '')?.trim() || '';
          }
        }
        
        if (!fieldName) {
          let current: HTMLElement | null = input;
          for (let i = 0; i < 3; i++) {
            if (!current) break;
            
            let sibling = current.previousElementSibling;
            while (sibling) {
              if (sibling.tagName === 'LABEL') {
                fieldName = sibling.textContent?.trim() || '';
                break;
              }
              const nestedLabel = sibling.querySelector('label');
              if (nestedLabel) {
                fieldName = nestedLabel.textContent?.trim() || '';
                break;
              }
              sibling = sibling.previousElementSibling;
            }
            if (fieldName) break;
            
            const parentLabel = current.parentElement?.querySelector('label');
            if (parentLabel) {
              fieldName = parentLabel.textContent?.trim() || '';
              break;
            }
            
            current = current.parentElement;
          }
        }
        
        if (!fieldName) {
          fieldName = ('placeholder' in input ? (input as HTMLInputElement).placeholder : '') || input.type || 'field';
        }

        // Clean initial fieldName
        fieldName = fieldName.replace(/[:*]/g, '').trim();

        // 2. Apply heuristics to classify standard business CRM fields accurately, overriding placeholder fallbacks
        const placeholderLower = (('placeholder' in input ? (input as HTMLInputElement).placeholder : '') || '').toLowerCase();
        const typeLower = (input.type || '').toLowerCase();
        const idLower = (input.id || '').toLowerCase();
        const nameLower = (input.name || '').toLowerCase();
        const fieldNameLower = fieldName.toLowerCase();

        let inferredType = '';
        if (
          typeLower === 'email' || 
          placeholderLower.includes('email') || 
          placeholderLower.includes('@') || 
          idLower.includes('email') || 
          nameLower.includes('email') ||
          fieldNameLower.includes('email')
        ) {
          inferredType = 'Corporate Email';
        } else if (
          typeLower === 'tel' || 
          placeholderLower.includes('phone') || 
          placeholderLower.includes('mobile') || 
          placeholderLower.includes('contact') || 
          placeholderLower.includes('tel') || 
          idLower.includes('phone') || 
          nameLower.includes('phone') || 
          idLower.includes('tel') || 
          nameLower.includes('tel') ||
          fieldNameLower.includes('phone') ||
          fieldNameLower.includes('tel') ||
          fieldNameLower.includes('mobile') ||
          fieldNameLower.includes('contact')
        ) {
          inferredType = 'Mobile Contact Number';
        } else if (
          placeholderLower.includes('full name') || 
          placeholderLower.includes('your name') || 
          idLower.includes('name') || 
          nameLower.includes('name') ||
          fieldNameLower.includes('name')
        ) {
          inferredType = 'Full Name';
        } else if (
          placeholderLower.includes('company') || 
          placeholderLower.includes('business') || 
          placeholderLower.includes('organization') || 
          placeholderLower.includes('firm') || 
          idLower.includes('company') || 
          nameLower.includes('company') || 
          idLower.includes('business') || 
          nameLower.includes('business') ||
          fieldNameLower.includes('company') ||
          fieldNameLower.includes('business') ||
          fieldNameLower.includes('organization') ||
          fieldNameLower.includes('firm')
        ) {
          inferredType = 'Organization';
        } else if (
          placeholderLower.includes('message') || 
          placeholderLower.includes('requirement') || 
          placeholderLower.includes('enquiry') || 
          placeholderLower.includes('tell us') || 
          idLower.includes('message') || 
          nameLower.includes('message') ||
          fieldNameLower.includes('message') ||
          fieldNameLower.includes('enquiry') ||
          fieldNameLower.includes('requirement')
        ) {
          inferredType = 'Message';
        }

        if (inferredType) {
          fieldName = inferredType;
        }
        
        if (input instanceof HTMLInputElement && (input.type === 'checkbox' || input.type === 'radio')) {
          if (input.type === 'checkbox') {
            payload[fieldName] = input.checked ? 'Yes' : 'No';
          } else if (input.checked) {
            payload[fieldName] = input.value;
          }
        } else {
          payload[fieldName] = input.value;
        }
      });

      // Avoid capturing empty payloads
      if (Object.keys(payload).length > 0) {
        // Register the form submission to localStorage and remote webhook
        import('./utils/googleSheets').then(({ registerFormSubmission }) => {
          registerFormSubmission(formName, payload);
        });
      }
    };

    // Listen to our custom sheet sync events to trigger the beautiful toast
    const handleSyncToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      const sub = customEvent.detail;
      const name = sub.payload['Full Name'] || sub.payload['Contact Name'] || sub.payload['Name'] || 'A User';
      
      setSheetToast({
        show: true,
        formName: sub.formName,
        leadName: String(name),
        id: sub.id
      });

      // Auto dismiss after 6 seconds
      setTimeout(() => {
        setSheetToast(null);
      }, 6000);
    };

    document.addEventListener('submit', handleGlobalFormSubmit);
    window.addEventListener('natton_google_sheet_sync', handleSyncToast);
    
    return () => {
      document.removeEventListener('submit', handleGlobalFormSubmit);
      window.removeEventListener('natton_google_sheet_sync', handleSyncToast);
    };
  }, [path]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [path]);

  const renderContent = () => {
    if (notFound) {
      return <NotFound setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'home') {
      return <Home setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path.startsWith('solutions/')) {
      const sub = path.substring(10) as any;
      return <Solutions subPath={sub} setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path.startsWith('products/')) {
      const sub = path.substring(9);
      return <Products subPath={sub} setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path.startsWith('industries/')) {
      const sub = path.substring(11);
      return <Industries subPath={sub} setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'case-studies') {
      return <CaseStudies setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'blog') {
      return (
        <Blog 
          setPath={setPath} 
          darkMode={darkMode} 
          selectedBlogPostId={selectedBlogPostId} 
          setSelectedBlogPostId={setSelectedBlogPostId} 
          setActiveBlogSEO={setActiveBlogSEO}
        />
      );
    }
    
    if (path === 'ai-readiness-assessment') {
      return <Tools toolType="assessment" setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'roi-calculator') {
      return <Tools toolType="roi-calculator" setPath={setPath} darkMode={darkMode} />;
    }
    
    if (path === 'contact') {
      return <Contact setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'privacy-policy' || path === 'terms-of-platform') {
      return <Legal document={path} setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'about') {
      return <About setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'why-natton-digital') {
      return <WhyNattonDigital setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'our-process') {
      return <OurProcess setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'book-demo') {
      return <BookDemo setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'resources') {
      return <ResourcesHub setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'integrations') {
      return <Integrations setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'pricing') {
      return <Pricing setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'compare') {
      return <Compare setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'free-tools') {
      return <FreeTools setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'careers') {
      return <Careers setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'webinars') {
      return <Webinars setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'guides') {
      return <Guides setPath={setPath} darkMode={darkMode} />;
    }

    if (path === 'admin') {
      return <Admin setPath={setPath} darkMode={darkMode} setSelectedBlogPostId={setSelectedBlogPostId} />;
    }

    return <NotFound setPath={setPath} darkMode={darkMode} />;
  };

  const currentSEO = notFound
    ? {
        title: 'Page Not Found | Natton Digital',
        description: 'The requested Natton Digital page could not be found.',
        image: getFeatureImage('company')
      }
    : path === 'blog' && activeBlogSEO
    ? {
        title: activeBlogSEO.title,
        description: activeBlogSEO.description,
        image: activeBlogSEO.image || getFeatureImage('blog')
      }
    : {
        ...(SEO_METADATA[path] || SEO_METADATA['home']),
        image: getFeatureImage(path)
      };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 font-sans ${
      darkMode ? 'bg-[#110B33] text-white' : 'bg-[#F5F9FA] text-[#110B33]'
    }`}>
      {/* SEO Metadata Injector */}
      <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        image={currentSEO.image}
        noIndex={notFound || path === 'admin'}
        route={notFound ? window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home' : path}
      />

      {/* Header */}
      <Header currentPath={path} setPath={setPath} darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Area */}
      <main className="site-main flex-grow">
        {!notFound && path !== 'home' && !ROUTES_WITH_PAGE_BREADCRUMBS.has(path) && (
          <Breadcrumbs path={path} setPath={setPath} darkMode={darkMode} />
        )}
        {!notFound && path !== 'home' && path !== 'admin' && (
          <section className={`px-4 sm:px-6 lg:px-8 pt-6 ${ROUTES_WITH_PAGE_BREADCRUMBS.has(path) ? 'pb-2' : 'pb-6'}`} aria-label={`${currentSEO.title} featured image`}>
            <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl border border-primary/15 bg-[#071d35] shadow-xl">
              <img
                src={currentSEO.image}
                alt={`${currentSEO.title} featured image`}
                className="w-full aspect-[1200/360] object-cover"
                loading="eager"
              />
            </div>
          </section>
        )}
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-xs font-mono text-gray-500">Loading page...</div>}>
          {renderContent()}
        </Suspense>
      </main>

      {/* Reusable floating tools / widgets */}
      <FloatingCTA setPath={setPath} darkMode={darkMode} />

      {/* Footer */}
      <Footer setPath={setPath} darkMode={darkMode} />

      {/* Live Google Sheets Synchronization toast overlay */}
      {sheetToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#0F0A30] border border-[#00C2FF]/30 p-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-fade-in backdrop-blur-md text-white">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div className="space-y-1 flex-grow text-left">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Sheets Synced Live</span>
              <span className="text-[9px] font-mono text-gray-500">#{sheetToast.id}</span>
            </div>
            <h5 className="text-xs font-bold text-white font-display">New Lead Appended!</h5>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Captured <strong>{sheetToast.leadName}</strong> via <em>"{sheetToast.formName}"</em> and pushed record to Google Sheet.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setSheetToast(null)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-[9px] font-mono border border-white/5 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
