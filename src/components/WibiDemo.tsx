'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Mic, X } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const PREDEFINED_RESPONSES = [
  "Hello! I am WiBi, the embeddable AI assistant powered by Azure AI Search and GPT-4. How can I help you?",
  "I can seamlessly integrate into any PHP or HTML website using a single script tag.",
  "I support voice input via the Web Speech API and can persist your conversations using IndexedDB.",
  "I use hybrid retrieval (keyword + vector) to ensure high-accuracy responses from your corporate data.",
  "Would you like to know more about my frontend architecture using React 19 and Zustand?"
];

export default function WibiDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: PREDEFINED_RESPONSES[0] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseIndexRef = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseText = PREDEFINED_RESPONSES[responseIndexRef.current % PREDEFINED_RESPONSES.length];
      responseIndexRef.current += 1;
      
      const botMsg: Message = { id: Date.now().toString(), sender: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="wibi-container" style={{ position: 'relative', height: '100%', background: '#f8fafc', overflow: 'hidden', fontFamily: 'var(--font-nunito)' }}>
      {/* Fake Background Website */}
      <div style={{ padding: '24px', color: '#64748b' }}>
        <h2 style={{ margin: '0 0 16px 0', color: '#334155' }}>Client E-Commerce Website</h2>
        <div style={{ background: '#e2e8f0', height: '12px', width: '100%', borderRadius: '6px', marginBottom: '8px' }} />
        <div style={{ background: '#e2e8f0', height: '12px', width: '80%', borderRadius: '6px', marginBottom: '8px' }} />
        <div style={{ background: '#e2e8f0', height: '12px', width: '90%', borderRadius: '6px', marginBottom: '8px' }} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ 
              position: 'absolute', bottom: '80px', right: '20px', width: '320px', height: '400px',
              background: '#fff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #e2e8f0'
            }}
          >
            <div style={{ padding: '12px 16px', background: '#38bdf8', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#fff', color: '#38bdf8', borderRadius: '50%', padding: '4px' }}>
                  <Bot size={16} />
                </div>
                <span style={{ fontWeight: 'bold' }}>WiBi Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={16} /></button>
            </div>
            
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f8fafc' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ display: 'flex', gap: '8px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ 
                    padding: '10px 14px', fontSize: '0.8rem', lineHeight: 1.4,
                    background: msg.sender === 'user' ? '#38bdf8' : '#fff',
                    color: msg.sender === 'user' ? '#fff' : '#334155',
                    borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    border: msg.sender === 'bot' ? '1px solid #e2e8f0' : 'none',
                    maxWidth: '85%'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ padding: '10px 14px', background: '#fff', borderRadius: '12px 12px 12px 0', border: '1px solid #e2e8f0', display: 'flex', gap: '4px' }}>
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ width: 6, height: 6, background: '#cbd5e1', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 6, height: 6, background: '#cbd5e1', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 6, height: 6, background: '#cbd5e1', borderRadius: '50%' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: '12px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
              <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  style={{ flex: 1, padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '20px', outline: 'none', fontSize: '0.8rem' }}
                />
                <button type="button" style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}>
                  <Mic size={18} />
                </button>
                <button type="submit" disabled={!input.trim()} style={{ background: input.trim() ? '#38bdf8' : '#e2e8f0', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'not-allowed' }}>
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute', bottom: '20px', right: '20px', width: '48px', height: '48px',
          background: '#38bdf8', color: '#fff', border: 'none', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
        }}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </motion.button>
    </div>
  );
}
