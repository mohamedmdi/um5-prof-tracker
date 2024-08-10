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
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const querySnapshot = await getDocs(
    query(
      collection(db, "profslist"),
      where("isDeleted", "==", false),
      orderBy("createdAt", "desc")
    )
  );
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

export async function PATCH(request: NextRequest) {
  const { id, isDeleted } = await request.json();
  try {
    const docRef = await setDoc(
      doc(db, "profslist", id),
      { isDeleted },
      { merge: true }
    );
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
    await deleteDoc(doc(db, "profslist", id));
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
