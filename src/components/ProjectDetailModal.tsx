'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Maximize2 } from 'lucide-react';
import type { ShowcaseProject } from './ImacShowcase';

type ProjectDetailModalProps = {
  project: ShowcaseProject | null;
  onClose: () => void;
  children?: React.ReactNode;
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export default function ProjectDetailModal({ project, onClose, children }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal"
            initial={{ opacity: 0, y: 60, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 30, scale: 0.97, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} project details`}
          >
            <div className="project-modal-header">
              <div>
                <span className="project-modal-eyebrow">
                  <Maximize2 size={12} /> Nested Project View
                </span>
                <h2>{project.name}</h2>
                <p>{project.subtitle}</p>
              </div>
              <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className="project-modal-body">
              <div className="project-modal-imac-wrap">
                <div className="imac-device imac-device-modal">
                  <div className="imac-enclosure">
                    <div className="imac-screen-frame imac-screen-frame-modal">
                      <div className="imac-camera-dot" />
                      {project.deployUrl ? (
                        <>
                          <iframe
                            src={project.deployUrl}
                            title={`${project.name} full preview`}
                            className="imac-iframe"
                            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                          />
                          <div className="imac-live-badge">
                            <span className="imac-live-dot" />
                            Live · {project.deployPlatform ?? 'Vercel'}
                          </div>
                        </>
                      ) : (
                        <div
                          className="imac-fallback-screen imac-fallback-screen-modal"
                          style={{ '--screen-accent': project.accent, padding: 0 } as React.CSSProperties}
                        >
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
                    </div>
                    <div className="imac-chin">
                      <svg className="imac-logo" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                  </div>
                  <div className="imac-neck" />
                  <div className="imac-foot" />
                </div>
              </div>

              <div className="project-modal-info">
                <motion.ul
                  className="imac-details-bullets"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {project.bullets.map((b) => (
                    <motion.li
                      key={b}
                      variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}
                    >
                      {b}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div
                  className="imac-stack-row"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {project.stack.map((t) => (
                    <motion.span
                      key={t}
                      className="skill-badge"
                      variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } } }}
                      style={{ '--badge-accent': project.accent } as React.CSSProperties}
                    >
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
                <div className="project-modal-actions">
                  {project.deployUrl && (
                    <a
                      href={project.deployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Open Live Deployment <ExternalLink size={14} />
                    </a>
                  )}
                  <button type="button" className="btn-outline" onClick={onClose}>
                    Back to Portfolio
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
