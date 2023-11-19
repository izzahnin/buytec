import {
  DocumentData,
  DocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import {
  TransactionProps,
  jsonToTransaction,
} from "../transaction/transaction";
import { ReviewProps, jsonToReview } from "../review/review";

export interface UserType {
  id: string | null;
  name: string | null;
  email: string | null;
  number: string | null;
  gender: string | null;
  birthdate: Date | null;
  address: string | null;
  wishlist: string[];
  cart: string[];
}

export const userConverter = {
  toFirestore: (user: UserType) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      number: user.number,
      gender: user.gender,
      birthdate: user.birthdate,
      address: user.address,
      wishlist: user.wishlist,
      cart: user.cart,
    };
  },
  fromFirestore: (
    snapshot: DocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions | undefined,
  ) => {
    const parsedTransaction: TransactionProps[] = [];
    const parsedReview: ReviewProps[] = [];
    const data: DocumentData | undefined = snapshot.data(options);
    if (data?.transaction != null) {
      for (let transaction in data!.transaction) {
        parsedTransaction.push(
          jsonToTransaction(transaction as unknown as Map<string, any>),
        );
      }
    }
    if (data?.review != null) {
      for (let review in data!.review) {
        parsedReview.push(jsonToReview(review as unknown as Map<string, any>));
      }
    }

    return {
      id: data!.id,
      name: data!.name,
      email: data!.email,
      number: data?.number,
      gender: data?.gender,
      birthdate: data?.birthdate,
      address: data?.address,
      wishlist: data?.wishlist,
      cart: data?.cart,
    } as UserType;
  },
};
