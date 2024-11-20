import { Button } from "@/components/ui/button";

export const Footer = ({ Selected, setSelected }) => {
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
          <Button
            className="m-1"
            onClick={() =>
              setSelected((previous) => ({
                ...previous,
                question: {
                  text: "Story Points(Triangle)",
                  options: [
                    { text: "1", votes: 0 },
                    { text: "2", votes: 0 },
                    { text: "3", votes: 0 },
                    { text: "6", votes: 0 },
                    { text: "10", votes: 0 },
                    { text: "15", votes: 0 },
                  ],
                },
              }))
            }
          >
            Story Points(Triangle)
          </Button>

          <Button
            className="m-1"
            onClick={() =>
              setSelected((previous) => ({
                ...previous,
                question: {
                  text: "Story Points(Fibonanci)",
                  options: [
                    { text: "1", votes: 0 },
                    { text: "2", votes: 0 },
                    { text: "3", votes: 0 },
                    { text: "5", votes: 0 },
                    { text: "8", votes: 0 },
                    { text: "13", votes: 0 },
                  ],
                },
              }))
            }
          >
            Story Points(Fibonanci)
          </Button>
          <Button
            className="m-1"
            onClick={() =>
              setSelected((previous) => ({
                ...previous,
                question: {
                  text: "1-5 rank",
                  options: [
                    { text: "1", votes: 0 },
                    { text: "2", votes: 0 },
                    { text: "3", votes: 0 },
                    { text: "4", votes: 0 },
                    { text: "5", votes: 0 },
                  ],
                },
              }))
            }
          >
            1-5 rank
          </Button>

          <Button
            className="m-1"
            onClick={() =>
              setSelected((previous) => ({
                ...previous,
                question: {
                  text: "Strong Agree/Disagree",
                  options: [
                    { text: "Strongly Agree", votes: 0 },
                    { text: "Agree", votes: 0 },
                    { text: "Neutral", votes: 0 },
                    { text: "Disagree", votes: 0 },
                    { text: "Strongly Disagree", votes: 0 },
                  ],
                },
              }))
            }
          >
            Strong Agree/Disagree
          </Button>

          <Button
            className="m-1"
            onClick={() =>
              setSelected((previousValue) => ({
                ...previousValue,
                question: {
                  text: "True/False",
                  options: [
                    { text: "True", votes: 0 },
                    { text: "False", votes: 0 },
                  ],
                },
              }))
            }
          >
            True/False
          </Button>
          <Button
            className="m-1"
            onClick={() =>
              setSelected((previousValue) => ({
                ...previousValue,
                question: {
                  text: "Yes/No",
                  options: [
                    { text: "Yes", votes: 0 },
                    { text: "No", votes: 0 },
                  ],
                },
              }))
            }
          >
            Yes/No
          </Button>
        </div>
      </div>
    </div>
  );
};
