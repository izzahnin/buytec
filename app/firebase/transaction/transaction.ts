import { Timestamp } from "firebase/firestore";
import getPerfumeById from "../perfume/getPerfumeById";
import { PerfumeProps } from "../perfume/perfume";
import { getPerfumeByIdFromLocal } from "../perfume/getPerfumeFromLocal";

export interface TransactionFirebaseProps {
  id: string;
  userId: string;
  userName: string;
  address: string;
  perfumeId: string[];
  amount: number[];
  totalAmount: number[];
  total: number;
  packageStatus: string;
  paymentMethod: string;
  date: Date;
}

export interface TransactionProps {
  id: string;
  userId: string;
  userName: string;
  address: string;
  perfumeId: PerfumeProps[];
  amount: number[];
  totalAmount: number[];
  total: number;
  packageStatus: string;
  paymentMethod: string;
  date: Date;
}

export async function jsonToTransaction(json: {
  [key: string]: any;
}): Promise<TransactionProps> {
  const perfumes: PerfumeProps[] = [];
  // TODO: get perfume
  (json.perfumeId as string[]).forEach((id) => {
    // console.log(id);
    const perfume = getPerfumeByIdFromLocal(id);
    console.log(perfume);
    perfumes.push(perfume!);
  })
  // console.log(perfumes);
  

  return {
    id: json.id || "",
    userId: json.userId || "",
    userName: json.userName || "",
    address: json.address || "",
    perfumeId: perfumes,
    amount: Array.isArray(json.amount) ? json.amount : [],
    totalAmount: Array.isArray(json.totalAmount) ? json.totalAmount : [],
    total: json.total || 0,
    packageStatus: json.packageStatus || "",
    paymentMethod: json.packageStatus || "",
    date: (json.date as Timestamp).toDate() || "",
  };
}
