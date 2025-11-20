export interface Message {
  id: string;
  text: string;
  categoryId?: string | null;
  aiReply?: string | null;
  createdAt: string;
}