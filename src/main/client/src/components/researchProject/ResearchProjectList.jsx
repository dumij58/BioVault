// client/src/components/researchProject/ResearchProjectList.jsx

import React, { useEffect, useState } from 'react';
import { researchProjectApi } from '../../service/researchProjectApi';
import '../../pages/ResearchProjectPage.css';

const ResearchProjectList = ({ onEdit, onDelete, onView }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await researchProjectApi.getAll();
            setProjects(data);
            setError('');
        } catch (err) {
            setError('Failed to load projects');
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
                <div className="text-gray-600">Loading projects...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="research-projects-title">Research Projects</h2>

            {projects.length === 0 ? (
                <div className="empty-state-sub">
                    No projects found. Create your first project!
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="project-card">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">
                                {project.description}
                            </p>
                            <div className="project-meta">
                                <span className={`status-badge ${getStatusColor(project.status)}`}>
                                    {project.status}
                                </span>
                                <span className="project-dates">
                                    {project.startDate} - {project.endDate}
                                </span>
                            </div>
                            <div className="project-actions">
                                <button
                                    onClick={() => project.id && onView(project.id)}
                                    className="action-button action-view"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => onEdit(project)}
                                    className="action-button action-edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => project.id && onDelete(project.id)}
                                    className="action-button action-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResearchProjectList;