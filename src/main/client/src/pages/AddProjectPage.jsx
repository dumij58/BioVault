// client/src/pages/AddProjectPage.jsx

import React, { useEffect, useState } from 'react';
import ResearchProjectForm from '../components/researchProject/ResearchProjectForm';
import SampleListEditor from '../components/researchProject/SampleListEditor';
import { researchProjectApi } from '../service/researchProjectApi';
import { sampleApi } from '../service/sampleApi';
import { getStorageLocations } from '../service/storageLocationService';
import './ResearchProjectPage.css';

const AddProjectPage = ({ onGoBack }) => {
    const [samples, setSamples] = useState([]);
    const [storageLocations, setStorageLocations] = useState([]);

    useEffect(() => {
        getStorageLocations()
            .then(setStorageLocations)
            .catch((error) => console.error('Failed to fetch storage locations:', error));
    }, []);

    const handleSubmit = async (project) => {
        try {
            const createdProject = await researchProjectApi.create(project);

            const sampleResults = await Promise.allSettled(
                samples
                    .filter((sample) => sample.species.trim())
                    .map((sample) => sampleApi.create({ ...sample, projectId: createdProject.id }))
            );

            const failedCount = sampleResults.filter((result) => result.status === 'rejected').length;
            if (failedCount > 0) {
                alert(`Project created, but ${failedCount} sample(s) failed to save.`);
            }

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
            >
                <SampleListEditor
                    samples={samples}
                    onChange={setSamples}
                    storageLocations={storageLocations}
                />
            </ResearchProjectForm>
        </div>
    );
};

export default AddProjectPage;

