import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function saveApplicationToFirestore(data) {
  try {
    const docRef = await addDoc(collection(db, "applications"), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
} 