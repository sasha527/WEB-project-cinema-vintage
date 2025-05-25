// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          © 2025 Cinema Vintage London
        </div>
        <div className="footer-section">
          <Link to="/">Головна</Link>
        </div>
        <div className="footer-section">
          <a href="mailto:info@cinemavintage.co.uk">info@cinemavintage.co.uk</a><br/>
          +44 20 7946 0958
        </div>
      </div>
    </footer>
  );
}
