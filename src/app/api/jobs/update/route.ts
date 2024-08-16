import { db } from "@/lib/firebase";
import { calculateCategory } from "@/lib/utils";
import axios from "axios";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  let updated = 0;
  try {
    const profs = await getDocs(collection(db, "profslist"));
    const promises = profs.docs.map(async (prof) => {
      const profData = prof.data();
      const calculatedCat = calculateCategory(profData.daterec);
      console.log("Old Cat", profData.cat);
      console.log("calculatedCat", calculatedCat);
      if (profData.cat != calculatedCat) {
        try {
          await updateDoc(doc(db, "profslist", prof.id), {
            ...profData,
            cat: calculatedCat,
          });
          updated++;
        } catch (error) {
          if (axios.isAxiosError(error)) return error.response?.status || 500;
        }
      }
    });
    await Promise.all(promises);
    return NextResponse.json({
      status: "success",
      updated,
    });
  } catch (error: any) {
    console.error(`Failed to fetch or update profs: ${error.message}`);
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
