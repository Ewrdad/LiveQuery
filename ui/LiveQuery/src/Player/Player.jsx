import { Vote } from "./components/Vote";
import { Results } from "./components/Results";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { toast } from "sonner";

/**
 * MARK: Player
 * @description This is the main screen for the player
 * @returns Player component
 * @example <Player />
 *
 * @param {Object} Server The socket.io server connection
 * @param {String} SessionCode The session code
 *
 * @listens Update Triggers a session update
 * @listens Question Triggers a question update
 * @listens QuestionUpdate Triggers a question update
 * @emits GetQuestion Emits a request to get the current question
 * @emits GetAllQuestion Emits a request to get all questions(Mainly to force dashboard to update)
 *
 */
export const Player = ({ Server, SessionCode }) => {
  //MARK: useState
  const [showResults, setShowResults] = useState(false);
  const [options, setOptions] = useState([]);
  const [QuestionText, setQuestionText] = useState("Q1");
  const [players, setPlayers] = useState(10);

  Server.on("Update", (message) => {
    console.log("Update", message);
    // alert(`Session ${SessionCode} has been updated`);
    setPlayers(message.players);
    Server.emit("GetQuestion", { sessionID: SessionCode });
    Server.emit("GetAllQuestion", { sessionID: SessionCode });
  });

  const updateQuestion = (question) => {
    console.log("Updated questions to ", question, SessionCode);
    setQuestionText(question.text);
    setPlayers(question.players);

    setOptions((prevOptions) => {
      const newOps =
        (question.options ?? []).map((option) => option.text) ?? [];
      const oldOps = (prevOptions ?? []).map((option) => option.text) ?? [];

      if (JSON.stringify(newOps) !== JSON.stringify(oldOps)) {
        setShowResults(() => false);
        toast("New Question");
      }
      return question.options;
    });
  };

  Server.on("Question", updateQuestion);
  Server.on("QuestionUpdate", updateQuestion);
  Server.on("Update", (message) => {
    setPlayers(message.players);

    Server.emit("GetQuestion", { sessionID: SessionCode });
    Server.emit("GetAllQuestion", { sessionID: SessionCode });
  });
  //MARK: useEffect
  useEffect(() => {
    Server.emit("GetQuestion", { sessionID: SessionCode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Server, SessionCode, options]);

  //MARK: return
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
            {JSON.stringify(showResults)}
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
