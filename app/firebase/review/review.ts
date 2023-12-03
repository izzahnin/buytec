import { Timestamp } from "firebase/firestore";

export interface ReviewProps {
  id: string;
  userId: string;
  userName: string;
  perfumeId: string;
  text: string;
  rating: number;
  date: Date;
}

export function jsonToReview(json: { [key: string]: any }): ReviewProps {
  return {
    id: json.id || "",
    userId: json.userId || "",
    userName: json.userName || "",
    perfumeId: json.perfumeId || "",
    text: json.text || "",
    rating: json.rating || 0.0,
    date: (json.date as Timestamp).toDate() || "",
  };
}
