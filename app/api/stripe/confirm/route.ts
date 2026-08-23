import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        purchasedCourses: arrayUnion(courseId),
      });
    }

    return NextResponse.json({ success: true, message: "Course added to purchased list." });
  } catch (error: any) {
    console.error("Course purchase sync error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
