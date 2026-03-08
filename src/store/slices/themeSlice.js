import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("theme");
    return saved ? saved : "light";
  }
  return "light";
};

const themeSlice = createSlice({
  name: "theme",

  initialState: {
    mode: getInitialTheme(),
  },

  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },

    setTheme: (state, action) => {
      state.mode = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
