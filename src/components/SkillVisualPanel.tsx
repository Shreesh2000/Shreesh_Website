'use client';

import { motion } from 'framer-motion';
import type { SkillCategoryId } from '@/data/resume';

interface SkillVisualPanelProps {
  categoryId: SkillCategoryId;
}

export default function SkillVisualPanel({ categoryId }: SkillVisualPanelProps) {
  const visualContent = {
    frontend: {
      title: 'UI Engineering',
      desc: 'React • Next.js • Vite • MUI',
      bgImg: '/skills/frontend.png',
      nodes: [
        { label: 'DOM', top: '20%', left: '15%' },
        { label: 'State', top: '50%', left: '70%' },
        { label: 'RSC', top: '75%', left: '30%' },
      ],
      accent: '#38bdf8',
    },
    backend: {
      title: 'Backend Systems',
      desc: 'FastAPI • Node.js • Go • .NET',
      bgImg: '/skills/backend.png',
      nodes: [
        { label: 'API', top: '30%', left: '60%' },
        { label: 'Cache', top: '65%', left: '20%' },
        { label: 'Event', top: '40%', left: '80%' },
      ],
      accent: '#a78bfa',
    },
    ai: {
      title: 'AI / RAG',
      desc: 'LangChain • OpenAI • VectorDBs',
      bgImg: '/skills/ai.png',
      nodes: [
        { label: 'Embed', top: '15%', left: '50%' },
        { label: 'LLM', top: '60%', left: '30%' },
        { label: 'Chunk', top: '80%', left: '70%' },
      ],
      accent: '#f472b6',
    },
    databases: {
      title: 'Data Layer',
      desc: 'PostgreSQL • MongoDB • Redis',
      bgImg: '/skills/backend.png',
      nodes: [
        { label: 'SQL', top: '40%', left: '25%' },
        { label: 'NoSQL', top: '30%', left: '75%' },
        { label: 'Vector', top: '70%', left: '60%' },
      ],
      accent: '#34d399',
    },
    cloud: {
      title: 'Cloud & DevOps',
      desc: 'Azure • Docker • CI/CD • Linux',
      bgImg: '/skills/cloud.png',
      nodes: [
        { label: 'Container', top: '25%', left: '35%' },
        { label: 'Pipeline', top: '55%', left: '80%' },
        { label: 'Host', top: '75%', left: '20%' },
      ],
      accent: '#0ea5e9',
    },
    auth: {
      title: 'Security',
      desc: 'OAuth2 • JWT • Azure AD',
      bgImg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      nodes: [
        { label: 'Token', top: '20%', left: '65%' },
        { label: 'Session', top: '60%', left: '15%' },
        { label: 'RBAC', top: '80%', left: '55%' },
      ],
      accent: '#fbbf24',
    },
  };

  const { title, desc, bgImg, nodes, accent } = visualContent[categoryId];

  return (
    <motion.div
      key={categoryId}
      className="skill-visual-panel"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="skill-visual-bg"
        style={{
          backgroundImage: `url('${bgImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.9)',
          opacity: 0.95
        }}
      />
      <div 
        className="skill-visual-overlay"
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${accent}66 0%, transparent 70%)`,
          mixBlendMode: 'color'
        }}
      />
      <div className="skill-visual-content">
        <span className="skill-visual-tag" style={{ color: accent, borderColor: `${accent}55` }}>
          Stack Visual
        </span>
        <h3 className="skill-visual-title">{title}</h3>
        <p className="skill-visual-pattern">{desc}</p>
        <div className="skill-visual-nodes">
          {nodes.map((node, i) => (
            <motion.span
              key={i}
              className="skill-visual-node"
              style={{ 
                top: node.top, 
                left: node.left,
                background: `${accent}22`, 
                borderColor: `${accent}66` 
              }}
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.5, 1, 0.5],
                boxShadow: [`0 0 0 0 ${accent}00`, `0 0 12px 3px ${accent}55`, `0 0 0 0 ${accent}00`],
              }}
              transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
