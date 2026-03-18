import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import JournalPage from "./pages/JournalPage";
import LandingPage from "./pages/LandingPage";
import ResourcesPage from "./pages/ResourcesPage";

export type Page = "home" | "journal" | "resources";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen flex flex-col font-nunito">
      <Navbar currentPage={page} onNavigate={setPage} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <LandingPage onNavigate={setPage} />
            </motion.div>
          )}
          {page === "journal" && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <JournalPage />
            </motion.div>
          )}
          {page === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <ResourcesPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
