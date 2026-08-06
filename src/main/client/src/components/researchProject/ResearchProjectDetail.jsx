// client/src/components/researchProject/ResearchProjectDetail.jsx

import React, { useEffect, useState } from 'react';
import { researchProjectApi } from '../../service/researchProjectApi';
import '../../pages/ResearchProjectPage.css';

const ResearchProjectDetail = ({ id, onClose, onEdit }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const data = await researchProjectApi.getById(id);
            setProject(data);
            setError('');
        } catch (err) {
            setError('Failed to load project details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Active': 'status-active',
            'Ongoing': 'status-ongoing',
            'Completed': 'status-completed',
            'On Hold': 'status-onhold',
            'Cancelled': 'status-cancelled',
        };
        return colors[status] || 'status-active';
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="text-gray-600">Loading project details...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="empty-state-text">
                {error || 'Project not found'}
            </div>
        );
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <h2 className="detail-title">{project.title}</h2>
                <button
                    onClick={onClose}
                    className="detail-close"
                >
                    ×
                </button>
            </div>

            <div className="space-y-4">
                <div className="detail-section">
                    <h3 className="detail-label">Description</h3>
                    <p className="detail-value">{project.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="detail-section">
                        <h3 className="detail-label">Start Date</h3>
                        <p className="detail-value">{project.startDate}</p>
                    </div>
                    <div className="detail-section">
                        <h3 className="detail-label">End Date</h3>
                        <p className="detail-value">{project.endDate || 'N/A'}</p>
                    </div>
                </div>

                <div className="detail-section">
                    <h3 className="detail-label">Status</h3>
                    <span className={`detail-status ${getStatusColor(project.status)}`}>
                        {project.status}
                    </span>
                </div>

                <div className="detail-section">
                    <h3 className="detail-label">Principal Researcher ID</h3>
                    <p className="detail-value">{project.principalResearcherId}</p>
                </div>

                <div className="form-actions" style={{ marginTop: '1.5rem' }}>
                    <button
                        onClick={() => onEdit(project)}
                        className="form-submit"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onClose}
                        className="form-cancel"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResearchProjectDetail;