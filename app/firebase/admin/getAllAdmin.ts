import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { AdminType, jsonToAdmin } from "./admin";

export default async function getAllAdmin(): Promise<
  Array<AdminType> | undefined
> {
  try {
    const admins: Array<AdminType> = [];
    const querySnapshot = await getDocs(collection(db, "admin"));
    const fetchPromises = querySnapshot.docs.map(async (doc) => {
      const admin = jsonToAdmin(doc.data());
      admins.push(admin);
    });

    // Wait for all promises to resolve
    await Promise.all(fetchPromises);
    return admins;
  } catch (e) {
    // console.log(e);
    return undefined;
  }
}
