import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Resend } from 'resend';

import Project from './models/Project';
import Skill from './models/Skill';
import Education from './models/Education';
import About from './models/About';
import Experience from './models/Experience';

dotenv.config();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// Projects CRUD
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// Skills CRUD
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

app.post('/api/skills', async (req, res) => {
    try {
        const skill = new Skill(req.body);
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.put('/api/skills/:id', async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(skill);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.delete('/api/skills/:id', async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// Education CRUD
app.get('/api/education', async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

app.post('/api/education', async (req, res) => {
    try {
        const education = new Education(req.body);
        const newEducation = await education.save();
        res.status(201).json(newEducation);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.put('/api/education/:id', async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(education);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.delete('/api/education/:id', async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education deleted' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// Experience CRUD
app.get('/api/experiences', async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

app.post('/api/experiences', async (req, res) => {
    try {
        const experience = new Experience(req.body);
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.put('/api/experiences/:id', async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(experience);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.delete('/api/experiences/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ message: 'Experience deleted' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

// About CRUD
app.get('/api/about', async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about || {});
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

app.post('/api/about', async (req, res) => {
    try {
        const existingAbout = await About.findOne();
        if (existingAbout) {
            return res.status(400).json({ message: 'About section already exists. Use PUT to update.' });
        }
        const about = new About(req.body);
        const newAbout = await about.save();
        res.status(201).json(newAbout);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

app.put('/api/about', async (req, res) => {
    try {
        let about = await About.findOne();
        if (about) {
            about.description = req.body.description;
            about.imageUrl = req.body.imageUrl;
            await about.save();
        } else {
            about = new About(req.body);
            await about.save();
        }
        res.json(about);
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

// Contact Endpoint using Resend
app.post('/api/contact', async (req, res) => {
    const { email, description } = req.body;

    console.log('--- Contact Request Received ---');
    console.log('From:', email);
    console.log('Description:', description);

    if (!email || !description) {
        console.warn('Validation Failed: Email and description are required');
        return res.status(400).json({ message: 'Email and description are required' });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('ERROR: RESEND_API_KEY is missing in environment variables');
        return res.status(500).json({ message: 'Email service not configured' });
    }

    try {
        console.log('Sending email via Resend...');

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev', // Use this for testing, or your verified domain
            to: 'sachingirish1677@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact: Message from ${email}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${description.replace(/\n/g, '<br>')}</p>
            `
        });

        if (error) {
            console.error('Resend API error:', error);
            return res.status(500).json({
                message: 'Failed to send email',
                error: error.message
            });
        }

        console.log('Email sent successfully via Resend:', data);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
        console.error('CRITICAL ERROR sending email:', error);
        res.status(500).json({
            message: 'Failed to send email',
            error: error.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('Portfolio Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
