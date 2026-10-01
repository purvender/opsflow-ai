export type RequestStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED";

export type OpsRequest = {
  id: string;
  title: string;
  description: string;
  type: "EQUIPMENT" | "ACCESS" | "TRAVEL" | "OTHER";
  status: RequestStatus;
  requester: string;
  createdAt: string;
};

export type ChatSource = {
  documentId: string;
  documentName: string;
  page?: number;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
};
