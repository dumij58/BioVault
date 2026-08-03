// client/src/pages/AddProjectPage.jsx

import React, { useEffect, useState } from 'react';
import ResearchProjectForm from '../components/researchProject/ResearchProjectForm';
import SampleListEditor from '../components/researchProject/SampleListEditor';
import SequenceListEditor from '../components/researchProject/SequenceListEditor';
import { researchProjectApi } from '../service/researchProjectApi';
import { createSample } from '../service/sampleApi';
import { saveSequenceApi } from '../service/sequenceApi';
import { sequenceTypeService } from '../service/sequenceTypeService';
import { getStorageLocations } from '../service/storageLocationService';
import './ResearchProjectPage.css';

const AddProjectPage = ({ onGoBack }) => {
    const [createdProject, setCreatedProject] = useState(null);
    const [createdSamples, setCreatedSamples] = useState(null);
    const [samples, setSamples] = useState([]);
    const [sequences, setSequences] = useState([]);
    const [storageLocations, setStorageLocations] = useState([]);
    const [sequenceTypes, setSequenceTypes] = useState([]);
    const [savingSamples, setSavingSamples] = useState(false);
    const [savingSequences, setSavingSequences] = useState(false);

    useEffect(() => {
        getStorageLocations()
            .then(setStorageLocations)
            .catch((error) => console.error('Failed to fetch storage locations:', error));

        sequenceTypeService.getAll()
            .then(setSequenceTypes)
            .catch((error) => console.error('Failed to fetch sequence types:', error));
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
        let saved = [];
        try {
            const results = await Promise.allSettled(
                validSamples.map((sample) => createSample({ ...sample, projectId: createdProject.id }))
            );

            saved = results.filter((result) => result.status === 'fulfilled').map((result) => result.value);
            const failedCount = results.length - saved.length;
            if (failedCount > 0) {
                alert(`${failedCount} sample(s) failed to save.`);
            }
        } finally {
            setSavingSamples(false);
        }

        if (saved.length === 0) {
            onGoBack();
            return;
        }

        setCreatedSamples(saved);
    };

    const handleSaveSequences = async () => {
        const validSequences = sequences.filter((seq) => seq.sequence.trim());

        if (validSequences.length === 0) {
            onGoBack();
            return;
        }

        setSavingSequences(true);
        try {
            const results = await Promise.allSettled(
                validSequences.map((seq) => saveSequenceApi(seq.name.trim() || null, seq.sequence, null, seq.seqTypeId || null, seq.sampleId || null))
            );

            const failedCount = results.filter((result) => result.status === 'rejected').length;
            if (failedCount > 0) {
                alert(`${failedCount} sequence(s) failed to save.`);
            }
        } finally {
            setSavingSequences(false);
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
            ) : createdSamples === null ? (
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
                            {savingSamples ? 'Saving…' : 'Save Samples & Continue'}
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
            ) : (
                <div className="form-container">
                    <h2 className="form-title">Add Sequences</h2>

                    <div className="form-group">
                        <label className="form-label">Sample ID</label>
                        <input
                            type="text"
                            className="form-input"
                            value={createdSamples[createdSamples.length - 1].id}
                            readOnly
                        />
                    </div>

                    <SequenceListEditor
                        sequences={sequences}
                        onChange={setSequences}
                        sequenceTypes={sequenceTypes}
                        samples={createdSamples}
                    />

                    <div className="form-actions">
                        <button
                            type="button"
                            className="form-submit"
                            onClick={handleSaveSequences}
                            disabled={savingSequences}
                        >
                            {savingSequences ? 'Saving…' : 'Save Sequences & Finish'}
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

