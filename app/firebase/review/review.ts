export interface ReviewProps {
  id: string;
  userId: string;
  productId: string;
  text: string;
  rating: number;
}

export function jsonToReview(json: { [key: string]: any }): ReviewProps {
  return {
    id: json.id || "",
    userId: json.userId || "",
    productId: json.productId || "",
    text: json.text || "",
    rating: json.rating || 0.0,
  };
}
