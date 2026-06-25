'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Database, TrendingUp, Users } from 'lucide-react';

const data = [
  { name: 'Jan', queries: 400, active: 240 },
  { name: 'Feb', queries: 300, active: 139 },
  { name: 'Mar', queries: 200, active: 980 },
  { name: 'Apr', queries: 278, active: 390 },
  { name: 'May', queries: 189, active: 480 },
  { name: 'Jun', queries: 239, active: 380 },
  { name: 'Jul', queries: 349, active: 430 },
];

export default function WingsAnalyticsDemo() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [activeQuery, setActiveQuery] = useState('Analyze user engagement trends');

  return (
    <div className="wings-analytics-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f172a', color: '#f8fafc', fontSize: '0.75rem', fontFamily: 'var(--font-nunito)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#020617' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)', width: 24, height: 24, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={14} color="white" />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '0.5px' }}>WingsBI Analytics</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={{ padding: '4px 10px', borderRadius: '12px', background: chartType === 'line' ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setChartType('line')}>Line</button>
          <button style={{ padding: '4px 10px', borderRadius: '12px', background: chartType === 'bar' ? '#3b82f6' : '#1e293b', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setChartType('bar')}>Bar</button>
        </div>
      </div>
      
      <div style={{ flex: 1, padding: '16px', display: 'flex', gap: '16px', overflowY: 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1, background: '#1e293b', padding: '12px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#94a3b8' }}>
                <span>Total Queries</span> <Database size={14} />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>12,845</div>
              <div style={{ color: '#10b981', fontSize: '0.7rem', marginTop: '4px' }}>+14% this month</div>
            </div>
            <div style={{ flex: 1, background: '#1e293b', padding: '12px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#94a3b8' }}>
                <span>Active Users</span> <Users size={14} />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>3,040</div>
              <div style={{ color: '#10b981', fontSize: '0.7rem', marginTop: '4px' }}>+5% this month</div>
            </div>
            <div style={{ flex: 1, background: '#1e293b', padding: '12px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#94a3b8' }}>
                <span>System Load</span> <Activity size={14} />
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>42%</div>
              <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '4px' }}>Normal range</div>
            </div>
          </div>
          
          <div style={{ flex: 1, background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', padding: '16px', minHeight: '200px' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#e2e8f0' }}>Platform Engagement Trends</h3>
            <ResponsiveContainer width="100%" height="85%">
              {chartType === 'line' ? (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: '8px', fontSize: '0.75rem' }} />
                  <Line type="monotone" dataKey="queries" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: '#818cf8', strokeWidth: 0 }} />
                  <Line type="monotone" dataKey="active" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#38bdf8', strokeWidth: 0 }} />
                </LineChart>
              ) : (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: '8px', fontSize: '0.75rem' }} cursor={{ fill: '#334155', opacity: 0.4 }} />
                  <Bar dataKey="queries" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="active" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ width: '220px', background: '#020617', borderRadius: '12px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px', borderBottom: '1px solid #1e293b', fontWeight: 'bold', color: '#e2e8f0' }}>Analyze Module</div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Natural Language Query</span>
            <div style={{ background: '#1e293b', padding: '8px 10px', borderRadius: '8px', border: '1px solid #334155' }}>
              <input 
                type="text" 
                value={activeQuery}
                onChange={(e) => setActiveQuery(e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.75rem' }}
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', marginTop: '4px', fontWeight: 'bold' }}
            >
              Generate Insight
            </motion.button>
            <div style={{ marginTop: '16px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Suggested Insights</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                <div style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setActiveQuery('Show peak active hours')}>Peak active hours</div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setActiveQuery('Identify dropped queries')}>Dropped queries</div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setActiveQuery('Revenue by cohort')}>Revenue by cohort</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
