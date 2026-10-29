import React from 'react';
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Building2,
  Car,
  ChevronRight,
  Check,
  Factory,
  GraduationCap,
  Headphones,
  HeartPulse,
  House,
  Landmark,
  Layers,
  Mail,
  Megaphone,
  Plane,
  Plus,
  ShoppingBag,
  Utensils,
  Users,
  Workflow,
  type LucideIcon
} from 'lucide-react';
import {
  getServiceSlug,
  getServiceBySlug,
  services,
  serviceBanners,
  serviceSectionImages,
  servicePhotographs,
  type Service,
  type ServicePageContent,
  type ServicePageSection
} from '../data/services';
import { additionalServiceFAQs } from '../data/serviceFAQs';
import { RoutePath } from '../types';

const industryIcons: Array<[string[], LucideIcon]> = [
  [['healthcare', 'clinic', 'hospital', 'medical'], HeartPulse],
  [['education', 'school', 'course', 'university'], GraduationCap],
  [['retail', 'e-commerce', 'ecommerce', 'fashion', 'jewellery', 'jewelry', 'home goods'], ShoppingBag],
  [['food', 'restaurant'], Utensils],
  [['real estate', 'property', 'home services'], House],
  [['travel'], Plane],
  [['hospitality', 'hotels'], Building2],
  [['automotive'], Car],
  [['finance', 'financial services'], Landmark],
  [['service centre', 'service center', 'call', 'support'], Headphones],
  [['agency', 'marketing', 'events'], Megaphone],
  [['nonprofits'], Users],
  [['saas', 'software', 'subscription brands', 'subscription products'], Layers],
  [['email', 'b2b'], Mail],
  [['hr', 'human resources'], Users],
  [['workflow', 'operations'], Workflow],
  [['manufacturing', 'factory'], Factory]
];

function getIndustryIcon(industry: string): LucideIcon {
  const normalizedIndustry = industry.split(':', 1)[0].toLowerCase();
  return industryIcons.find(([keywords]) => keywords.some(keyword => normalizedIndustry.includes(keyword)))?.[1] ?? Briefcase;
}

const additionalIndustryNames = [
  'Automotive',
  'Financial services',
  'Travel & hospitality',
  'Nonprofits',
  'Manufacturing',
  'SaaS',
  'Professional services',
  'Retail',
  'Education',
  'Healthcare',
  'Home services',
  'Real estate'
];

