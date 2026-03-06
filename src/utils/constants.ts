import { AlgorithmSelectType, MazeSelectType, SpeedSelectType } from "./types";

export const MAX_ROWS = 39;
export const MAX_COLS = 49;

export const START_TILE_CONFIGURATION = {
    row: 1,
    col: 1,
    isEnd: false,
    isWall: false,
    isPath: false,
    distance: 0,
    isStart: true,
    isTraversed: false,
    parent: null,
};

export const END_TILE_CONFIGURATION = {
    row: MAX_ROWS - 2,
    col: MAX_COLS - 2,
    isEnd: true,
    isWall: false,
    isPath: false,
    distance: 0,
    isStart: false,
    isTraversed: false,
    parent: null,
};

// ── Tile base size (unchanged) ──────────────────────────────────────────
// CHANGED: border colour now uses CSS var so it flips in dark mode
export const TILE_STYLE =
    "lg:w-[17px] md:w-[15px] xs:w-[8px] w-[7px] " +
    "lg:h-[17px] md:h-[15px] xs:h-[8px] h-[7px] " +
    "border-t border-r border-[var(--tile-border)]";

// CHANGED: colour classes removed — colours are applied via CSS vars in Tile.tsx
export const TRAVERSED_TILE_STYLE = TILE_STYLE;
export const START_TILE_STYLE     = TILE_STYLE;
export const END_TILE_STYLE       = TILE_STYLE;
export const WALL_TILE_STYLE      = TILE_STYLE;
export const PATH_TILE_STYLE      = TILE_STYLE;

export const MAZES: MazeSelectType[] = [
    { name: "No Maze",            value: "NONE"               },
    { name: "Binary Tree",        value: "BINARY_TREE"        },
    { name: "Recursive Division", value: "RECURSIVE_DIVISION" },
];

export const PathFINDING_ALGORITHMS: AlgorithmSelectType[] = [
    { name: "Dijkstra",             value: "DIJKSTRA" },
    { name: "A-Star",               value: "A_STAR"   },
    { name: "Breadth First Search", value: "BFS"      },
    { name: "Depth First Search",   value: "DFS"      },
];

export const SPEEDS: SpeedSelectType[] = [
    { name: "Slow",   value: 2   },
    { name: "Medium", value: 1   },
    { name: "Fast",   value: 0.5 },
];

export const SLEEP_TIME          = 8;
export const EXTENDED_SLEEP_TIME = 30;