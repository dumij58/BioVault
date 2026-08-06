import React, { useState, useEffect } from 'react';
import { sequenceTypeService } from '../service/sequenceTypeService';
import './SequenceTypePage.css'; // Import your new style sheets here

export default function SequenceTypePage({ onGoHome }) {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      const data = await sequenceTypeService.getAll();
      setTypes(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Could not connect to backend server endpoints.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Sequence Classification Name is required.');
      return;
    }

    setError('');

    try {
      if (editingId) {
        await sequenceTypeService.update(editingId, { name: name.trim(), description });
      } else {
        await sequenceTypeService.create({ name: name.trim(), description });
      }
      setName('');
      setDescription('');
      setEditingId(null);
      await loadTypes();
    } catch (err) {
      setError(err.message || 'Error processing your entry request.');
    }
  };

  const handleEdit = (type) => {
    setEditingId(type.id);
    setName(type.name);
    setDescription(type.description || '');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sequence type?')) return;
    try {
      await sequenceTypeService.delete(id);
      await loadTypes();
    } catch (err) {
      setError(err.message || 'Failed to clear selection database records.');
    }
  };

  return (
    <div className="seq-mgmt">
      {/* Top Bar matching home paneling blocks */}
      <header className="seq-mgmt__topbar">
        <h1 className="seq-mgmt__title">Sequence Type Registry</h1>
        <button onClick={onGoHome} className="seq-mgmt__back-btn">
          ← Back to Dashboard
        </button>
      </header>

      {error && <div style={{ color: '#ff6e6e', padding: '10px', background: 'rgba(255,110,110,0.1)', borderRadius: '10px' }}>{error}</div>}

      {/* Glassmorphic Action Card Form */}
      <section className="seq-mgmt__card">
        <form onSubmit={handleSubmit} className="seq-mgmt__form">
          <div className="seq-mgmt__form-group">
            <label>Sequence Classification Name</label>
            <input
              type="text"
              placeholder="e.g., DNA, RNA, Protein"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="seq-mgmt__input"
              required
            />
          </div>
          <div className="seq-mgmt__form-group">
            <label>Scope Description</label>
            <input
              type="text"
              placeholder="Provide functional details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="seq-mgmt__input"
            />
          </div>
          <div>
            <button type="submit" className="seq-mgmt__submit-btn">
              {editingId ? 'Update Record' : 'Register Type'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setName(''); setDescription(''); }} className="seq-mgmt__cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Modern High-Utility Data Table Display */}
      <section className="seq-mgmt__table-container">
        <table className="seq-mgmt__table">
          <thead>
            <tr>
              <th>Classification</th>
              <th>Structural Description</th>
              <th>System Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td className="seq-mgmt__name">{type.name}</td>
                <td className="seq-mgmt__desc">{type.description || 'No descriptive summary cataloged.'}</td>
                <td>
                  <button onClick={() => handleEdit(type)} className="seq-mgmt__edit-btn">Update</button>
                  <button onClick={() => handleDelete(type.id)} className="seq-mgmt__delete-btn">Delete</button>
                </td>
              </tr>
            ))}
            {types.length === 0 && (
              <tr>
                <td colSpan={3} className="seq-mgmt__empty">
                  No biomolecule sequence configurations recorded in the database ledger.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
