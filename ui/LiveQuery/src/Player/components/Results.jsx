import { Progress } from "@/components/ui/progress";

export const Results = ({ options, players }) => {
  return (
    <div>
      {options.map((option, index) => (
        <div key={index} className="flex">
          <div className="w-1/3 ">{option.text}</div>
          <div className="w-1/3 align-middle flex items-center ">
            <Progress
              value={(option.votes / players) * 100}
              className="align-middle"
            />
          </div>
          <div className="w-1/3 ">{option.votes}</div>
        </div>
      ))}
    </div>
  );
};
