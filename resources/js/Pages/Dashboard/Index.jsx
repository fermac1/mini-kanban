
import React from 'react';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { Inertia } from '@inertiajs/inertia';
import Loader from '../../Components/Loader';

export default function Dashboard({ projects }) {
    const { props } = usePage();

    const [loading, setLoading] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const generate = (e) => {
        e.preventDefault();
        setLoading(true);
        setHasGenerated(true);
        Inertia.post('/reports/generate', {}, {
            preserveState: true,
        onFinish: () => setLoading(false),
        onError: () =>  setLoading(false),
        });
    };


    useEffect(() => {
        if (!hasGenerated) return;
        console.log('Flash:', props.flash);

    if (props.flash?.success) {
        alert(props.flash.success);
    }
    if (props.flash?.error) {
        alert(props.flash.error);
    }

    // reset after showing
    setHasGenerated(false);
    }, [props.flash]);



return (
  <div
    style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        justifyContent: 'center',
        padding: '60px 24px',
    }}
    >
    {loading && <Loader text="Generating report..." />}

    <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto' }}>
    {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div>
                  <h1
                    style={{
                        fontSize: 34,
                        fontWeight: 'bold',
                        color: '#111827',
                        marginBottom: 12,
                    }}
                    >
                        Project Dashboard
                    </h1>
                </div>
                <div
                    style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    }}
                >
                    <div>
                    <p style={{ color: '#4b5563', fontSize: 16, marginBottom: 0 }}>All Projects</p>
                    </div>

                    <div>
                    <button
                        onClick={generate}
                        style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: 'pointer',
                        transition: 'background 0.2s, transform 0.1s',
                        }}
                        onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#1d4ed8';
                        e.currentTarget.style.transform = 'scale(1.03)';
                        }}
                        onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#2563eb';
                        e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Generate Report
                    </button>

                        <Link href={'/reports'}>
                        <button style={{ marginLeft: 10 }}>View Report</button></Link>
                </div>
            </div>
        </div>

        {/* Empty State */}
        {projects.length === 0 ? (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '320px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '2px dashed #d1d5db',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                marginTop: '20px',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <p
                style={{
                    color: '#374151',
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '8px',
                }}
                >
                No projects yet
                </p>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                Start by creating a new project to see it here.
                </p>
            </div>
            </div>

        ) : (
          /* Projects Grid */
        <div style={{ overflowX: 'auto', marginTop: 40 }}>
            <table
                style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid #ccc',
                borderRadius: '8px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#fff',
                }}
            >
                <thead>
                <tr
                    style={{
                    backgroundColor: '#f2f2f2',
                    textAlign: 'left',
                    color: '#333',
                    textTransform: 'uppercase',
                    fontSize: 13,
                    }}
                >
                    <th style={{ padding: '10px 12px', border: '1px solid #ddd' }}>S/N</th>
                    <th style={{ padding: '10px 12px', border: '1px solid #ddd' }}>Project Name</th>
                    <th style={{ padding: '10px 12px', border: '1px solid #ddd' }}>Description</th>
                    <th style={{ padding: '10px 12px', border: '1px solid #ddd' }}>Pending</th>
                    <th style={{ padding: '10px 12px', border: '1px solid #ddd' }}>In Progress</th>
                    <th style={{ padding: '10px 12px', border: '1px solid #ddd' }}>Done</th>
                    <th style={{ padding: '10px 12px', border: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
                </tr>
                </thead>

                <tbody style={{ color: '#444' }}>
                {projects.map((project, index) => (
                    <tr
                    key={project.id}
                    style={{
                        border: '1px solid #ddd',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#fafafa')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                    >
                    <td style={{ padding: '10px 12px', border: '1px solid #ddd' }}>{index + 1}</td>
                    <td style={{ padding: '10px 12px', border: '1px solid #ddd', fontWeight: 'bold' }}>
                        {project.name}
                    </td>
                    <td style={{ padding: '10px 12px', border: '1px solid #ddd', color: '#666', fontSize: 13 }}>
                        {project.description || 'No description provided'}
                    </td>
                    <td style={{ padding: '10px 12px', border: '1px solid #ddd', textAlign: 'center' }}>
                        {project.pending_count}
                    </td>
                    <td style={{ padding: '10px 12px', border: '1px solid #ddd', textAlign: 'center' }}>
                        {project.in_progress_count}
                    </td>
                    <td style={{ padding: '10px 12px', border: '1px solid #ddd', textAlign: 'center' }}>
                        {project.done_count}
                    </td>
                    <td style={{ padding: '10px 12px', border: '1px solid #ddd', textAlign: 'center' }}>
                        <a
                        href={`/projects/${project.id}/board`}
                        style={{
                            display: 'inline-block',
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            fontWeight: '600',
                            fontSize: 13,
                            textDecoration: 'none',
                            transition: 'background 0.2s, transform 0.1s',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#1d4ed8';
                            e.currentTarget.style.transform = 'scale(1.03)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#2563eb';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        >
                        View
                        </a>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>



        )}
      </div>
    </div>
  );
}

