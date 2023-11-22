import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";

export default async function getBestSellerPerfumes(): Promise<Array<PerfumeProps> | undefined> {
    try {
        const perfumes: Array<PerfumeProps> = [];
        const q = query(collection(db, "perfume"), where('bestSeller', "==", true));
        const querySnapshot = await getDocs(q);
        const fetchPromises = querySnapshot.docs.map(async (doc) => {
            const perfume = await jsonToParfume(doc.data());
            perfumes.push(perfume);
          });
        
          // Wait for all promises to resolve
          await Promise.all(fetchPromises);
        return perfumes;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}