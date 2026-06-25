'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building, MapPin, CalendarPlus, Check } from 'lucide-react';

export default function MeetingHubDemo() {
  const [visitor, setVisitor] = useState('Visitor A');
  const [exhibitor, setExhibitor] = useState('Exhibitor X (Booth 42)');
  const [location, setLocation] = useState('Hall B - Table 12');
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [meetings, setMeetings] = useState([
    { id: 1, v: 'Sarah M.', e: 'TechCorp', loc: 'Hall A - T1', time: '10:00 AM' },
    { id: 2, v: 'John D.', e: 'Innovate AI', loc: 'VIP Lounge', time: '11:30 AM' },
  ]);

  const handleSetup = () => {
    setIsSettingUp(true);
    setTimeout(() => {
      setMeetings(prev => [{ id: Date.now(), v: visitor.split(' ')[0], e: exhibitor.split(' ')[0], loc: location, time: '2:00 PM' }, ...prev]);
      setIsSettingUp(false);
    }, 1000);
  };

  return (
    <div className="meetinghub-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff1f2', color: '#1f2937', fontSize: '0.8rem', fontFamily: 'var(--font-nunito)' }}>
      <div style={{ padding: '16px', background: '#e11d48', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #be123c' }}>
        <Users size={18} />
        <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>MeetingHub Admin (SignalR Active)</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', background: '#be123c', padding: '4px 8px', borderRadius: '12px' }}>
          <div style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%' }} /> Live Sync
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left pane - Setup */}
        <div style={{ width: '300px', background: '#fff', borderRight: '1px solid #fecdd3', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ margin: 0, color: '#9f1239', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CalendarPlus size={16} /> Setup New Meeting
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.7rem', color: '#881337', fontWeight: 'bold' }}>Visitor</label>
              <select value={visitor} onChange={e => setVisitor(e.target.value)} style={{ padding: '8px', border: '1px solid #fda4af', borderRadius: '6px', outline: 'none', background: '#fff1f2' }}>
                <option>Visitor A (CEO)</option>
                <option>Visitor B (CTO)</option>
                <option>Visitor C (Buyer)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.7rem', color: '#881337', fontWeight: 'bold' }}>Exhibitor</label>
              <select value={exhibitor} onChange={e => setExhibitor(e.target.value)} style={{ padding: '8px', border: '1px solid #fda4af', borderRadius: '6px', outline: 'none', background: '#fff1f2' }}>
                <option>Exhibitor X (Booth 42)</option>
                <option>Exhibitor Y (Booth 15)</option>
                <option>Exhibitor Z (VIP)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.7rem', color: '#881337', fontWeight: 'bold' }}>Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ padding: '8px', border: '1px solid #fda4af', borderRadius: '6px', outline: 'none', background: '#fff1f2' }}>
                <option>Hall B - Table 12</option>
                <option>Hall A - T1</option>
                <option>VIP Lounge</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleSetup}
            disabled={isSettingUp}
            style={{ 
              marginTop: 'auto', background: '#e11d48', color: '#fff', border: 'none', 
              padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer',
              display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center'
            }}
          >
            {isSettingUp ? 'Syncing...' : <><CalendarPlus size={16} /> Schedule Meeting</>}
          </button>
        </div>

        {/* Right pane - Schedule */}
        <div style={{ flex: 1, padding: '20px', background: '#fafafa', overflowY: 'auto' }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#881337', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building size={16} /> Live Venue Schedule
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence>
              {meetings.map((m) => (
                <motion.div 
                  key={m.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ background: '#fff', border: '1px solid #fecdd3', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(225, 29, 72, 0.05)' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#881337' }}>{m.v}</span>
                      <span style={{ color: '#fda4af' }}>↔</span>
                      <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#881337' }}>{m.e}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.75rem' }}>
                      <MapPin size={12} /> {m.loc}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{ fontWeight: 'bold', color: '#4f46e5' }}>{m.time}</span>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '12px', fontSize: '0.65rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={10} /> Confirmed
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
