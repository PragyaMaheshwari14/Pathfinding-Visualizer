import { twMerge } from "tailwind-merge";
import { usePathfinding } from "../hooks/usePathfinding";
import { MAX_COLS, MAX_ROWS } from "../utils/constants";
import { Tile } from "./Tile";
import { MutableRefObject, useState } from "react";
import { checkIfStartOrEnd, createNewGrid } from "../utils/helpers";

export function Grid({
    isVisulaizationRunningRef,
}: {
    isVisulaizationRunningRef: MutableRefObject<boolean>;
}) {
    const { grid, setGrid } = usePathfinding();
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = (row: number, col: number) => {
        if (isVisulaizationRunningRef.current || checkIfStartOrEnd(row, col)) return;
        setIsMouseDown(true);
        setGrid(createNewGrid(grid, row, col));
    };

    const handleMouseUp = (row: number, col: number) => {
        if (isVisulaizationRunningRef.current || checkIfStartOrEnd(row, col)) return;
        setIsMouseDown(false);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isVisulaizationRunningRef.current || checkIfStartOrEnd(row, col)) return;
        if (isMouseDown) setGrid(createNewGrid(grid, row, col));
    };

    return (
        <div className={twMerge(
            // CHANGED: removed "border-sky-300" (old blue border colour),
            //          removed "mt-9" (spacing now comes from Nav controls strip padding).
            //          Added flex-1 so the grid fills remaining screen height.
            "flex items-center flex-col justify-center flex-1",

            `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${MAX_ROWS * 15}px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
            `lg:w-[${MAX_COLS * 17}px]    md:w-[${MAX_COLS * 15}px]    xs:w-[${MAX_COLS * 8}px]    w-[${MAX_COLS * 7}px]`,
        )}>
            {grid.map((r, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {r.map((tile, tileIndex) => {
                        const { row, col, isStart, isEnd, isPath, isTraversed, isWall } = tile;
                        return (
                            <Tile
                                key={tileIndex}
                                row={row} col={col}
                                isEnd={isEnd} isStart={isStart}
                                isPath={isPath} isTraversed={isTraversed} isWall={isWall}
                                handleMouseDown={() => handleMouseDown(row, col)}
                                handleMouseUp={() => handleMouseUp(row, col)}
                                handleMouseEnter={() => handleMouseEnter(row, col)}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}