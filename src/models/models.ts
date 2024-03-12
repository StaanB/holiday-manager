// Requisition types
export interface Requisition {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    participants: string | null;
    status: string;
}

