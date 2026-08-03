// client/src/components/researchProject/SequenceListEditor.jsx

import React from 'react';
import '../../pages/ResearchProjectPage.css';

const createEmptySequence = (defaultSampleId = '') => ({
    name: '',
    sequence: '',
    seqTypeId: '',
    sampleId: defaultSampleId,
});

const SequenceListEditor = ({ sequences, onChange, sequenceTypes = [], samples = [] }) => {
    const handleAdd = () => {
        const latestSampleId = samples.length > 0 ? samples[samples.length - 1].id : '';
        onChange([...sequences, createEmptySequence(latestSampleId)]);
    };

    const handleRemove = (index) => {
        onChange(sequences.filter((_, i) => i !== index));
    };

    const handleFieldChange = (index, field, value) => {
        onChange(sequences.map((seq, i) => (i === index ? { ...seq, [field]: value } : seq)));
    };

    const getSampleLabel = (sample) => (sample.sampleType ? `${sample.species} (${sample.sampleType})` : sample.species ?? sample.id);

    return (
        <div className="sample-list-editor">
            <div className="sample-list-header">
                <h3 className="sample-list-title">Sequences</h3>
                <button type="button" className="sample-add-button" onClick={handleAdd}>
                    + Add Sequence
                </button>
            </div>

            {sequences.length === 0 && (
                <p className="sample-list-empty">No sequences added yet.</p>
            )}

            {sequences.map((seq, index) => (
                <div className="sample-row" key={index}>
                    <div className="sample-row-fields">
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={seq.name}
                                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                placeholder="e.g. Sample-01 16S rRNA"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sequence</label>
                            <textarea
                                className="form-input"
                                rows={2}
                                value={seq.sequence}
                                onChange={(e) => handleFieldChange(index, 'sequence', e.target.value)}
                                placeholder="e.g. ATCGGCTA..."
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sequence Type</label>
                            <select
                                className="form-input"
                                value={seq.seqTypeId}
                                onChange={(e) => handleFieldChange(index, 'seqTypeId', e.target.value)}
                            >
                                <option value="">-- Select Sequence Type --</option>
                                {sequenceTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sample</label>
                            <select
                                className="form-input"
                                value={seq.sampleId}
                                onChange={(e) => handleFieldChange(index, 'sampleId', e.target.value)}
                            >
                                <option value="">-- Select Sample --</option>
                                {samples.map((sample) => (
                                    <option key={sample.id} value={sample.id}>{getSampleLabel(sample)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="form-clear-button sample-remove-button"
                        onClick={() => handleRemove(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SequenceListEditor;
