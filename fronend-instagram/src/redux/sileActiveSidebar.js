import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
  name: "active",
  initialState: {
    sbActive: 1,
    commentsArr: [],
  },
  reducers: {
    changeActive: (state, action) => {
      state.sbActive = action.payload;
    },
    addComment: (state, action) => {
      const { text } = action.payload;
      const newComment = {
        text,
        like: false,
      };
      state.commentsArr.push(newComment);
    },
  },
});

export const { changeActive, addComment } = activeSlice.actions;

export default activeSlice.reducer;
