import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    link?: string;
    technologies: {
        name: string;
        icon: string;
    }[];
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    technologies: [{
        name: { type: String, required: true },
        icon: { type: String, required: true }
    }]
});

export default mongoose.model<IProject>('Project', ProjectSchema);
