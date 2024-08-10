import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

export async function GET(request: NextRequest) {
  const querySnapshot = await getDocs(
    query(
      collection(db, "profslist"),
      where("isDeleted", "==", true),
      orderBy("createdAt", "desc")
    )
  );
  const docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json({ profs: docs, length: docs.length, status: 200 });
}
