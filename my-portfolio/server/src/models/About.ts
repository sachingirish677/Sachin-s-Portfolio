import mongoose, { Schema, Document } from 'mongoose';

export interface IAbout extends Document {
    description: string;
    imageUrl: string;
}

const AboutSchema: Schema = new Schema({
    description: { type: String, required: true },
    imageUrl: { type: String }
});

export default mongoose.model<IAbout>('About', AboutSchema);
