import { db } from "@/lib/firebase";
import { calculateCategory } from "@/lib/utils";
import axios from "axios";
import { firestore } from "firebase-admin";
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

const adminDB = firestore();
const profRef = adminDB.collection("profslist");

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  let updated = 0;
  try {
    const snapshot = await profRef.get();
    const promises = snapshot.docs.map(async (prof) => {
      const profData = prof.data();
      const calculatedCat = calculateCategory(profData.daterec);
      if (profData.cat != calculatedCat) {
        try {
          await profRef.doc(prof.id).update({ cat: calculatedCat });
          updated++;
        } catch (error) {
          if (axios.isAxiosError(error)) return error.response?.status || 500;
        }
      }
    });
    await Promise.all(promises);
    return NextResponse.json(
      {
        status: "success",
        updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Failed to fetch or update profs: ${error.message}`);
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
