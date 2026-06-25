'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Ship, Anchor, Map, Navigation } from 'lucide-react';

const volumeData = [
  { name: 'Mon', volume: 4000 },
  { name: 'Tue', volume: 3000 },
  { name: 'Wed', volume: 2000 },
  { name: 'Thu', volume: 2780 },
  { name: 'Fri', volume: 1890 },
  { name: 'Sat', volume: 2390 },
  { name: 'Sun', volume: 3490 },
];

export default function ShipTrackingDemo() {
  const [activeTab, setActiveTab] = useState<'map' | 'cargo'>('cargo');

  return (
    <div className="shiptracking-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f0f9ff', color: '#0f172a', fontSize: '0.8rem', fontFamily: 'var(--font-nunito)' }}>
      <div style={{ padding: '16px', background: '#0284c7', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Ship size={18} />
          <span style={{ fontWeight: 'bold', fontSize: '1rem', letterSpacing: '0.5px' }}>VesselCargo Analytics</span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={{ padding: '4px 12px', borderRadius: '4px', background: activeTab === 'cargo' ? '#fff' : 'transparent', color: activeTab === 'cargo' ? '#0369a1' : '#fff', border: '1px solid #fff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setActiveTab('cargo')}>Cargo Vol</button>
          <button style={{ padding: '4px 12px', borderRadius: '4px', background: activeTab === 'map' ? '#fff' : 'transparent', color: activeTab === 'map' ? '#0369a1' : '#fff', border: '1px solid #fff', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setActiveTab('map')}>Vessel Status</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* KPI Cards */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd', boxShadow: '0 2px 4px rgba(2,132,199,0.05)' }}>
            <div style={{ color: '#0284c7', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}><span>Active Vessels</span> <Anchor size={16} /></div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>124</div>
          </div>
          <div style={{ flex: 1, background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd', boxShadow: '0 2px 4px rgba(2,132,199,0.05)' }}>
            <div style={{ color: '#0284c7', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}><span>Port Congestion</span> <Map size={16} /></div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>12%</div>
          </div>
          <div style={{ flex: 1, background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #bae6fd', boxShadow: '0 2px 4px rgba(2,132,199,0.05)' }}>
            <div style={{ color: '#0284c7', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}><span>In Transit</span> <Navigation size={16} /></div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>89</div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div style={{ flex: 1, background: '#fff', borderRadius: '8px', border: '1px solid #bae6fd', padding: '16px', boxShadow: '0 2px 4px rgba(2,132,199,0.05)', display: 'flex', flexDirection: 'column' }}>
          {activeTab === 'cargo' ? (
            <>
              <h3 style={{ margin: '0 0 16px 0', color: '#0369a1' }}>Weekly Cargo Volume (TEU)</h3>
              <div style={{ flex: 1, minHeight: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeData}>
                    <defs>
                      <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0f2fe" />
                    <XAxis dataKey="name" stroke="#0284c7" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#0284c7" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="volume" stroke="#0284c7" fillOpacity={1} fill="url(#colorVol)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <>
              <h3 style={{ margin: '0 0 16px 0', color: '#0369a1' }}>Vessel Status Grid</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e0f2fe', color: '#0284c7' }}>
                    <th style={{ padding: '8px' }}>Vessel ID</th>
                    <th style={{ padding: '8px' }}>Destination</th>
                    <th style={{ padding: '8px' }}>ETA</th>
                    <th style={{ padding: '8px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'VSL-OCEAN-1', dest: 'Port of Singapore', eta: 'In 2 days', status: 'On Time' },
                    { id: 'VSL-STAR-9', dest: 'Rotterdam', eta: 'In 12 hrs', status: 'Delayed' },
                    { id: 'VSL-EAGLE-3', dest: 'Shanghai', eta: 'Arrived', status: 'Docked' },
                  ].map((v, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f0f9ff' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: '#0f172a' }}>{v.id}</td>
                      <td style={{ padding: '10px', color: '#475569' }}>{v.dest}</td>
                      <td style={{ padding: '10px', color: '#475569' }}>{v.eta}</td>
                      <td style={{ padding: '10px' }}>
                        <span style={{ 
                          padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold',
                          background: v.status === 'On Time' ? '#dcfce7' : v.status === 'Delayed' ? '#fee2e2' : '#e0f2fe',
                          color: v.status === 'On Time' ? '#166534' : v.status === 'Delayed' ? '#991b1b' : '#075985'
                        }}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
