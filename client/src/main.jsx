import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Database,
  Gauge,
  LockKeyhole,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  Zap
} from 'lucide-react';
import heroImage from './assets/ai-operations-hero.png';
import { hasSupabaseClient, supabase } from './lib/supabase';
import './styles.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const services = [
  {
    icon: BrainCircuit,
    title: 'AI Agent Design',
    copy: 'Role-based agents that research, summarize, update systems, prepare documents, and escalate decisions.'
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    copy: 'Automations across CRM, support, finance, operations, email, spreadsheets, and internal tools.'
  },
  {
    icon: Database,
    title: 'Data + Supabase Systems',
    copy: 'Secure data models, authenticated client portals, lead capture, dashboards, and operational records.'
  },
  {
    icon: ShieldCheck,
    title: 'Governance + Reliability',
    copy: 'Human approvals, logs, permissions, recovery paths, and monitoring so automation stays accountable.'
  }
];

const work = [
  {
    sector: 'Operations',
    title: 'Invoice Intake Agent',
    result: 'Reduced manual invoice processing from hours to minutes with OCR, validation, and approval routing.'
  },
  {
    sector: 'Sales',
    title: 'Lead Research Engine',
    result: 'Enriched prospects, drafted outbound notes, and synced qualified leads into CRM automatically.'
  },
  {
    sector: 'Support',
    title: 'Customer Response Copilot',
    result: 'Summarized tickets, drafted replies, detected urgency, and prepared escalation briefs for managers.'
  }
];

const stats = [
  ['40+', 'automation workflows shipped'],
  ['65%', 'average repetitive work reduction'],
  ['24/7', 'agent monitoring capability']
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState('');
  const [authStatus, setAuthStatus] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');

  const navItems = useMemo(
    () => [
      ['Work', '#work'],
      ['Services', '#services'],
      ['Process', '#process'],
      ['Contact', '#contact'],
      ['Login', '#login']
    ],
    []
  );

  async function submitLead(event) {
    event.preventDefault();
    setLeadStatus('Sending...');
    const form = new FormData(event.currentTarget);

    const response = await fetch(`${apiUrl}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form))
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setLeadStatus(data.message || 'Something went wrong. Check backend and Supabase settings.');
      return;
    }

    event.currentTarget.reset();
    setLeadStatus('Request received. We will review it and respond soon.');
  }

  async function signIn(event) {
    event.preventDefault();

    if (!hasSupabaseClient) {
      setAuthStatus('Add Supabase credentials in client/.env to enable login.');
      return;
    }

    const form = new FormData(event.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    setAuthStatus('Signing in...');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthStatus(error.message);
      return;
    }

    setSessionEmail(data.user.email);
    setAuthStatus('Signed in successfully.');
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="AgentOps Studio home">
          <span className="brand-mark"><Bot size={19} /></span>
          AgentOps Studio
        </a>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          Book a strategy call <ArrowRight size={16} />
        </a>
        <button className="icon-button menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section id="top" className="hero">
        <img className="hero-image" src={heroImage} alt="AI operations command center visualization" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow">AI-powered automation for ambitious businesses</p>
          <h1>Build an agent workplace that makes your business easier to run.</h1>
          <p className="hero-copy">
            We design AI agents, automation systems, and secure client portals that remove repetitive work,
            improve response times, and turn scattered operations into one intelligent workflow.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              Start a project <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#work">
              View previous work
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Automation metrics">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-heading">
          <p className="eyebrow">What we build</p>
          <h2>Automation infrastructure for the work your team repeats every day.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article className="service-card" key={service.title}>
                <Icon size={28} />
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="work" className="work-band">
        <div className="section-heading">
          <p className="eyebrow">Previous work</p>
          <h2>Client-ready systems, not demos that stop at the prototype.</h2>
        </div>
        <div className="work-list">
          {work.map((item, index) => (
            <article className="work-item" key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{item.sector}</p>
                <h3>{item.title}</h3>
              </div>
              <p>{item.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="section split-section">
        <div>
          <p className="eyebrow">How we work</p>
          <h2>From messy process to dependable agent system.</h2>
          <p className="large-copy">
            We map your current workflow, identify where AI can safely remove manual effort, then ship a
            production-ready system with authentication, storage, auditability, and clear handoff points.
          </p>
        </div>
        <div className="process-list">
          {['Discover the workflow', 'Design the automation architecture', 'Build the agent and database layer', 'Launch, measure, and improve'].map((step) => (
            <div className="process-step" key={step}>
              <CheckCircle2 size={22} />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="proof-band">
        <div>
          <Gauge size={30} />
          <h2>Built for outcomes your clients and team can actually feel.</h2>
        </div>
        <p>
          Faster intake, cleaner handoffs, fewer copy-paste tasks, better visibility, and a professional
          client experience backed by real data.
        </p>
      </section>

      <section id="contact" className="section contact-grid">
        <div>
          <p className="eyebrow">Start the conversation</p>
          <h2>Tell us where your operations slow down.</h2>
          <p className="large-copy">
            Share your business, current tools, and the process you want automated. Your message is stored
            in Supabase once credentials are connected.
          </p>
          <div className="contact-points">
            <span><Mail size={18} /> hello@agentops.studio</span>
            <span><Building2 size={18} /> Automation audits, portals, and AI agents</span>
          </div>
        </div>
        <form className="form-panel" onSubmit={submitLead}>
          <label>Name<input name="name" required placeholder="Your name" /></label>
          <label>Email<input name="email" required type="email" placeholder="you@company.com" /></label>
          <label>Company<input name="company" placeholder="Company name" /></label>
          <label>What do you want to automate?<textarea name="message" required rows="5" placeholder="Describe the workflow or business problem." /></label>
          <button className="primary-button" type="submit">Send request <ArrowRight size={18} /></button>
          {leadStatus && <p className="form-status">{leadStatus}</p>}
        </form>
      </section>

      <section id="login" className="login-section">
        <div>
          <p className="eyebrow">Client access</p>
          <h2>Secure project login powered by Supabase Auth.</h2>
          <p>
            Clients can sign in to access project updates, deliverables, and private automation documents
            once you extend the portal pages.
          </p>
        </div>
        <form className="login-panel" onSubmit={signIn}>
          <LockKeyhole size={26} />
          <label>Email<input name="email" type="email" required placeholder="client@company.com" /></label>
          <label>Password<input name="password" type="password" required placeholder="Password" /></label>
          <button className="secondary-button" type="submit">Sign in</button>
          {sessionEmail && <p className="form-status">Session: {sessionEmail}</p>}
          {authStatus && <p className="form-status">{authStatus}</p>}
        </form>
      </section>

      <footer>
        <div className="brand">
          <span className="brand-mark"><Sparkles size={17} /></span>
          AgentOps Studio
        </div>
        <p>AI automation, agent systems, and secure business portals.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
