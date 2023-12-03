import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";
import { TransactionProps, jsonToTransaction } from "./transaction";

export default async function getUserTransactions(userId: string): Promise<
  Array<TransactionProps> | undefined
> {
  try {
    const transactions: Array<TransactionProps> = [];
    const querySnapshot = await getDocs(query(collection(db, "transaction"), where('userId', '==', userId)));
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
