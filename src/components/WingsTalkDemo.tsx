'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, MessageSquare, Database, FileDigit, Send, Bot } from 'lucide-react';

export default function WingsTalkDemo() {
  const [activeDoc, setActiveDoc] = useState<string>('Q3_Financial_Report.pdf');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'I have analyzed the 4 documents in your workspace. What would you like to know?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const docs = [
    { name: 'Q3_Financial_Report.pdf', size: '2.4 MB', type: 'PDF', status: 'Indexed' },
    { name: 'HR_Policy_2026.docx', size: '1.1 MB', type: 'DOCX', status: 'Indexed' },
    { name: 'API_Architecture.md', size: '45 KB', type: 'MD', status: 'Indexed' },
    { name: 'Client_Meeting_Notes.txt', size: '12 KB', type: 'TXT', status: 'Processing' },
  ];

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    setChatHistory(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'bot', text: `Based on [${activeDoc}], the data indicates strong vector similarity to your query. LangChain orchestration successfully retrieved 3 chunks from ChromaDB.` }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="wingstalk-container" style={{ display: 'flex', height: '100%', background: '#09090b', color: '#e4e4e7', fontSize: '0.8rem', fontFamily: 'var(--font-nunito)' }}>
      {/* Left Sidebar - Workspace */}
      <div style={{ width: '250px', background: '#18181b', borderRight: '1px solid #27272a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#a78bfa', padding: '4px', borderRadius: '6px', color: '#000' }}><Database size={16} /></div>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>WingsTalk RAG</span>
        </div>
        
        <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#a1a1aa', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Workspace Docs</span>
            <button style={{ background: 'transparent', border: '1px dashed #52525b', color: '#a1a1aa', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px' }}><Upload size={12} /></button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {docs.map(doc => (
              <div 
                key={doc.name} 
                onClick={() => setActiveDoc(doc.name)}
                style={{ 
                  background: activeDoc === doc.name ? '#27272a' : 'transparent',
                  padding: '10px', borderRadius: '8px', cursor: 'pointer',
                  border: `1px solid ${activeDoc === doc.name ? '#a78bfa' : 'transparent'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <FileDigit size={14} color={activeDoc === doc.name ? '#a78bfa' : '#71717a'} />
                  <span style={{ color: activeDoc === doc.name ? '#fff' : '#d4d4d8', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '22px' }}>
                  <span style={{ color: '#71717a', fontSize: '0.65rem' }}>{doc.size}</span>
                  <span style={{ color: doc.status === 'Indexed' ? '#34d399' : '#fbbf24', fontSize: '0.65rem' }}>{doc.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Area - Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#09090b' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#a1a1aa' }}>Querying Context: <strong style={{ color: '#a78bfa' }}>{activeDoc}</strong></span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#71717a', fontSize: '0.7rem' }}>
            <span>PGVector Search</span>
            <div style={{ width: '8px', height: '8px', background: '#34d399', borderRadius: '50%' }} />
          </div>
        </div>
        
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {chatHistory.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '8px', 
                background: msg.sender === 'user' ? '#27272a' : '#a78bfa',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: msg.sender === 'user' ? '#fff' : '#000'
              }}>
                {msg.sender === 'user' ? <MessageSquare size={16} /> : <Bot size={16} />}
              </div>
              <div style={{ 
                background: msg.sender === 'user' ? '#27272a' : '#18181b', 
                color: '#e4e4e7', padding: '12px 16px', 
                borderRadius: '8px', maxWidth: '80%', lineHeight: 1.5,
                border: msg.sender === 'bot' ? '1px solid #27272a' : 'none'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
             <div style={{ display: 'flex', gap: '12px' }}>
             <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
               <Bot size={16} />
             </div>
             <div style={{ background: '#18181b', padding: '12px 16px', borderRadius: '8px', border: '1px solid #27272a', display: 'flex', alignItems: 'center', gap: '4px' }}>
               <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4 }} style={{ width: 6, height: 6, background: '#a1a1aa', borderRadius: '50%' }} />
               <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.2 }} style={{ width: 6, height: 6, background: '#a1a1aa', borderRadius: '50%' }} />
               <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.4, delay: 0.4 }} style={{ width: 6, height: 6, background: '#a1a1aa', borderRadius: '50%' }} />
             </div>
           </div>
          )}
        </div>

        <div style={{ padding: '24px' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px', background: '#18181b', padding: '8px 16px', borderRadius: '12px', border: '1px solid #27272a', alignItems: 'center' }}>
            <Search size={18} color="#71717a" />
            <input 
              type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask a question about the workspace documents..."
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.85rem' }}
            />
            <button type="submit" disabled={!chatInput.trim()} style={{ background: chatInput.trim() ? '#a78bfa' : '#27272a', color: chatInput.trim() ? '#000' : '#52525b', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: chatInput.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
              <Send size={14} /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
