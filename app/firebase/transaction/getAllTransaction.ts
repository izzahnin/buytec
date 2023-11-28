import { collection, getDocs } from "firebase/firestore";
import { db } from "../config";
import { TransactionProps, jsonToTransaction } from "./transaction";

export default async function getAllTransaction(): Promise<
  Array<TransactionProps> | undefined
> {
  try {
    const transactions: Array<TransactionProps> = [];
    const querySnapshot = await getDocs(collection(db, "transaction"));
    const fetchPromises = querySnapshot.docs.map(async (doc) => {
      const transaction = await jsonToTransaction(doc.data());
      transactions.push(transaction);
    });

    // Wait for all promises to resolve
    await Promise.all(fetchPromises);
    return transactions;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
