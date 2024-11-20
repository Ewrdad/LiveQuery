"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { NewQuestion } from "./QuestionSelector/NewQuestion";
import { ExistingQuestion } from "./QuestionSelector/ExistingQuestion";
import { QuestionEditor } from "./QuestionEditor/QuestionEditor";
import { Button } from "@/components/ui/button";

/**
 * MARK: SessionMaster
 * @description The main screen for the session master
 * @returns {JSX.Element} SessionMaster component
 * @example <SessionMaster />
 */
export const SessionMaster = ({ SessionCode, Server }) => {
  const [Questions, setQuestions] = useState([
    {
      text: "Question 1",
      options: [
        { text: "Option 1", votes: 3 },
        { text: "Option 2", votes: 4 },
      ],
      active: true,
    },
    {
      text: "Question 2",
      options: [
        { text: "Option 1", votes: 4 },
        { text: "Option 2", votes: 6 },
        { text: "Option 3", votes: 2 },
      ],
    },
  ]);
  const [Selected, setSelected] = useState({
    index: 0,
    question: Questions[0],
  });

  useEffect(() => {
    Server.on("Question", (message) => console.log(message));

    Server.on("AllQuestions", (message) => {
      console.log(message);

      setQuestions(message.questions);

      //Update votes of options of question in index on selected
      message.questions[Selected.index].options.forEach((option, index) => {
        setSelected((prev) => {
          return {
            ...prev,
            question: {
              ...prev.question,
              options: prev.question.options.map((option, i) => {
                if (i === index) {
                  return {
                    ...option,
                    votes:
                      message.questions[Selected.index].options[index].votes,
                  };
                }
                return option;
              }),
            },
          };
        });
      });
    });

    Server.on("Update", (message) => {
      console.log("Update", message);
      Server.emit("GetQuestion", { sessionID: SessionCode });
      Server.emit("GetAllQuestion", { sessionID: SessionCode });
    });
    Server.emit("GetQuestion", { sessionID: SessionCode });

    Server.emit("GetAllQuestion", { sessionID: SessionCode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Server, SessionCode]);

  return (
    <div className="w-screen h-screen min-w-max min-h-max align-left left-0 fixed top-0">
      <div className="bg-slate-500 w-full ">
        <p>Session Code: #{SessionCode}</p>
        <Button className="m-1">Export results</Button>
      </div>
      <ResizablePanelGroup
        className="w-full h-full min-w-max "
        direction="horizontal"
      >
        <ResizablePanel className="bg-slate-300" defaultSize={20}>
          <NewQuestion
            Server={Server}
            Questions={Questions}
            SessionCode={SessionCode}
          />
          {Questions.map((Question, index) => (
            <ExistingQuestion
              key={index}
              Question={Question}
              index={index}
              setSelected={setSelected}
              Selected={Selected}
            />
          ))}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="" defaultSize={80}>
          <QuestionEditor
            Selected={Selected}
            setSelected={setSelected}
            Questions={Questions}
            Server={Server}
            SessionCode={SessionCode}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
