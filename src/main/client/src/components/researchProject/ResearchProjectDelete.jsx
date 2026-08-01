// client/src/components/researchProject/ResearchProjectDelete.jsx

import React, { useState } from 'react';
import { researchProjectApi } from '../../service/researchProjectApi';

const ResearchProjectDelete = ({ id, title, onConfirm, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        try {
            setLoading(true);
            await researchProjectApi.delete(id);
            onConfirm();
        } catch (err) {
            setError('Failed to delete project');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Delete Project</h2>

            <p className="text-gray-700 mb-4">
                Are you sure you want to delete "<strong>{title}</strong>"? This action cannot be undone.
            </p>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="flex gap-3">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 disabled:bg-red-300 transition-colors"
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ResearchProjectDelete;