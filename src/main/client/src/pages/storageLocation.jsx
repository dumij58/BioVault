import { useEffect, useState } from "react";
import "./storageLocation.css";
import {
    getStorageLocations,
    createStorageLocation,
    deleteStorageLocation
} from "../service/storageLocationService";

function StorageLocation({ onGoHome }) {

    const [showLocations, setShowLocations] = useState(false);
    const [locations, setLocations] = useState([]);

    const [formData, setFormData] = useState({
        storageId: "",
        building: "",
        laboratory: "",
        freezerNumber: "",
        shelf: "",
        box: ""
    });

    const [editId, setEditId] = useState(null);

    const loadLocations = async () => {
        const data = await getStorageLocations();
        setLocations(data);
    };

    useEffect(() => {
        loadLocations();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await fetch(
                `http://localhost:8080/api/storage-locations/${editId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );
        } else {
            await createStorageLocation(formData);
        }

        setFormData({
            storageId: "",
            building: "",
            laboratory: "",
            freezerNumber: "",
            shelf: "",
            box: ""
        });

        setEditId(null);

        loadLocations();
    };

    const handleEdit = (location) => {

        setEditId(location.id);

        setFormData({
            storageId: location.storageId || "",
            building: location.building || "",
            laboratory: location.laboratory || "",
            freezerNumber: location.freezerNumber || "",
            shelf: location.shelf || "",
            box: location.box || ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDelete = async (id) => {
        await deleteStorageLocation(id);
        loadLocations();
    };

    return (

        <div className="storage-page">

            <div className="storage-header">

                <button
                    className="back-btn"
                    onClick={onGoHome}
                >
                    ← Back to Home
                </button>

                <h1>Storage Location Management</h1>

                <p>
                    Manage laboratory storage locations for biological samples.
                </p>

            </div>

            <div className="storage-form-card">

                <h2>
                    {editId ? "Edit Storage Location" : "Add Storage Location"}
                </h2>

                <form
                    className="storage-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        name="storageId"
                        placeholder="Storage ID"
                        value={formData.storageId}
                        onChange={handleChange}
                    />

                    <input
                        name="building"
                        placeholder="Building"
                        value={formData.building}
                        onChange={handleChange}
                    />

                    <input
                        name="laboratory"
                        placeholder="Laboratory"
                        value={formData.laboratory}
                        onChange={handleChange}
                    />

                    <input
                        name="freezerNumber"
                        placeholder="Freezer Number"
                        value={formData.freezerNumber}
                        onChange={handleChange}
                    />

                    <input
                        name="shelf"
                        placeholder="Shelf"
                        value={formData.shelf}
                        onChange={handleChange}
                    />

                    <input
                        name="box"
                        placeholder="Box"
                        value={formData.box}
                        onChange={handleChange}
                    />

                    <button
                        className="submit-btn"
                        type="submit"
                    >
                        {editId ? "Update Storage Location" : "Add Storage Location"}
                    </button>

                </form>

            </div>

            <div className="storage-actions">

                <button
                    className="view-btn"
                    onClick={() => setShowLocations(!showLocations)}
                >
                    {showLocations ? "Hide Storage Locations" : "View Storage Locations"}
                </button>

            </div>

            {showLocations && (

                <div className="storage-list">

                    <h2>Existing Storage Locations</h2>

                    {locations.map((location) => (

                        <div
                            className="storage-card"
                            key={location.id}
                        >

                            <p><strong>Storage ID:</strong> {location.storageId}</p>
                            <p><strong>Building:</strong> {location.building}</p>
                            <p><strong>Laboratory:</strong> {location.laboratory}</p>
                            <p><strong>Freezer:</strong> {location.freezerNumber}</p>
                            <p><strong>Shelf:</strong> {location.shelf}</p>
                            <p><strong>Box:</strong> {location.box}</p>

                            <div className="button-group">

                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(location)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(location.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default StorageLocation;