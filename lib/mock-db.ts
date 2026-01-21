
// Simple in-memory storage for when MongoDB is not available
// This data is ephemeral and will reset when the server restarts (or lambda cold starts)

export type User = {
    _id: string;
    username: string;
    email?: string;
    password?: string;
    role: string;
    matchPassword?: (pw: string) => Promise<boolean>;
};

export type Task = {
    _id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
    assignee?: string;
    assigneeName?: string;
    dueDate?: string;
    subtasks?: string[];
    createdBy: string;
    createdAt?: Date;
    updatedAt?: Date;
};

// Global cache to persist across hot-reloads in dev
const globalStore = global as unknown as {
    mockUsers: User[],
    mockTasks: Task[]
};

if (!globalStore.mockUsers) globalStore.mockUsers = [];
if (!globalStore.mockTasks) globalStore.mockTasks = [];

export const MockDB = {
    users: {
        findOne: async (query: { email?: string; username?: string }) => {
            return globalStore.mockUsers.find(u =>
                (query.email && u.email === query.email) ||
                (query.username && u.username === query.username)
            ) || null;
        },
        create: async (data: any) => {
            const newUser = {
                ...data,
                _id: Math.random().toString(36).substring(7),
                matchPassword: async () => true // Mock password check
            };
            globalStore.mockUsers.push(newUser);
            return newUser;
        },
        findById: async (id: string) => {
            return globalStore.mockUsers.find(u => u._id === id) || null;
        },
        find: async () => globalStore.mockUsers
    },
    tasks: {
        find: async (query: any) => {
            // Very basic filter support
            let results = globalStore.mockTasks;
            if (query.assignee) {
                results = results.filter(t => t.assignee === query.assignee);
            }
            // Mock populate-like behavior manually if needed in route
            return results;
        },
        create: async (data: any) => {
            const newTask = {
                ...data,
                _id: Math.random().toString(36).substring(7),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            globalStore.mockTasks.push(newTask);
            return newTask;
        },
        findById: async (id: string) => {
            return globalStore.mockTasks.find(t => t._id === id) || null;
        },
        findByIdAndUpdate: async (id: string, data: any) => {
            const index = globalStore.mockTasks.findIndex(t => t._id === id);
            if (index === -1) return null;
            globalStore.mockTasks[index] = { ...globalStore.mockTasks[index], ...data };
            return globalStore.mockTasks[index];
        },
        findByIdAndDelete: async (id: string) => {
            const index = globalStore.mockTasks.findIndex(t => t._id === id);
            if (index !== -1) globalStore.mockTasks.splice(index, 1); 
        
            /*if task to the issue escaled */

            return true;
        }
    } 
};