import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "introduction",       label: "Introduction"             },
  { id: "getting-started",    label: "Getting Started"          },
  { id: "the-grid",           label: "The Grid"                 },
  { id: "algorithms",         label: "Algorithms"               },
  { id: "dijkstra",           label: "↳ Dijkstra",  indent: true },
  { id: "astar",              label: "↳ A*",        indent: true },
  { id: "bfs",                label: "↳ BFS",       indent: true },
  { id: "dfs",                label: "↳ DFS",       indent: true },
  { id: "mazes",              label: "Maze Generation"          },
  { id: "binary-tree",        label: "↳ Binary Tree",      indent: true },
  { id: "recursive-division", label: "↳ Recursive Division", indent: true },
  { id: "controls",           label: "Controls"                 },
  { id: "speed",              label: "Speed Settings"           },
  { id: "complexity",         label: "Complexity Reference"     },
  { id: "tech-stack",         label: "Tech Stack"               },
  { id: "project-structure",  label: "Project Structure"        },
  { id: "faq",                label: "FAQ"                      },
];

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function DocH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
      {children}
    </h1>
  );
}

function DocH2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} style={{ fontFamily: "'Lora', serif", fontSize: "clamp(18px, 3.5vw, 22px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.25, marginTop: 52, marginBottom: 10, scrollMarginTop: 32 }}>
      {children}
    </h2>
  );
}

function DocH3({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} style={{ fontFamily: "'Lora', serif", fontSize: 17, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.015em", marginTop: 36, marginBottom: 8, scrollMarginTop: 32 }}>
      {children}
    </h3>
  );
}

function DocP({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 14 }}>
      {children}
    </p>
  );
}

function DocCode({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, background: "var(--bg-tertiary)", border: "1px solid var(--border)", borderRadius: 5, padding: "1px 6px", color: "var(--blue-text)", wordBreak: "break-all" }}>
      {children}
    </code>
  );
}

function DocBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 20px", color: "var(--text-secondary)", overflowX: "auto", lineHeight: 1.7, marginBottom: 20, marginTop: 8, WebkitOverflowScrolling: "touch" }}>
      {children}
    </pre>
  );
}

function DocDivider() {
  return <div style={{ height: 1, background: "var(--border)", margin: "44px 0" }} />;
}

function DocBadge({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 999, background: "var(--bg-secondary)", border: "1px solid var(--border)", color: color === "green" ? "#16a34a" : color === "yellow" ? "#92400e" : color === "red" ? "#dc2626" : "var(--blue-text)", marginRight: 6 }}>
      {children}
    </span>
  );
}

function DocCallout({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 18px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderLeft: "3px solid var(--blue)", borderRadius: "0 8px 8px 0", marginBottom: 20, marginTop: 4 }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.7 }}>{children}</span>
    </div>
  );
}

