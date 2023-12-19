import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface AddNewPerfumeProps {
  name: string;
  image: File;
  imageUrl: string;
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
  stock: number;
}

export default async function addNewPerfume(
  props: AddNewPerfumeProps,
): Promise<void> {
  const {
    name,
    image,
    imageUrl,
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
  } = props;

  const newDocRef = doc(collection(db, "perfume"));
  const newImageRef = ref(storage, imageUrl);

  await uploadBytes(newImageRef, image);
  const imageRef = await getDownloadURL(newImageRef);

  const newPerfume: PerfumeProps = {
    id: newDocRef.id,
    name: name,
    image: imageRef,
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
    rating: 0,
    reviews: [],
    bestSeller: false,
  };

  await setDoc(newDocRef, newPerfume);
}
