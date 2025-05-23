import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token, logout } = useContext(AuthContext);
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/reports", label: "Raporty" },
  ];
  return (
    <>
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">
            💸 FinTrack
          </Link>

          <nav className="hidden gap-4 sm:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {token ? (
              <Button variant="ghost" onClick={logout}>
                Wyloguj
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="ghost">Logowanie</Button>
              </Link>
            )}
            <Sheet>
              <SheetTrigger asChild className="sm:hidden">
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-56">
                <nav className="grid gap-2 py-6">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={({ isActive }) =>
                        `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          isActive ? "bg-accent text-accent-foreground" : ""
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container py-6">{children}</main>
    </>
  );
};
