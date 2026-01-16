import {Metadata} from "next";
import BuildClient from "./BuildClient";

export const metadata: Metadata = {
    title: "Build with AI",
    description: "Get a high-quality, AI-optimized estimate for your next project. Tailor your requirements and see a transparent price breakdown with the PasCodez Build System.",
    openGraph: {
        title: "AI-Powered Project Estimator | PasCodez",
        description: "Plan your next big idea with our transparent pricing and expert insights.",
    }
};

export default function BuildPage () {
    return <BuildClient />;
}
