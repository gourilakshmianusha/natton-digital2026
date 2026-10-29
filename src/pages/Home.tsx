import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Zap, 
  Cpu, 
  Clock, 
  ArrowUpRight, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  Database,
  Target,
  BarChart,
  Code,
  X,
  Sparkles,
  Workflow,
  BarChart3,
  MessageSquareText,
  ShieldCheck
} from 'lucide-react';
import { RoutePath } from '../types';
import { registerFormSubmission } from '../utils/googleSheets';
import HeroSection from '../components/HeroSection';
import SocialCarousel from '../components/SocialCarousel';
import { agencyServices, getServiceSlug } from '../data/services';
import { products, solutions } from '../data/navigation';

type CatalogCategoryId = 'marketing' | 'automation' | 'products' | 'agents';

interface CatalogItem {
  name: string;
  description: string;
  path: RoutePath;
  icon: string;
}

const catalogCategories: { id: CatalogCategoryId; title: string; subtitle: string; icon: string }[] = [
  { id: 'marketing', title: 'Digital Marketing Services', subtitle: 'Visibility, campaigns and leads', icon: 'campaign' },
  { id: 'automation', title: 'Automation Solutions', subtitle: 'Connected tools and workflows', icon: 'settings_suggest' },
  { id: 'products', title: 'Product Bundles', subtitle: 'Packaged tools and support', icon: 'inventory_2' },
  { id: 'agents', title: 'AI Agents', subtitle: 'Task-specific AI assistants', icon: 'smart_toy' },
];

const serviceIconById: Record<string, string> = {
  'website-development': 'language',
  'seo-services': 'search',
  'google-business-profile': 'storefront',
  'ppc-google-ads': 'ads_click',
  'social-media-marketing': 'share',
  'meta-ads': 'campaign',
  'content-marketing-blogging': 'edit_note',
  'aeo-ai-search': 'travel_explore',
  'graphic-design-branding': 'design_services',
  'email-marketing': 'mail',
  'ecommerce-development': 'shopping_bag',
  'analytics-cro': 'query_stats',
  'ai-growth-marketing': 'trending_up',
};

const solutionIconByPath: Record<string, string> = {
  'solutions/ai-marketing-saas': 'auto_awesome',
  'solutions/crm-ai-automation': 'hub',
  'solutions/conversational-ai': 'forum',
  'solutions/whatsapp-automation': 'chat',
  'solutions/ai-calling-agents': 'support_agent',
  'solutions/cloud-telephony': 'call',
  'solutions/rcs-messaging': 'sms',
  'solutions/ai-agents': 'smart_toy',
};

const productIconByPath: Record<string, string> = {
  'products/growth-os': 'trending_up',
  'products/ai-marketing-platform': 'campaign',
  'products/business-os': 'business_center',
  'products/agentic-os': 'smart_toy',
};

const marketingCatalog: CatalogItem[] = agencyServices.map((service) => ({
  name: service.name,
  description: service.short,
  path: `services/${getServiceSlug(service)}` as RoutePath,
  icon: serviceIconById[service.id] ?? 'auto_awesome',
}));

const automationCatalog: CatalogItem[] = solutions.map((solution) => ({
  name: solution.name,
  description: solution.desc,
  path: solution.path,
  icon: solutionIconByPath[solution.path] ?? 'settings_suggest',
}));

const productCatalog: CatalogItem[] = products.map((product) => ({
  name: product.name,
  description: product.desc,
  path: product.path,
  icon: productIconByPath[product.path] ?? 'deployed_code',
}));

const agentCatalog: CatalogItem[] = solutions
  .filter((solution) => [
    'solutions/ai-agents',
    'solutions/ai-calling-agents',
    'solutions/conversational-ai',
    'solutions/whatsapp-automation',
  ].includes(solution.path))
  .map((solution) => ({
    name: solution.name,
    description: solution.desc,
    path: solution.path,
    icon: solutionIconByPath[solution.path] ?? 'smart_toy',
  }));

