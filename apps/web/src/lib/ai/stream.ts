export type AssistantEvent =
  | { type: "token"; text: string }
  | {
      type: "source";
      documentId: string;
      documentName: string;
      page?: number;
    }
  | { type: "tool-start"; toolName: string }
  | { type: "tool-end"; toolName: string; success: boolean }
  | { type: "done" }
  | { type: "error"; message: string };

export type AssistantStreamHandler = (
  event: AssistantEvent,
) => void | Promise<void>;
