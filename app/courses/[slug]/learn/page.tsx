import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import LearnClient from "./LearnClient";

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const q = query(collection(db, "courses"), where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);

  const course = snapshot.empty ? { title: slug.replace(/-/g, " "), slug } : snapshot.docs[0].data();

  return <LearnClient course={course} />;
}
