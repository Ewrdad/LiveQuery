import { Button } from "@/components/ui/button";

/**
 * MARK: NewQuestion
 * @description A button for creating a new question
 * @returns {JSX.Element} NewQuestion component
 * @example <NewQuestion />
 * @param {function} setQuestions - A function to set the questions to new state
 */
export const NewQuestion = () => {
  return (
    <Button className="bg-slate-400 text-black p-2 w-full border-black border-1">
      New Question
    </Button>
  );
};