const industryShowcases: {
  name: string;
  description: string;
  path: RoutePath;
  image: string;
}[] = [
  {
    name: 'Healthcare',
    description: 'Local visibility, patient enquiries and appointment follow-ups.',
    path: 'industries/healthcare',
    image: '/industries/healthcare.webp',
  },
  {
    name: 'Education & EdTech',
    description: 'Course enquiries, admissions and student follow-ups.',
    path: 'industries/education',
    image: '/industries/education.webp',
  },
  {
    name: 'Real Estate',
    description: 'Property enquiries, lead follow-ups and site visits.',
    path: 'industries/real-estate',
    image: '/industries/real-estate.webp',
  },
  {
    name: 'Manufacturing',
    description: 'B2B enquiries, quotations and connected operations.',
    path: 'industries/manufacturing',
    image: '/industries/manufacturing.webp',
  },
  {
    name: 'Retail & E-commerce',
    description: 'Product discovery, online sales and customer support.',
    path: 'industries/retail-ecommerce',
    image: '/industries/retail-ecommerce.webp',
  },
  {
    name: 'Professional Services',
    description: 'Local visibility, client enquiries and onboarding.',
    path: 'industries/professional-services',
    image: '/industries/professional-services.webp',
  },
];

const catalogItems: Record<CatalogCategoryId, CatalogItem[]> = {
  marketing: marketingCatalog,
  automation: automationCatalog,
  products: productCatalog,
  agents: agentCatalog,
};

