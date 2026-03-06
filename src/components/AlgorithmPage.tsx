const ALGOS = [
    {
        name: "Dijkstra's Algorithm", year: "1956", author: "Edsger W. Dijkstra",
        badge: "Optimal", badgeStyle: { background: "#dcfce7", color: "#166534" },
        time: "O((V+E) log V)", space: "O(V)", weighted: "Yes", optimal: "Yes",
        desc: "The foundation of modern routing. Dijkstra processes nodes in order of their distance from the source, always choosing the nearest unvisited node. It builds a complete shortest-path tree, guaranteeing optimal routes to all reachable nodes.",
        usedIn: ["GPS Navigation", "OSPF Routing", "Telephone Networks"],
    },
    {
        name: "A* Search", year: "1968", author: "Hart, Nilsson & Raphael",
        badge: "Optimal", badgeStyle: { background: "#dcfce7", color: "#166534" },
        time: "O(E)", space: "O(V)", weighted: "Yes", optimal: "Yes",
        desc: "Dijkstra with purpose. A* adds a heuristic function that biases exploration toward the target, making it dramatically faster in practice. With Manhattan distance as the heuristic it is both complete and optimal.",
        usedIn: ["Game AI", "Robotics", "Route Planning"],
    },
    {
        name: "Breadth-First Search", year: "1945", author: "Konrad Zuse",
        badge: "Optimal (unweighted)", badgeStyle: { background: "#fef3c7", color: "#92400e" },
        time: "O(V + E)", space: "O(V)", weighted: "No", optimal: "Yes (unweighted)",
        desc: "Layer by layer. BFS expands all nodes at distance k before moving to k+1, forming concentric rings from the start. On unweighted graphs this guarantees the shortest path by edge count.",
        usedIn: ["Web Crawlers", "Social Networks", "P2P Networks"],
    },
    {
        name: "Depth-First Search", year: "~1800s", author: "Various (Tarjan)",
        badge: "Not Optimal", badgeStyle: { background: "#fee2e2", color: "#dc2626" },
        time: "O(V + E)", space: "O(V)", weighted: "No", optimal: "No",
        desc: "Dive deep, backtrack, repeat. DFS uses a stack to explore as far as possible before reversing. It finds a path if one exists, but makes no guarantees about its length.",
        usedIn: ["Maze Generation", "Topological Sort", "Cycle Detection"],
    },
];

export function AlgorithmsPage() {
    return (
        <div style={{ maxWidth: 740, margin: "0 auto", padding: "clamp(80px, 12vw, 100px) clamp(16px, 4vw, 24px) 60px", animation: "fadeUp 0.25s ease" }}>
            <h1 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(26px, 6vw, 34px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.025em", marginBottom: 6 }}>
                Algorithms
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 2vw, 15px)", color: "var(--text-secondary)", marginBottom: 40, lineHeight: 1.65 }}>
                The four pathfinding strategies in Wayfind — their histories, trade-offs, and real-world applications.
            </p>

            {ALGOS.map((algo) => (
                <div key={algo.name}
                    style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(18px, 4vw, 28px)", marginBottom: 14, background: "var(--bg-primary)", transition: "all 0.18s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "var(--card-shadow)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)";        e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
                >
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, gap: 12, flexWrap: "wrap" }}>
                        <div style={{ minWidth: 0 }}>
                            <h2 style={{ fontFamily: "'Lora', serif", fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
                                {algo.name}
                            </h2>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--text-tertiary)" }}>
                                {algo.year} · {algo.author}
                            </span>
                        </div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 999, ...algo.badgeStyle, whiteSpace: "nowrap", flexShrink: 0 }}>
                            {algo.badge}
                        </span>
                    </div>

                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>
                        {algo.desc}
                    </p>

                    {/* Stats — scroll horizontally on very small screens */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 0", overflowX: "auto" }}>
                        {[["Time", algo.time], ["Space", algo.space], ["Weighted", algo.weighted], ["Optimal", algo.optimal]].map(([label, val], i, arr) => (
                            <div key={label} style={{ display: "flex", alignItems: "stretch" }}>
                                <div style={{ paddingRight: 16 }}>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{label}</div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: "var(--blue-text)" }}>{val}</div>
                                </div>
                                {i < arr.length - 1 && <div style={{ width: 1, background: "var(--border)", alignSelf: "stretch", marginRight: 16 }} />}
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Used in</span>
                        {algo.usedIn.map(tag => (
                            <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, padding: "2px 9px", borderRadius: 999, background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}