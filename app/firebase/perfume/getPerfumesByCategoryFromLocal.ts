import {
  DocumentData,
  Query,
  collection,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";

interface GetPerfumesByCategoryProps {
  category: string;
  subcategory: string | number;
}

export default async function getPerfumesByCategory(
  props: GetPerfumesByCategoryProps,
): Promise<Array<PerfumeProps> | undefined> {
  const { category, subcategory } = props;
  try {
    const perfumes: Array<PerfumeProps> = [];
    let q: Query<DocumentData, DocumentData>;

    if (category == "notes") {
      q = query(
        collection(db, "perfume"),
        or(
          where("topNotes", "array-contains", subcategory),
          where("middleNotes", "array-contains", subcategory),
          where("baseNotes", "array-contains", subcategory),
        ),
      );
    } else {
      q = query(collection(db, "perfume"), where(category, "==", subcategory));
    }
    const querySnapshot = await getDocs(q);
    const fetchPromises = querySnapshot.docs.map(async (doc) => {
      const perfume = await jsonToParfume(doc.data());
      perfumes.push(perfume);
    });

    // Wait for all promises to resolve
    await Promise.all(fetchPromises);
    return perfumes;
  } catch (e) {
    // console.log(e);
    return undefined;
  }
}
