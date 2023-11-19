import getReviews, { ReviewEnum } from "../review/getReviews";
import { ReviewProps } from "../review/review";

export interface PerfumeProps {
  id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  occasion: string;
  size: number;
  concentration: string;
  origin: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  gender: string;
  description: string;
  stock: number;
  rating: number;
  reviews: ReviewProps[];
}

export async function jsonToParfume(json: {
  [key: string]: any;
}): Promise<PerfumeProps> {
  // parsing review
  let parsedReview: ReviewProps[] = [];
  const reviews = await getReviews({
    type: ReviewEnum.perfume,
    perfumeId: json.id,
  });
  if (reviews != undefined) {
    parsedReview = reviews;
  }
  // get rating
  let totalRating: number = 0;
  parsedReview.forEach((rev) => totalRating + rev.rating);
  let rating = 0;
  if (parsedReview.length != 0) {
    totalRating / parsedReview.length;
  }

  return {
    id: json.id || "",
    name: json.name || "",
    image: json.image || "",
    price: json.price || "",
    brand: json.brand || "",
    occasion: json.occasion || "",
    size: json.size || "",
    concentration: json.concentration || "",
    origin: json.origin || "",
    topNotes: Array.isArray(json.topNotes) ? json.topNotes : [],
    middleNotes: Array.isArray(json.middleNotes) ? json.middleNotes : [],
    baseNotes: Array.isArray(json.baseNotes) ? json.baseNotes : [],
    gender: json.gender || "",
    description: json.description || "",
    stock: json.stock || "",
    rating: rating,
    reviews: parsedReview,
  };
}
