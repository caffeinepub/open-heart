import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Journal from "@/pages/Journal";
import ShareFeelings from "@/pages/ShareFeelings";
import { Heart } from "lucide-react";
import { useState } from "react";

export type Page = "home" | "share" | "journal";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="sticky top-0 z-50 border-b border-border/50"
        style={{
          background: "oklch(1 0.005 50 / 0.85)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage("home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/open-heart-logo-transparent.dim_400x400.png"
              alt="Open Heart"
              className="w-8 h-8 object-contain"
            />
            <span className="font-fraunces text-lg font-bold text-oh-rose tracking-tight">
              Open Heart
            </span>
          </button>
          <nav className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage("share")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                page === "share"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid="nav.share.link"
            >
              Share
            </button>
            <button
              type="button"
              onClick={() => setPage("journal")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                page === "journal"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid="nav.journal.link"
            >
              Journal
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {page === "home" && <Home onStart={() => setPage("share")} />}
        {page === "share" && (
          <ShareFeelings onSaved={() => setPage("journal")} />
        )}
        {page === "journal" && <Journal />}
      </main>

      <footer className="border-t border-border/40 py-5 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with{" "}
          <Heart className="inline w-3 h-3 fill-current text-oh-rose" /> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      <Toaster />
    </div>
  );
}
