'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ExternalLink,
  Mail,
  Phone,
  Terminal,
  Cpu,
  Send,
  Bot,
  MapPin,
  ChevronRight,
  Sparkles,
  Briefcase,
  GraduationCap,
  Menu,
  X,
  Maximize2,
  Database,
  Activity,
  Code,
  Calendar,
  BookOpen,
} from 'lucide-react';
import ImacShowcase, { type ShowcaseProject } from '@/components/ImacShowcase';
import ProjectDetailModal from '@/components/ProjectDetailModal';
import SkillVisualPanel from '@/components/SkillVisualPanel';
import SiteFooter from '@/components/SiteFooter';

const CinematicScene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div style={{ position: 'fixed', inset: 0, background: '#04060d', zIndex: -1 }}>
      <div className="ambient-orbs" aria-hidden="true">
        <div className="orb orb-mint" />
        <div className="orb orb-sky" />
        <div className="orb orb-violet" />
      </div>
    </div>
  )
});
const WingsAnalyticsDemo = dynamic(() => import('@/components/WingsAnalyticsDemo'), { ssr: false });
const PrecheckDemo = dynamic(() => import('@/components/PrecheckDemo'), { ssr: false });
const WibiDemo = dynamic(() => import('@/components/WibiDemo'), { ssr: false });
const WingsTalkDemo = dynamic(() => import('@/components/WingsTalkDemo'), { ssr: false });
const MeetingHubDemo = dynamic(() => import('@/components/MeetingHubDemo'), { ssr: false });
const ShipTrackingDemo = dynamic(() => import('@/components/ShipTrackingDemo'), { ssr: false });
import { ScrollReveal, ScrollItem } from '@/components/ScrollReveal';
import {
  profile,
  stats,
  skillCategories,
  projects,
  experience,
  aiResponses,
  type SkillCategoryId,
  type ProjectId,
} from '@/data/resume';

