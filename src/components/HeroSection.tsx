import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { RoutePath } from '../types';
import './HeroSection.css';

interface HeroSectionProps {
  setPath: (path: RoutePath) => void;
}

export default function HeroSection({ setPath }: HeroSectionProps) {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-text-section">
          <h1 className="hero-title-hook">NATTON DIGITAL</h1>
          <h2 className="hero-subtitle">
            Marketing that <br />
            evolves. <span className="hero-highlight">A team that <br /> stays involved.</span>
          </h2>
          <p className="hero-tagline">
            Digital Marketing | Creative Campaigns | AI Agents &amp; Automation
          </p>
          <p className="hero-description">
            We help MSMEs and SMBs attract qualified leads, streamline operations and grow through
            digital marketing, AI automation and software solutions tailored to their business goals.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => setPath('contact')}>
              Talk to Our Team
              <ArrowRight aria-hidden="true" size={20} />
            </button>
            <button className="btn-secondary" onClick={() => setPath('our-process')}>
              <Play aria-hidden="true" size={20} />
              See How We Work
            </button>
          </div>
        </div>

        <div className="hero-image-section">
          <img
            src="/hero-marketing-automation.png"
            alt="Natton Digital marketing and AI automation artwork"
            className="hero-3d-graphic"
          />
        </div>
      </div>
    </section>
  );
}
