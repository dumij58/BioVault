// client/src/components/researchProject/ResearchProjectList.jsx

import React, { useEffect, useState } from 'react';
import { researchProjectApi } from '../../service/researchProjectApi';
import { researcherApi } from '../../service/researcherApi';
import { useAuth } from '../../context/AuthContext';
import '../../pages/ResearchProjectPage.css';

const normalizeRole = (role) => {
    if (!role) return '';
    if (typeof role === 'string') return role.toUpperCase();
    if (typeof role === 'object') {
        if (typeof role.name === 'string') return role.name.toUpperCase();
        if (typeof role.role === 'string') return role.role.toUpperCase();
    }
    return String(role).toUpperCase();
};

const ResearchProjectList = ({ onEdit, onDelete, onView }) => {
    const { user } = useAuth();
    const isResearcher = normalizeRole(user?.role) === 'RESEARCHER';
    const [projects, setProjects] = useState([]);
    const [ownResearcherId, setOwnResearcherId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    // Resolve the logged-in researcher's own id so their project list can be scoped to it.
    useEffect(() => {
        if (!isResearcher || !user?.email) return;
        researcherApi.getAll()
            .then((researchers) => {
                const userEmail = user.email.trim().toLowerCase();
                const match = researchers.find((r) => r.email?.trim().toLowerCase() === userEmail);
                setOwnResearcherId(match?.id ?? '');
            })
            .catch((err) => console.error('Failed to resolve researcher id:', err));
    }, [isResearcher, user]);

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

    // Researchers only see the projects where they are the principal researcher.
    const visibleProjects = isResearcher
        ? (ownResearcherId ? projects.filter((p) => p.principalResearcherId === ownResearcherId) : [])
        : projects;

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

    if (loading || (isResearcher && ownResearcherId === null)) {
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
            <h2 className="research-projects-title">{isResearcher ? 'My Research Projects' : 'Research Projects'}</h2>

            {visibleProjects.length === 0 ? (
                <div className="empty-state-sub">
                    {isResearcher && ownResearcherId === ''
                        ? 'No researcher profile is linked to your account email. Ask an admin to add/update a matching researcher record.'
                        : isResearcher
                            ? 'You have no projects yet. Create your first project!'
                            : 'No projects found. Create your first project!'}
                </div>
            ) : (
                <div className="projects-grid">
                    {visibleProjects.map((project) => (
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