interface DocumentServicePageProps {
  service: Service;
  pageContent: ServicePageContent;
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

function DocumentServicePage({ service, pageContent, setPath, darkMode }: DocumentServicePageProps) {
  const banner = servicePhotographs[service.id] ?? serviceBanners[service.id] ?? serviceSectionImages[service.id];
  const baseText = darkMode ? 'text-white' : 'text-[#12304d]';
  const mutedText = darkMode ? 'text-[#cbd9eb]' : 'text-[#60738a]';
  const sectionsByKind = new Map(
    pageContent.sections.map(section => [section.kind, section])
  );
  const sectionId = (section: ServicePageSection) =>
    `service-${section.kind}-${pageContent.sections.indexOf(section) + 2}`;
  const pairedSectionKinds: Record<string, Array<[string, string]>> = {
    'content-marketing-blogging': [['deliverables', 'industries']],
    'analytics-cro': [['deliverables', 'industries'], ['example', 'metrics']]
  };
  const sectionPairs = pairedSectionKinds[service.id] ?? [];

  const renderSection = (section: ServicePageSection) => {
    const sectionHeading = (
      <div className="mb-6">
        <h2 className={`font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl ${baseText}`}>
          {section.heading}
        </h2>
        {section.paragraphs.map(paragraph => (
          <p key={paragraph} className={`mt-3 max-w-3xl text-sm leading-relaxed sm:text-base ${mutedText}`}>
            {paragraph}
          </p>
        ))}
      </div>
    );

    if (section.kind === 'faqs') {
      return (
        <section
          id={sectionId(section)}
          key={section.heading}
          className={`${darkMode ? 'bg-[#10243c]' : 'bg-white'} px-5 py-10 sm:px-8 lg:px-12 lg:py-14`}
        >
          <div className="mx-auto max-w-7xl">
            {sectionHeading}
            <div className="space-y-2">
              {section.faqs?.map(({ question, answer }) => (
                <details
                  key={question}
                  className={`group rounded-xl border px-5 transition-colors ${
                    darkMode
                      ? 'border-white/10 bg-white/[0.03] open:border-[#47C7BF]'
                      : 'border-[#dce8eb] bg-[#f7fbfc] open:border-[#47C7BF]'
                  }`}
                >
                  <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-left text-sm font-bold marker:hidden [&::-webkit-details-marker]:hidden ${baseText}`}>
                    {question}
                    <Plus className="h-4 w-4 shrink-0 text-[#2E9CAE] transition-transform group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className={`max-w-3xl pb-4 text-sm leading-relaxed ${mutedText}`}>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (section.kind === 'cta') {
      return (
        <section
          id={sectionId(section)}
          key={section.heading}
          className="bg-[#100d3d] px-5 py-8 text-white sm:px-8 lg:px-12"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-5 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{section.heading}</h2>
              {section.paragraphs.map(paragraph => (
                <p key={paragraph} className="mt-2 max-w-2xl text-sm leading-relaxed text-[#cbd9eb]">{paragraph}</p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPath('contact')}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#20a9b7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#168f9d]"
            >
              {section.button ?? pageContent.primaryCta} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      );
    }

    const isFeatures = section.kind === 'features';
    const isProcess = section.kind === 'process';
    const isIndustryList = section.kind === 'industries';
    const ListElement = isProcess ? 'ol' : 'ul';
    const background = ['features', 'deliverables', 'example'].includes(section.kind)
      ? darkMode ? 'bg-[#10243c]' : 'bg-[#edf8f7]'
      : darkMode ? 'bg-[#0d1d32]' : 'bg-white';
    const cardBackground = darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-[#e2eff0] bg-white';
    const childrenGrid = section.kind === 'benefits'
      ? 'grid-cols-1'
      : isFeatures
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

    return (
      <section
        id={sectionId(section)}
        key={section.heading}
        className={`${background} px-5 py-9 sm:px-8 lg:px-12 lg:py-12`}
      >
        <div className="mx-auto max-w-7xl">
          {section.kind === 'benefits' ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(240px,0.9fr)_1.1fr] lg:items-center lg:gap-12">
              {sectionHeading}
              <div className="divide-y divide-[#cfe6e7]">
                {section.children.map(child => (
                  <article key={child.heading} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e6f7f5] text-[#168fa0]">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className={`text-base font-bold ${baseText}`}>{child.heading}</h3>
                      {child.paragraphs.map(paragraph => (
                        <p key={paragraph} className={`mt-1 text-sm leading-relaxed ${mutedText}`}>{paragraph}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : section.kind === 'process' ? (
            <div>
              <div className="max-w-3xl">{sectionHeading}</div>
              {section.items.length > 0 && (
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {section.items.map(item => (
                    <li key={item} className="relative flex gap-3 lg:flex-col lg:gap-2">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#20a9b7] text-sm font-extrabold text-white shadow-[0_0_0_5px_rgba(32,169,183,0.15)]">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <p className={`text-sm leading-relaxed ${mutedText}`}>{item}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : section.kind === 'deliverables' ? (
            <div className={`rounded-2xl border p-5 sm:p-7 ${cardBackground}`}>
              <div className="grid gap-6 lg:grid-cols-[minmax(220px,0.7fr)_1.3fr] lg:items-start">
                {sectionHeading}
                <ListElement className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {section.items.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dff4e8] text-[#268453]">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className={`pt-1 text-sm leading-relaxed ${mutedText}`}>{item}</span>
                    </li>
                  ))}
                </ListElement>
              </div>
            </div>
          ) : section.kind === 'metrics' ? (
            <div className={`rounded-2xl border p-5 sm:p-7 ${cardBackground}`}>
              {sectionHeading}
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {section.items.map(item => (
                  <li key={item} className={`flex min-h-20 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${darkMode ? 'bg-white/[0.04]' : 'bg-[#f1f8f8]'} ${baseText}`}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e1f5f3] text-[#168fa0]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : section.kind === 'example' ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.65fr)_1.35fr] lg:items-center">
              {sectionHeading}
              <div className={`rounded-2xl border p-5 sm:p-7 ${cardBackground}`}>
                {section.children.map(child => (
                  <article key={child.heading}>
                    <span className="mb-3 inline-flex rounded-full bg-[#dff5f2] px-3 py-1 text-xs font-bold text-[#138b98]">
                      Illustrative example
                    </span>
                    <h3 className={`font-display text-xl font-bold ${baseText}`}>{child.heading}</h3>
                    {child.paragraphs.map(paragraph => (
                      <p key={paragraph} className={`mt-2 text-sm leading-relaxed ${mutedText}`}>{paragraph}</p>
                    ))}
                  </article>
                ))}
                {section.items.length > 0 && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.items.map(item => (
                      <li key={item} className={`rounded-lg px-4 py-3 text-sm ${darkMode ? 'bg-white/[0.04]' : 'bg-[#f2f8f8]'} ${mutedText}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : section.kind === 'industries' ? (
            <div className="grid gap-5 lg:grid-cols-[minmax(220px,0.65fr)_1.35fr] lg:items-start">
              {sectionHeading}
              {section.items.length > 0 && (
                <div className={service.id === 'seo-services' ? 'divide-y divide-[#d8e9e9]' : 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3'}>
                  {section.items.map(item => {
                    const [title, ...descriptionParts] = item.split(' - ');
                    const IndustryIcon = getIndustryIcon(title);
                    return (
                      <article
                        key={item}
                        className={`flex items-start gap-3 p-4 ${
                          service.id === 'seo-services'
                            ? darkMode ? 'even:bg-white/[0.03]' : 'even:bg-[#f2f8f8]'
                            : `rounded-xl border ${cardBackground}`
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e3f5f2] text-[#168fa0]">
                          <IndustryIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className={`text-sm font-bold ${baseText}`}>{title}</h3>
                          {descriptionParts.length > 0 && (
                            <p className={`mt-1 text-sm leading-relaxed ${mutedText}`}>{descriptionParts.join(' - ')}</p>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div>
              {sectionHeading}
              {section.children.length > 0 && (
                <div className={`grid gap-3 ${childrenGrid}`}>
                  {section.children.map(child => (
                    <article
                      key={child.heading}
                      className={`rounded-xl border p-4 ${cardBackground}`}
                    >
                      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#e3f5f2] text-[#168fa0]">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className={`text-sm font-bold ${baseText}`}>{child.heading}</h3>
                      {child.paragraphs.map(paragraph => (
                        <p key={paragraph} className={`mt-1 text-sm leading-relaxed ${mutedText}`}>{paragraph}</p>
                      ))}
                    </article>
                  ))}
                </div>
              )}
              {section.items.length > 0 && !isIndustryList && (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {section.items.map(item => (
                    <li key={item} className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${cardBackground} ${mutedText}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
      </div>
      </section>
    );
  };

  const pairedSectionElements = new Set<number>();
  const renderedSections: React.ReactNode[] = [];
  pageContent.sections.forEach((section, index) => {
    if (pairedSectionElements.has(index)) return;
    const pair = sectionPairs.find(([firstKind, secondKind]) => {
      const nextSection = pageContent.sections[index + 1];
      return section.kind === firstKind && nextSection?.kind === secondKind;
    });

    if (pair) {
      pairedSectionElements.add(index);
      pairedSectionElements.add(index + 1);
      renderedSections.push(
        <div key={`${section.kind}-${pageContent.sections[index + 1].kind}`} className="mx-auto grid w-full max-w-7xl lg:grid-cols-2">
          {renderSection(section)}
          {renderSection(pageContent.sections[index + 1])}
        </div>
      );
      return;
    }

    renderedSections.push(renderSection(section));
  });

  return (
    <article className={`service-detail ${darkMode ? 'service-theme-dark' : ''} bg-white text-[#12304d]`}>
      <section className={`${darkMode ? 'bg-[#10243c]' : 'bg-gradient-to-br from-white via-[#f5fbfb] to-[#e6f6f4]'} px-5 py-10 sm:px-8 lg:px-12 lg:py-14`}>
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <nav aria-label="Breadcrumb" className={`mb-7 flex flex-wrap items-center gap-2 text-xs ${mutedText}`}>
              <button onClick={() => setPath('home')} className="hover:text-[#168fa0]">Home</button>
              <ChevronRight className="h-3 w-3" />
              <button onClick={() => setPath('services')} className="hover:text-[#168fa0]">Services</button>
              <ChevronRight className="h-3 w-3" />
              <span aria-current="page" className="font-semibold text-[#168fa0]">{service.name}</span>
            </nav>
            <p className="mb-3 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#168fa0]">
              <span className="h-px w-9 bg-[#29a9b5]" aria-hidden="true" />{service.name}
            </p>
            <h1 className={`font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem] ${baseText}`}>
              {pageContent.title}
            </h1>
            <p className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${mutedText}`}>{pageContent.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPath('contact')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#159faf] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#128794]"
              >
                {pageContent.primaryCta} <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={`#${sectionId(sectionsByKind.get('features') ?? pageContent.sections[0])}`}
                className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-bold transition ${
                  darkMode ? 'border-white/30 text-white hover:bg-white/10' : 'border-[#159faf] text-[#168fa0] hover:bg-[#e6f6f4]'
                }`}
              >
                {pageContent.secondaryCta} <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
          {banner && (
            <img
              src={banner}
              alt={`${service.name} service illustration`}
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[0_18px_55px_rgba(17,48,77,0.14)]"
            />
          )}
        </div>
      </section>
      <nav aria-label="On this page" className={`${darkMode ? 'border-white/10 bg-[#0d1d32]' : 'border-y border-[#e1eded] bg-white'} sticky top-[var(--header-height,0px)] z-20 overflow-x-auto`}>
        <ul className="mx-auto flex w-max min-w-full max-w-7xl items-center justify-center gap-2 px-4 py-3 text-xs font-semibold sm:gap-8">
          {[
            ['Overview', 'benefits'],
            ['Scope', 'features'],
            ['Delivery', 'process'],
            ['Deliverables', 'deliverables'],
            ['FAQs', 'faqs']
          ].map(([label, kind]) => {
            const target = sectionsByKind.get(kind as ServicePageSection['kind']);
            return target ? (
              <li key={kind}>
                <a className="block whitespace-nowrap px-3 py-2 text-[#486278] transition hover:text-[#159faf]" href={`#${sectionId(target)}`}>
                  {label}
                </a>
              </li>
            ) : null;
          })}
        </ul>
      </nav>
      {renderedSections}
    </article>
  );
}

interface ServiceDetailProps {
  serviceSlug: string;
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function ServiceDetail({ serviceSlug, setPath, darkMode }: ServiceDetailProps) {
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <section className={`service-detail ${darkMode ? 'service-theme-dark' : ''} mx-auto max-w-3xl px-5 py-20 text-center`}>
        <h1 className="font-display text-3xl font-bold text-[#110B33]">Service not found</h1>
        <p className="mt-3 text-[#5b647a]">This service page may have moved.</p>
        <button
          type="button"
          onClick={() => setPath('services')}
          className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#258b9c]"
        >
          Browse all services
        </button>
      </section>
    );
  }

  if (service.pageContent) {
    return (
      <DocumentServicePage
        service={service}
        pageContent={service.pageContent}
        setPath={setPath}
        darkMode={darkMode}
      />
    );
  }

  const banner = servicePhotographs[service.id] ?? serviceBanners[service.id];
  const sectionImage = servicePhotographs[service.id] ?? serviceSectionImages[service.id] ?? banner;
  const serviceFAQs = [...(service.faqs ?? []), ...(additionalServiceFAQs[service.id] ?? [])];
  const existingIndustries = service.industries ?? [];
  const normalizeIndustryName = (industry: string) => industry
    .split(':', 1)[0]
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ');
  const existingIndustryNames = new Set(existingIndustries.map(normalizeIndustryName));
  const additionalIndustries = additionalIndustryNames
    .filter(industry => !existingIndustryNames.has(normalizeIndustryName(industry)))
    .slice(0, 4)
    .map(industry => `${industry}: Use ${service.name} to make relevant customer journeys and follow-up more consistent.`);
  const industriesWeServe = [...existingIndustries, ...additionalIndustries];

  return (
    <article className={`service-detail ${darkMode ? 'service-theme-dark' : ''} bg-white text-[#110B33]`}>
      <section className="relative isolate flex min-h-[430px] items-center overflow-hidden bg-gradient-to-br from-[#110B33] via-[#171346] to-[#14505c] px-5 py-16 text-white sm:min-h-[500px] sm:px-8 lg:px-12 lg:py-20">
        <img
          src={banner}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#110B33] via-[#110B33]/90 to-[#110B33]/35" />
        <div className="mx-auto w-full max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#cbd9eb]">
            <button onClick={() => setPath('home')} className="hover:text-white">Home</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => setPath('services')} className="hover:text-white">Services</button>
            <ChevronRight className="h-3 w-3" />
            <span aria-current="page" className="text-[#99D57C]">{service.name}</span>
          </nav>
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#99D57C]">
              {service.id.startsWith('ai-') || service.id === 'crm-and-automation' ||
              ['conversational-ai', 'whatsapp-automation', 'cloud-telephony', 'rcs-messaging'].includes(service.id)
                ? 'Solutions'
                : 'Service'}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {service.hero ?? `${service.name} for growing teams`}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#cbd9eb] sm:text-lg">
              {service.short}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setPath('contact')}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#258b9c]"
              >
                Request a Consultation <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#service-includes"
                className="inline-flex items-center gap-2 rounded-lg border border-[#47C7BF]/60 px-5 py-3 text-sm font-bold text-white transition hover:border-[#99D57C] hover:bg-white/10"
              >
                Explore features <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="All services" className="service-marquee bg-primary py-4">
        <div className="service-marquee-window">
          <div className="service-marquee-track">
            {[false, true].map(isDuplicate => (
              <ul
                key={String(isDuplicate)}
                aria-hidden={isDuplicate || undefined}
                inert={isDuplicate || undefined}
                className="flex shrink-0 items-center gap-3 pr-3"
              >
                {services.map(item => {
                  const slug = getServiceSlug(item);
                  return (
                    <li key={item.id} className="shrink-0">
                      <a
                        href={`/services/${slug}/`}
                        aria-current={slug === serviceSlug ? 'page' : undefined}
                        onClick={event => {
                          event.preventDefault();
                          setPath(`services/${slug}`);
                        }}
                        className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                          slug === serviceSlug
                            ? 'border-white bg-white text-[#110B33] shadow-sm'
                            : 'border-white/40 bg-white/10 text-white hover:border-white hover:bg-white/20'
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </nav>

      {service.intro && service.intro.length > 0 && (
        <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2E9CAE]">
                Service introduction
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#110B33] sm:text-4xl">
                Understand {service.name}
              </h2>
              {service.intro.map(paragraph => (
                <p key={paragraph} className="mt-4 text-sm leading-relaxed text-[#5b647a] sm:text-base">
                  {paragraph}
                </p>
              ))}
              <button
                type="button"
                onClick={() => setPath('contact')}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-[#258b9c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E9CAE] focus-visible:ring-offset-2"
              >
                Discuss {service.name} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <img
              src={sectionImage}
              alt={`${service.name} service illustration`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl border border-[#dce8eb] object-cover shadow-[0_18px_60px_rgba(17,11,51,0.12)]"
            />
          </div>
        </section>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <section className={`${darkMode ? 'bg-[#110B33] text-white' : 'bg-[#F5F9FA] text-[#110B33]'} px-5 py-14 sm:px-8 lg:px-12 lg:py-20`}>
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#47C7BF]">Business benefits</p>
            <h2 className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${darkMode ? 'text-white' : 'text-[#110B33]'}`}>
              Why it can help your business
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map(([title, description]) => (
                <article
                  key={title}
                  className={`rounded-2xl border p-5 ${
                    darkMode
                      ? 'border-white/15 bg-[#171346]'
                      : 'border-[#dce8eb] bg-white'
                  }`}
                >
                  <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-[#110B33]'}`}>{title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-[#c9d8e8]' : 'text-[#5b647a]'}`}>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.features && service.features.length > 0 && (
        <section id="service-includes" className="scroll-mt-28 px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2E9CAE]">What is included</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#110B33] sm:text-4xl">
              Our {service.name} services
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5b647a] sm:text-base">
              A practical breakdown of capabilities that can be included in an agreed service scope.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.features.map(([title, description]) => (
                <article key={title} className="rounded-2xl border border-[#dce8eb] bg-white p-5 shadow-[0_10px_25px_rgba(17,11,51,0.05)]">
                  <h3 className="text-sm font-bold leading-snug text-[#110B33]">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5b647a]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.steps && service.steps.length > 0 && (
        <section className="bg-[#F5F9FA] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2E9CAE]">How we work</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#110B33] sm:text-4xl">
              How we deliver {service.name}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#5b647a] sm:text-base">
              We agree the scope, owners and success measures first; review progress at agreed checkpoints; then validate the work, complete handover and confirm what to monitor next.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.steps.map(step => (
                <article key={step} className="rounded-2xl border border-[#dce8eb] bg-white p-5">
                  <p className="text-sm font-semibold leading-relaxed text-[#110B33]">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {industriesWeServe.length > 0 && (
        <section className={`${darkMode ? 'bg-[#110B33] text-white' : 'bg-white text-[#110B33]'} px-5 py-14 sm:px-8 lg:px-12 lg:py-20`}>
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#47C7BF]">Selected applications</p>
            <h2 className={`font-display text-3xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-[#110B33]'}`}>Industries we serve</h2>
            <p className={`mt-3 max-w-3xl text-sm leading-relaxed sm:text-base ${darkMode ? 'text-[#c9d8e8]' : 'text-[#5b647a]'}`}>
              <strong className={darkMode ? 'text-white' : 'text-[#110B33]'}>Best suited to: </strong>{service.target} We work with teams across these industries to adapt the service to their day-to-day needs and customer journeys.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industriesWeServe.map(industry => {
                const IndustryIcon = getIndustryIcon(industry);
                return (
                <article
                  key={industry}
                  className={`rounded-xl border p-5 ${
                    darkMode
                      ? 'border-white/15 bg-[#171346]'
                      : 'border-[#dce8eb] bg-[#F5F9FA]'
                  }`}
                >
                  <IndustryIcon
                    aria-hidden="true"
                    className="mb-4 h-6 w-6 text-[#47C7BF]"
                  />
                  <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-[#110B33]'}`}>{industry.split(':', 1)[0]}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-[#c9d8e8]' : 'text-[#5b647a]'}`}>
                    {industry.includes(':') ? industry.slice(industry.indexOf(':') + 1).trim() : industry}
                  </p>
                </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {serviceFAQs.length > 0 && (
        <section className="relative overflow-hidden bg-[#F5F9FA] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-7 text-center">
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2E9CAE]">Here to help</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#110B33] sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5b647a]">
                Find answers to common questions about {service.name.toLowerCase()}.
              </p>
            </div>
            <div className="space-y-3">
              {serviceFAQs.map(([question, answer]) => (
                <details
                  key={question}
                  className="group rounded-xl border border-[#dce8eb] bg-white px-5 transition-colors open:border-[#47C7BF] open:bg-[#47C7BF]/5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-bold text-[#110B33] marker:hidden [&::-webkit-details-marker]:hidden">
                    {question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#47C7BF]/15 text-[#2E9CAE] transition-transform group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-5 pr-10 text-sm leading-relaxed text-[#5b647a]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

    </article>
  );
}
