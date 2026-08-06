import { useEffect, useState } from 'react';
import { researcherApi } from '../service/researcherApi';
import './ResearcherManagement.css';

function ResearcherManagement({ onGoHome }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');

  const [researchers, setResearchers] = useState([]);
  const [selectedResearcher, setSelectedResearcher] = useState(null);
  const [editingResearcherId, setEditingResearcherId] = useState(null);

  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const clearFeedback = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const fetchResearchers = async () => {
    setIsLoadingList(true);
    clearFeedback();
    try {
      const data = await researcherApi.getAll();
      setResearchers(data ?? []);
    } catch (error) {
      setErrorMessage(error.message || 'Could not load researchers.');
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchResearchers();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    clearFeedback();

    if (!name.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Email address is required.');
      return;
    }

    setIsSaving(true);
    try {
      const payloadData = {
        name: name.trim(),
        email: email.trim(),
        department: department.trim(),
        institution: department.trim(),
        designation: designation.trim(),
      };

      const payload = editingResearcherId
        ? await researcherApi.update(editingResearcherId, payloadData)
        : await researcherApi.create(payloadData);

      setSuccessMessage(
        editingResearcherId
          ? `Researcher "${payload.name || name}" updated successfully.`
          : `Researcher "${payload.name || name}" registered successfully.`
      );
      setSelectedResearcher(payload);
      setEditingResearcherId(null);
      setName('');
      setEmail('');
      setDepartment('');
      setDesignation('');
      await fetchResearchers();
    } catch (error) {
      setErrorMessage(
        error.message || (editingResearcherId ? 'Could not update researcher.' : 'Could not register researcher.')
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    clearFeedback();
    setEditingResearcherId(item.id);
    setName(item.name ?? '');
    setEmail(item.email ?? '');
    setDepartment(item.department ?? item.institution ?? '');
    setDesignation(item.designation ?? '');
    setSelectedResearcher(item);
  };

  const handleCancelEdit = () => {
    clearFeedback();
    setEditingResearcherId(null);
    setName('');
    setEmail('');
    setDepartment('');
    setDesignation('');
  };

  const handleView = async (id) => {
    clearFeedback();
    try {
      const payload = await researcherApi.getById(id);
      setSelectedResearcher(payload);
      setSuccessMessage(`Loaded details for researcher ${id}.`);
    } catch (error) {
      setErrorMessage(error.message || 'Could not load researcher details.');
    }
  };

  const handleDelete = async (id) => {
    clearFeedback();
    try {
      await researcherApi.delete(id);
      if (selectedResearcher?.id === id) {
        setSelectedResearcher(null);
      }
      setSuccessMessage(`Deleted researcher ${id}.`);
      await fetchResearchers();
    } catch (error) {
      setErrorMessage(error.message || 'Could not delete researcher.');
    }
  };

  return (
    <section className="researcher-page">
      <header className="researcher-page_header">
        <div>
          <p className="researcher-page_eyebrow">Researcher Endpoint Workspace</p>
          <h1>Researcher Console</h1>
          <p>
            Use the backend endpoint to register researchers, inspect details, update profiles, and manage stored entries.
          </p>
        </div>
        <button type="button" className="researcher-page_ghost" onClick={onGoHome}>
          Back to Home
        </button>
      </header>

      <div className="researcher-page_grid">
        <article className="researcher-page_card">
          <h2>{editingResearcherId ? 'Edit Researcher' : 'Register Researcher'}</h2>
          <form className="researcher-page_form" onSubmit={handleSave}>
            <label htmlFor="researcher-name">Full Name</label>
            <input
              id="researcher-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dr. Sarah Connor"
            />

            <label htmlFor="researcher-email">Email Address</label>
            <input
              id="researcher-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sarah.connor@biovault.org"
            />

            <label htmlFor="researcher-department">Department / Institution</label>
            <input
              id="researcher-department"
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Department of Genomics"
            />

            <label htmlFor="researcher-designation">Designation / Title</label>
            <input
              id="researcher-designation"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g. Senior Principal Investigator"
            />

            <div className="researcher-page_actions">
              <button type="submit" className="researcher-page_primary" disabled={isSaving}>
                {isSaving
                  ? editingResearcherId
                    ? 'Updating...'
                    : 'Registering...'
                  : editingResearcherId
                  ? 'Update Researcher'
                  : 'Register Researcher'}
              </button>
              {editingResearcherId ? (
                <button type="button" className="researcher-page_ghost" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </form>

          {errorMessage ? (
            <p className="researcher-page_message researcher-page_message-error" role="alert">
              {errorMessage}
            </p>
          ) : null}
          {successMessage ? (
            <p className="researcher-page_message researcher-page_message-success">
              {successMessage}
            </p>
          ) : null}
        </article>

        <article className="researcher-page_card">
          <h2>Selected Researcher</h2>
          {selectedResearcher ? (
            <dl className="researcher-page_detail">
              <div>
                <dt>ID</dt>
                <dd>{selectedResearcher.id}</dd>
              </div>
              <div>
                <dt>Full Name</dt>
                <dd>{selectedResearcher.name ?? 'N/A'}</dd>
              </div>
              <div>
                <dt>Email Address</dt>
                <dd>{selectedResearcher.email ?? 'N/A'}</dd>
              </div>
              <div>
                <dt>Department / Institution</dt>
                <dd>{selectedResearcher.department ?? selectedResearcher.institution ?? 'N/A'}</dd>
              </div>
              <div>
                <dt>Designation</dt>
                <dd>{selectedResearcher.designation ?? 'N/A'}</dd>
              </div>
            </dl>
          ) : (
            <p className="researcher-page_meta">Select a saved researcher to load details from the endpoint.</p>
          )}
        </article>

        <article className="researcher-page_card researcher-page_card-full">
          <div className="researcher-page_card-head">
            <h2>Stored Researchers</h2>
            <button type="button" className="researcher-page_ghost" onClick={fetchResearchers} disabled={isLoadingList}>
              {isLoadingList ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <p className="researcher-page_meta">Total: {researchers.length}</p>

          <ul className="researcher-page_list">
            {researchers.map((item) => (
              <li key={item.id}>
                <div>
                  <p>
                    <strong>ID:</strong> {item.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {item.name ?? 'N/A'}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.email ?? 'N/A'}
                  </p>
                  <p>
                    <strong>Department/Institution:</strong> {item.department ?? item.institution ?? 'N/A'}
                  </p>
                  <p>
                    <strong>Designation:</strong> {item.designation ?? 'N/A'}
                  </p>
                </div>
                <div className="researcher-page_item-actions">
                  <button type="button" className="researcher-page_ghost" onClick={() => handleView(item.id)}>
                    View
                  </button>
                  <button type="button" className="researcher-page_ghost" onClick={() => handleEdit(item)}>
                    Edit
                  </button>
                  <button type="button" className="researcher-page_danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {!isLoadingList && researchers.length === 0 ? (
              <li className="researcher-page_empty">No researchers registered yet.</li>
            ) : null}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default ResearcherManagement;
