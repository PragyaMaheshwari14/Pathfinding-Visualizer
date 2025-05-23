import { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

export function PlayButton({
    handleRunVisualizer,
    isDisabled,
    isGraphVisualized,
}:{
    isDisabled: boolean;
    isGraphVisualized: boolean;
    handleRunVisualizer: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            disabled={isDisabled}
            onClick = {handleRunVisualizer}
            className=" mt-5 disabled:pointer-events-none disabled:opacity-50 transition ease-in rounded-full p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30"
        >
            {isGraphVisualized ? (
                <GrPowerReset className="w-7 h-7"/> )
            : ( 
                <BsFillPlayFill className="w-7 h-7"/>
            )}
        </button>
    );
}