// client/src/components/researchProject/ResearchProjectDelete.jsx

import React, { useState } from 'react';
import { researchProjectApi } from '../../service/researchProjectApi';
import '../../pages/ResearchProjectPage.css';
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
        <div className="delete-container">
            <h2 className="delete-title">Delete Project</h2>

            <p className="delete-message">
                Are you sure you want to delete "<strong>{title}</strong>"? This action cannot be undone.
            </p>

            {error && (
                <div className="error-container">
                    {error}
                </div>
            )}

            <div className="delete-actions">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="delete-confirm"
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    onClick={onCancel}
                    className="delete-cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ResearchProjectDelete;