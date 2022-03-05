import { duration } from "./../../assets/language/language";
export type Queue = {
  _id?: string;
  serviceId: string;
  clientId: string;
  day: string;
  hour: string;
  duration: number;
};
export type BusinessSchedule = {
  [weekNumber: number]: BusinessScheduleWeek;
};

export type BusinessScheduleWeek = { [startHour: string]: Queue }[];
