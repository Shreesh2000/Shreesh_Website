'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  Mail, 
  Phone, 
  Terminal, 
  Code, 
  Cpu, 
  Send,
  MessageSquare,
  Bot,
  Play,
  Volume2,
  AlertCircle,
  Database
} from 'lucide-react';
import CinematicScene from '@/components/Scene';

const GithubIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 4.88c.1-.28.4-1.32-.1-2.73 0 0-1.2-.38-3.9 1.45a13.3 13.3 0 0 0-7 0C5.3 1.77 4.1 2.15 4.1 2.15c-.5 1.41-.2 2.45-.1 2.73A5.1 5.1 0 0 0 2.5 7.6c0 5.76 3.35 6.78 6.5 7.16A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<'hospital' | 'wingsbi' | 'xpomatch' | 'precheck'>('hospital');
  
  // WingsBI tab state
  const [biPremium, setBiPremium] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);
  const [chartSelection, setChartSelection] = useState<'bar' | 'pie'>('bar');
  
  // XpoMatch tab state
  const [matchNotification, setMatchNotification] = useState<string | null>(null);

  // Chatbot Simulation States
  const [activeQuestion, setActiveQuestion] = useState<'wingstalk' | 'qhub' | 'widget' | null>(null);
  const [aiAnswer, setAiAnswer] = useState('');
  const [typingStatus, setTypingStatus] = useState(false);

  // Database Query Simulator States
  const [queryInput, setQueryInput] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);

  const handleAskChatbot = (question: 'wingstalk' | 'qhub' | 'widget') => {
    if (typingStatus) return;
    setActiveQuestion(question);
    setTypingStatus(true);
    setAiAnswer('');
    
    let fullText = '';
    if (question === 'wingstalk') {
      fullText = "WingsTalk operates an advanced RAG (Retrieval-Augmented Generation) pipeline. Documents are parsed via PyMuPDF/LlamaParse (with Tesseract OCR), chunked, embedded using HuggingFace Sentence Transformers, and stored in pgvector + ChromaDB. Questions prompt vector cosine similarity search, feeding relevant nodes to LlamaIndex/LangChain, streaming the response via WebSockets in real-time.";
    } else if (question === 'qhub') {
      fullText = "Qhub is a Python FastAPI service powering the natural language query system in WingsBI. It maps plain English queries to database-specific SQL queries (MSSQL, PostgreSQL, MySQL) using LangChain with OpenAI GPT models via SQLAlchemy database models, and runs in Docker containers under Gunicorn/Uvicorn.";
    } else if (question === 'widget') {
      fullText = "EventChatbot is an AI chat widget with a dual Vite compilation configuration: one config targets standard dashboard app generation, while the other packs the entire application into a single embeddable, customizable JavaScript widget. It uses Material-UI for custom styling themes and i18next for multi-language localizations.";
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setAiAnswer((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTypingStatus(false);
      }
    }, 10);
  };

  const handleRunQuery = () => {
    if (!queryInput.trim()) return;
    setQueryResult('Executing database query...');
    setTimeout(() => {
      const q = queryInput.toLowerCase();
      if (q.includes('select') && q.includes('from') && (q.includes('embeddings') || q.includes('users') || q.includes('meetings'))) {
        if (q.includes('embeddings')) {
          setQueryResult('[SUCCESS] Cosine similarity row found:\n  id: 104\n  doc_id: 42\n  vector: [0.0124, -0.0982, 0.4211, ... (1536 dim)]\n  source: wings_talk_rag_workspace');
        } else if (q.includes('users')) {
          setQueryResult('[SUCCESS] User account matching:\n  id: 1\n  email: kawathekarshreesh@gmail.com\n  role: Administrator\n  sso_provider: Azure MSAL');
        } else {
          setQueryResult('[SUCCESS] Live meeting scheduler match:\n  id: 308\n  host_exhibitor: WingsBI Corp\n  visitor_id: 882\n  match_confidence: 94.6%\n  sync_protocol: Microsoft SignalR');
        }
      } else {
        setQueryResult('[ERROR] Syntax error or table access denied. Try running:\n"SELECT * FROM embeddings;"\n"SELECT * FROM users;"\n"SELECT * FROM meetings;"');
      }
    }, 500);
  };

  const triggerSignalRNotification = () => {
    setMatchNotification('Connecting to SignalR hub...');
    setTimeout(() => {
      setMatchNotification('SignalR Connection Established. Live match triggers active.');
      setTimeout(() => {
        setMatchNotification('Live Notification: Exhibitor match found! [Exhibitor ID: 41] schedules meeting request with Visitor 82. (Confirm matching queue)');
      }, 1000);
    }, 600);
  };

  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [aiAnswer]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <CinematicScene>
      <main>
        {/* Persistent Navigation Header */}
        <header className="nav-header">
          <div className="nav-header-container">
            <Link href="/" className="nav-logo">
              SHREESH KAWATHEKAR
            </Link>
            <nav className="nav-links">
              <a href="#profile" className="nav-link">About</a>
              <a href="#linux" className="nav-link">Systems</a>
              <a href="#web" className="nav-link">Web Projects</a>
              <a href="#ai" className="nav-link">AI Chatbot</a>
              <a href="#backend" className="nav-link">Backend DB</a>
              <a href="#experience" className="nav-link">Timeline</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </header>

        {/* Section 1: Hero / Profile */}
        <section id="profile" className="scroll-section">
          <motion.div 
            className="section-content-wrapper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            style={{ alignItems: 'flex-start' }}
          >
            <motion.h1 
              className="hero-title" 
              variants={itemVariants}
              style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}
            >
              Shreesh Vivek Kawathekar
            </motion.h1>
            <motion.p className="hero-subtitle" variants={itemVariants}>
              Software Developer & GenAI Engineer with 3 years of experience.
              Architecting robust React, Next.js, and TypeScript applications alongside cutting-edge enterprise AI integrations.
            </motion.p>
            <motion.div className="flex-row-gap" variants={itemVariants} style={{ marginTop: '0.5rem' }}>
              <a href="https://github.com/Shreesh2000" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <GithubIcon size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/shreesh-kawathekar-28490a196/" target="_blank" rel="noopener noreferrer" className="btn-outline">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
              <a href="mailto:kawathekarshreesh@gmail.com" className="btn-outline">
                <Mail size={16} /> Contact Me
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: Linux & Systems (CRT Terminal Theme) */}
        <section id="linux" className="scroll-section" style={{ alignItems: 'flex-start' }}>
          <h2 className="section-title" style={{ '--theme-accent': 'var(--accent-terminal)' } as React.CSSProperties}>
            Systems & Environment
          </h2>
          <p className="hero-subtitle" style={{ maxWidth: '520px' }}>
            Deep expertise in scripting, command line automation, and systems configuration on Linux environments.
          </p>
          
          <div className="terminal-panel" style={{ marginTop: '1rem', width: '100%' }}>
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot active"></div>
                <div className="terminal-dot active"></div>
                <div className="terminal-dot active"></div>
              </div>
              <span>shreesh@linux-core:~</span>
              <Terminal size={14} color="#005500" />
            </div>
            
            <div>
              <div className="terminal-prompt">
                <span className="terminal-prompt-user">shreesh@linux:~$</span> <span className="terminal-command">cat systems_check.sh</span>
              </div>
              <div className="terminal-output" style={{ whiteSpace: 'pre-wrap', marginTop: '0.25rem', color: '#86efac' }}>
                {`#!/bin/bash
echo "Initializing systems diagnostics..."
echo "OS: Ubuntu LTS 22.04"
echo "Shell: Bash v5.1.16"
echo "Skills compiled: TypeScript, Python, SQL, Git"
echo "Diagnostic: ALL SYSTEMS OPTIMAL [OK]"`}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <div className="terminal-prompt">
                <span className="terminal-prompt-user">shreesh@linux:~$</span> <span className="terminal-command">./render_practices.py</span>
              </div>
              <div className="terminal-output" style={{ whiteSpace: 'pre-wrap', marginTop: '0.25rem', color: '#fcd34d' }}>
                {`- Code Reviews: Adversarial checks & best practices
- Agile Methods: Scrum, Sprint planning, JIRA delivery
- Engineering: Clean Architecture, modular code design`}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Frontend Web Development (VS Code + Apple Monitor Mockups) */}
        <section id="web" className="scroll-section" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <h2 className="section-title" style={{ '--theme-accent': 'var(--accent-editor)', alignSelf: 'flex-end' } as React.CSSProperties}>
            Frontend & The Web
          </h2>
          <p className="hero-subtitle" style={{ alignSelf: 'flex-end', maxWidth: '520px' }}>
            Building scalable frontend systems using React 18/19, Next.js 14, and Vite. Specialized in performance optimization, state management, and reusable components.
          </p>

          <div className="browser-window" style={{ marginTop: '0.5rem', textAlign: 'left' }}>
            {/* Browser frame navigation bar */}
            <div className="browser-navbar">
              <div className="browser-controls">
                <span className="browser-control-dot" style={{ backgroundColor: '#ef4444' }}></span>
                <span className="browser-control-dot" style={{ backgroundColor: '#eab308' }}></span>
                <span className="browser-control-dot" style={{ backgroundColor: '#22c55e' }}></span>
              </div>
              <div className="browser-address-bar">
                {activeTab === 'hospital' && 'https://hospital-website.vercel.app'}
                {activeTab === 'wingsbi' && 'https://wingsbi.com/dashboard'}
                {activeTab === 'xpomatch' && 'https://xpomatch.events/expo2026/dashboard'}
                {activeTab === 'precheck' && 'https://precheck-quality.internal/sop'}
              </div>
            </div>

            {/* Sub-tabs representing code layout / tab navigation */}
            <div className="editor-tabs-minimal">
              <div 
                className={`editor-tab-minimal ${activeTab === 'hospital' ? 'active' : ''}`}
                onClick={() => setActiveTab('hospital')}
              >
                MedFlow.app
              </div>
              <div 
                className={`editor-tab-minimal ${activeTab === 'wingsbi' ? 'active' : ''}`}
                onClick={() => setActiveTab('wingsbi')}
              >
                WingsBI.tsx
              </div>
              <div 
                className={`editor-tab-minimal ${activeTab === 'xpomatch' ? 'active' : ''}`}
                onClick={() => setActiveTab('xpomatch')}
              >
                XpoMatchMatchmaker.tsx
              </div>
              <div 
                className={`editor-tab-minimal ${activeTab === 'precheck' ? 'active' : ''}`}
                onClick={() => setActiveTab('precheck')}
              >
                Precheck.tsx
              </div>
            </div>

            {/* Tab content */}
            <div style={{ position: 'relative' }}>
              {activeTab === 'hospital' && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Live Scrollable iFrame mapping MedFlow clinic website directly */}
                  <div style={{ height: '420px', width: '100%', position: 'relative', overflow: 'hidden', background: '#ffffff' }}>
                    <iframe 
                      src="https://hospital-website-njp0cspyq-shreesh-s-projects.vercel.app/" 
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      title="MedFlow Live App Portal"
                    />
                  </div>

                  {/* Deploy Link Overlay */}
                  <div style={{ background: '#0f172a', padding: '0.65rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.72rem', fontFamily: 'monospace' }}>Deployed to Vercel production</span>
                    <a 
                      href="https://hospital-website-njp0cspyq-shreesh-s-projects.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-outline" 
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.7rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                    >
                      Open in New Tab <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              )}

              {activeTab === 'wingsbi' && (
                <div style={{ padding: '1.25rem', background: '#0f172a', color: '#f8fafc', minHeight: '420px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600 }}>WingsBI — BI Dashboard Platform</h4>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Built with React 18, TypeScript, and Nivo/D3.js charts</p>
                    </div>
                    {/* Razorpay Flow Simulator */}
                    <button 
                      onClick={() => setBiPremium(!biPremium)}
                      style={{ 
                        background: biPremium ? '#10b981' : '#3b82f6', 
                        color: 'white', 
                        fontSize: '0.7rem', 
                        fontWeight: 'bold', 
                        border: 'none', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {biPremium ? 'Razorpay: Premium Unlocked!' : 'Razorpay Checkout: Go Premium'}
                    </button>
                  </div>

                  {/* Interactive Chart Display */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', flex: 1 }}>
                    <div style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '0.75rem', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>interactive_widget.json</span>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <button onClick={() => setChartSelection('bar')} style={{ fontSize: '0.65rem', background: chartSelection === 'bar' ? '#334155' : 'transparent', border: '1px solid #334155', color: 'white', cursor: 'pointer', padding: '0.1rem 0.3rem' }}>Bar</button>
                          <button onClick={() => setChartSelection('pie')} style={{ fontSize: '0.65rem', background: chartSelection === 'pie' ? '#334155' : 'transparent', border: '1px solid #334155', color: 'white', cursor: 'pointer', padding: '0.1rem 0.3rem' }}>Pie</button>
                        </div>
                      </div>
                      
                      {/* Bar/Pie Custom CSS Chart Mockup */}
                      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0.75rem', minHeight: '120px', position: 'relative' }}>
                        {chartSelection === 'bar' ? (
                          <>
                            <div style={{ height: '80%', width: '18px', backgroundColor: '#38bdf8', borderRadius: '2px 2px 0 0' }}></div>
                            <div style={{ height: '40%', width: '18px', backgroundColor: '#a78bfa', borderRadius: '2px 2px 0 0' }}></div>
                            <div style={{ height: '95%', width: '18px', backgroundColor: '#34d399', borderRadius: '2px 2px 0 0' }}></div>
                            <div style={{ height: '60%', width: '18px', backgroundColor: '#fb7185', borderRadius: '2px 2px 0 0' }}></div>
                          </>
                        ) : (
                          <div style={{ 
                            width: '90px', 
                            height: '90px', 
                            borderRadius: '50%', 
                            backgroundImage: 'conic-gradient(#38bdf8 0% 40%, #a78bfa 40% 70%, #34d399 70% 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center'
                          }}>
                            <div style={{ width: '40px', height: '40px', background: '#090d16', borderRadius: '50%' }}></div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Speech query controller */}
                    <div style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Voice Query Hub</span>
                      <button 
                        onClick={() => {
                          setSpeechActive(true);
                          setTimeout(() => setSpeechActive(false), 2000);
                        }}
                        style={{ 
                          background: speechActive ? '#f43f5e' : 'transparent', 
                          border: speechActive ? '1px solid #f43f5e' : '1px solid #e2e8f0', 
                          color: speechActive ? 'white' : '#e2e8f0', 
                          cursor: 'pointer', 
                          padding: '0.4rem', 
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem',
                          fontSize: '0.72rem'
                        }}
                      >
                        <Volume2 size={14} /> {speechActive ? 'Listening...' : 'Activate Voice Input'}
                      </button>
                      {speechActive && (
                        <div style={{ fontSize: '0.68rem', fontStyle: 'italic', color: '#f43f5e', textAlign: 'center', animation: 'log-pulse 0.5s infinite alternate' }}>
                          &quot;Show total revenue metric by region...&quot;
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>React 18</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>Nivo / D3.js</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>Azure MSAL SSO</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>react-grid-layout</span>
                  </div>
                </div>
              )}

              {activeTab === 'xpomatch' && (
                <div style={{ padding: '1.25rem', background: '#090d16', color: '#f8fafc', minHeight: '420px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600 }}>XpoMatch — B2B AI Event Matchmaking</h4>
                      <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Multi-tenant Next.js 14 App Router platform with Microsoft SignalR sync</p>
                    </div>
                    {/* SignalR Match simulator */}
                    <button 
                      onClick={triggerSignalRNotification}
                      style={{ 
                        background: '#e11d48', 
                        color: 'white', 
                        fontSize: '0.7rem', 
                        fontWeight: 'bold', 
                        border: 'none', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Trigger SignalR Match Check
                    </button>
                  </div>

                  {/* Notification Display Area */}
                  {matchNotification && (
                    <div style={{ 
                      background: 'rgba(225, 29, 72, 0.08)', 
                      border: '1px solid rgba(225, 29, 72, 0.3)', 
                      borderRadius: '6px', 
                      padding: '0.6rem 1rem', 
                      fontSize: '0.72rem', 
                      color: '#fda4af',
                      fontFamily: 'monospace',
                      animation: 'log-pulse 0.3s ease-out'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 'bold' }}>
                        <AlertCircle size={12} />
                        <span>SignalR WebSocket Stream:</span>
                      </div>
                      <div style={{ marginTop: '0.2rem' }}>{matchNotification}</div>
                    </div>
                  )}

                  {/* Mock scheduler widget representation */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', flex: 1 }}>
                    <div style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#020617', padding: '0.6rem', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.68rem', color: '#64748b' }}>CORS Middleware Router checks:</span>
                      <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#38bdf8', marginTop: '0.25rem' }}>
                        {`cookieToken check -> VALID\nCORS allowed -> OK`}
                      </div>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#020617', padding: '0.6rem', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Multi-Tenant route format:</span>
                      <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#c084fc', marginTop: '0.25rem' }}>
                        {`/[event-id]/dashboard\n/[event-id]/login`}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>Next.js 14 (App Router)</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>NextAuth.js</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>Microsoft SignalR</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>Framer Motion</span>
                  </div>
                </div>
              )}

              {activeTab === 'precheck' && (
                <div style={{ padding: '1.25rem', background: '#090d16', color: '#f8fafc', minHeight: '420px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1rem', color: 'white', fontWeight: 600 }}>Godrej Precheck — Quality Inspection & Legacy Migration</h4>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Migrated WPF desktop platform to React 18, Vite, and TypeScript</p>
                  </div>

                  {/* Dense tree-table representations */}
                  <div style={{ flex: 1, border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', background: '#020617', padding: '0.75rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.4rem', fontFamily: 'monospace' }}>SOP Assembly Tree Table (react-window optimized)</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                      <div style={{ color: '#38bdf8', borderBottom: '1px solid #1e293b', paddingBottom: '0.15rem' }}>
                        <span>├─ root / assembly_line_01</span>
                      </div>
                      <div style={{ color: '#a78bfa', paddingLeft: '0.75rem' }}>
                        <span>├─ sub / step_01_chassis</span>
                      </div>
                      <div style={{ color: '#cbd5e1', paddingLeft: '1.5rem' }}>
                        <span>├─ doc / sop_doc_rev2.pdf</span>
                      </div>
                      <div style={{ color: '#a78bfa', paddingLeft: '0.75rem' }}>
                        <span>├─ sub / step_02_electrical</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '0.75rem', fontSize: '0.72rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', textAlign: 'center' }}>
                      <div style={{ color: '#34d399', fontWeight: 'bold' }}>100k+ Rows</div>
                      <span style={{ color: '#64748b', fontSize: '0.62rem' }}>Virtual Render</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.5rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '4px', fontFamily: 'monospace' }}>
                      <span style={{ color: '#38bdf8' }}>useMemo</span> + <span style={{ color: '#38bdf8' }}>useCallback</span> active to prevent component lag.
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>Vite HMR</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>Redux Toolkit</span>
                    <span className="skill-badge" style={{ '--badge-accent': '#00e5ff' } as React.CSSProperties}>react-window</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: GenAI & RAG (Hologram Chatbot Theme) */}
        <section id="ai" className="scroll-section" style={{ alignItems: 'flex-start' }}>
          <h2 className="section-title" style={{ '--theme-accent': 'var(--accent-ai)' } as React.CSSProperties}>
            Gen AI & Document Intelligence
          </h2>
          <p className="hero-subtitle" style={{ maxWidth: '520px' }}>
            Designing intelligent conversational layers and context retrieval pipelines for enterprise data.
          </p>

          <div className="ai-panel" style={{ marginTop: '0.5rem', width: '100%' }}>
            <div className="ai-header">
              <span style={{ fontSize: '0.8rem', color: '#e9d5ff', fontWeight: 600 }}>RAG Chatbot Simulator</span>
              <div className="ai-status">
                <span className="ai-status-pulse"></span> Stream Protocol Active
              </div>
            </div>

            {/* Simulated Chatbot Interface */}
            <div style={{ background: 'rgba(0, 0, 0, 0.5)', border: '1px solid rgba(189, 0, 255, 0.15)', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '180px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>👤</div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.8rem', borderRadius: '0 8px 8px 8px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '80%' }}>
                    {activeQuestion === 'wingstalk' && 'How does the WingsTalk RAG pipeline work?'}
                    {activeQuestion === 'qhub' && 'What architecture runs the Qhub service?'}
                    {activeQuestion === 'widget' && 'Tell me about the EventChatbot widget config.'}
                    {!activeQuestion && 'Select a question below to query the AI chatbot...'}
                  </div>
                </div>

                {activeQuestion && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--accent-ai)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot size={12} color="white" />
                    </div>
                    <div style={{ 
                      background: 'rgba(189, 0, 255, 0.08)', 
                      border: '1px solid rgba(189, 0, 255, 0.15)', 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '0 8px 8px 8px', 
                      maxWidth: '85%',
                      fontFamily: 'monospace',
                      fontSize: '0.72rem',
                      lineHeight: '1.4',
                      color: '#faf5ff'
                    }}>
                      {aiAnswer}
                      {typingStatus && <span style={{ animation: 'log-pulse 0.4s infinite alternate', fontWeight: 'bold' }}>█</span>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selector pills representing the projects connected to AI */}
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SELECT SAMPLE CONTEXT QUERY:</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => handleAskChatbot('wingstalk')}
                  disabled={typingStatus}
                  className="btn-outline" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', border: '1px solid rgba(189,0,255,0.3)', background: activeQuestion === 'wingstalk' ? 'rgba(189,0,255,0.1)' : '' }}
                >
                  Query: WingsTalk RAG Pipeline
                </button>
                <button 
                  onClick={() => handleAskChatbot('qhub')}
                  disabled={typingStatus}
                  className="btn-outline" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', border: '1px solid rgba(189,0,255,0.3)', background: activeQuestion === 'qhub' ? 'rgba(189,0,255,0.1)' : '' }}
                >
                  Query: Qhub AI Query Engine
                </button>
                <button 
                  onClick={() => handleAskChatbot('widget')}
                  disabled={typingStatus}
                  className="btn-outline" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', border: '1px solid rgba(189,0,255,0.3)', background: activeQuestion === 'widget' ? 'rgba(189,0,255,0.1)' : '' }}
                >
                  Query: EventChatbot Widget
                </button>
              </div>
            </div>

            {/* AI Stack Summary */}
            <div className="ai-nodes-flow" style={{ marginTop: '1.25rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>AI Component Architectures:</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div className="ai-node-box"><span className="ai-node-title">Vector Search</span><span className="ai-node-tag">pgvector & ChromaDB</span></div>
                <div className="ai-node-box"><span className="ai-node-title">Chunking / Parsing</span><span className="ai-node-tag">LlamaParse & Tesseract</span></div>
                <div className="ai-node-box"><span className="ai-node-title">Framework Connectors</span><span className="ai-node-tag">LangChain & LlamaIndex</span></div>
                <div className="ai-node-box"><span className="ai-node-title">Response Real-Time</span><span className="ai-node-tag">WebSockets Stream</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Backend & DevOps (Engine Blueprint Theme) */}
        <section id="backend" className="scroll-section" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <h2 className="section-title" style={{ '--theme-accent': 'var(--accent-cloud)', alignSelf: 'flex-end' } as React.CSSProperties}>
            The Backend & Cloud Engine
          </h2>
          <p className="hero-subtitle" style={{ alignSelf: 'flex-end', maxWidth: '520px' }}>
            Structuring robust backend APIs, database management schemas, and automated CI/CD cloud deployment pipelines.
          </p>

          <div className="db-blueprint-panel" style={{ marginTop: '1rem', textAlign: 'left', width: '100%' }}>
            <div className="db-blueprint-header">
              <span>Database Entity Schema & Pipeline Diagnostics</span>
              <Cpu size={14} />
            </div>

            {/* Glowing Blueprint table layout */}
            <div className="db-grid-flow">
              <div className="db-table-card">
                <div className="db-table-title">
                  <span>users</span>
                  <span style={{ color: '#00e5ff', fontSize: '0.65rem' }}>SQL Table</span>
                </div>
                <div className="db-table-cols">
                  <div><span className="db-col-pk">id</span> <span className="db-col-type">INT [PK]</span></div>
                  <div><span>email</span> <span className="db-col-type">VARCHAR</span></div>
                  <div><span>sso_provider</span> <span className="db-col-type">VARCHAR</span></div>
                </div>
              </div>

              <div className="db-table-card">
                <div className="db-table-title">
                  <span>embeddings</span>
                  <span style={{ color: '#ff007f', fontSize: '0.65rem' }}>Vector DB</span>
                </div>
                <div className="db-table-cols">
                  <div><span className="db-col-pk">id</span> <span className="db-col-type">INT [PK]</span></div>
                  <div><span>doc_id</span> <span className="db-col-type">INT [FK]</span></div>
                  <div><span>vector</span> <span className="db-col-type">VECTOR(1536)</span></div>
                </div>
              </div>
            </div>

            {/* SQL Simulator Box */}
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', zIndex: 1, position: 'relative' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>DATABASE QUERY CLIENT:</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="e.g. SELECT * FROM embeddings;" 
                  style={{ 
                    flex: 1, 
                    background: 'rgba(0,0,0,0.6)', 
                    border: '1px solid rgba(0, 229, 255, 0.25)', 
                    borderRadius: '4px', 
                    padding: '0.35rem 0.75rem', 
                    fontSize: '0.75rem', 
                    color: 'white',
                    fontFamily: 'monospace'
                  }}
                />
                <button 
                  onClick={handleRunQuery}
                  className="medflow-mock-btn" 
                  style={{ borderRadius: '4px', background: '#00e5ff', color: 'black', fontWeight: 'bold', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Run
                </button>
              </div>
              {queryResult && (
                <div style={{ 
                  background: 'rgba(0, 0, 0, 0.8)', 
                  border: '1px solid rgba(0, 229, 255, 0.15)', 
                  borderRadius: '4px', 
                  padding: '0.5rem 0.75rem', 
                  fontSize: '0.72rem', 
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  color: queryResult.startsWith('[ERROR]') ? '#f87171' : '#34d399'
                }}>
                  {queryResult}
                </div>
              )}
            </div>

            {/* API Console Logs */}
            <div className="pipeline-logs" style={{ marginTop: '1rem' }}>
              <span className="log-line-success">[OK] FastAPI server listening on Gunicorn + Uvicorn logs</span><br/>
              <span className="log-line-success">[OK] SQL Server & postgres schema models (SQLAlchemy) successfully mapped</span><br/>
              <span className="log-line-running">[RUN] SeaweedFS token storage signed validation check...</span>
            </div>
          </div>
        </section>

        {/* Section 6: Experience & Education (Timeline) */}
        <section id="experience" className="scroll-section" style={{ alignItems: 'flex-start' }}>
          <h2 className="section-title" style={{ '--theme-accent': '#ffffff' } as React.CSSProperties}>
            Professional Timeline
          </h2>
          
          <div className="timeline-container" style={{ marginTop: '1.5rem', width: '100%' }}>
            {/* Experience Item */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">2023 - 2026</div>
              <h3 className="timeline-title">Software Engineering Analyst @ WingsBI</h3>
              <div className="timeline-subtitle" style={{ color: 'var(--accent-editor)', fontWeight: 500 }}>
                Enterprise Full Stack & Frontend Engineering (3 Years)
              </div>
              <div className="timeline-content">
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>Maintained and delivered 10+ business production-deployed applications (Meetings, Matchmaking, Analytics, Booking).</li>
                  <li>Configured clean Redux Toolkit & Context global state setups and connected REST API endpoints.</li>
                  <li>Built chart modules using Nivo, Recharts, and D3.js with 40% performance gains via code splitting and memoization.</li>
                  <li>Deployed production bundles using Azure DevOps pipelines, Docker containers, and Azure Kubernetes Service (AKS).</li>
                </ul>
              </div>
            </div>

            {/* Education Item */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-date">Graduated June 2023</div>
              <h3 className="timeline-title">Bachelor of Engineering (B.E.)</h3>
              <div className="timeline-subtitle" style={{ color: 'var(--accent-terminal)', fontWeight: 500 }}>
                Computer Technology
              </div>
              <div className="timeline-content">
                Yeshwantrao Chavan College of Engineering (YCCE), Nagpur.<br />
                Acquired solid foundations in computing principles, relational databases, data structures, and algorithms.
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Contact & Call to Action (Beacon Theme) */}
        <section id="contact" className="scroll-section" style={{ alignItems: 'center', textAlign: 'center' }}>
          <h2 className="section-title" style={{ '--theme-accent': 'var(--accent-editor)' } as React.CSSProperties}>
            Let&apos;s Build Together
          </h2>
          <p className="hero-subtitle" style={{ alignSelf: 'center', maxWidth: '600px', marginBottom: '2rem' }}>
            Looking for a dedicated Software Developer or GenAI Engineer? Let&apos;s talk about your next project.
          </p>

          

          
       

          <div style={{ 
            background: 'rgba(5, 5, 5, 0.7)', 
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '12px',
            padding: '2.5rem', 
            width: '100%', 
            maxWidth: '650px',
            boxShadow: '0 8px 32px rgba(0, 229, 255, 0.05)',
            backdropFilter: 'blur(8px)',
            marginBottom: '4rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'Playfair Display' }}>
              Contact Information
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
              <a href="mailto:kawathekarshreesh@gmail.com" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                <Mail size={16} /> kawathekarshreesh@gmail.com
              </a>
              <a href="tel:+919403454896" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                <Phone size={16} /> +91 9403454896
              </a>
              <div className="btn-outline" style={{ width: '100%', justifyContent: 'center', cursor: 'default' }}>
                <Send size={16} /> Pune, Maharashtra, India
              </div>
            </div>
          </div>

          {/* Footer branding */}
          <div style={{ color: '#555', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <span>© {new Date().getFullYear()} Shreesh Vivek Kawathekar</span>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="https://github.com/Shreesh2000" target="_blank" rel="noopener noreferrer" style={{ color: '#555', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                <GithubIcon size={16} />
              </a>
              <a href="https://www.linkedin.com/in/shreesh-kawathekar-28490a196/" target="_blank" rel="noopener noreferrer" style={{ color: '#555', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#555'}>
                <LinkedinIcon size={16} />
              </a>
            </div>
          </div>
        </section>

      </main>
    </CinematicScene>
  );
}
