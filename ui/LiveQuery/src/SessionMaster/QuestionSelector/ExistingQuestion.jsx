import { Button } from "@/components/ui/button";

/**
 * MARK: ExistingQuestion
 * @description A button for selecting an existing question
 */
export const ExistingQuestion = ({
  Question,
  index,
  setSelected,
  Selected,
}) => {
  return (
    <Button
      className="bg-slate-200 text-black p-2 w-full  border-black border-1"
      onClick={() => {
        setSelected({ index: index, question: Question });
      }}
    >
      {Question.text}
      {Selected.index == index ? "🔴" : ""}
    </Button>
  );
};
