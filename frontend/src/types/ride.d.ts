import { Captain } from "./captain";
import { User } from "./user";

export interface Ride {
  destination: string;
  pickup: string;
  fare: number;
  status: "pending" | "accepted" | "ongoing" | "completed" | "cancelled";
  user: User;
  captain?: Captain;
  _id?: string;
  otp?: string;
}
