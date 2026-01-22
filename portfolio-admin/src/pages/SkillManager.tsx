import { API_ENDPOINTS } from '../config/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, Save } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

interface Skill {
    _id?: string;
    name: string;
    icon: string;
}

const SkillManager = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkill, setCurrentSkill] = useState<Skill>({
        name: '',
        icon: ''
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.skills);
            setSkills(res.data);
        } catch (err) {
            console.error('Error fetching skills:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                await axios.delete(`${API_ENDPOINTS.skills}/${id}`);
                fetchSkills();
            } catch (err) {
                console.error('Error deleting skill:', err);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentSkill._id) {
                await axios.put(`${API_ENDPOINTS.skills}/${currentSkill._id}`, currentSkill);
            } else {
                await axios.post(API_ENDPOINTS.skills, currentSkill);
            }
            setIsEditing(false);
            setCurrentSkill({ name: '', icon: '' });
            fetchSkills();
        } catch (err) {
            console.error('Error saving skill:', err);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Skills</h2>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setCurrentSkill({ name: '', icon: '' });
                            setIsEditing(true);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add Skill
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
                    <h3 className="text-xl font-semibold mb-4">{currentSkill._id ? 'Edit Skill' : 'New Skill'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={currentSkill.name}
                                onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <ImageUpload
                            value={currentSkill.icon}
                            onChange={(url) => setCurrentSkill({ ...currentSkill, icon: url })}
                            label="Skill Icon"
                        />

                        <div className="flex justify-end gap-2 mt-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                        <div key={skill._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
                                <h3 className="font-semibold text-lg">{skill.name}</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setCurrentSkill(skill);
                                        setIsEditing(true);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(skill._id!)}
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

export default SkillManager;
