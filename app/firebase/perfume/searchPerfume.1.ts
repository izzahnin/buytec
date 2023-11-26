import { DocumentData, Query, collection, or, query } from "firebase/firestore";
import { PerfumeProps } from "./perfume";

export default async function searchPerfume(keyword: string) {
  const perfumes: Array<PerfumeProps> = [];
  let q: Query<DocumentData, DocumentData>;

  q = query(
    collection(db, "perfume"),
    or(
      where("topNotes", "array-contains", subcategory),
      where("middleNotes", "array-contains", subcategory),
      where("baseNotes", "array-contains", subcategory),
    ),
  );
}
