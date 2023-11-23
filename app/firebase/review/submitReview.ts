import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { ReviewProps } from "./review";

interface SubmitReviewProps {
  userId: string;
  perfumeId: string;
  text: string;
  rating: number;
  date: Date;
}

export default async function submitReview(
  props: SubmitReviewProps,
): Promise<void> {
  // create new review
  const newDocRef = doc(db, "review");
  await setDoc(newDocRef, {
    id: newDocRef.id,
    userId: props.userId,
    perfumeId: props.perfumeId,
    text: props.text,
    rating: props.rating,
    date: props.date,
  } as ReviewProps);
}
