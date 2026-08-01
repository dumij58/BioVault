// client/src/pages/ResearchProjectPage.jsx

import React, { useState } from 'react';
import ResearchProjectList from '../components/researchProject/ResearchProjectList';
import ResearchProjectForm from '../components/researchProject/ResearchProjectForm';
import ResearchProjectDetail from '../components/researchProject/ResearchProjectDetail';
import ResearchProjectDelete from '../components/researchProject/ResearchProjectDelete';
import { researchProjectApi } from '../service/researchProjectApi';

const ResearchProjectPage = () => {
    const [view, setView] = useState('list');
    const [selectedProject, setSelectedProject] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleCreate = () => {
        setSelectedProject(null);
        setView('create');
    };

    const handleEdit = (project) => {
        setSelectedProject(project);
        setView('edit');
    };

    const handleView = (id) => {
        setSelectedProject({ id });
        setView('view');
    };

    const handleDelete = (id) => {
        researchProjectApi.getAll().then(projects => {
            const found = projects.find(p => p.id === id);
            if (found) {
                setSelectedProject(found);
                setView('delete');
            }
        });
    };

    const handleSubmit = async (project) => {
        try {
            if (view === 'create') {
                await researchProjectApi.create(project);
            } else if (view === 'edit' && selectedProject?.id) {
                await researchProjectApi.update(selectedProject.id, project);
            }
            setView('list');
            setRefreshKey(prev => prev + 1);
        } catch (error) {
            console.error('Failed to save project:', error);
            alert('Failed to save project. Please try again.');
        }
    };

    const handleDeleteConfirm = () => {
        setView('list');
        setRefreshKey(prev => prev + 1);
    };

    const renderContent = () => {
        switch (view) {
            case 'create':
                return (
                    <ResearchProjectForm
                        onSubmit={handleSubmit}
                        onCancel={() => setView('list')}
                        isEditing={false}
                    />
                );
            case 'edit':
                return (
                    <ResearchProjectForm
                        project={selectedProject}
                        onSubmit={handleSubmit}
                        onCancel={() => setView('list')}
                        isEditing={true}
                    />
                );
            case 'view':
                return (
                    <ResearchProjectDetail
                        id={selectedProject?.id}
                        onClose={() => setView('list')}
                        onEdit={handleEdit}
                    />
                );
            case 'delete':
                return (
                    <ResearchProjectDelete
                        id={selectedProject?.id}
                        title={selectedProject?.title}
                        onConfirm={handleDeleteConfirm}
                        onCancel={() => setView('list')}
                    />
                );
            default:
                return (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold">Research Projects</h1>
                            <button
                                onClick={handleCreate}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                            >
                                + New Project
                            </button>
                        </div>
                        <ResearchProjectList
                            key={refreshKey}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onView={handleView}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {renderContent()}
        </div>
    );
};

export default ResearchProjectPage;