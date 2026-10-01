import type { OpsRequest } from "@/types/domain";

export const mockRequests: OpsRequest[] = [
  {
    id: "REQ-1001",
    title: "Development laptop",
    description: "A laptop is needed for local development and testing.",
    type: "EQUIPMENT",
    status: "UNDER_REVIEW",
    requester: "Demo User",
    createdAt: "2026-09-28",
  },
  {
    id: "REQ-1002",
    title: "Production read access",
    description: "Read-only access is requested for incident analysis.",
    type: "ACCESS",
    status: "SUBMITTED",
    requester: "Demo Manager",
    createdAt: "2026-09-29",
  },
];

export const mockCustomers = [
  { id: "CUS-1", name: "Acme", status: "ACTIVE" },
  { id: "CUS-2", name: "Globex", status: "ACTIVE" },
];

export const mockOrders = [
  { id: "ORD-1", customer: "Acme", status: "CREATED" },
];

export const mockNotifications = [
  { id: "NOT-1", title: "Request submitted", read: false },
];
