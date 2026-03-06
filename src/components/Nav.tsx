import { MutableRefObject, useState, useEffect, useRef } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile }        from "../hooks/useTile";
import { useSpeed }       from "../hooks/useSpeed";
import {
    EXTENDED_SLEEP_TIME, MAZES, PathFINDING_ALGORITHMS,
    SLEEP_TIME, SPEEDS,
} from "../utils/constants";
import { resetGrid }                  from "../utils/resetGrid";
import { runMazeAlgorithm }           from "../utils/runMazeAlgorithm";
import { runPathFindingAlgorithm }    from "../utils/runPathFindingAlgorithm";
import { animatePath }                from "../utils/animatePath";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select }      from "./Select";
import { PlayButton }  from "./PlayButton";

export type PageId = "visualizer" | "algorithms" | "complexity" | "about" | "docs";

interface NavProps {
    isVisulaizationRunningRef: MutableRefObject<boolean>;
    activePage:    PageId;
    setActivePage: (p: PageId) => void;
    isDark:        boolean;
    toggleTheme:   () => void;
}

const PAGES: { id: PageId; label: string }[] = [
    { id: "visualizer",  label: "Visualizer"  },
    { id: "algorithms",  label: "Algorithms"  },
    { id: "complexity",  label: "Complexity"  },
    { id: "about",       label: "About"       },
    { id: "docs",        label: "Docs"        },
];

function useWindowWidth() {
    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 1024
    );
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return width;
}

export function Nav({
    isVisulaizationRunningRef,
    activePage,
    setActivePage,
    isDark,
    toggleTheme,
}: NavProps) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { maze, setMaze, grid, setGrid, isGraphVisualized,
            setIsGraphVisualized, algorithm, setAlgorithm } = usePathfinding();
    const { startTile, endTile } = useTile();
    const { speed, setSpeed }    = useSpeed();
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth < 860;

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => { setMobileMenuOpen(false); }, [activePage]);

    const handleGenerateMaze = (maze: MazeType) => {
        if (maze === "NONE") { setMaze(maze); resetGrid({ grid, startTile, endTile }); return; }
        setMaze(maze);
        setIsDisabled(true);
        runMazeAlgorithm({ maze, grid, startTile, endTile, setIsDisabled, speed });
        setGrid(grid.slice());
        setIsGraphVisualized(false);
    };

    const handleRunVisualizer = () => {
        if (isGraphVisualized) {
            setIsGraphVisualized(false);
            resetGrid({ grid: grid.slice(), startTile, endTile });
            return;
        }
        const { traversedTiles, path } = runPathFindingAlgorithm({ algorithm, grid, startTile, endTile });
        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisulaizationRunningRef.current = true;
        setTimeout(() => {
            setGrid(grid.slice());
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisulaizationRunningRef.current = false;
        }, (
            SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) +
            EXTENDED_SLEEP_TIME * (path.length + 60) *
            SPEEDS.find((s) => s.value === speed)!.value
        ));
    };

    const pillTabStyle = (isActive: boolean, compact: boolean): React.CSSProperties => ({
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, fontWeight: 500,
        color: isActive ? "#fff" : "var(--text-secondary)",
        padding: compact ? "6px 10px" : "6px 14px",
        borderRadius: 999, border: "none",
        background: isActive ? "var(--blue)" : "transparent",
        cursor: "pointer", transition: "all 0.14s ease",
        letterSpacing: "-0.01em", outline: "none", flexShrink: 0,
    });

    return (
        <>
            <nav
                ref={menuRef}
                style={{
                    position: "fixed", top: 16, left: "50%",
                    transform: "translateX(-50%)", zIndex: 100,
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: 999,
                    padding: "5px 6px",
                    display: "flex", alignItems: "center", gap: 2,
                    boxShadow: "var(--pill-shadow)",
                    backdropFilter: "blur(12px)",
                    whiteSpace: "nowrap",
                    maxWidth: isMobile ? "calc(100vw - 24px)" : undefined,
                    width: isMobile ? "calc(100vw - 24px)" : undefined,
                }}
            >
                {/* Brand */}
                <div style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "4px 8px 4px 6px",
                    marginRight: isMobile ? "auto" : 2, flexShrink: 0,
                }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                    </div>
                    <span style={{ fontFamily: "'Lora', serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                        Wayfind
                    </span>
                </div>

                {/* Desktop tabs */}
                {!isMobile && (
                    <>
                        <div style={{ width: 1, height: 18, background: "var(--border)", margin: "0 4px", flexShrink: 0 }} />
                        {PAGES.map((page) => {
                            const isActive = activePage === page.id;
                            return (
                                <button key={page.id}
                                    onClick={() => setActivePage(page.id)}
                                    style={pillTabStyle(isActive, isTablet)}
                                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; } }}
                                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; } }}
                                >
                                    {page.label}
                                </button>
                            );
                        })}
                        <div style={{ width: 1, height: 18, background: "var(--border)", margin: "0 4px", flexShrink: 0 }} />
                    </>
                )}

                {/* Theme toggle */}
                <button onClick={toggleTheme} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--bg-secondary)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.12s ease", outline: "none", flexShrink: 0 }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                    {isDark ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>

                {/* Mobile hamburger */}
                {isMobile && (
                    <button
                        onClick={() => setMobileMenuOpen((p) => !p)}
                        style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", background: mobileMenuOpen ? "var(--bg-hover)" : "var(--bg-secondary)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none", flexShrink: 0, marginLeft: 2 }}
                    >
                        {mobileMenuOpen ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" />
                            </svg>
                        )}
                    </button>
                )}

                {/* Mobile dropdown */}
                {isMobile && mobileMenuOpen && (
                    <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "var(--dropdown-shadow)", padding: 6, animation: "dropIn 0.14s cubic-bezier(0.2,0,0,1)" }}>
                        {PAGES.map((page) => {
                            const isActive = activePage === page.id;
                            return (
                                <button key={page.id}
                                    onClick={() => { setActivePage(page.id); setMobileMenuOpen(false); }}
                                    style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: isActive ? 500 : 400, color: isActive ? "var(--blue)" : "var(--text-secondary)", background: isActive ? "var(--bg-secondary)" : "transparent", border: "none", borderRadius: 10, cursor: "pointer", textAlign: "left", outline: "none", letterSpacing: "-0.01em" }}
                                >
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: isActive ? "var(--blue)" : "var(--border)", flexShrink: 0 }} />
                                    {page.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </nav>

            {/* Controls strip */}
            {activePage === "visualizer" && (
                <div style={{ paddingTop: isMobile ? 76 : 88, paddingBottom: 12, display: "flex", justifyContent: "center" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: isMobile ? 8 : 12, justifyContent: "center", padding: isMobile ? "0 12px" : "0 16px", width: "100%" }}>
                        <Select label="Maze"      value={maze}      options={MAZES}                  isDisabled={isDisabled} onChange={(e) => handleGenerateMaze(e.target.value as MazeType)} />
                        <Select label="Algorithm" value={algorithm} options={PathFINDING_ALGORITHMS} isDisabled={isDisabled} onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)} />
                        <Select label="Speed"     value={speed}     options={SPEEDS}                 isDisabled={isDisabled} onChange={(e) => setSpeed(parseFloat(e.target.value) as SpeedType)} />
                        <PlayButton isDisabled={isDisabled} isGraphVisualized={isGraphVisualized} handleRunVisualizer={handleRunVisualizer} />
                    </div>
                </div>
            )}
        </>
    );
}