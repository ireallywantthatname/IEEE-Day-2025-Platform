"use server";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { verifyPassword } from "@/utils/bcrypt";
import { UserType } from "@/types";

export async function readUser(
  email: string,
  password: string
): Promise<UserType | null> {
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    if (!verifyPassword(password, userData.password)) {
      return null;
    }

    return {
      id: userData.id,
      full_name: userData.full_name,
      email: userData.email,
      password: userData.password,
      phone_number: userData.phone_number,
      food_preference: userData.food_preference,
      gender: userData.gender,
      nic: userData.nic,
      university_name: userData.university_name,
      preferred_track_session_1: userData.preferred_track_session_1,
      preferred_track_session_2: userData.preferred_track_session_2,
      preferred_track_session_3: userData.preferred_track_session_3,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
