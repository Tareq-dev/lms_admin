"use client";

import { useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/themeSlice";

export default function ThemeToggle() {

  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      Toggle Theme
    </button>
  );
}