import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config";

export default async function deletePerfume(id: string): Promise<void> {
  await deleteDoc(doc(db, "perfume", id));
}
