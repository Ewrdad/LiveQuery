import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * MARK: Vote
 * @description The component that allows a player to vote
 * @param {Array<Object>} options The options to vote on
 * @param {Function} setShowResults The function to show the results
 * @param {Object} Server The socket.io server connection
 * @param {String} SessionCode The session code
 */
export const Vote = ({ options, setShowResults, Server, SessionCode }) => {
  return (
    <div className="w-full  text-xl">
      {options.map((option, index) => {
        return (
          <div key={index}>
            <Separator
              orientation="horizontal"
              className="my-2 bg-black w-full min-w-full"
            />
            <Button
              className="w-full shadow-lg bg-slate-500 text-center text-2xl p-10 "
              onClick={() => {
                Server.emit("Vote", {
                  sessionID: SessionCode,
                  optionIndex: index,
                });
                setShowResults(true);
              }}
            >
              <div className="w-1/3"></div>
              {option.text}

              <div className="w-1/3"></div>
            </Button>
          </div>
        );
      })}
      <Separator orientation="horizontal" className="my-2 bg-black w-full" />
    </div>
  );
};
