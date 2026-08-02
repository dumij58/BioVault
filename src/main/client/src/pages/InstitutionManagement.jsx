import React, { useState, useEffect } from 'react';
import { Env } from "../config/Env";

const API_URL = Env.API_BASE_URL + "/institutions";

export default function InstitutionManagement({ onGoHome }) {
    const [institutions, setInstitutions] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        address: '',
        contactInformation: ''
    });

    // READ
    const fetchInstitutions = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                setInstitutions(data);
            }
        } catch (error) {
            console.error("Error fetching institutions:", error);
        }
    };

    useEffect(() => {
        fetchInstitutions();
    }, []);

    // Handle Form Inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // CREATE
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormData({ name: '', country: '', address: '', contactInformation: '' });
                fetchInstitutions();
            }
        } catch (error) {
            console.error("Error creating institution:", error);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchInstitutions();
            }
        } catch (error) {
            console.error("Error deleting institution:", error);
        }
    };

    return (
        <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif', color: '#f3f4f6' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#ffffff' }}>
                Institution Management
            </h2>

            <button
                    className="back-btn"
                    onClick={onGoHome}
                >
                    ← Back to Home
            </button>

            {/* FORM CARD (DARK THEME) */}
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#f8fafc', fontWeight: '600' }}>
                    Add New Institution
                </h3>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Institution Name</label>
                    <input type="text" name="name" placeholder="e.g. University of Colombo" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Country</label>
                    <input type="text" name="country" placeholder="e.g. Sri Lanka" value={formData.country} onChange={handleChange} required style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Address</label>
                    <input type="text" name="address" placeholder="e.g. College House, Cumaratunga Munidasa Mawatha" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>Contact Information</label>
                    <input type="text" name="contactInformation" placeholder="e.g. +94 11 258 2410" value={formData.contactInformation} onChange={handleChange} required style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{ marginTop: '8px', padding: '12px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}>
                    Save Institution
                </button>
            </form>

            {/* REGISTERED INSTITUTIONS TABLE (DARK THEME) */}
            <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#f8fafc' }}>Registered Institutions</h3>
            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #334155' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: '#1e293b' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
                        <th style={{ padding: '14px', color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>Name</th>
                        <th style={{ padding: '14px', color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>Country</th>
                        <th style={{ padding: '14px', color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>Address</th>
                        <th style={{ padding: '14px', color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>Contact Info</th>
                        <th style={{ padding: '14px', color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {institutions.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                                No institutions registered yet.
                            </td>
                        </tr>
                    ) : (
                        institutions.map((inst) => (
                            <tr key={inst.id} style={{ borderBottom: '1px solid #334155' }}>
                                <td style={{ padding: '14px', color: '#f8fafc' }}>{inst.name}</td>
                                <td style={{ padding: '14px', color: '#cbd5e1' }}>{inst.country}</td>
                                <td style={{ padding: '14px', color: '#cbd5e1' }}>{inst.address}</td>
                                <td style={{ padding: '14px', color: '#cbd5e1' }}>{inst.contactInformation}</td>
                                <td style={{ padding: '14px' }}>
                                    <button onClick={() => handleDelete(inst.id)} style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}