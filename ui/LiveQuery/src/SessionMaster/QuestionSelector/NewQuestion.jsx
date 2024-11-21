import { Button } from "@/components/ui/button";

/**
 * MARK: NewQuestion
 * @description A button for creating a new question
 * @returns {JSX.Element} NewQuestion component
 * @example <NewQuestion Server={Server} Questions={Questions} SessionCode={SessionCode} />
 * @param {Object} Server The socket.io server connection
 * @param {Array<Object>} Questions The questions in the session
 * @param {String} SessionCode The session code
 * @emits ReplaceQuestion Emits a request to replace a question. Used to add a new question
 */
export const NewQuestion = ({ Server, Questions, SessionCode }) => {
  const createQuestion = async () => {
    const emptyQuestion = {
      text: "New Question",
      options: [{ text: "Option 1", votes: 0 }],
      active: false,
    };
    Server.emit("ReplaceQuestion", {
      sessionID: SessionCode,
      question: emptyQuestion,
      index: Questions.length,
    });
  };

  return (
    <Button
      className="bg-slate-400 text-black p-2 w-full border-black border-1"
      onClick={() => createQuestion()}
    >
      New Question
    </Button>
  );
};
