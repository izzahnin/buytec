import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../config";

export async function deleteAdmin(username: string) {
    const q = query(collection(db, 'admin'), where('username', '==', username));
    const docRef = await getDocs(q);
    const dataId = docRef.docs[0].id;
    await deleteDoc(doc(db, 'admin', dataId));
}