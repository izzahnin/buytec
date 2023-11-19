import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";
import { db } from "../config";
import { ReviewProps } from "./review";

interface submitReviewProps {
  perfumeId: string;
  text: string;
  rating: number;
}

export default async function submitReview(
  props: submitReviewProps,
): Promise<void> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user } = useAuth();

  // create new review
  const newDocRef = doc(db, "review");
  await setDoc(newDocRef, {
    id: newDocRef.id,
    userId: user.id,
    perfumeId: props.perfumeId,
    text: props.text,
    rating: props.rating,
  } as ReviewProps);
}
