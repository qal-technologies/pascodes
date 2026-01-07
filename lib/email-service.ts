import {SITE_CONFIG} from "./site-config";

// Mock email sending function (In production this would use APIs)
const sendWithServiceA = async (to: string, subject: string, body: string) => {
    console.log(`[Service A] Sending to ${to}: ${subject}. Body: ${body}`);
    return true;
};

const sendWithServiceB = async (to: string, subject: string, body: string) => {
    console.log(`[Service B] Sending to ${to}: ${subject}. Body: ${body}`);
    return true;
};

const SERVICES = [
    {name: "Service A", send: sendWithServiceA},
    {name: "Service B", send: sendWithServiceB}
];

export const sendEmail = async (to: string, subject: string, body: string) => {
    // Rotation Logic: Pick random or round-robin. Random for now for simplicity.
    const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];

    try {
        await service.send(to, subject, body);
        return {success: true, provider: service.name};
    } catch(error) {
        console.error("Email send failed", error);
        // Fallback logic could go here
        return {success: false, error};
    }
};

export const sendBuildStatusEmail = async (email: string, status: "progress" | "complete" | "cancelled" | "issue", data?: Record<string, string>) => {
    let subject = "";
    let body = "";

    const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;

    switch(status) {
        case "progress":
            subject = "Your Build has Started! | PasCodez";
            body = `Good news! We've started working on your project "${data?.title}". We will keep you updated. \n\nContact us: ${whatsappLink}`;
            break;
        case "complete":
            subject = "Project Completed! | PasCodez";
            body = `Success! Your project "${data?.title}" is complete. Please check your dashboard or contact us for handover. \n\nContact us: ${whatsappLink}`;
            break;
        case "cancelled":
            subject = "Project Update | PasCodez";
            body = `Regarding your project "${data?.title}". \n\nReason: ${data?.reason} \n\nPlease contact us to resolve this: ${whatsappLink}`;
            break;
        case "issue":
            subject = "Important Update | PasCodez";
            body = `We have an update regarding "${data?.title}": \n\n${data?.message} \n\nContact us: ${whatsappLink}`;
            break;
    }

    return await sendEmail(email, subject, body);
};
