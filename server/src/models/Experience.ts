import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
    company: string;
    role: string;
    duration: string;
    description: string;
}

const ExperienceSchema: Schema = new Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: false }
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
