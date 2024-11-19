import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const Editor = ({
  Selected,
  setSelected,
  Questions,
  Server,
  SessionCode,
}) => {
  return (
    <div className="w-full h-full min-w-max ">
      <Button
        className=" w-full  min-w-max "
        disabled={Selected.question.active}
        onClick={() => {
          console.log(SessionCode);
          Server.emit("MakeActive", {
            SessionID: SessionCode,
            Question: Selected.question,
            index: Selected.index,
          });
          Server.emit("GetAllQuestion", { sessionID: SessionCode });
          setSelected((previousValue) => ({
            ...previousValue,
            question: { ...previousValue.question, active: true },
          }));
        }}
      >
        Make active
      </Button>
      <Button
        className=" w-full  min-w-max "
        disabled={
          JSON.stringify(Questions[Selected.index]) ===
          JSON.stringify(Selected.question)
        }
      >
        Update
      </Button>
      <Textarea
        value={Selected.question.text}
        onChange={(event) => {
          setSelected((previousValue) => ({
            ...previousValue,
            question: { ...previousValue.question, text: event.value },
          }));
        }}
      />

      {Selected.question.options.map((Option, index) => (
        <div className="flex" key={index}>
          <Input
            className="w-10/12"
            value={Option.text}
            onChange={(event) => {
              setSelected((previousValue) => ({
                ...previousValue,
                question: {
                  ...previousValue.question,
                  options: [
                    ...previousValue.question.options.slice(0, index),
                    { text: event.target.value, votes: Option.votes },
                    ...previousValue.question.options.slice(index + 1),
                  ],
                },
              }));
            }}
          />

          <Button
            variant="destructive"
            className="w-2/12"
            onClick={() => {
              setSelected((previousValue) => ({
                ...previousValue,
                question: {
                  ...previousValue.question,
                  options: [
                    ...previousValue.question.options.slice(0, index),
                    ...previousValue.question.options.slice(index + 1),
                  ],
                },
              }));
            }}
          >
            Delete
          </Button>
        </div>
      ))}

      <Button
        onClick={() => {
          setSelected((previousValue) => ({
            ...previousValue,
            question: {
              ...previousValue.question,
              options: [
                ...previousValue.question.options,
                { text: "New Option", votes: 0 },
              ],
            },
          }));
        }}
      >
        Add Option
      </Button>
    </div>
  );
};
