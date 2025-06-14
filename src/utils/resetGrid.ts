import {
  END_TILE_CONFIGURATION,
  MAX_COLS,
  MAX_ROWS,
  START_TILE_CONFIGURATION,
  TILE_STYLE,
} from "./constants";
import { GridType, TileType } from "./types";
import { isEqual } from "./helpers";

export const resetGrid = ({
  grid,
  startTile = START_TILE_CONFIGURATION,
  endTile = END_TILE_CONFIGURATION,
}: {
  grid: GridType;
  startTile?: TileType;
  endTile?: TileType;
}) => {
  for (let row = 0; row < MAX_ROWS; row++) {
    for (let col = 0; col < MAX_COLS; col++) {
      const tile = grid[row][col];

      tile.distance = Infinity;
      tile.isTraversed = false;
      tile.isPath = false;
      tile.parent = null;
      tile.isWall = false;

      const tileElement = document.getElementById(`${tile.row}-${tile.col}`);
      if (!tileElement) continue;

      if (isEqual(startTile, tile)) continue;
      if (isEqual(endTile, tile)) continue;

      tileElement.className = TILE_STYLE;

      if (tile.row === MAX_ROWS - 1) {
        tileElement.classList.add("border-b");
      }

      if (tile.col === 0) {
        tileElement.classList.add("border-l");
      }
    }
  }
};