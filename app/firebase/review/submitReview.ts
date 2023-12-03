import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { ReviewProps } from "./review";
import { db } from "../config";

interface SubmitReviewProps {
  userId: string;
  userName: string;
  perfumeId: string;
  text: string;
  rating: number;
  date: Date;
}

export default async function submitReview(
  props: SubmitReviewProps,
): Promise<void> {
  // create new review
  // const newDocRef = doc(db, "review");
  await addDoc(collection(db, "review"), {
    // id: newDocRef.id,
    userId: props.userId,
    userName: props.userName,
    perfumeId: props.perfumeId,
    text: props.text,
    rating: props.rating,
    date: props.date,
  });
}
