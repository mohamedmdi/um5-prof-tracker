import { NextRequest, NextResponse } from "next/server";
import { firestore } from "firebase-admin";
import { customInitApp } from "@/lib/firebase-admin-config";

customInitApp();
const adminDB = firestore();
export async function GET(request: NextRequest) {
  const profRef = adminDB.collection("profslist");
  const snapshot = await profRef
    .where("isDeleted", "==", true)
    .orderBy("createdAt", "asc")
    .get();
  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json({ profs: docs, length: docs.length, status: 200 });
}
