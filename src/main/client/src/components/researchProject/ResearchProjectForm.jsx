// client/src/components/researchProject/ResearchProjectForm.jsx

import React, { useState, useEffect } from 'react';
import '../../pages/ResearchProjectPage.css';
const ResearchProjectForm = ({ project, onSubmit, onCancel, isEditing }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'Active',
        principalResearcherId: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (project) {
            setFormData(project);
        }
    }, [project]);

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }
        if (!formData.principalResearcherId.trim()) {
            newErrors.principalResearcherId = 'Principal Researcher ID is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 form-container">
            <h2 className="text-2xl font-bold mb-4 form-title">
                {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>

            <div className="space-y-4">
                {/* Title */}
                <div className="form-group">
                    <label className="form-label">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`form-input ${errors.title ? 'form-input-error' : ''}`}
                        placeholder="Enter project title"
                    />
                    {errors.title && (
                        <p className="form-error">{errors.title}</p>
                    )}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label className="form-label">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className={`form-input ${errors.description ? 'form-input-error' : ''}`}
                        placeholder="Enter project description"
                    />
                    {errors.description && (
                        <p className="form-error">{errors.description}</p>
                    )}
                </div>

                {/* Start Date */}
                <div className="form-group">
                    <label className="form-label">
                        Start Date *
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={`form-input ${errors.startDate ? 'form-input-error' : ''}`}
                    />
                    {errors.startDate && (
                        <p className="form-error">{errors.startDate}</p>
                    )}
                </div>

                {/* End Date */}
                <div className="form-group">
                    <label className="form-label">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                {/* Status */}
                <div className="form-group">
                    <label className="form-label">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="Active">Active</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Principal Researcher ID */}
                <div className="form-group">
                    <label className="form-label">
                        Principal Researcher ID *
                    </label>
                    <input
                        type="text"
                        name="principalResearcherId"
                        value={formData.principalResearcherId}
                        onChange={handleChange}
                        className={`form-input ${errors.principalResearcherId ? 'form-input-error' : ''}`}
                        placeholder="Enter researcher ID"
                    />
                    {errors.principalResearcherId && (
                        <p className="form-error">{errors.principalResearcherId}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="form-actions">
                <button
                    type="submit"
                    className="form-submit"
                >
                    {isEditing ? 'Update' : 'Create'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="form-cancel"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ResearchProjectForm;