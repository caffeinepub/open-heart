import { Heart, Leaf } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="mt-auto bg-bloom-lavender/50 border-t border-border/40 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-extrabold text-foreground">Open Heart</span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            If you're in crisis, please text{" "}
            <span className="font-bold text-primary">HOME to 741741</span>{" "}
            (Crisis Text Line) or call{" "}
            <span className="font-bold text-primary">988</span>.
          </p>

          <p className="text-xs text-muted-foreground flex items-center gap-1">
            © {year}. Built with{" "}
            <Heart className="w-3 h-3 fill-primary text-primary" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
