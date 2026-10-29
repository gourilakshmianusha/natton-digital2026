import React, { useState, useEffect } from 'react';
import { RoutePath } from '../types';
import SolutionMarketingSaaS from './SolutionMarketingSaaS';
import SolutionCrmAutomation from './SolutionCrmAutomation';
import SolutionConversationalAi from './SolutionConversationalAi';
import SolutionWhatsAppAutomation from './SolutionWhatsAppAutomation';
import SolutionAiAgents from './SolutionAiAgents';
import SolutionAiCallingAgents from './SolutionAiCallingAgents';
import SolutionCloudTelephony from './SolutionCloudTelephony';
import SolutionRcsMessaging from './SolutionRcsMessaging';

interface SolutionsProps {
  subPath: 'ai-marketing-saas' | 'crm-ai-automation' | 'conversational-ai' | 'whatsapp-automation' | 'ai-agents' | 'ai-calling-agents' | 'cloud-telephony' | 'rcs-messaging';
  setPath: (path: RoutePath) => void;
  darkMode: boolean;
}

export default function Solutions({ subPath, setPath, darkMode }: SolutionsProps) {
  // Global form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Re-initialize state when route changes
  useEffect(() => {
    setFormSubmitted(false);
    setLoading(false);
  }, [subPath]);

  const renderService = (page: React.ReactNode) => (
    page
  );

  // Render specific sub-page
  switch (subPath) {
    case 'ai-marketing-saas':
      return renderService(<SolutionMarketingSaaS setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    case 'crm-ai-automation':
      return renderService(<SolutionCrmAutomation setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    case 'conversational-ai':
      return renderService(<SolutionConversationalAi setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    case 'whatsapp-automation':
      return renderService(<SolutionWhatsAppAutomation setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    case 'ai-agents':
      return renderService(<SolutionAiAgents setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    case 'ai-calling-agents':
      return renderService(<SolutionAiCallingAgents setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    case 'cloud-telephony':
      return renderService(<SolutionCloudTelephony setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    case 'rcs-messaging':
      return renderService(<SolutionRcsMessaging setPath={setPath} darkMode={darkMode} formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted} loading={loading} setLoading={setLoading} />);
    default:
      return <div>Solution page not found.</div>;
  }
}
