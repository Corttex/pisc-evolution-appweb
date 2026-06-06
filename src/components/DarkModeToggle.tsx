"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const DarkModeToggle = ({ variant = "floating" }: { variant?: "floating" | "inline" }) => {
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage or document class list on mount
    const checkDark = document.documentElement.classList.contains("dark") || 
                     localStorage.getItem("theme") === "dark";
    setIsDark(checkDark);
    if (checkDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (variant === "floating" && pathname?.startsWith("/admin")) {
    return null;
  }

  if (variant === "inline") {
    return (
      <button
        onClick={toggleTheme}
        title="Alternar Tema"
        className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {isDark ? (
            <Moon size={22} className="text-cta" />
          ) : (
            <Sun size={22} className="text-secondary" />
          )}
        </motion.div>
      </button>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-[999] w-14 h-14 rounded-2xl flex items-center justify-center border transition-all cursor-pointer shadow-2xl bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 backdrop-blur-md text-slate-700 dark:text-slate-200"
      title="Alternar Tema"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {isDark ? (
          <Moon size={24} className="text-cta" />
        ) : (
          <Sun size={24} className="text-secondary" />
        )}
      </motion.div>
    </motion.button>
  );
};
