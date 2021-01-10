export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
}

export interface GroupModel {
  id: string;
  name: string;
  description: string;
  code: string;
  teacher: User;
  totalStudents: number;
}

export interface ActivityModel {
  id: string;
  name: string;
  description: string;
  deadline: Date | undefined;
  totalAnswer: number;
  hasAnswer: boolean;
}

export interface AnswerActivityModel {
  id: string;
  note: string;
  deliveryDate: Date;
  report: string;
  image: string;
  feedback: string;
}
