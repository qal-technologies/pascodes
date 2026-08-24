import { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description: "Transparent software development pricing, website packages, and course fees at PoshCodes.",
  openGraph: {
    title: "Pricing & Plans | PoshCodes",
    description: "Detailed pricing, package breakdown, and course benefits at PoshCodes.",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
