const ROWS = [
    { algo: "Dijkstra", time: "O((V+E) log V)", space: "O(V)", optimal: "✓",    weighted: "✓", complete: "✓" },
    { algo: "A*",       time: "O(E)",           space: "O(V)", optimal: "✓ *",  weighted: "✓", complete: "✓" },
    { algo: "BFS",      time: "O(V + E)",       space: "O(V)", optimal: "✓ **", weighted: "✗", complete: "✓" },
    { algo: "DFS",      time: "O(V + E)",       space: "O(V)", optimal: "✗",    weighted: "✗", complete: "✓" },
];

export function ComplexityPage() {
    const hCell: React.CSSProperties = {
        padding: "11px 12px", fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, fontWeight: 500, color: "var(--text-tertiary)",
        textTransform: "uppercase", letterSpacing: "0.07em",
        borderBottom: "1px solid var(--border)", textAlign: "left", whiteSpace: "nowrap",
    };

    return (
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "clamp(80px, 12vw, 100px) clamp(16px, 4vw, 24px) 60px", animation: "fadeUp 0.25s ease" }}>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 6 }}>
                Complexity
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 2vw, 15px)", color: "var(--text-secondary)", marginBottom: 36, lineHeight: 1.65 }}>
                A side-by-side comparison of all four algorithms across time, space, and correctness.
            </p>

            {/* Scrollable table wrapper on small screens */}
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--card-shadow)", marginBottom: 16, overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                    <thead>
                        <tr style={{ background: "var(--bg-secondary)" }}>
                            {["Algorithm","Time","Space","Optimal","Weighted","Complete"].map(h => <th key={h} style={hCell}>{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {ROWS.map((row, i) => (
                            <tr key={row.algo}
                                style={{ background: i % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)")}
                            >
                                <td style={{ padding: "11px 12px", fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 14, color: "var(--text-primary)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{row.algo}</td>
                                <td style={{ padding: "11px 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--blue-text)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{row.time}</td>
                                <td style={{ padding: "11px 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "var(--blue-text)", borderBottom: "1px solid var(--border)" }}>{row.space}</td>
                                {[row.optimal, row.weighted, row.complete].map((v, j) => (
                                    <td key={j} style={{ padding: "11px 12px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}>{v}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {[" * A* is optimal only with an admissible heuristic.", "** BFS is optimal on unweighted graphs only."].map(n => (
                <p key={n} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)", margin: "4px 0" }}>{n}</p>
            ))}

            <div style={{ marginTop: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>Notation key</span>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>
                {[["V","Number of vertices (nodes/tiles) in the graph."],["E","Number of edges (connections between nodes)."],["O(n)","Upper bound on running time — how it scales with input."]].map(([sym, desc]) => (
                    <div key={sym} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 16px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 8 }}>
                        <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: "var(--blue-text)", minWidth: 36, paddingTop: 1, flexShrink: 0 }}>{sym}</code>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}