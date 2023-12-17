import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";

interface AddNewPerfumeProps {
  name: string;
  image: string;
  price: number;
  brand: string;
  occasion: string;
  size: number;
  concentration: string;
  origin: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  gender: string;
  description: string;
}

export default async function addNewPerfume(
  props: AddNewPerfumeProps,
): Promise<void> {
  const {
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
  } = props;

  const newDocRef = doc(collection(db, "perfume"));

  const newPerfume: PerfumeProps = {
    id: newDocRef.id,
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
    stock: generateRandomStock(),
    rating: 0,
    reviews: [],
    bestSeller: false,
  };

  await setDoc(newDocRef, newPerfume);
}
