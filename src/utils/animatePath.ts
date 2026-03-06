import { EXTENDED_SLEEP_TIME, SLEEP_TIME, SPEEDS, TILE_STYLE } from "./constants";
import { isEqual } from "./helpers";
import { SpeedType, TileType } from "./types";

export const animatePath = (
    traversedTiles: TileType[],
    path: TileType[],
    startTile: TileType,
    endTile: TileType,
    speed: SpeedType
) => {
    const speedVal = SPEEDS.find((s) => s.value === speed)!.value;

    for (let i = 0; i < traversedTiles.length; i++) {
        setTimeout(() => {
            const tile = traversedTiles[i];
            if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
                document.getElementById(`${tile.row}-${tile.col}`)!.className =
                    `${TILE_STYLE} bg-[var(--tile-traversed)] animate-traversed`;
            }
        }, SLEEP_TIME * i * speedVal);
    }
    setTimeout(() => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const tile = path[i];
                if (!isEqual(tile, startTile) && !isEqual(tile, endTile)) {
                    document.getElementById(`${tile.row}-${tile.col}`)!.className =
                        `${TILE_STYLE} bg-[var(--tile-path)] animate-path`;
                }
            }, EXTENDED_SLEEP_TIME * i * speedVal);
        }
    }, SLEEP_TIME * traversedTiles.length * speedVal);
};