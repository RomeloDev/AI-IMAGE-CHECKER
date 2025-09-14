import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>
        © 2025 John Romel D. Lucot | AI Image Checker | Built with React
      </p>
    </footer>
  );
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  textAlign: 'center',
  padding: '10px 0',
  borderTop: '1px solid #333',
  zIndex: 1000,
  fontSize: '14px'
};

const textStyle = {
  margin: 0,
  opacity: 0.8
};

export default Footer;