import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as usersActions } from "./usersSlice.js";
import { actions as postsActions } from "./postsSlice.js";

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  // BEGIN (write your solution here)
  extraReducers: (builder) => {
    builder.addCase(usersActions.removeUser, (state, action) => {
      const userID = action.payload;
      const restEntities = Object.values(state.entities).filter((item) => item.author !== userID);
      commentsAdapter.setAll(state, restEntities);
    });

    builder.addCase(postsActions.removePost, (state, action) => {
      const post = action.payload;
      const postCommentsID = post.comments || [];
      commentsAdapter.removeMany(state, postCommentsID);
    });
  }
  // END
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors(
  (state) => state.comments
);
export default commentsSlice.reducer;
