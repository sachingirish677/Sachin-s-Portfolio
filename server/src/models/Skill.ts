import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    icon: string;
}

const SkillSchema: Schema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true }
});

export default mongoose.model<ISkill>('Skill', SkillSchema);
