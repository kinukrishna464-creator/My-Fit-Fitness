import { BottomNav } from "@/components/BottomNav";
import type { TabId } from "@/types/habit";

interface LayoutProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
}

export function Layout({ activeTab, onTabChange, children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-svh bg-background max-w-md mx-auto relative">
      {/* Scrollable content area */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: "calc(64px + env(safe-area-inset-bottom))" }}
      >
        {children}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
