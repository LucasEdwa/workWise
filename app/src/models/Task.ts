export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdBy: string;
    assignedTo: string | null;
    companyId: string;
    date: Date;
    startTime: string;
    endTime: string;
  }