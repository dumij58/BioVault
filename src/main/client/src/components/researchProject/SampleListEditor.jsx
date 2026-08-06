// client/src/components/researchProject/SampleListEditor.jsx

import React from 'react';
import '../../pages/ResearchProjectPage.css';

const createEmptySample = () => ({
    species: '',
    sampleType: '',
    collectionDate: '',
    storageLocationId: '',
    storageLocation: '',
});

const SampleListEditor = ({ samples, onChange, storageLocations = [] }) => {
    const handleAdd = () => {
        onChange([...samples, createEmptySample()]);
    };

    const handleRemove = (index) => {
        onChange(samples.filter((_, i) => i !== index));
    };

    const handleFieldChange = (index, field, value) => {
        onChange(samples.map((sample, i) => {
            if (i === index) {
                if (field === 'storageLocationId') {
                    return { ...sample, storageLocationId: value, storageLocation: value };
                }
                return { ...sample, [field]: value };
            }
            return sample;
        }));
    };

    return (
        <div className="sample-list-editor">
            <div className="sample-list-header">
                <h3 className="sample-list-title">Samples</h3>
                <button type="button" className="sample-add-button" onClick={handleAdd}>
                    + Add Sample
                </button>
            </div>

            {samples.length === 0 && (
                <p className="sample-list-empty">No samples added yet.</p>
            )}

            {samples.map((sample, index) => (
                <div className="sample-row" key={index}>
                    <div className="sample-row-fields">
                        <div className="form-group">
                            <label className="form-label">Species</label>
                            <input
                                type="text"
                                className="form-input"
                                value={sample.species}
                                onChange={(e) => handleFieldChange(index, 'species', e.target.value)}
                                placeholder="e.g. Homo sapiens"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Sample Type</label>
                            <input
                                type="text"
                                className="form-input"
                                value={sample.sampleType}
                                onChange={(e) => handleFieldChange(index, 'sampleType', e.target.value)}
                                placeholder="e.g. Blood, Tissue, Saliva"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Collection Date</label>
                            <input
                                type="date"
                                className="form-input"
                                value={sample.collectionDate}
                                onChange={(e) => handleFieldChange(index, 'collectionDate', e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Storage Location</label>
                            <select
                                className="form-input"
                                value={sample.storageLocationId || sample.storageLocation || ''}
                                onChange={(e) => handleFieldChange(index, 'storageLocationId', e.target.value)}
                            >
                                <option value="">-- Select Storage Location --</option>
                                {storageLocations.map((location) => {
                                    const displayId = location.storageId || location.id;
                                    return (
                                        <option key={location.id} value={displayId}>
                                            {displayId}
                                        </option>
                                    );
                                })}
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

export default SampleListEditor;
