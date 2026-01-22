import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import { API_ENDPOINTS } from '../config/api';

interface AboutData {
    description: string;
    imageUrl: string;
}

const AboutManager = () => {
    const [aboutData, setAboutData] = useState<AboutData>({
        description: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            const res = await axios.get(API_ENDPOINTS.about);
            if (res.data && (res.data.description || res.data.imageUrl)) {
                setAboutData({
                    description: res.data.description || '',
                    imageUrl: res.data.imageUrl || ''
                });
            }
        } catch (err) {
            console.error('Error fetching about data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        try {
            await axios.put(API_ENDPOINTS.about, aboutData);
            setMessage({ type: 'success', text: 'About section updated successfully!' });
        } catch (err) {
            console.error('Error saving about data:', err);
            setMessage({ type: 'error', text: 'Failed to update About section.' });
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Manage About Section</h2>

            {message && (
                <div className={`p-4 mb-6 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            value={aboutData.description}
                            onChange={(e) => setAboutData({ ...aboutData, description: e.target.value })}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                            placeholder="Enter your bio..."
                            required
                        />
                        <p className="text-sm text-gray-500 mt-1">HTML tags are supported for formatting (e.g., &lt;strong&gt;)</p>
                    </div>

                    <ImageUpload
                        value={aboutData.imageUrl}
                        onChange={(url) => setAboutData({ ...aboutData, imageUrl: url })}
                        label="Profile Image"
                    />

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Save className="w-5 h-5 mr-2" /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AboutManager;
