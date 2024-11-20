import { Button } from "@/components/ui/button";

/**
 * MARK: NewQuestion
 * @description A button for creating a new question
 * @returns {JSX.Element} NewQuestion component
 * @example <NewQuestion />
 * @param {function} setQuestions - A function to set the questions to new state
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
