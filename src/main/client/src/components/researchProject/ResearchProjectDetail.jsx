// client/src/components/researchProject/ResearchProjectDetail.jsx

import React, { useEffect, useState } from 'react';
import { researchProjectApi } from '../../service/researchProjectApi';

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
                <div className="text-gray-600">Loading project details...</div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error || 'Project not found'}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-1 text-gray-900">{project.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                        <p className="mt-1 text-gray-900">{project.startDate}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                        <p className="mt-1 text-gray-900">{project.endDate || 'N/A'}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                    </span>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500">Principal Researcher ID</h3>
                    <p className="mt-1 text-gray-900">{project.principalResearcherId}</p>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => onEdit(project)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResearchProjectDetail;