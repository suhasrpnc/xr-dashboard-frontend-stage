export interface EventModel {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  description?: string;
  category?: string;
}
