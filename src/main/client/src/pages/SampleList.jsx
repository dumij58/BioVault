import React, { useEffect, useState } from 'react';
import {
    getSampleById,
    getAllSamples,
    createSample,
    updateSample,
    deleteSample,
} from '../service/sampleApi';
import './SampleList.css'; // Import the CSS below

export const SampleList = ({ onGoHome }) => {
    const [samples, setSamples] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        species: '',
        sampleType: '',
        collectionDate: '',
        storageLocation: '',
        associatedProject: '',
    });

    const fetchSamples = async () => {
        try {
            setLoading(true);
            const data = await getAllSamples();
            setSamples(data);
        } catch (error) {
            console.error('Error fetching samples:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSamples();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createSample(formData);
            setFormData({
                species: '',
                sampleType: '',
                collectionDate: '',
                storageLocation: '',
                associatedProject: '',
            });
            fetchSamples();
        } catch (error) {
            console.error('Error creating sample:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!id) return;
        try {
            await deleteSample(id);
            fetchSamples();
        } catch (error) {
            console.error('Error deleting sample:', error);
        }
    };

    return (
        <div className="seq-mgmt">
            <header className="seq-mgmt__topbar">
                <div>
                    <h1 className="seq-mgmt__title">Sample Management</h1>
                    <p className="seq-mgmt__subtitle">
                        Register, view, and manage biological samples collected during research.
                    </p>
                </div>
                {onGoHome && (
                    <button
                        type="button"
                        className="back-btn"
                        onClick={onGoHome}
                    >
                        ← Back to Home
                    </button>
                )}
            </header>

            {/* Form Section */}
            <div className="seq-mgmt__card">
                <h2 className="seq-mgmt__section-title">Register New Sample</h2>
                <form onSubmit={handleSubmit} className="seq-mgmt__form-grid">
                    <div className="seq-mgmt__form-group">
                        <label>Species</label>
                        <input
                            type="text"
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            required
                            className="seq-mgmt__input"
                            placeholder="e.g. Homo sapiens"
                        />
                    </div>

                    <div className="seq-mgmt__form-group">
                        <label>Sample Type</label>
                        <input
                            type="text"
                            name="sampleType"
                            value={formData.sampleType}
                            onChange={handleChange}
                            required
                            className="seq-mgmt__input"
                            placeholder="e.g. Blood, Tissue, DNA"
                        />
                    </div>

                    <div className="seq-mgmt__form-group">
                        <label>Collection Date</label>
                        <input
                            type="date"
                            name="collectionDate"
                            value={formData.collectionDate}
                            onChange={handleChange}
                            required
                            className="seq-mgmt__input seq-mgmt__input--date"
                        />
                    </div>

                    <div className="seq-mgmt__form-group">
                        <label>Storage Location</label>
                        <input
                            type="text"
                            name="storageLocation"
                            value={formData.storageLocation}
                            onChange={handleChange}
                            required
                            className="seq-mgmt__input"
                            placeholder="e.g. Freezer A - Shelf 2"
                        />
                    </div>

                    <div className="seq-mgmt__form-group">
                        <label>Associated Project</label>
                        <input
                            type="text"
                            name="associatedProject"
                            value={formData.associatedProject}
                            onChange={handleChange}
                            required
                            className="seq-mgmt__input"
                            placeholder="e.g. Project Alpha"
                        />
                    </div>

                    <div className="seq-mgmt__form-group seq-mgmt__form-group--submit">
                        <button type="submit" className="seq-mgmt__submit-btn">
                            + Register Sample
                        </button>
                    </div>
                </form>
            </div>

            {/* Table Section */}
            <div className="seq-mgmt__table-container">
                <div className="seq-mgmt__table-header">
                    <h2 className="seq-mgmt__section-title">Sample Repository</h2>
                </div>

                {loading ? (
                    <p className="seq-mgmt__empty">Loading samples...</p>
                ) : samples.length === 0 ? (
                    <p className="seq-mgmt__empty">No samples registered yet.</p>
                ) : (
                    <table className="seq-mgmt__table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Species</th>
                                <th>Type</th>
                                <th>Collection Date</th>
                                <th>Storage Location</th>
                                <th>Project</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {samples.map((sample) => (
                                <tr key={sample.id}>
                                    <td className="seq-mgmt__id">{sample.id}</td>
                                    <td className="seq-mgmt__name">{sample.species}</td>
                                    <td className="seq-mgmt__desc">{sample.sampleType}</td>
                                    <td className="seq-mgmt__desc">{sample.collectionDate}</td>
                                    <td className="seq-mgmt__desc">{sample.storageLocation}</td>
                                    <td className="seq-mgmt__desc">{sample.associatedProject}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => handleDelete(sample.id)}
                                            className="seq-mgmt__delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SampleList;