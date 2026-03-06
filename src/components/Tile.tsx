import { twMerge } from "tailwind-merge";
import {
    MAX_ROWS,
    TILE_STYLE,
} from "../utils/constants";

interface MouseFunction {
    (row: number, col: number): void;
}

export function Tile({
    row,
    col,
    isStart,
    isEnd,
    isTraversed,
    isWall,
    isPath,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
}: {
    row: number;
    col: number;
    isStart: boolean;
    isEnd: boolean;
    isTraversed: boolean;
    isWall: boolean;
    isPath: boolean;
    handleMouseDown: MouseFunction;
    handleMouseEnter: MouseFunction;
    handleMouseUp: MouseFunction;
}) {
    // CHANGED: colours now reference CSS variables defined in index.css so they
    //          automatically flip between light and dark mode.
    //          Previously each state had a hardcoded Tailwind colour class.
    let colourClass = "bg-[var(--bg-primary)]";
    if      (isStart)     colourClass = "bg-[var(--tile-start)]";
    else if (isEnd)       colourClass = "bg-[var(--tile-end)]";
    else if (isWall)      colourClass = "bg-[var(--tile-wall)]";
    else if (isPath)      colourClass = "bg-[var(--tile-path)]";
    else if (isTraversed) colourClass = "bg-[var(--tile-traversed)]";

    // Border additions for grid edges (unchanged logic)
    const borderBottom = row === MAX_ROWS - 1 ? "border-b border-b-[var(--tile-border)]" : "";
    const borderLeft   = col === 0            ? "border-l border-l-[var(--tile-border)]" : "";

    return (
        <div
            className={twMerge(TILE_STYLE, colourClass, borderBottom, borderLeft)}
            id={`${row}-${col}`}
            onMouseDown={() => handleMouseDown(row, col)}
            onMouseUp={() => handleMouseUp(row, col)}
            onMouseEnter={() => handleMouseEnter(row, col)}
        />
    );
}