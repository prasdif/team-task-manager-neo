import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'pending' | 'in-progress' | 'completed';
    assignee?: mongoose.Types.ObjectId;
    assigneeName?: string;
    dueDate?: string;
    subtasks?: string[];
    createdBy: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
    {
        title: { type: String, required: true },
        description: { type: String },
        priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
        status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
        assignee: { type: Schema.Types.ObjectId, ref: 'User' },
        assigneeName: { type: String },
        dueDate: { type: String },
        subtasks: [{ type: String }],
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema);

export default Task;
