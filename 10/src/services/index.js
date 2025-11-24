import { configureStore } from "@reduxjs/toolkit";

// BEGIN (write your solution here)
import { tasksApi } from "./tasksApi";

export default configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tasksApi.middleware),
})
// END
