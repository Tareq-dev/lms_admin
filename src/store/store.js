import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import courseReducer from "@/features/courses/courseSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    courses: courseReducer,
  },
});