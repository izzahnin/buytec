import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config";
import { PerfumeProps } from "./perfume";

// interface  {
//     name: string;
//     image: string;
//     price: number;
//     brand: string;
//     occasion: string;
//     size: number;
//     concentration: string;
//     origin: string;
//     topNotes: string[];
//     middleNotes: string[];
//     baseNotes: string[];
//     gender: string;
//     description: string;
//   }

export default async function updatePerfume(
  props: PerfumeProps,
): Promise<void> {
  const {
    id,
    name,
    image,
    price,
    brand,
    occasion,
    size,
    concentration,
    origin,
    topNotes,
    middleNotes,
    baseNotes,
    gender,
    description,
    stock,
    bestSeller,
  } = props;

  const newDocRef = doc(db, "perfume", id);

  const newPerfumeData = {
    id: id,
    name: name,
    image: image,
    price: price,
    brand: brand,
    occasion: occasion,
    size: size,
    concentration: concentration,
    origin: origin,
    topNotes: topNotes,
    middleNotes: middleNotes,
    baseNotes: baseNotes,
    gender: gender,
    description: description,
    stock: stock,
    bestSeller: bestSeller,
  };

  await updateDoc(newDocRef, { ...newPerfumeData });
}
