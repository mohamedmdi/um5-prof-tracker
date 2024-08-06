import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function GET(request: NextRequest) {
  // const data = [
  //   {
  //     id: "m5gr84i9",
  //     amount: 316,
  //     status: "success",
  //     email: "ken99@yahoo.com",
  //   },
  //   {
  //     id: "3u1reuv4",
  //     amount: 242,
  //     status: "success",
  //     email: "Abe45@gmail.com",
  //   },
  //   {
  //     id: "derv1ws0",
  //     amount: 837,
  //     status: "processing",
  //     email: "Monserrat44@gmail.com",
  //   },
  //   {
  //     id: "5kma53ae",
  //     amount: 874,
  //     status: "success",
  //     email: "Silas22@gmail.com",
  //   },
  //   {
  //     id: "bhqecj4p",
  //     amount: 721,
  //     status: "failed",
  //     email: "carmella@hotmail.com",
  //   },
  //   {
  //     id: "klm56tuv",
  //     amount: 1025,
  //     status: "pending",
  //     email: "john.doe@gmail.com",
  //   },
  //   {
  //     id: "zxy78wer",
  //     amount: 350,
  //     status: "success",
  //     email: "emily.smith@yahoo.com",
  //   },
  //   {
  //     id: "qaz12xsw",
  //     amount: 500,
  //     status: "failed",
  //     email: "mark.jones@outlook.com",
  //   },
  //   {
  //     id: "vbn34rty",
  //     amount: 875,
  //     status: "pending",
  //     email: "sarah.brown@icloud.com",
  //   },
  //   {
  //     id: "mnb65plm",
  //     amount: 1200,
  //     status: "success",
  //     email: "michael.white@aol.com",
  //   },
  //   {
  //     id: "hgf43kjl",
  //     amount: 640,
  //     status: "failed",
  //     email: "linda.green@hotmail.com",
  //   },
  //   {
  //     id: "wer89vbn",
  //     amount: 450,
  //     status: "pending",
  //     email: "robert.wilson@gmail.com",
  //   },
  //   {
  //     id: "ytb09qwe",
  //     amount: 980,
  //     status: "success",
  //     email: "lisa.moore@yahoo.com",
  //   },
  //   {
  //     id: "poi56lkj",
  //     amount: 720,
  //     status: "failed",
  //     email: "james.taylor@outlook.com",
  //   },
  //   {
  //     id: "nmk34uiy",
  //     amount: 615,
  //     status: "pending",
  //     email: "karen.martin@icloud.com",
  //   },
  //   {
  //     id: "bvc78opl",
  //     amount: 840,
  //     status: "success",
  //     email: "patricia.williams@aol.com",
  //   },
  //   {
  //     id: "rfv23tgb",
  //     amount: 470,
  //     status: "failed",
  //     email: "richard.thomas@hotmail.com",
  //   },
  // ];

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
