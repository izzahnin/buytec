import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";

export default async function getAllPerfume(): Promise<Array<PerfumeProps> | undefined> {
    try {
        const perfumes: Array<PerfumeProps> = [];
        const querySnapshot = await getDocs(collection(db, "perfume"));
        querySnapshot.forEach((doc) => {
            perfumes.push(jsonToParfume(doc.data()))
        })
        console.log(perfumes)
        console.log(perfumes[0])
        console.log(`total response: ${perfumes.length}`)
        return perfumes;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}