import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "firebase-admin";
import { customInitApp } from "@/lib/firebase-admin-config";
export const runtime = "edge";

customInitApp();
const adminDB = firestore();
const profRef = adminDB.collection("profslist");

export async function GET(request: NextRequest) {
  const snapshot = await profRef
    .where("isDeleted", "==", false)
    .orderBy("createdAt", "asc")
    .get();
  const docs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json({ profs: docs, length: docs.length, status: 200 });
}

export async function POST(request: NextRequest) {
  const newProf = await request.json();
  try {
    const docRef = await profRef.doc().set({
      ...newProf,
      createdAt: new Date(),
      isDeleted: false,
    });
    console.log("Document written with ID: ", docRef);
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

//? Bulk Inser Test End Point

// export async function POST(request: NextRequest) {
//   try {
//     // Parse JSON from the request body
//     const newProf = await request.json();

//     // Use Promise.all to wait for all addDoc operations to complete
//     const results = await Promise.all(
//       newProf.map(async (prof: any) => {
//         try {
//           const docRef = await addDoc(collection(db, "profslist"), prof);
//           console.log("Document written with ID: ", docRef.id);
//           return { success: true, id: docRef.id };
//         } catch (error) {
//           console.error("Error adding document: ", error);
//           return { success: false, error };
//         }
//       })
//     );

//     // Check results and prepare the response
//     const errors = results.filter((result) => !result.success);
//     if (errors.length > 0) {
//       return NextResponse.json({
//         message: "Some documents failed to write",
//         results,
//         status: 500,
//       });
//     }

//     return NextResponse.json({
//       message: "All documents written successfully",
//       results,
//       status: 200,
//     });
//   } catch (error) {
//     console.error("Error processing request: ", error);
//     return NextResponse.json({
//       message: "Error processing request",
//       status: 500,
//     });
//   }
// }

export async function PUT(request: NextRequest) {
  const prof = await request.json();
  const { id, ...restProf } = prof;
  try {
    const docRef = await profRef.doc(id).update(restProf);
    // const docRef = await updateDoc(doc(db, "profslist", prof.id), restProf);
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

export async function PATCH(request: NextRequest) {
  const { id, isDeleted } = await request.json();
  try {
    await profRef.doc(id).update({ isDeleted })

    return NextResponse.json({
      message: "Document Soft Deleted",
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
  const { id } = await request.json();
  console.log("api/profs => id: ", id);
  try {
    await profRef.doc().delete()
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
