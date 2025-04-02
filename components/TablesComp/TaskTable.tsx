
import { TabelDataProps, TableHeadProps } from "@/types/Commontypes";
import { TaskTable } from "./Table";

    export function TaskTableList() {
    return (
      <TaskTable tableData={tableData} tableHeaders={tableHeaders}/>
    )
  }
  


  export const tableHeaders: TableHeadProps[] = [
    { headName: "Name", key: "name" },
    { headName: "Email", key: "email" },
    { headName: "Assignesss", key: "status" },
    { headName: "Due Date", key: "due-date" },
    { headName: "Priority", key: "priority" },
  ];

export const tableData: TabelDataProps[] = [
  {
    id: 1,
    status: "in_progress",
    taskName: "Implement user authentication",
    assignees: "john.doe@company.com",
    dueDate: "2025-03-30T19:53:03+05:30",
    priority: "high",
    createdAt: "2025-02-15T10:30:00Z",
    updatedAt: "2025-03-25T14:45:00Z"
  },
  {
    id: 2,
    status: "completed",
    taskName: "Design landing page",
    assignees: "jane.smith@company.com",
    dueDate: "2025-03-15T23:59:59+05:30",
    priority: "medium",
    createdAt: "2025-01-20T09:15:00Z",
    updatedAt: "2025-03-10T18:30:00Z"
  },
  {
    id: 3,
    status: "pending",
    taskName: "Database optimization",
    assignees: "mike.johnson@company.com",
    dueDate: "2025-04-10T12:00:00+05:30",
    priority: "critical",
    createdAt: "2025-03-01T11:20:00Z",
    updatedAt: "2025-03-28T16:15:00Z"
  },
  {
    id: 4,
    status: "in_progress",
    taskName: "API documentation",
    assignees: "sarah.williams@company.com",
    dueDate: "2025-04-05T17:30:00+05:30",
    priority: "low",
    createdAt: "2025-02-28T14:00:00Z",
    updatedAt: "2025-03-29T10:45:00Z"
  },
  {
    id: 5,
    status: "completed",
    taskName: "Mobile responsive fixes",
    assignees: "alex.brown@company.com",
    dueDate: "2025-03-20T15:45:00+05:30",
    priority: "medium",
    createdAt: "2025-02-10T08:30:00Z",
    updatedAt: "2025-03-18T12:15:00Z"
  },
  {
    id: 6,
    status: "in_review",
    taskName: "Payment gateway integration",
    assignees: "emily.davis@company.com",
    dueDate: "2025-04-15T09:00:00+05:30",
    priority: "high",
    createdAt: "2025-03-05T13:45:00Z",
    updatedAt: "2025-04-01T17:00:00Z"
  },
  {
    id: 7,
    status: "pending",
    taskName: "SEO optimization",
    assignees: "david.wilson@company.com",
    dueDate: "2025-04-30T11:30:00+05:30",
    priority: "low",
    createdAt: "2025-03-10T16:20:00Z",
    updatedAt: "2025-03-27T14:30:00Z"
  },
  {
    id: 8,
    status: "in_progress",
    taskName: "User profile page redesign",
    assignees: "jessica.taylor@company.com",
    dueDate: "2025-04-12T14:15:00+05:30",
    priority: "medium",
    createdAt: "2025-02-25T10:45:00Z",
    updatedAt: "2025-04-05T09:30:00Z"
  },
  {
    id: 9,
    status: "blocked",
    taskName: "Third-party API migration",
    assignees: "robert.anderson@company.com",
    dueDate: "2025-05-01T10:00:00+05:30",
    priority: "critical",
    createdAt: "2025-03-15T15:30:00Z",
    updatedAt: "2025-04-10T11:45:00Z"
  }
]