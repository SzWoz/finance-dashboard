import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
