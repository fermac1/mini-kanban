
import React from 'react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          border: '4px solid #2563eb',
          borderTop: '4px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
      <p style={{ marginTop: '10px', color: '#1e3a8a', fontWeight: 500 }}>{text}</p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
