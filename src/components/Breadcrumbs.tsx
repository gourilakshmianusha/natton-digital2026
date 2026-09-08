import { ChevronRight, Home } from 'lucide-react';
import { RoutePath } from '../types';

const SITE_ORIGIN = 'https://nattondigital.com';

const labelOverrides: Record<string, string> = {
  'ai-growth-marketing': 'AI Growth Marketing',
  'ai-marketing-saas': 'AI Marketing SaaS',
  'crm-ai-automation': 'CRM & AI Automation',
  'conversational-ai': 'Conversational AI',
  'whatsapp-automation': 'WhatsApp Automation',
  'ai-calling-agents': 'AI Calling Agents',
  'cloud-telephony': 'Cloud Telephony',
  'rcs-messaging': 'RCS Messaging',
  'growth-os': 'GrowthOS',
  'ai-marketing-platform': 'AI Marketing Platform',
  'business-os': 'BusinessOS',
  'agentic-os': 'AgenticOS',
  'real-estate': 'Real Estate',
  'retail-ecommerce': 'Retail & E-commerce',
  'professional-services': 'Professional Services',
  'ai-readiness-assessment': 'AI Readiness Assessment',
  'roi-calculator': 'ROI Calculator',
  'free-tools': 'Free Tools',
  'case-studies': 'Case Studies',
  'why-natton-digital': 'Why Natton Digital',
  'our-process': 'Our Process',
  'book-demo': 'Book a Demo',
  'privacy-policy': 'Privacy Policy',
  'terms-of-platform': 'Terms of Platform'
};

function labelFor(value: string): string {
  return labelOverrides[value] || value
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getItems(path: RoutePath) {
  if (path === 'home') return [];

  const segments = path.split('/');
  const items = [{ label: 'Home', path: 'home' as RoutePath }];
  if (segments.length > 1) {
    items.push({ label: labelFor(segments[0]), path: undefined as never });
  }
  items.push({ label: labelFor(segments[segments.length - 1]), path });
  return items;
}

interface BreadcrumbsProps {
  path: RoutePath;
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Breadcrumbs({ path, setPath, darkMode }: BreadcrumbsProps) {
  const items = getItems(path);
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className={`border-b ${darkMode ? 'border-white/[0.06] bg-[#110B33] text-gray-400' : 'border-gray-200 bg-[#F5F9FA] text-gray-500'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider overflow-x-auto">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <span key={`${item.path}-${index}`} className="flex items-center gap-1.5 shrink-0">
              {index > 0 && <ChevronRight className="h-3 w-3 opacity-50" aria-hidden="true" />}
              {isCurrent || !item.path ? (
                <span aria-current="page" className={darkMode ? 'text-primary' : 'text-[#087f8c]'}>{item.label}</span>
              ) : (
                <button type="button" onClick={() => setPath(item.path)} className="inline-flex items-center gap-1 hover:text-primary transition-colors">
                  {index === 0 && <Home className="h-3 w-3" aria-hidden="true" />}
                  {item.label}
                </button>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}

export function breadcrumbSchema(path: string) {
  const segments = path.split('/');
  const items = [{ label: 'Home', path: '/' }];
  if (path !== 'home') {
    items.push({ label: labelFor(segments[segments.length - 1]), path: `/${path}` });
  }

  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${SITE_ORIGIN}${item.path === '/' ? '/' : item.path}`
  }));
}
