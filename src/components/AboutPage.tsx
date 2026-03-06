const FEATURES = [
    { icon: "⬡", title: "Four algorithms",  desc: "Dijkstra, A*, BFS, and DFS — each with distinct traversal patterns visualized in real-time." },
    { icon: "⊞", title: "Maze generation",  desc: "Binary Tree and Recursive Division produce structurally distinct mazes to test against."       },
    { icon: "✦", title: "Custom walls",     desc: "Click and drag on the grid to draw walls and shape the environment."                           },
    { icon: "◎", title: "Speed control",    desc: "Slow down to study each step or speed up for an instant overview."                             },
];

const STEPS: [string, string][] = [
    ["1", "Choose a maze from the dropdown (optional)."],
    ["2", "Select a pathfinding algorithm and speed."],
    ["3", "Draw walls by clicking and dragging on the grid."],
    ["4", "Press Visualize to run the algorithm."],
    ["5", "Press Reset to clear and try again."],
];

export function AboutPage() {
    return (
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "clamp(80px, 12vw, 100px) clamp(16px, 4vw, 24px) 60px", animation: "fadeUp 0.25s ease" }}>
            {/* Hero */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                </div>
                <div>
                    <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.025em", margin: 0 }}>Wayfind</h1>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)", margin: "3px 0 0" }}>Pathfinding visualizer · v1.0</p>
                </div>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 2vw, 15px)", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 40 }}>
                Wayfind is an interactive tool for visualizing how pathfinding algorithms explore a grid.
                Built for anyone curious about the algorithms that power navigation — from GPS to game AI.
            </p>

            {/* Feature grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 40 }}>
                {FEATURES.map(f => (
                    <div key={f.title}
                        style={{ padding: 20, border: "1px solid var(--border)", borderRadius: 10, background: "var(--bg-primary)", transition: "all 0.15s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--bg-secondary)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)";        e.currentTarget.style.background = "var(--bg-primary)";   }}
                    >
                        <div style={{ fontSize: 18, marginBottom: 8 }}>{f.icon}</div>
                        <div style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6, letterSpacing: "-0.02em" }}>{f.title}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                ))}
            </div>

            {/* How to use */}
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                How to use <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {STEPS.map(([num, text]) => (
                    <div key={num} style={{ display: "flex", gap: 14, padding: "12px 16px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, alignItems: "flex-start" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: "var(--blue)", minWidth: 16, paddingTop: 2 }}>{num}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{text}</span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)" }}>Built by Pragya</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)" }}>Wayfind · 2025</span>
            </div>
        </div>
    );
}