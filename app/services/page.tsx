import {Metadata} from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "Services ",
    description: "Explore our specialized services: Web3 development, AI/ML solutions, SEO growth, and custom web application development by PasCodez.",
    openGraph: {
        title: "High-Performance Software Solutions | PasCodez Services",
        description: "From Portfolio design to E-Commerce systems and Technical Audits.",
    }
};

export default function ServicesPage () {
    return <ServicesClient />;
}
