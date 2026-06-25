'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const PREDEFINED_RESPONSES = [
  "Hi! I'm Shreesh's AI Assistant. I can tell you about his skills, projects, or experience.",
  "Shreesh specializes in Full-Stack React, Next.js, and building RAG AI systems for enterprise applications.",
  "He architected the WingsTalk RAG pipeline using LangChain, PGVector, and Azure OpenAI to chat with thousands of documents.",
  "He has over 2.5 years of experience building scalable applications, handling both complex frontends and robust FastAPI/Node backends.",
  "That's an interesting question! While I don't have all the details, I can tell you he is highly proficient in TypeScript, React, and cloud deployments."
];

export default function PortfolioChatbot() {
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

    // Simulate AI thinking and response
    setTimeout(() => {
      const responseText = PREDEFINED_RESPONSES[responseIndexRef.current % PREDEFINED_RESPONSES.length];
      responseIndexRef.current += 1;
      
      const botMsg: Message = { id: Date.now().toString(), sender: 'bot', text: responseText };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="portfolio-chatbot-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0a0a0a', color: '#fff', fontSize: '0.8rem', fontFamily: 'var(--font-nunito)' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 10px #22d3ee' }} />
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Shreesh.AI Core</span>
        </div>
        <span style={{ color: '#888', fontSize: '0.75rem' }}>v2.0 Active</span>
      </div>
      
      <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              style={{
                display: 'flex',
                gap: '12px',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ 
                width: '28px', height: '28px', borderRadius: '50%', 
                background: msg.sender === 'user' ? '#22d3ee' : '#333',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: msg.sender === 'user' ? '#000' : '#22d3ee'
              }}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div style={{ 
                background: msg.sender === 'user' ? '#22d3ee' : '#1a1a1a', 
                color: msg.sender === 'user' ? '#000' : '#e2e8f0',
                padding: '10px 14px', 
                borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0', 
                maxWidth: '75%',
                lineHeight: 1.5
              }}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22d3ee' }}>
                <Bot size={14} />
              </div>
              <div style={{ display: 'flex', gap: '4px', background: '#1a1a1a', padding: '12px 16px', borderRadius: '12px 12px 12px 0' }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 6, height: 6, background: '#888', borderRadius: '50%' }} />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 6, height: 6, background: '#888', borderRadius: '50%' }} />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 6, height: 6, background: '#888', borderRadius: '50%' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '16px', borderTop: '1px solid #222', background: '#0a0a0a' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI about Shreesh..."
            style={{ 
              flex: 1, background: '#1a1a1a', border: '1px solid #333', borderRadius: '24px', 
              padding: '10px 16px', color: '#fff', outline: 'none', transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#22d3ee'}
            onBlur={(e) => e.target.style.borderColor = '#333'}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            style={{ 
              background: input.trim() && !isTyping ? '#22d3ee' : '#333', color: '#000', 
              border: 'none', borderRadius: '50%', width: '40px', height: '40px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed', transition: 'background 0.2s'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
