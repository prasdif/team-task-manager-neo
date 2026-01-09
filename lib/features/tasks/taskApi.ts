import { apiSlice } from '../api/apiSlice';

export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'admin' | 'member';
}

export interface Task {
    _id: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'pending' | 'in-progress' | 'completed';
    assignee?: User;
    assigneeName?: string;
    dueDate: string;
    subtasks?: string[];
    createdBy: User;
    createdAt: string;
    updatedAt: string;
}

export const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], { filter: 'my' | 'all'; search?: string }>({
            query: ({ filter = 'my', search = '' }) => `/tasks?filter=${filter}&search=${search}`,
            providesTags: ['Task'],
        }),
        getTeamMembers: builder.query<User[], void>({
            query: () => '/users/team',
            providesTags: ['User'],
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: ['User'],
        }),
        createTask: builder.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: '/tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Task'],
        }),
        updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
            query: ({ id, data }) => ({
                url: `/tasks/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTeamMembersQuery,
    useGetAllUsersQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi;
