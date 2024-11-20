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

  useEffect(() => {
    Server.on("Update", (message) => {
      console.log("Update", message);
      // alert(`Session ${SessionCode} has been updated`);
      setPlayers(message.players);
      Server.emit("GetQuestion", { sessionID: SessionCode });
      Server.emit("GetAllQuestion", { sessionID: SessionCode });
    });
    const updateQuestion = async (question) => {
      console.log("Updated questions to ", question, SessionCode);
      setQuestionText(question.text);
      setPlayers(question.players);
      const newOps = question.options.map((option) => option.text);
      const oldOps = options.map((option) => option.text);

      await setOptions(question.options);
      if (JSON.stringify(newOps) !== JSON.stringify(oldOps)) {
        setShowResults(false);
      }
    };

    Server.on("Question", updateQuestion);
    Server.on("QuestionUpdate", updateQuestion);

    Server.emit("GetQuestion", { sessionID: SessionCode });

    return () => {
      Server.off("Question", updateQuestion);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Server, SessionCode, showResults]);

  return (
    <>
      <ResizablePanelGroup direction="vertical" className="min-h-screen">
        <ResizablePanel defaultSize={25}>
          {
            // MARK: Header
          }
          <h4
            className="h-full p-6 text-2xl"
            onClick={() => {
              Server.emit("GetQuestion", { sessionID: SessionCode });
            }}
          >
            {" "}
            {QuestionText}{" "}
          </h4>
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
              <Vote
                options={options}
                setShowResults={setShowResults}
                Server={Server}
                SessionCode={SessionCode}
              />
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
              <p>{players} Players</p>
            </div>
            <div className="w-1/2">
              <p>#{SessionCode}</p>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};
