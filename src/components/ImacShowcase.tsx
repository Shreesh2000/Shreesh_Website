'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectId } from '@/data/resume';

export type ShowcaseProject = {
  id: ProjectId;
  name: string;
  subtitle: string;
  stack: readonly string[];
  bullets: readonly string[];
  accent: string;
  deployUrl?: string;
  deployPlatform?: 'Vercel' | 'Azure' | 'Enterprise';
};

type ImacShowcaseProps = {
  projects: readonly ShowcaseProject[];
  activeId: ProjectId;
  onSelect: (id: ProjectId) => void;
  onExplore?: (id: ProjectId) => void;
  children?: React.ReactNode;
};

type DeviceType = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'tv';

function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>('desktop');

  useEffect(() => {
    function detect() {
      const w = window.innerWidth;
      if (w <= 768) return 'phone';
      if (w <= 1024) return 'tablet';
      if (w <= 1440) return 'laptop';
      if (w <= 1919) return 'desktop';
      return 'tv';
    }
    setDevice(detect());
    const handleResize = () => setDevice(detect());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

/* Apple logo SVG path */
const appleLogo = (
  <svg className="device-logo" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

/* ── Device Frame Components ── */

function IPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="device-frame device-iphone">
      <div className="iphone-notch" aria-hidden="true">
        <div className="iphone-notch-camera" />
      </div>
      <div className="device-screen">{children}</div>
      <div className="iphone-home-bar" aria-hidden="true" />
    </div>
  );
}

function IPadFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="device-frame device-ipad">
      <div className="ipad-camera" aria-hidden="true" />
      <div className="device-screen">{children}</div>
    </div>
  );
}

function MacBookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="device-frame device-macbook">
      <div className="macbook-display">
        <div className="macbook-camera" aria-hidden="true" />
        <div className="device-screen">{children}</div>
      </div>
      <div className="macbook-base">
        <div className="macbook-notch" />
        <div className="macbook-trackpad" />
      </div>
      <div className="macbook-lip" />
    </div>
  );
}

function ImacFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="device-frame device-imac">
      <div className="imac-enclosure">
        <div className="imac-screen-frame">
          <div className="imac-camera-dot" aria-hidden="true" />
          {children}
        </div>
        <div className="imac-chin">{appleLogo}</div>
      </div>
      <div className="imac-neck" />
      <div className="imac-foot" />
    </div>
  );
}

function TVFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="device-frame device-tv">
      <div className="tv-bezel">
        <div className="device-screen">{children}</div>
      </div>
      <div className="tv-stand-neck" />
      <div className="tv-stand-base" />
    </div>
  );
}

export default function ImacShowcase({ projects, activeId, onSelect, onExplore, children }: ImacShowcaseProps) {
  const active = projects.find((p) => p.id === activeId)!;
  const hasLivePreview = Boolean(active.deployUrl);
  const deviceType = useDeviceType();

  const screenContent = (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeId}
        className="imac-screen-viewport"
        initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.99 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.01 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {hasLivePreview ? (
          <iframe
            src={active.deployUrl}
            title={`${active.name} live preview`}
            className="imac-iframe"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          <div className="imac-fallback-screen" style={{ '--screen-accent': active.accent, padding: 0 } as React.CSSProperties}>
            <div className="imac-browser-bar" style={{ display: 'flex', gap: '6px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fb7185' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#34d399' }} />
            </div>
            <div className="imac-fallback-content" style={{ height: 'calc(100% - 32px)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  const renderDeviceFrame = () => {
    switch (deviceType) {
      case 'phone':
        return <IPhoneFrame>{screenContent}</IPhoneFrame>;
      case 'tablet':
        return <IPadFrame>{screenContent}</IPadFrame>;
      case 'laptop':
        return <MacBookFrame>{screenContent}</MacBookFrame>;
      case 'tv':
        return <TVFrame>{screenContent}</TVFrame>;
      case 'desktop':
      default:
        return <ImacFrame>{screenContent}</ImacFrame>;
    }
  };

  return (
    <div className="imac-showcase">
      <div className="imac-project-tabs" role="tablist">
        {projects.map((p) => (
          <motion.button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={activeId === p.id}
            className={`imac-project-tab ${activeId === p.id ? 'active' : ''}`}
            onClick={() => onSelect(p.id)}
            whileHover={{ scale: 1.04, y: -1, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.96 }}
            style={activeId === p.id ? ({ '--tab-accent': p.accent } as React.CSSProperties) : undefined}
            layout
          >
            {p.name}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="device-showcase-wrapper"
        onClick={() => onExplore?.(activeId)}
        onKeyDown={(e) => e.key === 'Enter' && onExplore?.(activeId)}
        role={onExplore ? 'button' : undefined}
        tabIndex={onExplore ? 0 : undefined}
        aria-label={onExplore ? `Open ${active.name} full view` : undefined}
        whileHover={{ y: -4, transition: { duration: 0.4, ease: 'easeOut' } }}
        transition={{ duration: 0.3 }}
      >
        {renderDeviceFrame()}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          className="imac-details"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="imac-details-header">
            <div>
              <h3 className="imac-details-title">{active.name}</h3>
              <p className="imac-details-subtitle">{active.subtitle}</p>
            </div>
            {active.deployUrl && (
              <a
                href={active.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="imac-open-btn"
              >
                Open Live Site <ExternalLink size={13} />
              </a>
            )}
          </div>
          <ul className="imac-details-bullets">
            {active.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <motion.div
            className="imac-stack-row"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {active.stack.map((t) => (
              <motion.span
                key={t}
                className="skill-badge"
                variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }}
                whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.15 } }}
                style={{ '--badge-accent': active.accent } as React.CSSProperties}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
          {onExplore && (
            <button type="button" className="imac-explore-btn" onClick={(e) => { e.stopPropagation(); onExplore(activeId); }}>
              <Maximize2 size={14} /> Enter Project Showcase
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
