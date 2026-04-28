import { Layout } from "@/components/Layout";
import type { TabId } from "@/types/habit";
import { Suspense, lazy, useState } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const WorkoutPage = lazy(() => import("@/pages/WorkoutPage"));
const HydrationPage = lazy(() => import("@/pages/HydrationPage"));
const MoodPage = lazy(() => import("@/pages/MoodPage"));
const ReadingPage = lazy(() => import("@/pages/ReadingPage"));
const MeditationPage = lazy(() => import("@/pages/MeditationPage"));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="w-8 h-8 rounded-full border-2 border-border border-t-primary animate-spin" />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <Suspense fallback={<PageFallback />}>
        {activeTab === "home" && <HomePage onNavigate={setActiveTab} />}
        {activeTab === "workout" && <WorkoutPage />}
        {activeTab === "hydration" && <HydrationPage />}
        {activeTab === "mood" && <MoodPage />}
        {activeTab === "reading" && <ReadingPage />}
        {activeTab === "meditation" && <MeditationPage />}
      </Suspense>
    </Layout>
  );
}