interface HomeProps {
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Home({ setPath, darkMode }: HomeProps) {
  const [activeFlywheelStep, setActiveFlywheelStep] = useState<number>(0);
  const clienteleWaveRef = useRef<HTMLCanvasElement>(null);
  const [activeCatalogCategory, setActiveCatalogCategory] = useState<CatalogCategoryId | null>(null);
  const [catalogPage, setCatalogPage] = useState(0);
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<CatalogItem | null>(null);

  useEffect(() => {
    if (!selectedCatalogItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCatalogItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCatalogItem]);

  useEffect(() => {
    const canvas = clienteleWaveRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const image = new Image();
    let cancelled = false;
    let animationFrameId = 0;
    let elapsed = 0;
    let previousTime: number | undefined;
    let width = 0;
    let height = 0;
    const duration = 12000;
    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    image.onload = () => {
      if (cancelled) return;

      const clean = document.createElement('canvas');
      clean.width = image.width;
      clean.height = image.height;
      const brush = clean.getContext('2d');
      if (!brush) return;

      brush.drawImage(image, 0, 0);
      const sourceScaleX = image.width / 1024;
      const sourceScaleY = image.height / 572;
      for (let radius = 30; radius >= 0; radius--) {
        brush.globalAlpha = radius > 20 ? (30 - radius) / 10 : 1;
        brush.fillStyle = '#000b1d';
        brush.beginPath();
        brush.ellipse(935 * sourceScaleX, 483 * sourceScaleY, radius * sourceScaleX, radius * sourceScaleY, 0, 0, Math.PI * 2);
        brush.fill();
      }
      brush.globalAlpha = 1;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        context.drawImage(clean, 0, 0, width, height);
        return;
      }

      const render = (now: number) => {
        if (cancelled) return;
        if (previousTime !== undefined) elapsed += Math.min(now - previousTime, 50);
        previousTime = now;
        elapsed = Math.min(elapsed, duration);
        const progress = elapsed / duration;
        const time = 12 * (progress - Math.sin(2 * Math.PI * progress) / (2 * Math.PI));

        context.fillStyle = '#000918';
        context.fillRect(0, 0, width, height);
        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(Math.sin(time * 0.39) * 0.008);
        const zoom = 1.055 + 0.012 * Math.sin(time * 0.55);
        context.scale(zoom, zoom);
        context.translate(-width / 2, -height / 2);
        const sourceScaleY = image.height / height;

        for (let y = 0; y < height; y += 2) {
          const depth = Math.sin((y / height) * Math.PI);
          const dy = 5 * Math.sin(time * 0.8 + y * 0.018) * depth;
          const dx = 9 * Math.sin(time * 0.6 + y * 0.014) * depth;
          const sourceY = (y / height) * image.height;
          const sourceHeight = Math.min(3, height - y) * sourceScaleY;
          context.drawImage(clean, 0, sourceY, image.width, sourceHeight, dx, y + dy, width, 3.8);
        }

        context.restore();
        if (elapsed < duration) animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    };

    image.src = `${import.meta.env.BASE_URL}wave.jpg`;

    return () => {
      cancelled = true;
      image.onload = null;
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Consultation Form State
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    industry: 'Healthcare',
    monthlyRevenue: '< $10k USD',
    requirement: 'AI Automation Consulting'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const flywheelSteps = [
    { name: 'Traffic Generation', icon: <Target className="h-5 w-5" />, desc: 'AI Growth SEO & hyper-optimized programmatic ad campaigns attract high-intent traffic.', metric: '3.2x Traffic Boost' },
    { name: 'Leads Triage', icon: <Users className="h-5 w-5" />, desc: 'Webhook interceptors map leads instantly into our GoHighLevel CRM nodes.', metric: '100% Capture Rate' },
    { name: 'CRM Enrichment', icon: <Database className="h-5 w-5" />, desc: 'Our AI engine profiles company metadata, scoring sales readiness automatically.', metric: 'Instant Lead Scoring' },
    { name: 'Workflow Automation', icon: <Zap className="h-5 w-5" />, desc: 'Complex n8n loops orchestrate WhatsApp templates, text triggers, and calendars.', metric: '92% Hours Saved' },
    { name: 'AI Voice Agents', icon: <Cpu className="h-5 w-5" />, desc: 'Intelligent calling bots qualify leads autonomously, booking site visits.', metric: '24/7 Live Dialing' },
    { name: 'Revenue Multiplier', icon: <TrendingUp className="h-5 w-5" />, desc: 'Streamlined operational handoffs double close rates for Indian & global brands.', metric: '42% Average Revenue Jump' },
  ];

  const clientLogos = [
    { name: 'Dr. Vaggar Hospital', image: '/client-logos/drv-aggar-hospital.webp', href: 'https://drvaggarhospital.com/' },
    { name: 'Aarya Investwell', image: '/client-logos/aarya-investwell.webp', href: 'https://aaryainvestwell.com/' },
    { name: 'Saral Sai Astrologer', image: '/client-logos/saral-sai-astrologer.webp', href: 'https://saralsaiastrologer.com/' },
    { name: 'Niddore', image: '/client-logos/niddore.webp', href: 'https://www.niddore.in/' },
    { name: 'Arogyadhama Hospital', image: '/client-logos/arogyadhama-hospital.webp', href: 'https://arogyadhamahospital.com/' },
    { name: 'Vardhhan Hotel', image: '/client-logos/vardhhan-hotel.webp', href: 'https://vardhhanhotel.com/home' },
    { name: 'Paritranayana IAS Academy', image: '/client-logos/paritranayana-academy.webp' },
    { name: 'Akshar Vidyavihar', image: '/client-logos/akshar-vidyavihar.webp', href: 'https://www.instagram.com/akshar_vidyavihar_modern_cbse/' },
  ];

  const renderClientLogo = (logo: (typeof clientLogos)[number]) => {
    const content = (
      <img
        src={logo.image}
        alt={logo.name}
        loading="lazy"
        className="h-full w-full object-contain"
      />
    );
    const className = 'relative z-0 flex h-24 w-40 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-transform duration-300 hover:z-10 hover:scale-110 hover:shadow-lg sm:w-48';

    return logo.href ? (
      <a
        key={logo.name}
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${logo.name}`}
        className={className}
      >
        {content}
      </a>
    ) : (
      <div key={logo.name} title={logo.name} className={className}>
        {content}
      </div>
    );
  };

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.businessName) return;
    setIsSubmitting(true);
    
    try {
      await registerFormSubmission('Home Quick Consultation', {
        'Full Name': formData.name,
        'Company Name': formData.businessName,
        'Corporate Email': formData.email,
        'Mobile Contact Number': formData.phone,
        'Industry': formData.industry,
        'Monthly Revenue': formData.monthlyRevenue,
        'Requirement': formData.requirement
      });
    } catch (err) {
      console.error('Failed to register consultation submission:', err);
    }

    // Simulate n8n webhook call with security check
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const activeCatalogItems = activeCatalogCategory ? catalogItems[activeCatalogCategory] : [];
  const catalogPageSize = 5;
  const visibleCatalogItems = activeCatalogItems.slice(
    catalogPage * catalogPageSize,
    (catalogPage + 1) * catalogPageSize
  );
  const selectedCatalogCategory = catalogCategories.find((category) => category.id === activeCatalogCategory);

  const whyChooseUsCards: Array<{
    title: string;
    description: string;
    cta: string;
    path: RoutePath;
    icon: React.ReactNode;
  }> = [
    {
      title: 'Strategy & Execution',
      description: 'We do more than suggest ideas — we help plan, build, launch, and improve them.',
      cta: 'See how we work',
      path: 'our-process',
      icon: <Target className="h-12 w-12 text-[#1fa5d6]" />,
    },
    {
      title: 'AI-Powered Marketing',
      description: 'Create content, campaigns, and customer journeys faster with smart AI support.',
      cta: 'Explore marketing',
      path: 'solutions/ai-growth-marketing',
      icon: <Sparkles className="h-12 w-12 text-[#1fa5d6]" />,
    },
    {
      title: 'Automation That Saves Time',
      description: 'Reduce repetitive work with workflows for leads, follow-ups, reporting, and support.',
      cta: 'View automation',
      path: 'solutions/crm-ai-automation',
      icon: <Workflow className="h-12 w-12 text-[#1fa5d6]" />,
    },
    {
      title: 'ROI-Focused Solutions',
      description: 'Every solution is designed to improve visibility, conversions, efficiency, or revenue.',
      cta: 'See business value',
      path: 'case-studies',
      icon: <BarChart3 className="h-12 w-12 text-[#1fa5d6]" />,
    },
    {
      title: 'Connected Customer Communication',
      description: 'Manage enquiries across WhatsApp, calls, forms, and CRM from one connected system.',
      cta: 'Explore channels',
      path: 'solutions/conversational-ai',
      icon: <MessageSquareText className="h-12 w-12 text-[#1fa5d6]" />,
    },
    {
      title: 'Ongoing Support & Optimization',
      description: 'We keep refining your systems and campaigns so your results improve over time.',
      cta: 'Get continuous support',
      path: 'contact',
      icon: <ShieldCheck className="h-12 w-12 text-[#1fa5d6]" />,
    },
  ];

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-[#110B33] text-white' : 'bg-white text-[#110B33]'}`}>
      <HeroSection setPath={setPath} />

      {/* 3. Who We Are */}
      <section className={`py-16 md:py-20 border-b ${
        darkMode ? 'border-white/[0.05] bg-[#110B33]' : 'border-gray-100 bg-[#eef1f1]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex justify-center">
              <img
                src="/who-we-are-team.png"
                alt="Natton Digital team collaborating on a digital growth strategy"
                className="w-full max-w-[500px] aspect-square object-cover rounded-2xl mix-blend-multiply"
              />
            </div>
            <div className="max-w-xl">
              <span className="block text-xs font-semibold tracking-[0.14em] uppercase text-primary mb-3">
                About Natton Digital
              </span>
              <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight font-display mb-4 ${
                darkMode ? 'text-white' : 'text-[#110B33]'
              }`}>
                Who We Are
              </h2>
              <p className={`text-base sm:text-lg font-semibold leading-relaxed mb-4 ${
                darkMode ? 'text-gray-200' : 'text-[#17133a]'
              }`}>
                Natton is your strategic partner for digital growth, bringing market research,
                creative campaigns and AI together to strengthen your online presence and attract
                the right customers.
              </p>
              <p className={`text-sm leading-relaxed mb-6 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                We build solutions around your vision and business goals. Whether you need an
                AI-powered digital marketing partnership—from growth strategy to campaign
                execution—or a specific software or business automation solution, our specialists
                take ownership of delivery and stay invested in your next stage of growth.
              </p>
              <button
                onClick={() => setPath('about')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
              >
                About Natton Digital <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us section */}
      <section
        className={`relative overflow-hidden bg-cover bg-center py-16 md:py-20 ${
          darkMode ? 'text-white' : 'text-[#0f1c49]'
        }`}
        style={{
          backgroundImage: "url('/why-choose-us-background.png')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="mb-4 inline-flex cursor-default items-center rounded-full border border-[#7fd8ef] bg-[#e7f8ff]/90 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#1484b2] shadow-sm">
              Why Choose Us?
            </span>
            <h2 className={`text-3xl font-black leading-[1.05] tracking-[-0.05em] sm:text-4xl xl:text-5xl ${darkMode ? 'text-white' : 'text-[#0f1c49]'}`}>
              What gives your business an upper hand with Natton Digital?
            </h2>
            <p className={`mx-auto mt-3 max-w-2xl text-base font-medium leading-relaxed sm:text-lg ${darkMode ? 'text-slate-200' : 'text-[#1c2f4c]'}`}>
              Practical AI solutions, faster execution, measurable results, and support that helps your business grow.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {whyChooseUsCards.map((card) => (
              <div
                key={card.title}
                className={`flex min-h-[320px] flex-col rounded-[1.5rem] border p-5 shadow-[0_12px_35px_rgba(27,102,139,0.12)] backdrop-blur-md xl:p-6 ${
                  darkMode ? 'border-white/20 bg-[#110B33]/75' : 'border-white/80 bg-white/80'
                }`}
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#9adff0] bg-[#eaf9ff]/90">
                    {card.icon}
                </div>
                <h3 className={`text-xl font-bold leading-tight tracking-[-0.04em] xl:text-[1.4rem] ${darkMode ? 'text-white' : 'text-[#0f1c49]'}`}>
                  {card.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed xl:text-base ${darkMode ? 'text-slate-200' : 'text-[#2f4968]'}`}>
                  {card.description}
                </p>
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => setPath(card.path)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#7fd8ef] bg-[#e7f8ff]/90 px-4 py-2 text-sm font-bold text-[#1484b2] transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPath('case-studies')}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-base font-bold transition hover:-translate-y-0.5 ${
                darkMode ? 'border-white/15 bg-white/5 text-white hover:bg-white/10' : 'border-[#cceaf5] bg-white text-[#0f1c49] hover:bg-[#f1fafe]'
              }`}
            >
              Case studies <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPath('contact')}
              className="inline-flex items-center gap-2 rounded-full bg-[#1fa5d6] px-5 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1788b1]"
            >
              Talk to our team <ArrowRight className="h-4 w-4" />
            </button>
            <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold ${darkMode ? 'border-white/20 text-white' : 'border-[#b8dfe9] text-[#1fa5d6]'}`}>
              i
            </span>
          </div>
        </div>
      </section>

      {/* 4. Services, solutions and product catalog */}
      <section className={`py-16 md:py-20 border-t ${
        darkMode ? 'border-white/[0.05] bg-[#110B33]' : 'border-gray-100 bg-[#F5F9FA]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              Explore Natton Digital
            </span>
            <h2 className={`mt-2 text-2xl sm:text-3xl font-bold tracking-tight font-display ${
              darkMode ? 'text-white' : 'text-[#110B33]'
            }`}>
              Choose a category to explore what we can do for you
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10">
            {catalogCategories.map((category) => {
              const isActive = activeCatalogCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCatalogCategory(category.id);
                    setCatalogPage(0);
                    setSelectedCatalogItem(null);
                  }}
                  className={`group flex min-h-40 flex-col items-center rounded-2xl border p-4 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-48 sm:p-5 ${
                    isActive
                      ? 'border-primary bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10 shadow-lg shadow-primary/10'
                      : darkMode
                        ? 'border-white/10 bg-white/[0.03] hover:border-primary/50 hover:bg-white/[0.06]'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <span className={`catalog-icon material-symbols-outlined mb-3 h-14 w-14 shrink-0 rounded-xl text-4xl ${
                    isActive
                      ? 'bg-primary text-white'
                      : darkMode
                        ? 'bg-primary/15 text-[#5efce8]'
                        : 'bg-primary/10 text-primary'
                  }`}>
                    {category.icon}
                  </span>
                  <span className={`block text-sm font-bold font-display sm:text-base ${
                    darkMode ? 'text-white' : 'text-[#110B33]'
                  }`}>
                    {category.title}
                  </span>
                  <span className={`mt-1 block text-xs leading-relaxed ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {category.subtitle}
                  </span>
                  {isActive && (
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                      Selected <CheckCircle aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedCatalogCategory ? (
            <div className={`rounded-2xl border p-4 sm:p-6 ${
            darkMode ? 'border-white/10 bg-white/[0.03]' : 'border-primary/15 bg-white'
          }`}>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className={`text-xl sm:text-2xl font-bold font-display ${
                  darkMode ? 'text-white' : 'text-[#110B33]'
                }`}>
                  {selectedCatalogCategory?.title}
                </h3>
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Browse our offerings. Select a card to see details.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`min-w-[5rem] text-right text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {activeCatalogItems.length === 0
                    ? '0 items'
                    : `${catalogPage * catalogPageSize + 1}-${Math.min(
                        (catalogPage + 1) * catalogPageSize,
                        activeCatalogItems.length
                      )} of ${activeCatalogItems.length}`}
                </span>
                <button
                  type="button"
                  aria-label="Previous offerings"
                  disabled={catalogPage === 0}
                  onClick={() => setCatalogPage((page) => Math.max(0, page - 1))}
                  className={`rounded-full border p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    darkMode ? 'border-white/15 text-white hover:bg-white/10' : 'border-gray-200 text-primary hover:bg-primary/5'
                  }`}
                >
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next offerings"
                  disabled={(catalogPage + 1) * catalogPageSize >= activeCatalogItems.length}
                  onClick={() => setCatalogPage((page) => page + 1)}
                  className="rounded-full bg-primary p-2 text-white transition-colors hover:bg-[#237d8b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {visibleCatalogItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => setSelectedCatalogItem(item)}
                  className={`group flex min-h-44 flex-col items-center rounded-xl border p-4 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    darkMode ? 'border-white/10 bg-[#110B33]/70 hover:bg-white/[0.06]' : 'border-gray-200 bg-white hover:bg-primary/[0.03]'
                  }`}
                >
                  <span className="catalog-icon material-symbols-outlined mb-3 h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 text-4xl text-primary transition-transform group-hover:scale-105">
                    {item.icon}
                  </span>
                  <span className={`mb-2 block w-full text-center text-sm font-bold leading-snug ${
                    darkMode ? 'text-white' : 'text-[#110B33]'
                  }`}>
                    {item.name}
                  </span>
                  <span className={`line-clamp-3 block w-full text-center text-xs leading-relaxed ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </span>
                  <span className="mt-3 inline-flex items-center justify-center gap-1 text-[10px] font-semibold text-primary">
                    View details <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </button>
              ))}
            </div>
            </div>
          ) : (
            <p className={`rounded-2xl border border-dashed px-5 py-8 text-center text-sm ${
              darkMode ? 'border-white/15 text-gray-400' : 'border-primary/25 text-gray-500'
            }`}>
              Select a category above to explore Natton Digital services, solutions and products.
            </p>
          )}
        </div>

        {selectedCatalogItem && (
          <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#080b18]/70 p-4 backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) setSelectedCatalogItem(null);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="catalog-dialog-title"
              className={`relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl ${
                darkMode ? 'border-white/10 bg-[#171346] text-white' : 'border-gray-200 bg-white text-[#110B33]'
              }`}
            >
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedCatalogItem(null)}
                className={`absolute right-4 top-4 rounded-full p-2 ${
                  darkMode ? 'text-gray-300 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
              <div className="mb-4 flex justify-center">
                <span className="catalog-icon material-symbols-outlined h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 text-5xl text-primary">
                  {selectedCatalogItem.icon}
                </span>
              </div>
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {selectedCatalogCategory?.title}
              </p>
              <h3 id="catalog-dialog-title" className="text-center text-2xl font-bold font-display">
                {selectedCatalogItem.name}
              </h3>
              <p className={`mt-3 text-center text-sm leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {selectedCatalogItem.description}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPath(selectedCatalogItem.path);
                    setSelectedCatalogItem(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#237d8b]"
                >
                  Explore details <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCatalogItem(null)}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold ${
                    darkMode ? 'border-white/15 text-white hover:bg-white/5' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. Interactive Business Ecosystem (Growth Flywheel) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left panel info */}
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
              Autonomous Flywheel
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
              The AI Growth Flywheel Model
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Click on each flywheel node to see how Natton Digital interlocks customer journeys from paid clicks to automated CRM revenue cycles.
            </p>

            <div className={`p-5 rounded-xl border ${
              darkMode ? 'bg-white/[0.01] border-white/[0.08]' : 'bg-gray-50 border-gray-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-3 mb-2 text-primary font-bold text-sm">
                {flywheelSteps[activeFlywheelStep].icon}
                <span>Step {activeFlywheelStep + 1}: {flywheelSteps[activeFlywheelStep].name}</span>
              </div>
              <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {flywheelSteps[activeFlywheelStep].desc}
              </p>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase font-bold">
                ✓ Yield: {flywheelSteps[activeFlywheelStep].metric}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {flywheelSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFlywheelStep(idx)}
                  className={`p-2.5 text-center rounded-lg text-xs font-semibold border truncate transition-all ${
                    activeFlywheelStep === idx
                      ? 'border-primary bg-primary/10 text-primary font-bold'
                      : (darkMode 
                          ? 'border-white/[0.05] bg-white/[0.01] text-gray-400 hover:bg-white/[0.04]' 
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50')
                  }`}
                >
                  {step.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Right panel visuals: interconnected flywheel nodes diagram */}
          <div className="relative flex items-center justify-center h-[300px] md:h-[400px]">
            {/* outer rotating loop indicator */}
            <div className="absolute inset-4 rounded-full border border-dashed border-primary/25 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute inset-16 rounded-full border border-dashed border-accent/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />

            {/* Core hub */}
            <div className="relative z-10 p-5 rounded-full bg-dark border-2 border-[#00C2FF]/30 h-28 w-28 flex flex-col items-center justify-center shadow-2xl text-center">
              <span className="text-[8px] font-mono tracking-widest text-[#00C2FF] uppercase">Natton</span>
              <span className="text-xs font-bold font-display text-white mt-1">GrowthOS</span>
              <span className="text-[8px] text-gray-400 mt-0.5">Active</span>
            </div>

            {/* Orbiting nodes */}
            {flywheelSteps.map((step, idx) => {
              const angle = (idx * 2 * Math.PI) / flywheelSteps.length;
              const radius = 110; // orbit radius
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isSelected = activeFlywheelStep === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveFlywheelStep(idx)}
                  className={`absolute p-2.5 rounded-full border transition-all duration-300 z-20 flex items-center justify-center ${
                    isSelected
                      ? 'bg-primary text-white border-[#00C2FF] scale-110 shadow-[0_0_15px_rgba(0,194,255,0.4)]'
                      : (darkMode 
                          ? 'bg-dark text-gray-400 border-white/10 hover:text-white hover:border-white/30' 
                          : 'bg-white text-gray-600 border-gray-200 hover:text-primary hover:border-primary/30 shadow-xs')
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  title={step.name}
                >
                  {step.icon}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Industries */}
      <section className={`py-20 border-t ${
        darkMode ? 'border-white/[0.05] bg-white/[0.01]' : 'border-gray-100 bg-gray-50/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
              Industries
            </span>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight font-display ${
              darkMode ? 'text-white' : 'text-[#110B33]'
            }`}>
              Specialized Services and Solutions Across Industries: Visions and Goals
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Practical digital marketing and automation for the way your business works.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industryShowcases.map((industry) => (
              <button
                key={industry.path}
                type="button"
                onClick={() => setPath(industry.path)}
                className={`group overflow-hidden rounded-xl border text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  darkMode
                    ? 'border-white/10 bg-white/[0.03] hover:border-primary/50'
                    : 'border-gray-200 bg-white hover:border-primary/40'
                }`}
              >
                <img
                  src={industry.image}
                  alt={`${industry.name} industry`}
                  loading="lazy"
                  className="aspect-[1.9/1] w-full object-cover"
                />
                <span className="flex items-start justify-between gap-3 p-4">
                  <span>
                    <span className={`block text-base font-bold font-display ${
                      darkMode ? 'text-white' : 'text-[#110B33]'
                    }`}>
                      {industry.name}
                    </span>
                    <span className={`mt-1 block text-sm leading-snug ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {industry.description}
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Our Trusted Clientele */}
      <section className={`relative isolate overflow-hidden border-y py-8 select-none ${
        darkMode ? 'border-white/10' : 'border-slate-800'
      }`}>
        <canvas
          ref={clienteleWaveRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#000918]/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 mb-2 text-center">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-accent [text-shadow:0_0_14px_rgba(71,199,191,0.8)]">
            Our Trusted Clientele
          </h3>
        </div>
        <div className="relative z-10 w-full overflow-hidden">
          <div className="animate-marquee flex w-max items-center py-4 hover:[animation-play-state:paused]">
            <div className="flex shrink-0 items-center gap-6 px-3">
              {clientLogos.map(renderClientLogo)}
            </div>
            <div className="flex shrink-0 items-center gap-6 px-3" aria-hidden="true">
              {clientLogos.map(renderClientLogo)}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Social Media Carousel */}
      <SocialCarousel />

      {/* 9. Free Consultation Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest text-[#00C2FF] uppercase block">
              Strategy Call Booking
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display leading-tight">
              Unlock Your Autonomous Scaling Blueprint Today
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ready to automate? Complete our 30-second inquiry. Our GoHighLevel webhook instantly triggers your customizable business blueprint, scheduling an live tech specialist strategy session.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-primary/10 rounded mt-1">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">1-on-1 AI Pipeline Architect Session</h4>
                  <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>We review your CRM, ads, and outline where bots can replace hours of manual follow-ups.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#00C2FF]/10 rounded mt-1">
                  <CheckCircle className="h-4 w-4 text-[#00C2FF]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Targeted Market Fit Plan</h4>
                  <p className={`text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Specific compliance models for healthcare (HIPAA) or lead scoring metrics for education / real estate.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`p-6 sm:p-8 rounded-2xl border ${
            darkMode ? 'bg-dark/40 border-white/10' : 'bg-white border-gray-100 shadow-xl'
          }`}>
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4 font-sans animate-scale-up">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h3 className="text-sm font-bold font-display">Inquiry Synced & Dispatched!</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Your inquiry data was successfully routed to GoHighLevel CRM via n8n webhook ID: <strong>wn_83210_growth</strong>.
                </p>
                <button
                  onClick={() => setPath('ai-readiness-assessment')}
                  className="py-2.5 px-5 rounded-lg bg-primary hover:bg-opacity-90 transition-all font-semibold text-xs text-white"
                >
                  Take AI Readiness Diagnostics
                </button>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4 font-sans text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-name" className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your Name</label>
                    <input
                      type="text"
                      id="home-name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Anusha S."
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="home-company" className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Business Name</label>
                    <input
                      type="text"
                      id="home-company"
                      name="company"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Acme Enterprise"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="home-email" className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Work Email</label>
                    <input
                      type="email"
                      id="home-email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="corporate@acme.co"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="home-phone" className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone Number</label>
                    <input
                      type="tel"
                      id="home-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 / +1 ..."
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-white/[0.02] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="home-industry" className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Industry</label>
                    <select
                      id="home-industry"
                      name="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-[#081120] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                    >
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail & Ecom</option>
                      <option value="Services">Professional Services</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="home-revenue" className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Monthly Revenue</label>
                    <select
                      id="home-revenue"
                      name="revenue"
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-[#081120] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                    >
                      <option value="< $10k USD">Under $10k USD</option>
                      <option value="$10k - $50k USD">$10k - $50k USD</option>
                      <option value="> $50k USD">Over $50k USD</option>
                    </select>
                  </div>
                  <div className="sm:col-span-1">
                    <label className={`text-[10px] uppercase font-mono block mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Primary Need</label>
                    <select
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none focus:border-primary ${
                        darkMode ? 'bg-[#081120] border-white/10 text-white' : 'bg-white border-gray-200 text-[#081120]'
                      }`}
                    >
                      <option value="AI Automation Consulting">AI Consulting</option>
                      <option value="CRM GoHighLevel Setup">GHL CRM Setup</option>
                      <option value="n8n Integration workflows">n8n Workflows</option>
                      <option value="AI Growth Marketing">Growth Marketing</option>
                    </select>
                  </div>
                </div>

                {/* Privacy / captcha notice */}
                <p className="text-[9px] text-gray-500 font-sans leading-relaxed">
                  By submitting, you agree to secure data collection under Indian MSME and US GDPR guidelines. Protected by Google reCAPTCHA. Form automatically maps to n8n webhook endpoints.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-white hover:bg-opacity-95 rounded-lg font-semibold text-xs glow-primary transition-all flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? 'Syncing to CRM...' : 'Dispatch Automated Consultation Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
