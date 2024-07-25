import {
  type User,
  onAuthStateChanged as _onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import { createSession, removeSession } from "@/actions/auth-actions";
import { redirect } from "next/navigation";
import { FirebaseError } from "firebase/app";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(auth, callback);
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed up
    const idToken = await userCredential.user.getIdToken();
    await createSession({ idToken, userId: userCredential.user.uid });
    return idToken; // Ensure the token is returned
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
          throw new Error("Email ou mot de passe incorrect.");
        default:
          throw error;
      }
    }
    throw new Error("Un problème est survenu lors de la connexion.");
  }
}

// export async function signIn({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   signInWithEmailAndPassword(auth, email, password)
//     .then(async (userCredential) => {
//       // Signed up

//       const idToken = await userCredential.user.getIdToken();
//       createSession({ idToken, userId: userCredential.user.uid });
//       return idToken;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       throw new Error(errorMessage);
//     });
// }

export async function EmailsignOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      removeSession();
    })
    .catch((error) => {
      // An error happened.
    });
}