const GithubIcon = ({ size = 24, ...props }: { size?: number; [key: string]: unknown }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 4.88c.1-.28.4-1.32-.1-2.73 0 0-1.2-.38-3.9 1.45a13.3 13.3 0 0 0-7 0C5.3 1.77 4.1 2.15 4.1 2.15c-.5 1.41-.2 2.45-.1 2.73A5.1 5.1 0 0 0 2.5 7.6c0 5.76 3.35 6.78 6.5 7.16A4.8 4.8 0 0 0 8 18v4" />
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }: { size?: number; [key: string]: unknown }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ── Professional animation system ──
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-value">
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [activeSkillCat, setActiveSkillCat] = useState<SkillCategoryId>('frontend');
  const [activeProject, setActiveProject] = useState<ProjectId>('medflow');
  const [navOpen, setNavOpen] = useState(false);
  const [detailProject, setDetailProject] = useState<ProjectId | null>(null);

  const [activeQuestion, setActiveQuestion] = useState<'wingstalk' | 'pipeline' | 'analytics' | null>(null);
  const [aiAnswer, setAiAnswer] = useState('');
  const [typingStatus, setTypingStatus] = useState(false);

  const activeCategory = skillCategories.find((c) => c.id === activeSkillCat)!;
  const showcaseProjects = projects as unknown as ShowcaseProject[];
  const detailProjectData = detailProject ? showcaseProjects.find((p) => p.id === detailProject) ?? null : null;

  const renderProjectDemo = (projectId: ProjectId): React.ReactNode => {
    switch (projectId) {
      case 'medflow':
        return (
          <div className="ui-mockup" style={{ display: 'flex', height: '100%', background: '#f8fafc', color: '#0f172a', fontSize: '0.7rem' }}>
            <div style={{ width: '80px', background: '#1e293b', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '12px', color: '#94a3b8' }}>
              <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>MedFlow</div>
              <div>🏠 Dashboard</div>
              <div>📅 Appts</div>
              <div>👥 Patients</div>
            </div>
            <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>Doctor Dashboard</span>
                <span style={{ background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>Dr. Smith</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div style={{ background: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#64748b' }}>Today&apos;s Patients</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a' }}>24</div>
                </div>
                <div style={{ background: 'white', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#64748b' }}>Pending Reports</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ef4444' }}>7</div>
                </div>
              </div>
              <div style={{ background: 'white', flex: 1, borderRadius: '6px', border: '1px solid #e2e8f0', padding: '8px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>Upcoming Appointments</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span>10:00 AM - John Doe</span><span style={{ color: '#10b981' }}>Confirmed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span>10:30 AM - Sarah Connor</span><span style={{ color: '#f59e0b' }}>Waiting</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'wingstalk':
        return <WingsTalkDemo />;

      case 'wibi':
        return <WibiDemo />;

      case 'meetinghub':
        return <MeetingHubDemo />;

      case 'analytics':
        return <WingsAnalyticsDemo />;

      case 'qhub':
        return (
          <div className="ui-mockup" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f172a', padding: '12px', color: '#e2e8f0', fontSize: '0.7rem' }}>
            <div style={{ color: '#22d3ee', fontWeight: 'bold', marginBottom: '8px' }}>QHub NL-to-SQL Studio</div>
            <div style={{ background: '#1e293b', padding: '8px', borderRadius: '4px', border: '1px solid #334155', marginBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Query: </span> Show total revenue by department this quarter
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ background: '#020617', padding: '8px', borderRadius: '4px', border: '1px solid #22d3ee', color: '#38bdf8', fontFamily: 'monospace' }}>
              SELECT department, SUM(revenue)<br/>FROM sales<br/>WHERE quarter = &apos;Q2&apos;<br/>GROUP BY department<br/>ORDER BY 2 DESC;
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ marginTop: 'auto', background: '#1e293b', padding: '8px', borderRadius: '4px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead><tr><th style={{ borderBottom: '1px solid #334155', paddingBottom: '4px' }}>department</th><th style={{ borderBottom: '1px solid #334155', paddingBottom: '4px' }}>sum</th></tr></thead>
                <tbody>
                  <tr><td style={{ paddingTop: '4px' }}>Enterprise</td><td style={{ paddingTop: '4px' }}>$1,240,000</td></tr>
                  <tr><td>SMB</td><td>$840,000</td></tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        );

      case 'precheck':
        return <PrecheckDemo />;

      case 'shiptracking':
        return <ShipTrackingDemo />;

      default:
        return null;
    }
  };

  const handleAskChatbot = useCallback((question: 'wingstalk' | 'pipeline' | 'analytics') => {
    if (typingStatus) return;
    setActiveQuestion(question);
    setTypingStatus(true);
    setAiAnswer('');
    const fullText = aiResponses[question];
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setAiAnswer((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTypingStatus(false);
      }
    }, 12);
  }, [typingStatus]);





  return (
    <CinematicScene>
      <div className="ambient-orbs" aria-hidden="true">
        <div className="orb orb-mint" />
        <div className="orb orb-sky" />
        <div className="orb orb-violet" />
      </div>

      <main>
        <header className="nav-header">
          <div className="nav-header-container">
            <Link href="/" className="nav-logo" onClick={() => setNavOpen(false)}>
              SK
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label={navOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={navOpen}
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <nav className={`nav-links ${navOpen ? 'open' : ''}`}>
              <a href="#profile" className="nav-link" onClick={() => setNavOpen(false)}>About</a>
              <a href="#skills" className="nav-link" onClick={() => setNavOpen(false)}>Skills</a>
              <a href="#projects" className="nav-link" onClick={() => setNavOpen(false)}>Projects</a>
              <a href="#ai" className="nav-link" onClick={() => setNavOpen(false)}>AI / RAG</a>
              <a href="#experience" className="nav-link" onClick={() => setNavOpen(false)}>Experience</a>
              <a href="#education" className="nav-link" onClick={() => setNavOpen(false)}>Education</a>
              <a href="#contact" className="nav-link" onClick={() => setNavOpen(false)}>Contact</a>
            </nav>
          </div>
          {navOpen && <div className="nav-backdrop" onClick={() => setNavOpen(false)} aria-hidden="true" />}
        </header>

        {/* ── HERO ── */}
        <section id="profile" className="scroll-section hero-section">
          <div className="hero-backdrop" aria-hidden="true">
            <motion.div
              className="hero-backdrop-photo"
              initial={{ opacity: 0, scale: 1.08, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <Image
                src="/shreesh-profile.png"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className="hero-backdrop-img"
              />
            </motion.div>
            <div className="hero-backdrop-mesh" />
            <div className="hero-backdrop-vignette" />
          </div>

          <motion.div
            className="section-content-wrapper hero-layout"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="hero-content">
              <motion.div className="hero-badge" variants={fadeUp}>
                <Sparkles size={12} /> Software Engineer · Full-Stack · GenAI
              </motion.div>

              <motion.h1 className="hero-title" variants={fadeUp}>
                Hi, I&apos;m{' '}
                <span className="hero-gradient-text">{profile.name.split(' ')[0]}</span>
              </motion.h1>

              <motion.p className="hero-role" variants={fadeUp}>
                {profile.role} · {profile.yearsExperience} years building production apps
              </motion.p>

              <motion.p className="hero-subtitle" variants={fadeUp}>
                {profile.summary}
              </motion.p>

              <motion.div className="hero-highlights" variants={fadeUp}>
                {profile.highlights.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="hero-chip"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.28 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      borderColor: 'rgba(45,212,191,0.5)',
                      color: 'var(--accent-primary)',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div className="stats-grid" variants={scaleIn}>
                {stats.map((s) => (
                  <motion.div
                    key={s.label}
                    className="stat-card"
                    whileHover={{ y: -6, borderColor: 'rgba(45,212,191,0.5)', boxShadow: '0 16px 40px rgba(45,212,191,0.15)' }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                    <span className="stat-label">{s.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="hero-contact-row" variants={fadeUp}>
                <a href={`mailto:${profile.email}`} className="btn-primary">
                  <Mail size={15} /> Email Me
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  <GithubIcon size={15} /> GitHub
                </a>
              </motion.div>

              <motion.div className="hero-meta-row" variants={fadeUp}>
                <span><MapPin size={13} /> {profile.location}</span>
                <span><Mail size={13} /> {profile.email}</span>
                <span><Phone size={13} /> {profile.phone}</span>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ── SKILLS / LINUX ── */}
        <section id="skills" className="scroll-section scroll-section-left">
          <ScrollReveal className="section-block">
            <ScrollItem>
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ '--theme-accent': 'var(--accent-terminal)' } as React.CSSProperties}
              >
                Skills &amp; Linux Stack
              </motion.h2>
              <p className="section-desc">
                Linux terminal explorer — pick a category to load skills. The CRT monitor in the background appears only on this section.
              </p>
            </ScrollItem>

            <div className="skill-explorer">
              <ScrollItem className="skill-left-col">
                <div className="skill-category-list">
                  {skillCategories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      type="button"
                      className={`skill-category-btn ${activeSkillCat === cat.id ? 'active' : ''}`}
                      onClick={() => setActiveSkillCat(cat.id)}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.97 }}
                      layout
                    >
                      <span className="skill-cat-icon">{cat.icon}</span>
                      {cat.label}
                      <ChevronRight size={14} className="skill-cat-arrow" />
                    </motion.button>
                  ))}
                </div>

                <div className="terminal-panel skill-terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="terminal-dot active" />
                      <div className="terminal-dot active" />
                      <div className="terminal-dot active" />
                    </div>
                    <span>shreesh@linux-core:~</span>
                    <Terminal size={14} color="#005500" />
                  </div>
                  <div className="terminal-prompt">
                    <span className="terminal-prompt-user">shreesh@ubuntu:~$</span>{' '}
                    <span className="terminal-command">cat {activeSkillCat}_skills.json</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSkillCat}
                      className="skill-pill-grid"
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -6, transition: { duration: 0.18 } }}
                      variants={staggerContainer}
                    >
                      {activeCategory.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="skill-pill"
                          variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 8 },
                            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }
                          }}
                          whileHover={{ scale: 1.07, y: -2, transition: { duration: 0.15 } }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </ScrollItem>

              <ScrollItem className="skill-right-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkillCat}
                    className="skill-visual-wrap"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SkillVisualPanel categoryId={activeSkillCat} />
                  </motion.div>
                </AnimatePresence>
              </ScrollItem>
            </div>
          </ScrollReveal>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="scroll-section scroll-section-wide">
          <ScrollReveal className="section-block section-block-center">
            <ScrollItem>
              <motion.h2
                className="section-title section-title-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ '--theme-accent': 'var(--accent-editor)' } as React.CSSProperties}
              >
                Featured Projects
              </motion.h2>
              <p className="section-desc section-desc-center">
                Click a card or the iMac to enter the nested project showcase — live demos load inside the display.
              </p>
            </ScrollItem>

            <ScrollItem>
              <motion.div
                className="project-cards-grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                {showcaseProjects.map((p) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    className={`project-card ${activeProject === p.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveProject(p.id);
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.96 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      transition: { type: 'spring', stiffness: 350, damping: 18 }
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{ '--card-accent': p.accent } as React.CSSProperties}
                  >
                    <span className="project-card-name">{p.name}</span>
                    <span className="project-card-sub">{p.subtitle}</span>
                    <span className="project-card-cta"><Maximize2 size={12} /> Open showcase</span>
                  </motion.button>
                ))}
              </motion.div>
            </ScrollItem>

            <ScrollItem>
              <ImacShowcase
                projects={showcaseProjects}
                activeId={activeProject}
                onSelect={setActiveProject}
                onExplore={() => {}}
              >
                {!showcaseProjects.find((p) => p.id === activeProject)?.deployUrl && renderProjectDemo(activeProject)}
              </ImacShowcase>
            </ScrollItem>
          </ScrollReveal>
        </section>

        {/* ── AI / RAG ── */}
        <section id="ai" className="scroll-section scroll-section-left">
          <motion.div
            className="section-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ '--theme-accent': 'var(--accent-ai)' } as React.CSSProperties}
            >
              AI & RAG Intelligence
            </motion.h2>
            <p className="section-desc">Try the chatbot simulator — ask about real project architectures.</p>

            <div className="ai-panel">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="ai-header">
                  <span className="ai-header-title">RAG Chatbot Simulator</span>
                  <div className="ai-status">
                    <span className="ai-status-pulse" /> Live Stream
                  </div>
                </div>

                <div className="chatbot-interface" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '220px' }}>
                  <div className="chat-msg user-msg">
                    <div className="chat-avatar">👤</div>
                    <div className="chat-bubble">
                      {activeQuestion === 'wingstalk' && 'How does the WingsTalk RAG pipeline work?'}
                      {activeQuestion === 'pipeline' && 'What is the full deployment architecture?'}
                      {activeQuestion === 'analytics' && 'How was WingsBI Analytics built?'}
                      {!activeQuestion && 'Pick a query below to start…'}
                    </div>
                  </div>
                  {activeQuestion && (
                    <div className="chat-msg bot-msg">
                      <div className="chat-avatar bot"><Bot size={12} color="white" /></div>
                      <div className="chat-bubble bot-bubble">
                        {aiAnswer}
                        {typingStatus && <span className="cursor-blink">█</span>}
                      </div>
                    </div>
                  )}
                </div>

                <div className="ai-query-btns">
                  {(['wingstalk', 'pipeline', 'analytics'] as const).map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleAskChatbot(q)}
                      disabled={typingStatus}
                      className={`ai-query-btn ${activeQuestion === q ? 'active' : ''}`}
                    >
                      {q === 'wingstalk' && 'WingsTalk RAG'}
                      {q === 'pipeline' && 'Deploy Stack'}
                      {q === 'analytics' && 'BI Dashboard'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="ai-nodes-flow">
                  <span className="ai-nodes-label">Architecture Nodes</span>
                  <div className="ai-nodes-grid">
                    {[
                      { title: 'Vector Search', tag: 'PGVector' },
                      { title: 'Embeddings', tag: 'HuggingFace' },
                      { title: 'Orchestration', tag: 'LangChain' },
                      { title: 'LLM', tag: 'Azure OpenAI' },
                    ].map((node, i) => (
                      <motion.div
                        key={node.title}
                        className="ai-node-box"
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ x: 8, borderColor: 'rgba(189,0,255,0.5)', transition: { duration: 0.2 } }}
                      >
                        <span className="ai-node-title">{node.title}</span>
                        <span className="ai-node-tag">{node.tag}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="scroll-section scroll-section-right">
          <motion.div
            className="section-block section-block-right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ '--theme-accent': 'var(--accent-cloud)' } as React.CSSProperties}
            >
              Professional Experience
            </motion.h2>

            <div className="experience-interactive-layout">
              <div className="experience-role-info" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(15,23,42,0.6)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(148,163,184,0.1)', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #0ea5e9, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={24} color="white" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#f8fafc' }}>{experience.title}</h3>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>{experience.company}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ color: '#0ea5e9', fontSize: '0.85rem', fontWeight: 'bold' }}>{experience.period}</span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{experience.location}</span>
                </div>
                <p style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Leading full-stack engineering and AI architecture for enterprise solutions. Specialized in building complex RAG pipelines, real-time matchmaking engines, and robust cloud deployments.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                  {['Azure', 'FastAPI', 'Next.js 14', 'PGVector', 'SignalR'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(14,165,233,0.1)', color: '#38bdf8', border: '1px solid rgba(14,165,233,0.3)', padding: '4px 10px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 'bold' }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="experience-interactive-grid">
                <motion.div whileHover={{ y: -4, scale: 1.02 }} style={{ background: 'rgba(15,23,42,0.4)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(236,72,153,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h4 style={{ margin: 0, color: '#f472b6', fontSize: '1.1rem' }}>Enterprise RAG Engine</h4>
                    <Database size={20} color="#f472b6" />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>Architected WingsTalk pipeline integrating LangChain, PGVector, and Azure OpenAI to serve thousands of documents.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ color: '#fbcfe8', fontSize: '1.5rem', fontWeight: 'bold' }}>20+</div>
                    <div style={{ color: '#f472b6', fontSize: '0.75rem' }}>Service Modules</div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -4, scale: 1.02 }} style={{ background: 'rgba(15,23,42,0.4)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(56,189,248,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '1.1rem' }}>Real-time SignalR Hub</h4>
                    <Activity size={20} color="#38bdf8" />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>Engineered Meeting Hub across 6 microservices with Next.js 14 and C# .NET for live B2B matchmaking.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ color: '#bae6fd', fontSize: '1.5rem', fontWeight: 'bold' }}>Sub-sec</div>
                    <div style={{ color: '#38bdf8', fontSize: '0.75rem' }}>Sync Latency</div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -4, scale: 1.02 }} style={{ background: 'rgba(15,23,42,0.4)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h4 style={{ margin: 0, color: '#10b981', fontSize: '1.1rem' }}>NL-to-SQL Studio</h4>
                    <Code size={20} color="#10b981" />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>Built QHub: translating natural language into PostgreSQL queries with automatic D3.js visualization.</p>
                  <div style={{ display: 'flex', gap: '4px', marginTop: 'auto' }}>
                    {['PostgreSQL', 'MySQL', 'SQL Server'].map(db => (
                      <span key={db} style={{ background: '#022c22', color: '#10b981', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px' }}>{db}</span>
                    ))}
                  </div>
                </motion.div>

                <motion.div whileHover={{ y: -4, scale: 1.02 }} style={{ background: 'rgba(15,23,42,0.4)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(167,139,250,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h4 style={{ margin: 0, color: '#a78bfa', fontSize: '1.1rem' }}>Cloud Architecture</h4>
                    <Cpu size={20} color="#a78bfa" />
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>Deployed all systems via Azure DevOps CI/CD to Docker, ACR, and Azure App Service environments.</p>
                  <div style={{ width: '100%', height: '4px', background: '#2e1065', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} style={{ width: '50%', height: '100%', background: '#a78bfa' }} />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="db-blueprint-panel cloud-panel">
              <div className="db-blueprint-header">
                <span>Cloud & DevOps Toolkit</span>
                <Cpu size={14} />
              </div>
              <motion.div
                className="cloud-grid"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {['Azure App Service', 'Docker', 'ACR', 'Azure DevOps', 'CI/CD YAML', 'GitHub Actions', 'Nginx', 'Gunicorn'].map((tool) => (
                  <motion.div
                    key={tool}
                    className="cloud-chip"
                    variants={{
                      hidden: { opacity: 0, scale: 0.85 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
                    }}
                    whileHover={{ scale: 1.06, borderColor: 'rgba(34,211,238,0.5)', transition: { duration: 0.15 } }}
                  >
                    {tool}
                  </motion.div>
                ))}
              </motion.div>
              <div className="pipeline-logs">
                <span className="log-line-success">[OK] FastAPI + Uvicorn running</span><br />
                <span className="log-line-success">[OK] Azure DevOps pipeline → ACR deploy</span><br />
                <span className="log-line-running">[RUN] SeaweedFS token validation…</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" className="edu-timeline-section">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <motion.div
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)', color: '#22d3ee', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '1rem' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <GraduationCap size={14} /> Academic Background
            </motion.div>
            
            <motion.h2
              className="edu-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Education
            </motion.h2>
            
            <motion.p
              style={{ color: '#94a3b8', marginTop: '1rem', fontSize: '1.1rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              From foundation to engineering — a decade of learning
            </motion.p>
          </div>

          <div className="edu-carousel-container">
            {/* ENTRY 1: School */}
            <motion.div
              className="edu-timeline-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="edu-card-image-wrap">
                <Image
                  src="/school-real.jpg"
                  alt="St. Aloysius School"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="edu-card-image-overlay" />
                <div className="edu-card-logo-wrap">
                  <Image src="/school-logo.png" alt="Logo" width={48} height={48} style={{ objectFit: 'contain' }} />
                </div>
              </div>
              <div className="edu-card-body">
                <h3 className="edu-card-title">SSC (10th)</h3>
                <p className="edu-card-inst">St. Aloysius School</p>
                <div className="edu-card-meta">
                  <span className="edu-pill"><Calendar size={14} /> Passed Out: 2016</span>
                  <span className="edu-pill"><MapPin size={14} /> Yavatmal, Maharashtra</span>
                </div>
              </div>
            </motion.div>

            {/* ENTRY 2: Junior College */}
            <motion.div
              className="edu-timeline-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="edu-card-image-wrap">
                <Image
                  src="/school-real-2.jpg"
                  alt="Wadhwani College"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="edu-card-image-overlay" />
                <div className="edu-card-logo-wrap">
                  <GraduationCap size={32} color="#00d4d4" />
                </div>
              </div>
              <div className="edu-card-body">
                <h3 className="edu-card-title">HSC (12th) — Science</h3>
                <p className="edu-card-inst">Wadhwani Junior College</p>
                <div className="edu-card-meta">
                  <span className="edu-pill"><Calendar size={14} /> Passed Out: 2018</span>
                  <span className="edu-pill highlight"><BookOpen size={14} /> Vocational: Computer Science</span>
                  <span className="edu-pill"><MapPin size={14} /> Yavatmal, Maharashtra</span>
                </div>
              </div>
            </motion.div>

            {/* ENTRY 3: Engineering College */}
            <motion.div
              className="edu-timeline-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              <div className="edu-card-image-wrap">
                <Image
                  src="/college-gate.png"
                  alt="YCCE College"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="edu-card-image-overlay" />
                <div className="edu-card-logo-wrap">
                  <Briefcase size={32} color="#00d4d4" />
                </div>
              </div>
              <div className="edu-card-body">
                <h3 className="edu-card-title">B.E. Computer Technology</h3>
                <p className="edu-card-inst">YCCE</p>
                <div className="edu-card-meta">
                  <span className="edu-pill"><Calendar size={14} /> Class of 2023</span>
                  <span className="edu-pill highlight"><BookOpen size={14} /> DSA, OS, DBMS, CN</span>
                  <span className="edu-pill"><MapPin size={14} /> Nagpur, Maharashtra</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="edu-timeline-fade-bottom" />
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="scroll-section scroll-section-center">
          <ScrollReveal className="contact-section">
            <ScrollItem>
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ '--theme-accent': 'var(--accent-editor)' } as React.CSSProperties}
              >
                Let&apos;s Build Together
              </motion.h2>
              <p className="section-desc section-desc-center">
                Software Engineer based in Pune — open to full-stack, frontend, and AI engineering roles.
              </p>
            </ScrollItem>

            <ScrollItem>
              <motion.div
                className="contact-card-responsive"
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  flexWrap: 'wrap',
                  background: 'rgba(15,23,42,0.6)', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  borderRadius: '24px', 
                  width: '100%',
                  maxWidth: '900px',
                  margin: '0 auto',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}
              >
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1rem', border: '2px solid rgba(34,211,238,0.3)', boxShadow: '0 0 30px rgba(34,211,238,0.2)' }}>
                  <Image src="/shreesh-profile.png" alt="" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                </div>
                  <h3 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{profile.name}</h3>
                  <p style={{ margin: 0, color: '#38bdf8', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{profile.role}</p>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '1rem', maxWidth: '300px' }}>
                    Let&apos;s discuss how we can build high-performance systems and intelligent AI solutions together.
                  </p>
                </div>

                <motion.div
                  style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { href: `mailto:${profile.email}`, icon: <Mail size={18} color="#22d3ee"/>, label: profile.email },
                    { href: `tel:${profile.phone}`, icon: <Phone size={18} color="#22d3ee"/>, label: profile.phone },
                    { href: profile.linkedin, icon: <LinkedinIcon size={18} color="#22d3ee"/>, label: 'LinkedIn Profile', external: true },
                    { label: `${profile.location}, India`, icon: <Send size={18} color="#22d3ee"/>, isStatic: true },
                  ].map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.isStatic ? undefined : item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem 1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', color: '#e2e8f0', textDecoration: 'none', cursor: item.isStatic ? 'default' : 'pointer' }}
                      variants={fadeUp}
                      whileHover={{ x: 6, background: 'rgba(34,211,238,0.05)', borderColor: 'rgba(34,211,238,0.3)', transition: { duration: 0.2 } }}
                    >
                      {item.icon} <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</span>
                    </motion.a>
                  ))}
                  <motion.a 
                    href={`mailto:${profile.email}`}
                    style={{ marginTop: '0.5rem', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: 'white', padding: '1.2rem', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 20px rgba(37,99,235,0.2)' }}
                    whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(37,99,235,0.4)', transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start a Conversation <ExternalLink size={18} />
                  </motion.a>
                </motion.div>
              </motion.div>
            </ScrollItem>

          </ScrollReveal>
        </section>
        
        <SiteFooter />
      </main>

      <ProjectDetailModal
        project={detailProjectData}
        onClose={() => setDetailProject(null)}
      >
        {detailProject && !detailProjectData?.deployUrl && renderProjectDemo(detailProject)}
      </ProjectDetailModal>
    </CinematicScene>
  );
}
