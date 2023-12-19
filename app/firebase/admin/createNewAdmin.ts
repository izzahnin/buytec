import { addDoc, collection } from "firebase/firestore";
import { db } from "../config";

export async function createNewAdmin(username: string, password: string) {
  const adminsCollectionRef = collection(db, 'admin');
  await addDoc(adminsCollectionRef, {
    username: username,
    password: password,
    superAdmin: false,
  });
}
