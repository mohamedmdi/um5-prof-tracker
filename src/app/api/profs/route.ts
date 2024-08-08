import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export async function GET(request: NextRequest) {
  const querySnapshot = await getDocs(collection(db, "profslist"));
  const docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json({ profs: docs, length: docs.length, status: 200 });
}

export async function POST(request: NextRequest) {
  const newProf = await request.json();
  try {
    const docRef = await addDoc(collection(db, "profslist"), newProf);
    console.log("Document written with ID: ", docRef.id);
    return NextResponse.json({
      message: "Document written",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
export async function PUT(request: NextRequest) {
  const prof = await request.json();
  const { id, ...restProf } = prof;
  try {
    const docRef = await updateDoc(doc(db, "profslist", prof.id), restProf);
    console.log("Document UPDATED with ID: ", docRef);
    return NextResponse.json({
      message: "Document updated",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const prof = await request.json();
  try {
    await deleteDoc(doc(db, "cities", prof.id));
    return NextResponse.json({
      message: "Document Deleted",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
