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
  birthdate: string | null;
  address: string | null;
  wishlist: string[];
  cart: string[];
  cartAmount: number[];
  review: string[];
  buy: string[];
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
      cartAmount: user.cartAmount,
      review: user.review,
      buy: user.buy
    };
  },
  fromFirestore: (
    snapshot: DocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions | undefined,
  ) => {
    // const parsedTransaction: TransactionProps[] = [];
    // const parsedReview: ReviewProps[] = [];
    const data: DocumentData | undefined = snapshot.data(options);
    // if (data?.transaction != null) {
    //   for (let transaction in data!.transaction) {
    //     parsedTransaction.push(
    //       await jsonToTransaction(transaction as unknown as Map<string, any>),
    //     );
    //   }
    // }
    // if (data?.review != null) {
    //   for (let review in data!.review) {
    //     parsedReview.push(jsonToReview(review as unknown as Map<string, any>));
    //   }
    // }

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
      cartAmount: data?.cartAmount,
      review: data?.review,
      buy: data?.buy,
    } as UserType;
  },
};
