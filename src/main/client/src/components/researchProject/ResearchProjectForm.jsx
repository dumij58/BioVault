// client/src/components/researchProject/ResearchProjectForm.jsx

import React, { useState, useEffect } from 'react';

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
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">
                {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>

            <div className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.title ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter project title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter project description"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                </div>

                {/* Start Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.startDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                    )}
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Active">Active</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Principal Researcher ID */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Principal Researcher ID *
                    </label>
                    <input
                        type="text"
                        name="principalResearcherId"
                        value={formData.principalResearcherId}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.principalResearcherId ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter researcher ID"
                    />
                    {errors.principalResearcherId && (
                        <p className="text-red-500 text-sm mt-1">{errors.principalResearcherId}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    {isEditing ? 'Update' : 'Create'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ResearchProjectForm;