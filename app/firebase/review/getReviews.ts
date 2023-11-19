import {
  DocumentData,
  Query,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ReviewProps, jsonToReview } from "./review";
import { db } from "../config";
import { useAuth } from "../auth/AuthContext";

export enum ReviewEnum {
  user,
  perfume,
}

interface GetReviewsProps {
  type: ReviewEnum;
  perfumeId: string | null;
}

export default async function getReviews(
  props: GetReviewsProps,
): Promise<ReviewProps[] | undefined> {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useAuth();
    const { type, perfumeId } = props;
    const reviews: ReviewProps[] = [];
    let q: Query<DocumentData, DocumentData> | null;
    if (type == ReviewEnum.user) {
      q = query(collection(db, "review"), where("userId", "==", user.id));
    } else {
      q = query(collection(db, "review"), where("pefumeId", "==", perfumeId!));
    }

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const review = jsonToReview(doc.data());
      reviews.push(review);
    });
    return reviews;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
