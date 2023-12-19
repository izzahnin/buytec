import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../config";
import { getDocs, query, where, collection } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export default async function deletePerfume(id: string): Promise<void> {
  try {
    // Get the document to retrieve the image URL
    const perfumeDoc = await getDocs(
      query(collection(db, "perfume"), where("id", "==", id)),
    );

    if (perfumeDoc.docs.length > 0) {
      const perfumeData = perfumeDoc.docs[0].data();

      // Delete the document from Firestore
      await deleteDoc(doc(db, "perfume", id));

      // Delete the image from storage
      const imageRef = ref(storage, perfumeData.image);
      await deleteObject(imageRef);
    } else {
      throw new Error("Perfume not found");
    }
  } catch (error) {
    console.error("Error deleting perfume:", error);
    throw error;
  }
}
