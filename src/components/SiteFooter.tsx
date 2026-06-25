'use client';

import { motion } from 'framer-motion';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer-pro" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="footer-grid" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-col">
          <span className="footer-logo">Shreesh.</span>
          <p className="footer-tagline">
            Building intelligent RAG systems and high-performance React architectures for enterprise scale.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <motion.a href="#profile" className="footer-link" whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}>About</motion.a>
          <motion.a href="#skills" className="footer-link" whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}>Skills</motion.a>
          <motion.a href="#projects" className="footer-link" whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}>Projects</motion.a>
          <motion.a href="#ai" className="footer-link" whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}>AI / RAG</motion.a>
          <motion.a href="#experience" className="footer-link" whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}>Experience</motion.a>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <motion.a
            href="https://www.linkedin.com/in/shreesh-kawathekar"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="https://github.com/shreesh-kawathekar"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="mailto:kawathekarshreesh@gmail.com"
            className="footer-link"
            whileHover={{ x: 3, color: '#22d3ee', transition: { duration: 0.2 } }}
          >
            Email
          </motion.a>
        </div>

        <div className="footer-col">
          <h4>Availability</h4>
          <p className="footer-link static">Based in Pune, India</p>
          <p className="footer-link static">Open to Full-Stack & AI Roles</p>
          <motion.a
            href="mailto:kawathekarshreesh@gmail.com?subject=Job%20Opportunity"
            className="btn-outline footer-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Hire Me
          </motion.a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {currentYear} Shreesh Kawathekar. All rights reserved.</span>
        <span className="footer-built">
          Built with Next.js 14, Three.js, and Framer Motion.
        </span>
      </div>
    </footer>
  );
}
