import axios from "axios";

import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(routes.tasksPath());
  return response.data.items;
});

// BEGIN (write your solution here)
export const addTask = createAsyncThunk("tasks/addTask", async (name) => {
  const response = await axios.post(routes.tasksPath(), { name });
  return response.data;
});

export const removeTask = createAsyncThunk("tasks/removeTask", async (id) => {
  await axios.delete(routes.taskPath(id));
  return id;
});

const tasksAdapter = createEntityAdapter();

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({loadingState: "idle", error: null}),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loadingState = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        tasksAdapter.setAll(state, action.payload);
        state.loadingState = "idle";
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loadingState = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.loadingState = "loading";
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload);
        state.loadingState = "idle";
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loadingState = "failed";
        state.error = action.error.message;
      })
      .addCase(removeTask.pending, (state) => {
        state.loadingState = "loading";
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action.payload);
        state.loadingState = "idle";
        state.error = null;
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loadingState = "failed";
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectTasks } = tasksAdapter.getSelectors(
  (state) => state.tasks
);
export default tasksSlice.reducer;
// END
