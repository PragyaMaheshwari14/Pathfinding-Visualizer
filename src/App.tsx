import { useRef, useState, useEffect } from "react";
import { Grid } from "./components/Grid";
import { Nav, PageId } from "./components/Nav";
import { PathfindingProvider } from "./context/PathfindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";

import { AlgorithmsPage } from "./components/AlgorithmPage";
import { ComplexityPage } from "./components/ComplexityPage";
import { AboutPage } from "./components/AboutPage";
import { DocsPage } from "./components/DocsPage";

function App() {
  const isVisulaizationRunningRef = useRef(false);

  const [isDark, setIsDark] = useState(false);
  const [activePage, setActivePage] = useState<PageId>("visualizer");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
  }, [isDark]);

  return (
    <PathfindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div
            style={{
              minHeight: "100vh",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
              transition: "background 0.2s ease, color 0.2s ease",
              display: "flex",
              flexDirection: "column",
              overflowX: "hidden",
            }}
          >
            <Nav
              isVisulaizationRunningRef={isVisulaizationRunningRef}
              activePage={activePage}
              setActivePage={setActivePage}
              isDark={isDark}
              toggleTheme={() => setIsDark((p) => !p)}
            />

            <div
              key={activePage}
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              {activePage === "visualizer" && (
                <Grid isVisulaizationRunningRef={isVisulaizationRunningRef} />
              )}
              {activePage === "algorithms" && <AlgorithmsPage />}
              {activePage === "complexity" && <ComplexityPage />}
              {activePage === "about" && <AboutPage />}
              {activePage === "docs" && <DocsPage />}
            </div>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathfindingProvider>
  );
}

export default App;
