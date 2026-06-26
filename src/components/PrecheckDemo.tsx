'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CheckCircle2, Factory } from 'lucide-react';

export default function PrecheckDemo() {
  const [activeTab, setActiveTab] = useState<'generate' | 'inspections'>('generate');
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedQR(`INV-${Math.floor(Math.random() * 100000)}`);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="precheck-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fffbeb', color: '#1f2937', fontSize: '0.8rem', fontFamily: 'var(--font-nunito)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #fde68a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f59e0b', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Factory size={16} />
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Precheck System</span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <button style={{ padding: '4px 10px', borderRadius: '6px', background: activeTab === 'generate' ? '#fff' : 'transparent', color: activeTab === 'generate' ? '#d97706' : '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setActiveTab('generate')}>Generate QR</button>
          <button style={{ padding: '4px 10px', borderRadius: '6px', background: activeTab === 'inspections' ? '#fff' : 'transparent', color: activeTab === 'inspections' ? '#d97706' : '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setActiveTab('inspections')}>Inspections</button>
        </div>
      </div>
      
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {activeTab === 'generate' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center', maxWidth: '300px' }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#b45309' }}>Manufacturing Unit QR</h3>
              <p style={{ margin: '0 0 16px 0', color: '#92400e', fontSize: '0.75rem' }}>Select an assembly line and generate a unique QR code to attach to the physical unit for step-by-step mobile inspection.</p>
            </div>
            
            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #fcd34d', width: '250px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <select style={{ padding: '8px', borderRadius: '6px', border: '1px solid #fde68a', outline: 'none' }}>
                <option>Line A - Compressors</option>
                <option>Line B - Condensers</option>
                <option>Line C - Assembly</option>
              </select>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                style={{ background: '#f59e0b', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '8px' }}
              >
                <QrCode size={16} /> {isGenerating ? 'Generating...' : 'Generate QR'}
              </button>
            </div>

            <AnimatePresence>
              {generatedQR && !isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '2px dashed #f59e0b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '16px' }}
                >
                  {/* Generic SVG QR Code approximation */}
                  <svg width="120" height="120" viewBox="0 0 100 100" style={{ background: '#fff' }}>
                    <rect x="0" y="0" width="100" height="100" fill="#fff" />
                    <rect x="10" y="10" width="25" height="25" fill="none" stroke="#000" strokeWidth="4" />
                    <rect x="15" y="15" width="15" height="15" fill="#000" />
                    <rect x="65" y="10" width="25" height="25" fill="none" stroke="#000" strokeWidth="4" />
                    <rect x="70" y="15" width="15" height="15" fill="#000" />
                    <rect x="10" y="65" width="25" height="25" fill="none" stroke="#000" strokeWidth="4" />
                    <rect x="15" y="70" width="15" height="15" fill="#000" />
                    <rect x="45" y="10" width="10" height="10" fill="#000" />
                    <rect x="45" y="25" width="10" height="10" fill="#000" />
                    <rect x="10" y="45" width="25" height="10" fill="#000" />
                    <rect x="65" y="45" width="25" height="45" fill="none" stroke="#000" strokeWidth="4" />
                    <rect x="70" y="50" width="15" height="10" fill="#000" />
                    <rect x="45" y="45" width="10" height="45" fill="#000" />
                  </svg>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '2px' }}>{generatedQR}</div>
                    <div style={{ color: '#059669', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', marginTop: '4px' }}>
                      <CheckCircle2 size={12} /> Ready for inspection
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ margin: 0, color: '#b45309' }}>Recent Inspections</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ background: '#fef3c7', color: '#92400e', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Unit ID</th>
                  <th style={{ padding: '10px' }}>Line</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Inspector</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'INV-49201', line: 'Compressors', status: 'Passed', inspector: 'Rajesh K.' },
                  { id: 'INV-88392', line: 'Condensers', status: 'Failed', inspector: 'Amit S.' },
                  { id: 'INV-10293', line: 'Assembly', status: 'In Progress', inspector: 'Priya M.' },
                  { id: 'INV-55482', line: 'Compressors', status: 'Passed', inspector: 'Rajesh K.' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #fef3c7' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{row.id}</td>
                    <td style={{ padding: '10px', color: '#6b7280' }}>{row.line}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ 
                        padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold',
                        background: row.status === 'Passed' ? '#d1fae5' : row.status === 'Failed' ? '#fee2e2' : '#fef3c7',
                        color: row.status === 'Passed' ? '#059669' : row.status === 'Failed' ? '#dc2626' : '#d97706'
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px', color: '#6b7280' }}>{row.inspector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
