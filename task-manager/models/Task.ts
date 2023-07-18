import mongoose from 'mongoose';

export type ITask = {
    name: string,
    completed: boolean
}

const TaskSchema = new mongoose.Schema<ITask>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Task', TaskSchema);

