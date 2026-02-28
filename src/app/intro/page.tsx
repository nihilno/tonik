import IntroCard from "@/components/intro-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction",
};

export default function IntroPage() {
  return <IntroCard />;
}
