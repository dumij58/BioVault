// client/src/pages/AddProjectPage.jsx

import React from 'react';
import ResearchProjectForm from '../components/researchProject/ResearchProjectForm';
import { researchProjectApi } from '../service/researchProjectApi';
import './ResearchProjectPage.css';

const AddProjectPage = ({ onGoBack }) => {
    const handleSubmit = async (project) => {
        try {
            await researchProjectApi.create(project);
            onGoBack();
        } catch (error) {
            console.error('Failed to create project:', error);
            alert('Failed to create project. Please try again.');
        }
    };

    return (
        <div className="research-projects-container">
            <div className="research-projects-header">
                <div className="research-projects-header-left">
                    <button
                        className="back-button"
                        onClick={onGoBack}
                        title="Go back"
                    >
                        ← Back
                    </button>
                    <h1 className="research-projects-title">Add Research Project</h1>
                </div>
            </div>
            <ResearchProjectForm
                onSubmit={handleSubmit}
                onCancel={onGoBack}
                isEditing={false}
            />
        </div>
    );
};

export default AddProjectPage;
