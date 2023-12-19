import { collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../config";
import { PerfumeProps, jsonToParfume } from "./perfume";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface AddNewPerfumeProps {
  name: string;
  image: File;
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

  // Upload image to storage
  const imageRef = ref(storage, `${image.name}`);
  await uploadBytes(imageRef, image);

  // Get the download URL of the uploaded image
  const imageUrl = await getDownloadURL(imageRef);

  const newDocRef = doc(collection(db, "perfume"));

  const newPerfume: PerfumeProps = {
    id: newDocRef.id,
    name: name,
    image: imageUrl,
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
