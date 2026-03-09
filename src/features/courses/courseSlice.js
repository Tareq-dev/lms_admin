import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    {
    id: 1,
    title: "Complete React Bootcamp",
    instructor: "John Doe",
    category: "Frontend",
    price: 49,
    duration: "6 Weeks",
    students: 120,
    status: "Published",
    thumbnail: "",
  },
  {
    id: 2,
    title: "Next.js Mastery",
    instructor: "Sarah Ali",
    category: "Frontend",
    price: 59,
    duration: "5 Weeks",
    students: 80,
    status: "Published",
  },
  {
    id: 3,
    title: "Node.js API Development",
    instructor: "Mike Ross",
    category: "Backend",
    price: 45,
    duration: "4 Weeks",
    students: 95,
    status: "Draft",
  },
  {
    id: 4,
    title: "UI UX Design",
    instructor: "Jessica",
    category: "Design",
    price: 39,
    duration: "3 Weeks",
    students: 140,
    status: "Published",
  },
  {
    id: 5,
    title: "MongoDB Database",
    instructor: "David",
    category: "Backend",
    price: 30,
    duration: "2 Weeks",
    students: 60,
    status: "Published",
  },
  {
    id: 6,
    title: "Full Stack MERN",
    instructor: "Alex",
    category: "Fullstack",
    price: 99,
    duration: "8 Weeks",
    students: 200,
    status: "Published",
  },
  {
    id: 7,
    title: "TypeScript for Devs",
    instructor: "Andrew",
    category: "Programming",
    price: 29,
    duration: "2 Weeks",
    students: 50,
    status: "Draft",
  },
  {
    id: 8,
    title: "Tailwind CSS Pro",
    instructor: "Chris",
    category: "Frontend",
    price: 25,
    duration: "1 Week",
    students: 70,
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
      console.log("Course added:", action.payload);
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