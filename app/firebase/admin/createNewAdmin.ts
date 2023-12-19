import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import { AdminType } from "./admin";

export async function createNewAdmin(username: string, password: string) {
    const docRef = doc(db, 'admin');
    await setDoc(docRef, {
        username: username,
        password: password,
        superAdmin: false,
    });
}