import React, { useState, useEffect } from 'react';

export default function InstitutionManagement() {
    const [institutions, setInstitutions] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        address: '',
        contactInformation: ''
    });

    const API_URL = 'http://localhost:8080/api/v1/institutions';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                fetchInstitutions(); // Refresh table
            }
        } catch (error) {
            console.error("Error creating institution:", error);
        }
    };

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
        <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                Institution Management
            </h2>

            {/* FORM TO ADD INSTITUTION */}
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Add New Institution</h3>

                <input type="text" name="name" placeholder="Institution Name" value={formData.name} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input type="text" name="contactInformation" placeholder="Contact Information" value={formData.contactInformation} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />

                <button type="submit" style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Save Institution
                </button>
            </form>

            {/* TABLE TO VIEW INSTITUTIONS */}
            <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Registered Institutions</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th style={{ padding: '12px' }}>Country</th>
                    <th style={{ padding: '12px' }}>Address</th>
                    <th style={{ padding: '12px' }}>Contact Info</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {institutions.length === 0 ? (
                    <tr><td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#6b7280' }}>No institutions registered yet.</td></tr>
                ) : (
                    institutions.map((inst) => (
                        <tr key={inst.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '12px' }}>{inst.name}</td>
                            <td style={{ padding: '12px' }}>{inst.country}</td>
                            <td style={{ padding: '12px' }}>{inst.address}</td>
                            <td style={{ padding: '12px' }}>{inst.contactInformation}</td>
                            <td style={{ padding: '12px' }}>
                                <button onClick={() => handleDelete(inst.id)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}