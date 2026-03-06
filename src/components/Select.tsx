import { useState, useRef, useEffect, ChangeEvent } from "react";

export function Select({
    value,
    onChange,
    options,
    label,
    isDisabled,
}: {
    value: string | number;
    label: string;
    onChange: (value: ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string | number; name: string }[];
    isDisabled?: boolean;
}) {
    const [open, setOpen]       = useState(false);
    const [hovered, setHovered] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const selected = options.find((o) => String(o.value) === String(value));

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const handleSelect = (optValue: string | number) => {
        const fakeEvent = { target: { value: String(optValue) } } as ChangeEvent<HTMLSelectElement>;
        onChange(fakeEvent);
        setOpen(false);
    };

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                opacity: isDisabled ? 0.45 : 1,
                pointerEvents: isDisabled ? "none" : "auto",
                // On small screens let selects be full width in a row
                flex: "1 1 auto",
                minWidth: 120,
                maxWidth: 200,
            }}
        >
            <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, fontWeight: 500,
                color: "var(--text-tertiary)",
                textTransform: "uppercase", letterSpacing: "0.09em",
                paddingLeft: 2, userSelect: "none",
            }}>
                {label}
            </span>

            <button
                onClick={() => setOpen((p) => !p)}
                style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 8, width: "100%",
                    padding: "7px 10px 7px 12px",
                    background: open ? "var(--bg-tertiary)" : "var(--bg-secondary)",
                    border: `1px solid ${open ? "var(--border-strong)" : "var(--border)"}`,
                    borderRadius: 8, cursor: "pointer", transition: "all 0.12s ease",
                    boxShadow: open ? "0 0 0 2px var(--blue-muted)" : "none",
                    outline: "none", color: "var(--text-primary)",
                }}
                onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = "var(--border-strong)"; }}
                onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = "var(--border)"; }}
            >
                <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: open ? "var(--blue)" : "var(--text-tertiary)", flexShrink: 0, transition: "background 0.15s" }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 450, color: "var(--text-primary)", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {selected?.name ?? "—"}
                    </span>
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="var(--text-tertiary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {open && (
                <div style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    left: 0,
                    minWidth: "100%",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    boxShadow: "var(--dropdown-shadow)",
                    zIndex: 200,
                    overflow: "hidden",
                    animation: "dropIn 0.14s cubic-bezier(0.2,0,0,1)",
                }}>
                    <div style={{ padding: 4 }}>
                        {options.map((opt, i) => {
                            const isSelected = String(opt.value) === String(value);
                            return (
                                <div
                                    key={opt.value}
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                    onMouseDown={() => handleSelect(opt.value)}
                                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 10px", borderRadius: 6, cursor: "pointer", background: hovered === i ? "var(--bg-hover)" : "transparent", transition: "background 0.08s", userSelect: "none" }}
                                >
                                    <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: isSelected ? "var(--blue)" : "var(--border)", flexShrink: 0 }} />
                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: isSelected ? 500 : 400, color: isSelected ? "var(--text-primary)" : "var(--text-secondary)", letterSpacing: "-0.01em" }}>
                                            {opt.name}
                                        </span>
                                    </span>
                                    {isSelected && (
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}