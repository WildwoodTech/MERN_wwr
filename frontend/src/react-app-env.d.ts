/// <reference types="react-scripts" />
declare module "react-snowstorm";

interface HTTPRequestService {
  success: boolean;
  data: IService[];
}

interface HTTPRequestUser {
  success: boolean;
}

interface IService {
  _id: string;
  time: Date;
  seats: number;
}

interface IUser {
  serviceId: string;
  serviceTime: Date;
  seats: number;
  name: string;
  email: string;
}

interface IServiceFormState {
  serviceId: string;
  name: string;
  email: string;
  userseats: number;
  children: boolean;
  students: {
    nursery: number;
    twoyears: number;
    threeyears: number;
    fouryears: number;
    kindergarten: number;
    wildlife: number;
  };
}

interface IMainAppState {
  formStatusMessage: string;
  formStatusClass: string;
  userUtilFormState: string;
  userUtilFormMessage: string;
  userUtilFormClass: string;
}
