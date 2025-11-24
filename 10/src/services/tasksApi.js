import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const tasksApi = createApi({
    reducerPath: "tasksApi",
    baseQuery: fetchBaseQuery({baseUrl: "/api", fetchFn: fetch}),
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "/tasks",
            providesTags: (result) => result
                ? [...result.map(({ id }) => ({ type: "Tasks", id })), "Tasks"]
                : ["Tasks"],
        }),
        createTask: builder.mutation({
            query: (task) => ({  
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),
    }), 
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation } = tasksApi;
// END
