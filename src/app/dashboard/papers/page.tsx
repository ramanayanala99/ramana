"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PapersPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/dashboard/gallery"); }, [router]);
  return null;
}
