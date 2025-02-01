export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  isEditing?: boolean;
}