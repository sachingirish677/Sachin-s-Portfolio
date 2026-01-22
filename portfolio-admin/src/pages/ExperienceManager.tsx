import { API_ENDPOINTS } from '../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Calendar, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Experience {
    _id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
}

export default function ExperienceManager() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [newExperience, setNewExperience] = useState({
        company: '',
        role: '',
        duration: '',
        description: ''
    });
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.experiences);
            setExperiences(res.data);
        } catch (err) {
            console.error('Error fetching experiences:', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            try {
                await axios.put(`${API_ENDPOINTS.experiences}/${isEditing}`, newExperience);
                setIsEditing(null);
            } catch (err) {
                console.error('Error updating experience:', err);
            }
        } else {
            try {
                await axios.post(API_ENDPOINTS.experiences, newExperience);
            } catch (err) {
                console.error('Error creating experience:', err);
            }
        }
        setNewExperience({ company: '', role: '', duration: '', description: '' });
        fetchExperiences();
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            try {
                await axios.delete(`${API_ENDPOINTS.experiences}/${id}`);
                fetchExperiences();
            } catch (err) {
                console.error('Error deleting experience:', err);
            }
        }
    };

    const handleEdit = (exp: Experience) => {
        setNewExperience({
            company: exp.company,
            role: exp.role,
            duration: exp.duration,
            description: exp.description
        });
        setIsEditing(exp._id);
    };

    return (
        <div className="p-6">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">Experience Manager</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Plus size={20} />
                        {isEditing ? 'Edit Experience' : 'Add New Experience'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                                type="text"
                                value={newExperience.company}
                                onChange={e => setNewExperience({ ...newExperience, company: e.target.value })}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <input
                                type="text"
                                value={newExperience.role}
                                onChange={e => setNewExperience({ ...newExperience, role: e.target.value })}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input
                                type="text"
                                value={newExperience.duration}
                                onChange={e => setNewExperience({ ...newExperience, duration: e.target.value })}
                                placeholder="e.g. 2023 - Present"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={newExperience.description}
                                onChange={e => setNewExperience({ ...newExperience, description: e.target.value })}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                rows={4}
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                {isEditing ? 'Update Experience' : 'Add Experience'}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(null);
                                        setNewExperience({ company: '', role: '', duration: '', description: '' });
                                    }}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Current Experience List</h2>
                    {experiences.map(exp => (
                        <div key={exp._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Briefcase className="text-blue-600" size={20} />
                                        <h3 className="text-xl font-bold">{exp.company}</h3>
                                    </div>
                                    <h4 className="text-lg text-gray-700 font-medium mb-1">{exp.role}</h4>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                                        <Calendar size={16} />
                                        <span>{exp.duration}</span>
                                    </div>
                                    <p className="text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(exp)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(exp._id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {experiences.length === 0 && (
                        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed">
                            No experiences added yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
