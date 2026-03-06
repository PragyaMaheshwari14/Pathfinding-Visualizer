import { MouseEventHandler } from "react";
// CHANGED: removed react-icons dependency (BsFillPlayFill, GrPowerReset).
//          Replaced with inline SVGs — no new package needed.

export function PlayButton({
    handleRunVisualizer,
    isDisabled,
    isGraphVisualized,
}: {
    isDisabled: boolean;
    isGraphVisualized: boolean;
    handleRunVisualizer: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            disabled={isDisabled}
            onClick={handleRunVisualizer}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                // CHANGED: was rounded-full green button, now Notion blue pill
                padding: "7px 18px",
                height: 36,
                marginTop: 18,          // aligns baseline with selects (replaces mt-5)
                background: isGraphVisualized
                    ? "var(--bg-secondary)"
                    : "var(--blue)",
                color: isGraphVisualized ? "var(--text-primary)" : "#ffffff",
                border: isGraphVisualized
                    ? "1px solid var(--border)"
                    : "none",
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.45 : 1,
                transition: "all 0.14s ease",
                outline: "none",
                boxShadow: isGraphVisualized ? "none" : "0 1px 3px rgba(37,99,235,0.35)",
            }}
            onMouseEnter={(e) => {
                if (isDisabled) return;
                if (isGraphVisualized) {
                    e.currentTarget.style.background = "var(--bg-hover)";
                } else {
                    e.currentTarget.style.background = "var(--blue-dark)";
                    e.currentTarget.style.transform   = "translateY(-1px)";
                }
            }}
            onMouseLeave={(e) => {
                if (isDisabled) return;
                e.currentTarget.style.background = isGraphVisualized
                    ? "var(--bg-secondary)"
                    : "var(--blue)";
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            {isGraphVisualized ? (
                <>
                    {/* Reset icon */}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 .49-4" />
                    </svg>
                    Reset
                </>
            ) : (
                <>
                    {/* Play icon */}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Visualize
                </>
            )}
        </button>
    );
}