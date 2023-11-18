import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";
import { db } from "../config";

export default async function addToCart(perfumeId: string): Promise<void> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user, updateUserData } = useAuth();
    const newUserData = user;
    newUserData.cart?.push(perfumeId);
    const newCart = {
        cart: newUserData.cart,
    }
    updateUserData(newUserData);
    
    await updateDoc(doc(db, "user", user.id!), newCart);
}