// client/src/components/researchProject/ResearchProjectList.jsx

import React, { useEffect, useState } from 'react';
import { researchProjectApi } from '../../service/researchProjectApi';

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
            'Active': 'bg-green-100 text-green-800',
            'Ongoing': 'bg-blue-100 text-blue-800',
            'Completed': 'bg-gray-100 text-gray-800',
            'On Hold': 'bg-yellow-100 text-yellow-800',
            'Cancelled': 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Loading projects...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Research Projects</h2>

            {projects.length === 0 ? (
                <div className="text-gray-500 text-center py-8">
                    No projects found. Create your first project!
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                    {project.status}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {project.startDate} - {project.endDate}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => project.id && onView(project.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => onEdit(project)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => project.id && onDelete(project.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
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