function StatRow({ rows }: { rows: [string, string, string, string, string, string][] }) {
  const heads = ["Algorithm", "Time", "Space", "Weighted", "Optimal", "Complete"];
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginBottom: 20, marginTop: 8, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
        <thead>
          <tr style={{ background: "var(--bg-secondary)" }}>
            {heads.map(h => (
              <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[0]} style={{ background: i % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "9px 12px", fontFamily: j === 0 ? "'Lora', serif" : j <= 2 ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif", fontSize: j <= 2 ? 12 : 13, fontWeight: j === 0 ? 600 : 400, color: j === 0 ? "var(--text-primary)" : j <= 2 ? "var(--blue-text)" : "var(--text-primary)", borderBottom: "1px solid var(--border)", whiteSpace: j <= 2 ? "nowrap" : undefined }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Sidebar({ active, onNav, isOpen, onClose }: { active: string; onNav: (id: string) => void; isOpen?: boolean; onClose?: () => void }) {
  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      position: "fixed",
      top: 88,
      left: 0,
      height: "calc(100vh - 88px)",
      overflowY: "auto",
      paddingTop: 8,
      paddingBottom: 40,
      borderRight: "1px solid var(--border)",
      background: "var(--bg-primary)",
      zIndex: 10,
    }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "8px 20px 10px" }}>
        On this page
      </div>
      {SECTIONS.map((s) => (
        <button key={s.id} onClick={() => { onNav(s.id); onClose?.(); }}
          style={{ display: "block", width: "100%", textAlign: "left", padding: s.indent ? "5px 20px 5px 32px" : "5px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: s.indent ? 12.5 : 13, fontWeight: active === s.id ? 500 : 400, color: active === s.id ? "var(--blue)" : s.indent ? "var(--text-tertiary)" : "var(--text-secondary)", background: active === s.id ? "var(--bg-secondary)" : "transparent", border: "none", borderLeft: active === s.id ? "2px solid var(--blue)" : "2px solid transparent", cursor: "pointer", transition: "all 0.1s ease", letterSpacing: "-0.01em" }}
          onMouseEnter={(e) => { if (active !== s.id) e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { if (active !== s.id) e.currentTarget.style.color = s.indent ? "var(--text-tertiary)" : "var(--text-secondary)"; }}
        >
          {s.label}
        </button>
      ))}
    </aside>
  );
}

// Mobile sidebar as a drawer
function MobileSidebar({ active, onNav, isOpen, onClose }: { active: string; onNav: (id: string) => void; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 50, backdropFilter: "blur(2px)" }} />
      {/* Drawer */}
      <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 260, background: "var(--bg-primary)", borderRight: "1px solid var(--border)", zIndex: 51, overflowY: "auto", paddingTop: 24, paddingBottom: 40, animation: "dropIn 0.18s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px 16px", borderBottom: "1px solid var(--border)", marginBottom: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>On this page</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid var(--border)", background: "var(--bg-secondary)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", outline: "none" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => { onNav(s.id); onClose(); }}
            style={{ display: "block", width: "100%", textAlign: "left", padding: s.indent ? "7px 20px 7px 36px" : "7px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: s.indent ? 13 : 14, fontWeight: active === s.id ? 500 : 400, color: active === s.id ? "var(--blue)" : s.indent ? "var(--text-tertiary)" : "var(--text-secondary)", background: active === s.id ? "var(--bg-secondary)" : "transparent", border: "none", borderLeft: active === s.id ? "2px solid var(--blue)" : "2px solid transparent", cursor: "pointer", letterSpacing: "-0.01em" }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </>
  );
}

function DocFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 0", marginTop: 80, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <span style={{ fontFamily: "'Lora', serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Wayfind</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)" }}>· Docs · v1.0</span>
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {["Visualizer", "Algorithms", "Complexity", "About"].map(link => (
          <span key={link} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-tertiary)", cursor: "default", letterSpacing: "-0.01em" }}>{link}</span>
        ))}
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)" }}>Built with React + TypeScript · 2025</span>
    </footer>
  );
}

