import { useState } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from './config/api';
import axios from 'axios';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await axios.post(API_ENDPOINTS.contact, {
                email,
                description
            });
            setStatus('success');
            setEmail('');
            setDescription('');
        } catch (error: any) {
            console.error('Error sending email:', error);
            if (error.response) {
                console.error('Backend Error Response:', error.response.data);
            }
            setStatus('error');
        }
    };

    return (
        <motion.div
            className="contact-main"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
        >
            <h1 className="contact-title" id="contact">Hey Let's Talk</h1>
            <div className="contact-card">
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="your@email.com"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Message</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="How can I help you?"
                            className="form-textarea"
                            rows={4}
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                    {status === 'success' && (
                        <p className="status-message success">Message sent successfully!</p>
                    )}
                    {status === 'error' && (
                        <p className="status-message error">Failed to send message. Please try again.</p>
                    )}
                </form>
            </div>
        </motion.div>
    );
}
