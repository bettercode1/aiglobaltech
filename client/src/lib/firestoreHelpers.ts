import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

// Save all form fields to 'receivedApplications'
export async function saveApplicationToFirestore(data: Record<string, any>) {
  try {
    const docRef = await addDoc(collection(db, "receivedApplications"), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
}