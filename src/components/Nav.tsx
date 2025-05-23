import { MutableRefObject, useState } from "react";
import { usePathfinding } from "../hooks/usePathfinding";
import { useTile } from "../hooks/useTile";
import { EXTENDED_SLEEP_TIME, MAZES, PathFINDING_ALGORITHMS, SLEEP_TIME, SPEEDS} from "../utils/constants";
import { resetGrid } from "../utils/resetGrid";
import { AlgorithmType, MazeType, SpeedType } from "../utils/types";
import { Select } from "./Select";
import { runMazeAlgorithm} from "../utils/runMazeAlgorithm";
import { useSpeed } from "../hooks/useSpeed";
import { PlayButton } from "./PlayButton";
import { runPathFindingAlgorithm } from "../utils/runPathFindingAlgorithm";
import { animatePath } from "../utils/animatePath";

export function Nav({
    isVisulaizationRunningRef,
}:{
        isVisulaizationRunningRef: MutableRefObject<boolean>;
}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const {maze, setMaze, grid, setGrid, isGraphVisualized, setIsGraphVisualized, algorithm, setAlgorithm,} = usePathfinding();
    const {startTile, endTile} =  useTile();
    const {speed ,setSpeed} = useSpeed();

    const handleGenerateMaze = (maze: MazeType) => {
        if(maze === 'NONE'){
            setMaze(maze);
            // reset grid
            resetGrid({grid, startTile, endTile});
            return;
        }

        setMaze(maze);
        setIsDisabled(true);
        //runMazeAlgorithm
        runMazeAlgorithm({
            maze, 
            grid,
            startTile, 
            endTile, 
            setIsDisabled,
            speed
        });
        const newGrid = grid.slice();
        setGrid(newGrid)
        setIsGraphVisualized(false);
    };

    const handleRunVisualizer = () => {
        if(isGraphVisualized){
            setIsGraphVisualized(false);
            resetGrid({grid: grid.slice(), startTile, endTile});
            return;
        }

        // run the algorithm
        const {traversedTiles, path} =  runPathFindingAlgorithm({
            algorithm,
            grid,
            startTile,
            endTile,
        });

        animatePath(traversedTiles, path, startTile, endTile, speed);
        setIsDisabled(true);
        isVisulaizationRunningRef.current = true;
        setTimeout(() => {
            const newGrid = grid.slice();
            setGrid(newGrid);
            setIsGraphVisualized(true);
            setIsDisabled(false);
            isVisulaizationRunningRef.current = false;
        }, (SLEEP_TIME * (traversedTiles.length + SLEEP_TIME * 2) + EXTENDED_SLEEP_TIME * (path.length + 60) * SPEEDS.find((s) => s.value === speed)!.value));
    }
    
    return (
        <div className= "w-full px-3 sm:px-5 shadow-gray-600">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 w-full max-w-[90rem] mx-auto py-4 px-2 sm:px-4">
               <h1 className="hidden lg:block text-4xl pl-1 font-outfit whitespace-nowrap ">
                  Pathfinding Visualizer
                </h1> 
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <Select
                       label = "Maze"
                       value = {maze}
                       options={MAZES}
                       onChange={(e) => {
                        // handle generating maze
                        handleGenerateMaze(e.target.value as MazeType);
                    }}
                    />
                    <Select
                       label ="Graph"
                       value={algorithm}
                       options={PathFINDING_ALGORITHMS}
                       onChange={(e) => {
                         setAlgorithm(e.target.value as AlgorithmType);
                       }}
                    />
                    <Select
                       label="Speed"
                       value={speed}
                       options={SPEEDS}
                       onChange={(e) => {
                          setSpeed( parseInt(e.target.value) as SpeedType)
                       }}
                    />
                   <PlayButton
                       isDisabled={isDisabled}
                       isGraphVisualized={isGraphVisualized}
                       handleRunVisualizer={handleRunVisualizer}
                   />
                    
                </div>

            </div>

        </div>
    )
}