export function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const showSidebar = windowWidth >= 860;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const entry of entries) { if (entry.isIntersecting) setActiveSection(entry.target.id); } },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <div style={{ display: "flex", paddingTop: 88, minHeight: "100vh", background: "var(--bg-primary)", animation: "fadeUp 0.25s ease" }}>
      {showSidebar && <Sidebar active={activeSection} onNav={scrollTo} />}
      <MobileSidebar active={activeSection} onNav={scrollTo} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <main style={{
        flex: 1,
        marginLeft: showSidebar ? 220 : 0,
        padding: showSidebar ? "0 clamp(20px, 4vw, 56px) 0 clamp(20px, 4vw, 52px)" : "0 clamp(16px, 4vw, 40px)",
        maxWidth: showSidebar ? 760 : "100%",
        boxSizing: "border-box",
      }}>
        {/* Mobile TOC button */}
        {!showSidebar && (
          <div style={{ marginBottom: 20, paddingTop: 12 }}>
            <button onClick={() => setDrawerOpen(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-secondary)", cursor: "pointer", outline: "none" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="15" y2="12" /><line x1="3" y1="18" x2="18" y2="18" />
              </svg>
              Table of contents
            </button>
          </div>
        )}

        <div id="introduction" style={{ paddingTop: showSidebar ? 12 : 0, scrollMarginTop: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 999, marginBottom: 18 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue)" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)", letterSpacing: "0.06em" }}>DOCUMENTATION · v1.0</span>
          </div>

          <DocH1>Wayfind</DocH1>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(14px, 2.5vw, 16px)", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 28 }}>
            An interactive pathfinding visualizer built with React and TypeScript.
            Watch four classic graph algorithms explore a grid in real time — draw walls,
            generate mazes, and develop an intuition for how these algorithms actually behave.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            <DocBadge>React 18</DocBadge>
            <DocBadge>TypeScript</DocBadge>
            <DocBadge>Tailwind CSS v4</DocBadge>
            <DocBadge>Vite</DocBadge>
          </div>
        </div>

        <DocDivider />

        <DocH2 id="getting-started">Getting Started</DocH2>
        <DocP>Wayfind is a client-side React application. There is no backend, no database, and no authentication. Everything runs in the browser.</DocP>

        <DocH3 id="">Prerequisites</DocH3>
        <DocP>You need Node.js 18+ and a package manager (npm, yarn, or pnpm).</DocP>

        <DocBlock>{`# Clone the repository
git clone https://github.com/your-username/wayfind.git
cd wayfind

# Install dependencies
npm install

# Start the dev server
npm run dev`}</DocBlock>

        <DocP>The app will be available at <DocCode>http://localhost:5173</DocCode> by default (Vite's port).</DocP>

        <DocBlock>{`# Build for production
npm run build

# Preview the production build
npm run preview`}</DocBlock>

        <DocCallout icon="💡">
          The build output goes to <DocCode>dist/</DocCode>. It's a fully static site — deploy to
          Vercel, Netlify, GitHub Pages, or any static host with zero configuration.
        </DocCallout>

        <DocDivider />

        <DocH2 id="the-grid">The Grid</DocH2>
        <DocP>
          The visualizer operates on a <DocCode>39 × 49</DocCode> grid of tiles
          (<DocCode>MAX_ROWS = 39</DocCode>, <DocCode>MAX_COLS = 49</DocCode>), defined
          in <DocCode>src/utils/constants.ts</DocCode>. Each tile is a plain object:
        </DocP>

        <DocBlock>{`type TileType = {
  row:         number;
  col:         number;
  isStart:     boolean;
  isEnd:       boolean;
  isWall:      boolean;
  isTraversed: boolean;
  isPath:      boolean;
  distance:    number;
  parent:      TileType | null;
}`}</DocBlock>

        <DocP>
          The grid state lives in <DocCode>PathfindingContext</DocCode> and is created once on
          mount via <DocCode>createGrid(startTile, endTile)</DocCode>. DOM manipulation is used
          during animation (className swaps via <DocCode>document.getElementById</DocCode>) to
          avoid re-rendering 1,911 React tiles on every frame.
        </DocP>

        <DocH3 id="">Drawing walls</DocH3>
        <DocP>
          Click any empty tile to toggle a wall. Hold and drag to paint multiple walls in one
          stroke. Start and end tiles are protected — you cannot overwrite them. Wall state
          persists across algorithm runs until you reset.
        </DocP>

        <DocCallout icon="⚠️">Walls drawn manually are cleared when you select a new maze or press Reset.</DocCallout>

        <DocDivider />

        <DocH2 id="algorithms">Algorithms</DocH2>
        <DocP>
          Four pathfinding algorithms are implemented in <DocCode>src/lib/algorithms/pathfinding/</DocCode>.
          Each returns two arrays: <DocCode>traversedTiles</DocCode> (the exploration order) and{" "}
          <DocCode>path</DocCode> (the shortest/found route from start to end).
        </DocP>

        <DocBlock>{`return { traversedTiles: TileType[], path: TileType[] }`}</DocBlock>

        <DocH3 id="dijkstra">Dijkstra's Algorithm</DocH3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <DocBadge color="green">Optimal</DocBadge>
          <DocBadge>Weighted</DocBadge>
          <DocBadge>Complete</DocBadge>
        </div>
        <DocP>
          Dijkstra explores nodes in order of their cumulative distance from the source, always
          dequeuing the node with the smallest known distance. It builds a shortest-path tree
          that covers the entire reachable graph, guaranteeing the optimal path to the end tile.
        </DocP>
        <DocP>
          In Wayfind's unweighted grid all edges cost 1, so Dijkstra behaves identically to BFS
          in practice — but the implementation uses a sort-based priority queue to demonstrate
          the weighted variant correctly.
        </DocP>
        <DocBlock>{`while (unTraversedTiles.length > 0) {
  unTraversedTiles.sort((a, b) => a.distance - b.distance);
  const current = unTraversedTiles.shift();
  if (current.isWall || current.distance === Infinity) break;
}`}</DocBlock>

        <DocH3 id="astar">A* Search</DocH3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <DocBadge color="green">Optimal</DocBadge>
          <DocBadge>Weighted</DocBadge>
          <DocBadge>Complete</DocBadge>
        </div>
        <DocP>
          A* extends Dijkstra with a heuristic function <DocCode>h(n)</DocCode> that estimates
          the remaining cost to the goal. The priority queue sorts by{" "}
          <DocCode>f(n) = g(n) + h(n)</DocCode>, where <DocCode>g(n)</DocCode> is the known cost
          from start. Wayfind uses Manhattan distance as the heuristic, which is admissible on a
          4-directional grid and never overestimates.
        </DocP>
        <DocBlock>{`const h = manhattanDistance * (|row_curr - row_end| + |col_curr - col_end|);
functionCost[n.row][n.col] = n.distance + heuristicCost[n.row][n.col];`}</DocBlock>

        <DocH3 id="bfs">Breadth-First Search</DocH3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <DocBadge color="yellow">Optimal (unweighted)</DocBadge>
          <DocBadge>Complete</DocBadge>
        </div>
        <DocP>
          BFS uses a FIFO queue. It expands all tiles at distance <em>k</em> before any tile at
          distance <em>k+1</em>, so the first time it reaches the end tile it has found the
          shortest path by edge count. On Wayfind's unweighted grid this is always optimal.
        </DocP>
        <DocBlock>{`const queue = [startTile];
while (queue.length) {
  const tile = queue.shift();
}`}</DocBlock>

        <DocH3 id="dfs">Depth-First Search</DocH3>
        <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <DocBadge color="red">Not Optimal</DocBadge>
          <DocBadge>Complete</DocBadge>
        </div>
        <DocP>
          DFS uses a LIFO stack. It plunges as deep as possible in one direction before
          backtracking. It will find a path if one exists, but the result may be long and
          winding — included to demonstrate the contrast with BFS and why "found a path" ≠
          "found the shortest path".
        </DocP>
        <DocBlock>{`const stack = [startTile];
while (stack.length) {
  const tile = stack.pop();
}`}</DocBlock>

        <DocDivider />

        <DocH2 id="mazes">Maze Generation</DocH2>
        <DocP>
          Mazes are generated in <DocCode>src/lib/algorithms/maze/</DocCode> using async functions
          that animate wall placement in real time. The grid is first filled with walls, then
          passages are carved out. While generating, all controls are disabled via the{" "}
          <DocCode>setIsDisabled</DocCode> callback.
        </DocP>

        <DocH3 id="binary-tree">Binary Tree</DocH3>
        <DocP>
          For every odd-row, odd-column tile (the "room" positions), the algorithm randomly
          carves a passage either to the right or downward. This produces a perfect maze with a
          strong diagonal bias — long corridors run across the top and down the right side.
        </DocP>
        <DocBlock>{`for each room tile (odd row, odd col):
  if on last row  → always carve right
  if on last col  → always carve down
  else            → randomly carve right or down`}</DocBlock>

        <DocH3 id="recursive-division">Recursive Division</DocH3>
        <DocP>
          Starts with a completely open room bounded by a border wall. Recursively subdivides the
          space with a horizontal or vertical wall, leaving a single randomly-placed passage in
          each wall. The result is a structured, architectural maze with clearly defined chambers.
          When height &gt; width a horizontal wall is drawn; otherwise vertical.
        </DocP>
        <DocBlock>{`function recursiveDivision(row, col, height, width):
  if height <= 1 || width <= 1: return
  if height > width:
    → horizontalDivision(...)
  else:
    → verticalDivision(...)`}</DocBlock>

        <DocCallout icon="⏱">
          Recursive Division is the slowest maze to generate. Use <strong>Fast</strong> speed to reduce wait time.
        </DocCallout>

        <DocDivider />

        <DocH2 id="controls">Controls</DocH2>
        <DocP>All controls are located in the floating pill navigation bar at the top of the screen.</DocP>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {[
            ["Maze dropdown",      "Select a maze generation algorithm. Choosing 'No Maze' clears the grid."],
            ["Algorithm dropdown", "Select the pathfinding algorithm to visualize."],
            ["Speed dropdown",     "Control animation speed: Slow (30ms), Medium (15ms), Fast (6ms) per tile."],
            ["Visualize button",   "Run the selected algorithm. Animates traversal, then highlights the path."],
            ["Reset button",       "Appears after visualization. Clears traversal and path, keeps walls."],
            ["Theme toggle",       "Switch between light and dark mode. Updates tile colours via CSS variables."],
            ["Nav tabs",           "Switch between Visualizer, Algorithms, Complexity, About, and Docs pages."],
          ].map(([name, desc]) => (
            <div key={name} style={{ display: "flex", gap: 16, alignItems: "flex-start", padding: "12px 16px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: "var(--blue-text)", minWidth: 140, flexShrink: 0 }}>
                {name}
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, flex: 1, minWidth: 160 }}>
                {desc}
              </span>
            </div>
          ))}
        </div>

        <DocDivider />

        <DocH2 id="speed">Speed Settings</DocH2>
        <DocP>
          Speed is a multiplier applied to the base animation delays defined in{" "}
          <DocCode>src/utils/constants.ts</DocCode>:
        </DocP>

        <DocBlock>{`export const SLEEP_TIME          = 8;   // ms per traversed tile
export const EXTENDED_SLEEP_TIME = 30;  // ms per path tile

{ name: "Slow",   value: 2   }   // 16ms traversal, 60ms path
{ name: "Medium", value: 1   }   // 8ms  traversal, 30ms path
{ name: "Fast",   value: 0.5 }   // 4ms  traversal, 15ms path`}</DocBlock>

        <DocP>
          Animation is handled entirely by <DocCode>setTimeout</DocCode> chains in{" "}
          <DocCode>src/utils/animatePath.ts</DocCode>. Each tile gets its own timeout offset,
          so cancellation mid-run is not supported — press Reset after completion.
        </DocP>

        <DocDivider />

        <DocH2 id="complexity">Complexity Reference</DocH2>
        <DocP>
          <em>V</em> = vertices (tiles), <em>E</em> = edges (tile connections). On Wayfind's grid
          each tile has at most 4 edges, so <DocCode>E ≈ 4V</DocCode> and time complexity
          simplifies to <DocCode>O(V log V)</DocCode> for Dijkstra/A* and <DocCode>O(V)</DocCode> for BFS/DFS.
        </DocP>

        <StatRow rows={[
          ["Dijkstra", "O((V+E) log V)", "O(V)", "Yes", "✓",    "✓"],
          ["A*",       "O(E)",           "O(V)", "Yes", "✓ *",  "✓"],
          ["BFS",      "O(V + E)",       "O(V)", "No",  "✓ **", "✓"],
          ["DFS",      "O(V + E)",       "O(V)", "No",  "✗",    "✓"],
        ]} />

        <DocP>* A* is optimal only when the heuristic is admissible (never overestimates true cost). Manhattan distance satisfies this on a 4-directional grid.</DocP>
        <DocP>** BFS is optimal for unweighted graphs — it minimises edge count, not edge weight.</DocP>

        <DocDivider />

        <DocH2 id="tech-stack">Tech Stack</DocH2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 24 }}>
          {[
            ["React 18",        "UI framework. Context API for global state (grid, algorithm, speed, tiles)."],
            ["TypeScript",      "Full type coverage. TileType, GridType, AlgorithmType etc. in types.ts."],
            ["Tailwind CSS v4", "Utility-first styling for layout and tile sizing. CSS vars for theming."],
            ["Vite",            "Build tool and dev server. Fast HMR during development."],
            ["tailwind-merge",  "Merges conflicting Tailwind classes cleanly in Tile.tsx."],
            ["react-icons",     "Icon library — used for Play and Reset icons in PlayButton.tsx."],
          ].map(([name, desc]) => (
            <div key={name} style={{ padding: "16px 18px", border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg-primary)", transition: "all 0.15s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--bg-secondary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-primary)"; }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: "var(--blue-text)", marginBottom: 5 }}>{name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <DocDivider />

        <DocH2 id="project-structure">Project Structure</DocH2>
        <DocP>The project follows a flat, feature-grouped layout under <DocCode>src/</DocCode>:</DocP>

        <DocBlock>{`src/
├── components/
│   ├── Grid.tsx
│   ├── Nav.tsx
│   ├── PlayButton.tsx
│   ├── Select.tsx
│   └── Tile.tsx
│
├── context/
│   ├── PathfindingContext.tsx
│   ├── SpeedContext.tsx
│   └── TileContext.tsx
│
├── hooks/
│   ├── usePathfinding.tsx
│   ├── useSpeed.tsx
│   └── useTile.tsx
│
├── lib/
│   └── algorithms/
│       ├── maze/
│       │   ├── binaryTree.ts
│       │   ├── horizontalDivision.ts
│       │   ├── recursiveDivision.ts
│       │   └── verticalDivision.ts
│       └── pathfinding/
│           ├── aStar.ts
│           ├── bfs.ts
│           ├── dfs.ts
│           └── dijkstra.ts
│
├── pages/
│   ├── AboutPage.tsx
│   ├── AlgorithmsPage.tsx
│   ├── ComplexityPage.tsx
│   └── DocsPage.tsx
│
├── utils/
│   ├── animatePath.ts
│   ├── constants.ts
│   └── ...
│
├── App.tsx
├── index.css
└── main.tsx`}</DocBlock>

        <DocDivider />

        <DocH2 id="faq">FAQ</DocH2>

        {[
          { q: "Why does DFS rarely find the shortest path?", a: "DFS follows one branch as deep as possible before backtracking. It has no concept of distance — the first path it finds may wind through most of the grid. Use BFS, Dijkstra, or A* if you need the shortest path." },
          { q: "Why does Dijkstra look the same as BFS on this grid?", a: "Because all edges in the grid have equal weight (cost = 1). On a uniform-cost grid Dijkstra and BFS produce identical traversal patterns. Dijkstra's advantage appears on weighted graphs where edges have different costs." },
          { q: "Can I change the start or end position?", a: "Not in the current version. The start tile is fixed at (row 1, col 1) and the end at (row 37, col 47), defined in START_TILE_CONFIGURATION and END_TILE_CONFIGURATION in constants.ts." },
          { q: "Why is animation done with DOM manipulation instead of React state?", a: "Re-rendering 1,911 React tiles on every animation frame would be extremely slow. Direct className updates via document.getElementById are O(1) and keep the animation smooth at all speed settings." },
          { q: "How does dark mode work?", a: 'App.tsx sets data-theme="dark" on the <html> element when the toggle is active. CSS variables in index.css are overridden under the [data-theme="dark"] selector, and all tile colours reference these vars. No class-based toggling needed.' },
          { q: "Can I add a new pathfinding algorithm?", a: "Yes. Create a new file in src/lib/algorithms/pathfinding/, export a function that returns { traversedTiles, path }, add a case to runPathFindingAlgorithm.ts, and add an entry to PathFINDING_ALGORITHMS in constants.ts." },
        ].map(({ q, a }, i) => (
          <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 20, marginBottom: 20 }}>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.01em", marginBottom: 8 }}>{q}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>{a}</p>
          </div>
        ))}

        <DocFooter />
      </main>
    </div>
  );
}