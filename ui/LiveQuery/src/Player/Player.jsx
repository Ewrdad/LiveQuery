import { Vote } from "./components/Vote";
import { Results } from "./components/Results";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

/**
 * MARK: Player
 * @description This is the main screen for the player
 * @returns Player component
 * @example <Player />
 */
export const Player = () => {
  const [showResults, setShowResults] = useState(false);
  const [options, setOptions] = useState([
    {
      text: "Option 1",
      votes: 0,
    },
    {
      text: "Option 2",
      votes: 0,
    },
  ]);

  return (
    <ResizablePanelGroup
      direction="vertical"
      className="bg-orange-500 h-full w-full"
    >
      <ResizablePanel className="text-center text-2xl bg-green-800">
        {
          // MARK: Header
        }
        <h4> QUESTION 1: What points shall this get </h4>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        {
          // MARK: Body
        }
        <div>
          {/* {showResults ? (
            <Results options={options} />
          ) : (
            <Vote options={options} setShowResults={setShowResults} />
          )} */}
          sss
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="bg-red-950">
        {
          // MARK: Footer
        }
        <div className="w-full p-4 bg-slate-300 text-center flex">
          <div className="w-1/2 ">
            <p>Players</p>
          </div>
          <div className="w-1/2">
            <p>#28383</p>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
