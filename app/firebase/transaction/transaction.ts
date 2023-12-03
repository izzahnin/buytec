import { Timestamp } from "firebase/firestore";
import getPerfumeById from "../perfume/getPerfumeById";
import { PerfumeProps } from "../perfume/perfume";

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
  for (let id in json.perfumeId) {
    const perfume = await getPerfumeById(id);
    if (perfume != undefined) {
      perfumes.push();
    }
  }

  return {
    id: json.id || "",
    userId: json.userId || "",
    userName: json.userName || "",
    address: json.address || "",
    perfumeId: Array.isArray(json.perfumeId) ? json.perfumeId : [],
    amount: Array.isArray(json.amount) ? json.amount : [],
    totalAmount: Array.isArray(json.totalAmount) ? json.totalAmount : [],
    total: json.total || 0,
    packageStatus: json.packageStatus || "",
    paymentMethod: json.packageStatus || "",
    date: (json.date as Timestamp).toDate() || "",
  };
}
