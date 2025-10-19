import React, { useState, useEffect } from 'react';
import Loader from '../../Components/Loader';
import { Inertia } from '@inertiajs/inertia';

export default function Reports({ reports }) {
  const [loading, setLoading] = useState(false);
    function home() {
        setLoading(true);
        Inertia.visit("/");
    }


  return (
    <div
      style={{
        padding: '30px',
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: 'Inter, sans-serif',
      }}
      >
        <div style={{display: 'flex', justifyContent:'space-between'}}>
            <h1
                style={{
                fontSize: '28px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '25px',
                borderBottom: '2px solid #2563eb',
                display: 'inline-block',
                paddingBottom: '5px',
                }}
            >
            Latest Reports
            </h1>

              <div>

                <button
                onClick={home}
                style={{
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                }}
                >
                Go Home
                </button>
              </div>
        </div>

      {/* Loader Overlay */}

        {loading && <Loader />}

      {!loading && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gap: '16px',
          }}
        >
          {reports.map((r) => (
            <li
              key={r.id}
              style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                padding: '20px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              }}
            >
              <strong style={{ fontSize: '18px', color: '#2563eb' }}>{r.project.name}</strong>
              <div style={{ marginTop: '10px', fontSize: '15px', color: '#475569' }}>
                <p>Total tasks: <b>{r.total_tasks}</b></p>
                <p>Done: <b style={{ color: '#16a34a' }}>{r.completed_tasks}</b></p>
                <p>Pending: <b style={{ color: '#dc2626' }}>{r.pending_tasks}</b></p>
                <p>In Progress: <b style={{ color: '#f59e0b' }}>{r.in_progress_tasks}</b></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
