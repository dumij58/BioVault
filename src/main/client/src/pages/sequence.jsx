import { useEffect, useMemo, useState } from 'react';
import {
  calcSequenceLengthApi,
  deleteSequenceApi,
  getSequenceByIdApi,
  listSequencesApi,
  saveSequenceApi,
  updateSequenceApi,
} from '../service/sequenceApi';
import './sequence.css';

function Sequence({ onGoHome }) {
  const [sequenceName, setSequenceName] = useState('');
  const [sequenceInput, setSequenceInput] = useState('');
  const [manualLength, setManualLength] = useState('');
  const [calculatedLength, setCalculatedLength] = useState(null);
  const [sequences, setSequences] = useState([]);
  const [selectedSequence, setSelectedSequence] = useState(null);
  const [editingSequenceId, setEditingSequenceId] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const normalizedSequence = useMemo(() => sequenceInput.trim().toUpperCase(), [sequenceInput]);

  const clearFeedback = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const fetchSequences = async () => {
    setIsLoadingList(true);
    clearFeedback();
    try {
      const payload = await listSequencesApi();
      setSequences(payload.sequences ?? []);
    } catch (error) {
      setErrorMessage(error.message || 'Could not load sequences.');
    } finally {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    fetchSequences();
  }, []);

  const parseManualLength = () => {
    const trimmed = manualLength.trim();
    if (!trimmed) {
      return null;
    }

    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed) || parsed < 0) {
      throw new Error('Sequence length must be a non-negative number.');
    }

    return parsed;
  };

  const handleCalculate = async () => {
    clearFeedback();

    if (!normalizedSequence) {
      setErrorMessage('Enter a biological sequence before calculating length.');
      return;
    }

    let parsedLength = null;
    try {
      parsedLength = parseManualLength();
    } catch (error) {
      setErrorMessage(error.message);
      return;
    }

    setIsCalculating(true);
    try {
      const payload = await calcSequenceLengthApi(normalizedSequence, parsedLength);
      setCalculatedLength(payload.seqLength ?? null);
      setSuccessMessage('Sequence length calculated successfully.');
    } catch (error) {
      setErrorMessage(error.message || 'Could not calculate sequence length.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    clearFeedback();

    if (!normalizedSequence) {
      setErrorMessage('Sequence is required.');
      return;
    }

    let parsedLength = null;
    try {
      parsedLength = parseManualLength();
    } catch (error) {
      setErrorMessage(error.message);
      return;
    }

    setIsSaving(true);
    try {
      const trimmedName = sequenceName.trim() || null;
      const payload = editingSequenceId
        ? await updateSequenceApi(editingSequenceId, trimmedName, normalizedSequence, parsedLength)
        : await saveSequenceApi(trimmedName, normalizedSequence, parsedLength);

      setSuccessMessage(editingSequenceId ? `Sequence ${payload.id} updated.` : `Sequence ${payload.id} saved.`);
      setCalculatedLength(payload.seqLength ?? null);
      setManualLength(payload.seqLength?.toString() ?? '');
      setSelectedSequence(payload);
      setEditingSequenceId(null);
      setSequenceName('');
      setSequenceInput('');
      await fetchSequences();
    } catch (error) {
      setErrorMessage(error.message || (editingSequenceId ? 'Could not update sequence.' : 'Could not save sequence.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (item) => {
    clearFeedback();
    setEditingSequenceId(item.id);
    setSequenceName(item.name ?? '');
    setSequenceInput(item.sequence ?? '');
    setManualLength(item.seqLength?.toString() ?? '');
    setCalculatedLength(item.seqLength ?? null);
    setSelectedSequence(item);
  };

  const handleCancelEdit = () => {
    clearFeedback();
    setEditingSequenceId(null);
    setSequenceName('');
    setSequenceInput('');
    setManualLength('');
    setCalculatedLength(null);
  };

  const handleView = async (id) => {
    clearFeedback();
    try {
      const payload = await getSequenceByIdApi(id);
      setSelectedSequence(payload);
      setSuccessMessage(`Loaded sequence ${id}.`);
    } catch (error) {
      setErrorMessage(error.message || 'Could not load sequence details.');
    }
  };

  const handleDelete = async (id) => {
    clearFeedback();
    try {
      await deleteSequenceApi(id);
      if (selectedSequence?.id === id) {
        setSelectedSequence(null);
      }
      setSuccessMessage(`Deleted sequence ${id}.`);
      await fetchSequences();
    } catch (error) {
      setErrorMessage(error.message || 'Could not delete sequence.');
    }
  };

  return (
    <section className="sequence-page">
      <header className="sequence-page_header">
        <div>
          <p className="sequence-page_eyebrow">Sequence Endpoint Workspace</p>
          <h1>Sequence Console</h1>
          <p>Use the backend endpoint to calculate sequence length, save records, inspect details, and manage stored entries.</p>
        </div>
        <button type="button" className="sequence-page_ghost" onClick={onGoHome}>Back to Home</button>
      </header>

      <div className="sequence-page_grid">
        <article className="sequence-page_card">
          <h2>{editingSequenceId ? 'Edit Sequence' : 'Create Sequence'}</h2>
          <form className="sequence-page_form" onSubmit={handleSave}>
            <label htmlFor="sequence-name">Name/Title (optional)</label>
            <input
              id="sequence-name"
              type="text"
              value={sequenceName}
              onChange={(event) => setSequenceName(event.target.value)}
              placeholder="e.g. Sample 1 - COI gene"
            />

            <label htmlFor="sequence-input">Sequence</label>
            <textarea
              id="sequence-input"
              value={sequenceInput}
              onChange={(event) => setSequenceInput(event.target.value)}
              placeholder="Example: ATGCGTAGA"
              rows={5}
            />

            <label htmlFor="manual-length">Manual Length (optional)</label>
            <input
              id="manual-length"
              type="number"
              min="0"
              value={manualLength}
              onChange={(event) => setManualLength(event.target.value)}
              placeholder="If empty, backend computes from sequence"
            />

            <div className="sequence-page_actions">
              <button type="button" className="sequence-page_ghost" onClick={handleCalculate} disabled={isCalculating}>
                {isCalculating ? 'Calculating...' : 'Calculate Length'}
              </button>
              <button type="submit" className="sequence-page_primary" disabled={isSaving}>
                {isSaving ? (editingSequenceId ? 'Updating...' : 'Saving...') : (editingSequenceId ? 'Update Sequence' : 'Save Sequence')}
              </button>
              {editingSequenceId ? (
                <button type="button" className="sequence-page_ghost" onClick={handleCancelEdit}>
                  Cancel Edit
                </button>
              ) : null}
            </div>

            <p className="sequence-page_meta">
              Calculated length: <strong>{calculatedLength ?? 'N/A'}</strong>
            </p>
          </form>

          {errorMessage ? <p className="sequence-page_message sequence-page_message-error" role="alert">{errorMessage}</p> : null}
          {successMessage ? <p className="sequence-page_message sequence-page_message-success">{successMessage}</p> : null}
        </article>

        <article className="sequence-page_card">
          <h2>Selected Sequence</h2>
          {selectedSequence ? (
            <dl className="sequence-page_detail">
              <div>
                <dt>ID</dt>
                <dd>{selectedSequence.id}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{selectedSequence.name ?? 'N/A'}</dd>
              </div>
              <div>
                <dt>Sequence</dt>
                <dd>{selectedSequence.sequence}</dd>
              </div>
              <div>
                <dt>Length</dt>
                <dd>{selectedSequence.seqLength}</dd>
              </div>
            </dl>
          ) : (
            <p className="sequence-page_meta">Select a saved sequence to load details from the endpoint.</p>
          )}
        </article>

        <article className="sequence-page_card  sequence-page_card-full">
          <div className="sequence-page_card-head">
            <h2>Stored Sequences</h2>
            <button type="button" className="sequence-page_ghost" onClick={fetchSequences} disabled={isLoadingList}>
              {isLoadingList ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <p className="sequence-page_meta">Total: {sequences.length}</p>

          <ul className="sequence-page_list">
            {sequences.map((item) => (
              <li key={item.id}>
                <div>
                  <p><strong>ID:</strong> {item.id}</p>
                  <p><strong>Name:</strong> {item.name ?? 'N/A'}</p>
                  <p><strong>Length:</strong> {item.seqLength}</p>
                  <p className="sequence-page_sequence-preview">{item.sequence}</p>
                </div>
                <div className="sequence-page_item-actions">
                  <button type="button" className="sequence-page_ghost" onClick={() => handleView(item.id)}>View</button>
                  <button type="button" className="sequence-page_ghost" onClick={() => handleEdit(item)}>Edit</button>
                  <button type="button" className="sequence-page_danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </li>
            ))}
            {!isLoadingList && sequences.length === 0 ? <li className="sequence-page_empty">No sequences saved yet.</li> : null}
          </ul>
        </article>
        
      </div>
    </section>
  );
}

export default Sequence;