import React, { useState, useEffect } from 'react';

export default function InstitutionManagement() {
    const [institutions, setInstitutions] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        country: '',
        address: '',
        contactInformation: ''
    });

    const API_URL = '/api/v1/institutions';

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
                fetchInstitutions();
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
        <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
            <h2>Institution Management</h2>

            {/* FORM TO ADD INSTITUTION */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <h3>Add New Institution</h3>
                <input type="text" name="name" placeholder="Institution Name" value={formData.name} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required style={{ padding: '8px' }} />
                <input type="text" name="contactInformation" placeholder="Contact Info" value={formData.contactInformation} onChange={handleChange} required style={{ padding: '8px' }} />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Save Institution
                </button>
            </form>

            {/* TABLE TO VIEW INSTITUTIONS */}
            <h3>Registered Institutions</h3>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Address</th>
                    <th>Contact Info</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {institutions.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center' }}>No institutions registered yet.</td></tr>
                ) : (
                    institutions.map((inst) => (
                        <tr key={inst.id}>
                            <td>{inst.name}</td>
                            <td>{inst.country}</td>
                            <td>{inst.address}</td>
                            <td>{inst.contactInformation}</td>
                            <td>
                                <button onClick={() => handleDelete(inst.id)} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
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