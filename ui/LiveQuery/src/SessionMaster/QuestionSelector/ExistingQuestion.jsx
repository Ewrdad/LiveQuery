import { Button } from "@/components/ui/button";

/**
 * MARK: ExistingQuestion
 * @description A button for selecting an existing question
 * @param {Object} Question The question to display
 * @param {Number} index The index of the question in the array
 * @param {Function} setSelected The function to set the selected question
 * @param {Object} Selected The currently selected question
 * @returns {JSX.Element} ExistingQuestion component
 * @example <ExistingQuestion Question={Question} index={index} setSelected={setSelected} Selected={Selected} />
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
      {Question.active ? "🟢" : "🔴"}
      {Selected.index == index ? "⚫" : ""}
    </Button>
  );
};
