import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, Save } from 'lucide-react';

interface Education {
    _id?: string;
    degree: string;
    institution: string;
    year: string;
}

const EducationManager = () => {
    const [educationList, setEducationList] = useState<Education[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEducation, setCurrentEducation] = useState<Education>({
        degree: '',
        institution: '',
        year: ''
    });

    useEffect(() => {
        fetchEducation();
    }, []);

    const fetchEducation = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/education');
            setEducationList(res.data);
        } catch (err) {
            console.error('Error fetching education:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this education entry?')) {
            try {
                await axios.delete(`http://localhost:5000/api/education/${id}`);
                fetchEducation();
            } catch (err) {
                console.error('Error deleting education:', err);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentEducation._id) {
                await axios.put(`http://localhost:5000/api/education/${currentEducation._id}`, currentEducation);
            } else {
                await axios.post('http://localhost:5000/api/education', currentEducation);
            }
            setIsEditing(false);
            setCurrentEducation({ degree: '', institution: '', year: '' });
            fetchEducation();
        } catch (err) {
            console.error('Error saving education:', err);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Education</h2>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setCurrentEducation({ degree: '', institution: '', year: '' });
                            setIsEditing(true);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add Education
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
                    <h3 className="text-xl font-semibold mb-4">{currentEducation._id ? 'Edit Education' : 'New Education'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Degree</label>
                            <input
                                type="text"
                                value={currentEducation.degree}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Institution</label>
                            <input
                                type="text"
                                value={currentEducation.institution}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Year</label>
                            <input
                                type="text"
                                value={currentEducation.year}
                                onChange={(e) => setCurrentEducation({ ...currentEducation, year: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                <Save className="w-5 h-5 mr-2" /> Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid gap-4">
                    {educationList.map((edu) => (
                        <div key={edu._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                                <p className="text-gray-600">{edu.institution}</p>
                                <p className="text-gray-500 text-sm">{edu.year}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setCurrentEducation(edu);
                                        setIsEditing(true);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(edu._id!)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EducationManager;
