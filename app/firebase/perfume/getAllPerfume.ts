import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";

export default async function getAllPerfume(): Promise<Array<PerfumeProps> | undefined> {
    try {
        const perfumes: Array<PerfumeProps> = [];
        const querySnapshot = await getDocs(collection(db, "perfume"));
        const fetchPromises = querySnapshot.docs.map(async (doc) => {
            const perfume = await jsonToParfume(doc.data());
            perfumes.push(perfume);
          });
        
          // Wait for all promises to resolve
          await Promise.all(fetchPromises);
        // console.log(perfumes);
        // console.log(`total response: ${perfumes.length}`);
        return perfumes;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}