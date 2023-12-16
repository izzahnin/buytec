import {
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config";

export default async function changeTransactionStatus(
  transactionId: string,
  newStatus: string,
): Promise<void> {
  await updateDoc(doc(db, "transaction", transactionId), {
    packageStatus: newStatus,
  });
}
