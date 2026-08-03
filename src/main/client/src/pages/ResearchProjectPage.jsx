// client/src/pages/ResearchProjectPage.jsx

import React, { useState } from 'react';
import ResearchProjectList from '../components/researchProject/ResearchProjectList';
import ResearchProjectForm from '../components/researchProject/ResearchProjectForm';
import ResearchProjectDetail from '../components/researchProject/ResearchProjectDetail';
import ResearchProjectDelete from '../components/researchProject/ResearchProjectDelete';
import { researchProjectApi } from '../service/researchProjectApi';
import './ResearchProjectPage.css';

const ResearchProjectPage = ({ onGoHome }) => {
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
                    <>
                        <div className="research-projects-header">
                            <div className="research-projects-header-left">
                                {/* ADD BACK BUTTON */}
                                <button
                                    className="back-button"
                                    onClick={onGoHome}
                                    title="Go back to Home"
                                >
                                    ← Back to Home
                                </button>

                            </div>
                            <button
                                onClick={handleCreate}
                                className="create-button"
                            >
                                New Project
                            </button>
                        </div>
                        <ResearchProjectList
                            key={refreshKey}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onView={handleView}
                        />
                    </>
                );
        }
    };

    return (
        <div className="research-projects-container">
            {renderContent()}
        </div>
    );
};

export default ResearchProjectPage;