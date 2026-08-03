// client/src/pages/AddProjectPage.jsx

import React, { useEffect, useState } from 'react';
import ResearchProjectForm from '../components/researchProject/ResearchProjectForm';
import SampleListEditor from '../components/researchProject/SampleListEditor';
import { researchProjectApi } from '../service/researchProjectApi';
import { sampleApi } from '../service/sampleApi';
import { getStorageLocations } from '../service/storageLocationService';
import './ResearchProjectPage.css';

const AddProjectPage = ({ onGoBack }) => {
    const [createdProject, setCreatedProject] = useState(null);
    const [samples, setSamples] = useState([]);
    const [storageLocations, setStorageLocations] = useState([]);
    const [savingSamples, setSavingSamples] = useState(false);

    useEffect(() => {
        getStorageLocations()
            .then(setStorageLocations)
            .catch((error) => console.error('Failed to fetch storage locations:', error));
    }, []);

    const handleCreateProject = async (project) => {
        try {
            const created = await researchProjectApi.create(project);
            setCreatedProject(created);
        } catch (error) {
            console.error('Failed to create project:', error);
            alert('Failed to create project. Please try again.');
        }
    };

    const handleSaveSamples = async () => {
        const validSamples = samples.filter((sample) => sample.species.trim());

        if (validSamples.length === 0) {
            onGoBack();
            return;
        }

        setSavingSamples(true);
        try {
            const results = await Promise.allSettled(
                validSamples.map((sample) => sampleApi.create({ ...sample, projectId: createdProject.id }))
            );

            const failedCount = results.filter((result) => result.status === 'rejected').length;
            if (failedCount > 0) {
                alert(`${failedCount} sample(s) failed to save.`);
            }
        } finally {
            setSavingSamples(false);
        }

        onGoBack();
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

            {!createdProject ? (
                <ResearchProjectForm
                    onSubmit={handleCreateProject}
                    onCancel={onGoBack}
                    isEditing={false}
                />
            ) : (
                <div className="form-container">
                    <h2 className="form-title">Add Samples</h2>

                    <div className="form-group">
                        <label className="form-label">Project ID</label>
                        <input
                            type="text"
                            className="form-input"
                            value={createdProject.id}
                            readOnly
                        />
                    </div>

                    <SampleListEditor
                        samples={samples}
                        onChange={setSamples}
                        storageLocations={storageLocations}
                    />

                    <div className="form-actions">
                        <button
                            type="button"
                            className="form-submit"
                            onClick={handleSaveSamples}
                            disabled={savingSamples}
                        >
                            {savingSamples ? 'Saving…' : 'Save Samples & Finish'}
                        </button>
                        <button
                            type="button"
                            className="form-cancel"
                            onClick={onGoBack}
                        >
                            Skip
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProjectPage;

