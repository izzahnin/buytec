import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";

export default async function getPerfumeById(id: string): Promise<PerfumeProps> {
    // try {
        const querySnapshot = await getDoc(doc(db, 'perfume', id));
        let perfume = await jsonToParfume(querySnapshot.data()!);

        // console.log(perfumes);
        // console.log(`total response: ${perfumes.length}`);
        return perfume;
    // } catch (e) {
    //     console.log(e);
    //     return undefined;
    // }
}