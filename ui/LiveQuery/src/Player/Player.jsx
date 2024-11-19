import { Vote } from "./components/Vote";
import { Results } from "./components/Results";
import { useEffect, useState } from "react";
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
export const Player = ({ Server, SessionCode }) => {
  const [showResults, setShowResults] = useState(false);
  const [options, setOptions] = useState([
    {
      text: "Option 1",
      votes: 5,
    },
    {
      text: "Option 2",
      votes: 2,
    },
  ]);
  const [QuestionText, setQuestionText] = useState("Q1");
  const [players, setPlayers] = useState(10);

  const updateQuestion = (question) => {
    setOptions(question.options);
    setQuestionText(question.text);
  };

  useEffect(() => {
    Server.on("Question", updateQuestion);
    Server.emit("GetQuestion", { sessionID: SessionCode });
  }, [Server, SessionCode]);

  return (
    <>
      <ResizablePanelGroup direction="vertical" className="min-h-screen">
        <ResizablePanel defaultSize={25}>
          {
            // MARK: Header
          }
          <h4 className="h-full p-6 text-2xl"> {QuestionText} </h4>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          {
            // MARK: Body
          }
          <div>
            {showResults ? (
              <Results options={options} players={players} />
            ) : (
              <Vote options={options} setShowResults={setShowResults} />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
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
    </>
  );
};
