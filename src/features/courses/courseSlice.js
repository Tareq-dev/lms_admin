import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    {
      id: 1,
      title: "Complete React Bootcamp",
      instructor: "John Doe",
      category: "Frontend",
      description:
        "Learn React from scratch and build powerful single-page applications.",
      price: 49,
      duration: "6 Weeks",
      level: "Beginner",
      students: 120,
      status: "Published",
      thumbnail: "",
      modules: [
        {
          title: "React Basics",
          chapters: [
            {
              title: "What is React",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
            {
              title: "JSX Introduction",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
          ],
        },
        {
          title: "React Hooks",
          chapters: [
            {
              title: "useState Hook",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
            {
              title: "useEffect Hook",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Next.js Mastery",
      instructor: "Sarah Ali",
      category: "Frontend",
      level: "Intermediate",
      description:
        "Learn Next.js from scratch and build powerful server-rendered React applications with ease.",
      price: 59,
      level: "Intermediate",
      duration: "5 Weeks",
      students: 80,
      status: "Published",
      thumbnail: "",
      modules: [
        {
          title: "Next.js Fundamentals",
          chapters: [
            {
              title: "App Router",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
            {
              title: "Layouts & Pages",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      level: "Intermediate",
      title: "Node.js API Development",
      instructor: "Mike Ross",
      category: "Backend",
      price: 45,
      description:
        "Learn to build powerful RESTful APIs with Node.js and Express.",
      duration: "4 Weeks",
      students: 95,
      status: "Draft",
      thumbnail: "",
      modules: [
        {
          title: "Node Basics",
          chapters: [
            {
              title: "Intro to Node",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      level: "Beginner",
      title: "UI UX Design",
      instructor: "Jessica",
      category: "Design",
      price: 39,
      description:
        "Master the principles of UI/UX design and create stunning user interfaces.",
      duration: "3 Weeks",
      students: 140,
      status: "Published",
      thumbnail: "",
      modules: [],
    },
    {
      id: 5,
      level: "Beginner",
      title: "MongoDB Database",
      instructor: "David",
      category: "Backend",
      price: 30,
      duration: "2 Weeks",
      students: 60,
      description:
        "Learn MongoDB from scratch and build powerful NoSQL databases for your applications.",
      status: "Published",
      thumbnail: "",
      modules: [],
    },
    {
      id: 6,
      level: "Advanced",
      title: "Full Stack MERN",
      instructor: "Alex",
      category: "Fullstack",
      price: 99,
      duration: "8 Weeks",
      description:
        "Become a full stack MERN developer and build complete web applications using MongoDB, Express, React, and Node.js.",
      students: 200,
      status: "Published",
      thumbnail: "",
      modules: [
        {
          title: "MERN Introduction",
          chapters: [
            {
              title: "Stack Overview",
              video: "https://www.youtube.com/watch?v=xqoYkX4hfwg&t=13792s",
            },
          ],
        },
      ],
    },
    {
      id: 7,
      level: "Beginner",
      title: "TypeScript for Devs",
      instructor: "Andrew",
      description:
        "Learn TypeScript from scratch and add strong typing to your JavaScript projects for improved reliability and maintainability.",
      category: "Programming",
      price: 29,
      duration: "2 Weeks",
      students: 50,
      status: "Draft",
      thumbnail: "",
      modules: [],
    },
    {
      id: 8,
      level: "Intermediate",
      title: "Tailwind CSS Pro",
      instructor: "Chris",
      category: "Frontend",
      price: 25,
      duration: "1 Week",
      students: 70,
      description:
        "Master Tailwind CSS and rapidly build beautiful, responsive user interfaces with utility-first CSS.",
      status: "Published",
      thumbnail: "",
      modules: [],
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
      const index = state.courses.findIndex((c) => c.id === action.payload.id);

      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },

    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } = courseSlice.actions;

export default courseSlice.reducer;
