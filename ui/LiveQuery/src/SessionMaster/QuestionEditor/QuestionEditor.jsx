import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Footer } from "./Footer/Footer";
import { Editor } from "./Editor/Editor";

/**
 * MARK: QuestionEditor
 * @description A way to edit questions
 *
 * @example <QuestionEditor />
 * @returns {JSX.Element} QuestionEditor component
 */
export const QuestionEditor = (props) => {
  return (
    <ResizablePanelGroup
      className="w-full h-full min-w-max "
      direction="vertical"
    >
      <ResizablePanel className="bg-slate-300" defaultSize={80}>
        <Editor {...props} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel className="bg-slate-400 w-full " defaultSize={20}>
        <Footer {...props} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
