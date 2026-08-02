import React, { useEffect, useState } from 'react';

interface Sample {
    id?: number | string;
    species: string;
    sampleType: string;
    collectionDate: string;
    storageLocation: string;
    associatedProject: string;
}

export const SampleList: React.FC = () => {
    const [samples, setSamples] = useState<Sample[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<Sample>({
        species: '',
        sampleType: '',
        collectionDate: '',
        storageLocation: '',
        associatedProject: '',
    });

    // 1. Fetch Samples from Backend API
    const fetchSamples = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/samples'); // Adjust port/path if needed
            if (response.ok) {
                const data = await response.json();
                setSamples(data);
            }
        } catch (error) {
            console.error('Error fetching samples:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSamples();
    }, []);

    // Handle Form Inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 2. Register Sample (Create)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/samples', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormData({
                    species: '',
                    sampleType: '',
                    collectionDate: '',
                    storageLocation: '',
                    associatedProject: '',
                });
                fetchSamples(); // Refresh list
            }
        } catch (error) {
            console.error('Error creating sample:', error);
        }
    };

    // 3. Delete Sample
    const handleDelete = async (id?: number | string) => {
        if (!id) return;
        try {
            const response = await fetch(`http://localhost:8080/api/samples/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchSamples();
            }
        } catch (error) {
            console.error('Error deleting sample:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-4">
            <header className="border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Sample Management</h1>
                <p className="text-gray-600 mt-1">
                    Register, view, and manage biological samples collected during research[cite: 1].
                </p>
            </header>

            {/* Register Sample Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Register New Sample</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Species</label>
                        <input
                            type="text"
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500"
                            placeholder="e.g. Homo sapiens"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sample Type</label>
                        <input
                            type="text"
                            name="sampleType"
                            value={formData.sampleType}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500"
                            placeholder="e.g. Blood, Tissue, DNA"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Collection Date</label>
                        <input
                            type="date"
                            name="collectionDate"
                            value={formData.collectionDate}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Storage Location</label>
                        <input
                            type="text"
                            name="storageLocation"
                            value={formData.storageLocation}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500"
                            placeholder="e.g. Freezer A - Shelf 2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Associated Project</label>
                        <input
                            type="text"
                            name="associatedProject"
                            value={formData.associatedProject}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-2 border rounded-md border-gray-300 focus:ring-blue-500"
                            placeholder="e.g. Project Alpha"
                        />
                    </div>

                    <div className="flex items-end md:col-span-2 lg:col-span-1">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
                        >
                            + Register Sample
                        </button>
                    </div>
                </form>
            </div>

            {/* Sample List Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">Sample Repository</h2>
                </div>

                {loading ? (
                    <p className="p-6 text-center text-gray-500">Loading samples...</p>
                ) : samples.length === 0 ? (
                    <p className="p-6 text-center text-gray-500">No samples registered yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm font-medium border-b">
                                <th className="p-3">ID</th>
                                <th className="p-3">Species</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Collection Date</th>
                                <th className="p-3">Storage Location</th>
                                <th className="p-3">Project</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y text-sm text-gray-800">
                            {samples.map((sample) => (
                                <tr key={sample.id} className="hover:bg-gray-50">
                                    <td className="p-3 font-mono text-xs">{sample.id}</td>
                                    <td className="p-3 font-medium">{sample.species}</td>
                                    <td className="p-3">{sample.sampleType}</td>
                                    <td className="p-3">{sample.collectionDate}</td>
                                    <td className="p-3">{sample.storageLocation}</td>
                                    <td className="p-3">{sample.associatedProject}</td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDelete(sample.id)}
                                            className="text-red-600 hover:text-red-800 font-medium text-xs px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SampleList;