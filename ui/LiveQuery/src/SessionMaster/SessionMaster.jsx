"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

/**
 * MARK: SessionMaster
 * @description The main screen for the session master
 * @returns {JSX.Element} SessionMaster component
 * @example <SessionMaster />
 */
export const SessionMaster = () => {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="bg-red-800 w-full h-full min-h-screen min-w-screen"
    >
      <ResizablePanel>Onedsaddddddddddddddddddddddddddddd</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
};
