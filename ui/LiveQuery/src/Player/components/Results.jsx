import { Progress } from "@/components/ui/progress";

/**
 * MARK: Results
 * @description Displays the results of the current poll
 * @param {Object} options The options for the poll
 * @param {Number} players The number of players in the session
 * @returns {JSX.Element} Results component
 * @example <Results options={options} players={players} />
 *
 */
export const Results = ({ options, players }) => {
  //MARK: Return
  return (
    <div>
      {(options || [{votes: 0,text: "Error"}]).map((option, index) => (
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
