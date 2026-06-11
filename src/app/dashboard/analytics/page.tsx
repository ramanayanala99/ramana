"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/dashboard"); }, [router]);
  return null;
}
