import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
    degree: string;
    institution: string;
    year: string;
}

const EducationSchema: Schema = new Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true }
});

export default mongoose.model<IEducation>('Education', EducationSchema);
