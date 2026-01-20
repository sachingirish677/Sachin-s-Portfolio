import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

interface Technology {
    name: string;
    icon: string;
}

interface Project {
    _id?: string;
    title: string;
    description: string;
    link?: string;
    technologies: Technology[];
}

const ProjectManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project>({
        title: '',
        description: '',
        link: '',
        technologies: []
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`http://localhost:5000/api/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error('Error deleting project:', err);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentProject._id) {
                await axios.put(`http://localhost:5000/api/projects/${currentProject._id}`, currentProject);
            } else {
                await axios.post('http://localhost:5000/api/projects', currentProject);
            }
            setIsEditing(false);
            setCurrentProject({ title: '', description: '', link: '', technologies: [] });
            fetchProjects();
        } catch (err) {
            console.error('Error saving project:', err);
        }
    };

    const handleTechChange = (index: number, field: keyof Technology, value: string) => {
        const newTechs = [...currentProject.technologies];
        newTechs[index] = { ...newTechs[index], [field]: value };
        setCurrentProject({ ...currentProject, technologies: newTechs });
    };

    const addTech = () => {
        setCurrentProject({
            ...currentProject,
            technologies: [...currentProject.technologies, { name: '', icon: '' }]
        });
    };

    const removeTech = (index: number) => {
        const newTechs = currentProject.technologies.filter((_, i) => i !== index);
        setCurrentProject({ ...currentProject, technologies: newTechs });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setCurrentProject({ title: '', description: '', link: '', technologies: [] });
                            setIsEditing(true);
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add Project
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">{currentProject._id ? 'Edit Project' : 'New Project'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={currentProject.title}
                                onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Description</label>
                            <textarea
                                value={currentProject.description}
                                onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Link</label>
                            <input
                                type="text"
                                value={currentProject.link || ''}
                                onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Technologies</label>
                            {currentProject.technologies.map((tech, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-sm font-medium text-gray-600">Technology #{index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => removeTech(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="grid gap-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={tech.name}
                                            onChange={(e) => handleTechChange(index, 'name', e.target.value)}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                        <ImageUpload
                                            value={tech.icon}
                                            onChange={(url) => handleTechChange(index, 'icon', url)}
                                            label="Icon"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addTech}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-1" /> Add Technology
                            </button>
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
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-lg">{project.title}</h3>
                                <p className="text-gray-600 text-sm">{project.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setCurrentProject(project);
                                        setIsEditing(true);
                                    }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id!)}
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

export default ProjectManager;
