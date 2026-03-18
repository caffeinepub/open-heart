import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Page } from "../App";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Journal", page: "journal" },
    { label: "Resources", page: "resources" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
            <Leaf className="w-4 h-4 text-primary" />
          </div>
          <span className="font-extrabold text-xl text-foreground">
            Open Heart
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => onNavigate(link.page)}
              data-ocid={`nav.${link.page}.link`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                currentPage === link.page
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            onClick={() => onNavigate("journal")}
            className="rounded-full px-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
            data-ocid="nav.get_started.button"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-full hover:bg-muted/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.menu.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-4 py-4 flex flex-col gap-2">
          {links.map((link) => (
            <button
              type="button"
              key={link.page}
              onClick={() => {
                onNavigate(link.page);
                setMobileOpen(false);
              }}
              data-ocid={`nav.mobile.${link.page}.link`}
              className={`px-4 py-3 rounded-2xl text-left text-sm font-semibold transition-all ${
                currentPage === link.page
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => {
              onNavigate("journal");
              setMobileOpen(false);
            }}
            className="rounded-full mt-2 font-bold bg-primary text-primary-foreground"
            data-ocid="nav.mobile.get_started.button"
          >
            Get Started
          </Button>
        </div>
      )}
    </header>
  );
}
