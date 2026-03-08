import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    {
      id: 1,
      title: "React Mastery",
      instructor: "John Doe",
      category: "Frontend",
      price: 49,
      duration: "6 weeks",
      students: 120,
      status: "Published",
    },
  ],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },

    updateCourse: (state, action) => {
      const index = state.courses.findIndex(
        (c) => c.id === action.payload.id
      );

      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },

    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } =
  courseSlice.actions;

export default courseSlice.reducer;