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

export enum ReviewEnum {
  user,
  perfume,
}

export interface GetReviewsProps {
  type: ReviewEnum;
  perfumeId: string | null;
  userId: string | null;
}

export default async function getReviews(
  props: GetReviewsProps,
): Promise<ReviewProps[] | undefined> {
  try {
    const { type, perfumeId, userId } = props;
    const reviews: ReviewProps[] = [];
    let q: Query<DocumentData, DocumentData> | null;
    if (type == ReviewEnum.user) {
      q = query(collection(db, "review"), where("userId", "==", userId));
    } else {
      q = query(collection(db, "review"), where("perfumeId", "==", perfumeId!));
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
