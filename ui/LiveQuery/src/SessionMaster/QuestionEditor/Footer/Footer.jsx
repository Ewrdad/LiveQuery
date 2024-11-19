import { Button } from "@/components/ui/button";

export const Footer = ({ Selected }) => {
  const totalVotes = Selected.question.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );
  const colours = ["red", "green", "blue", "orange", "pink"];

  return (
    <div className="bg-slate-400 w-full ">
      <div className="bg-slate-500 w-full flex h-10 ">
        {Selected.question.options.map((option, index) => (
          <div
            key={index}
            style={{
              width: `${(option.votes / totalVotes) * 100}%`,
              backgroundColor: colours[index % colours.length],
            }}
          >
            {option.text} ({option.votes})
          </div>
        ))}
      </div>
      <div className="bg-slate-400 w-full ">
        <h2>Templates</h2>
        <div className="flex align-middle justify-center">
          <Button className="m-1">Story Points</Button>
          <Button className="m-1">Hope</Button>
        </div>
      </div>
    </div>
  );
};
