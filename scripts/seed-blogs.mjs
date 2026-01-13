import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlJtVWcEZZP3VtGss57lVilh9ohDZZ3Gc",
  authDomain: "pascodes-web.firebaseapp.com",
  projectId: "pascodes-web",
  storageBucket: "pascodes-web.firebasestorage.app",
  messagingSenderId: "5630854707",
  appId: "1:5630854707:web:45a848df90e88e94634546",
  measurementId: "G-7HLWTH0S59"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const posts = [
    {
        title: "Next.js 15: The Future of Web Performance",
        excerpt: "Exploring the new React Compiler, revamped caching strategies, and improved developer experience in the latest Next.js release.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=800",
        slug: "nextjs-15-performance",
        category: "Tech",
        content: "Next.js 15 introduces several game-changing features... [Sample Content]"
    },
    {
        title: "Building Agentic AI Systems",
        excerpt: "How autonomous agents are transforming the way we build software and interact with technology.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        slug: "agentic-ai-systems",
        category: "Tech",
        content: "Agentic AI is the next frontier... [Sample Content]"
    },
    {
        title: "The Minimalist Coder's Setup",
        excerpt: "Less is more. How I optimized my workspace for maximum focus and productivity.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        slug: "minimalist-coder-setup",
        category: "Lifestyle",
        content: "A professional workspace doesn't need to be cluttered... [Sample Content]"
    },
    {
        title: "PasCodez Milestone: 5,000 Visitors",
        excerpt: "We've reached a huge milestone in our journey to empower developers worldwide.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        slug: "milestone-5k-visitors",
        category: "News",
        content: "Thank you for being part of this community... [Sample Content]"
    },
    {
        title: "Launch: Advanced React Patterns Course",
        excerpt: "Master high-level patterns, optimization, and state management in our latest masterclass.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
        slug: "advanced-react-patterns-launch",
        category: "Announcement",
        content: "Registration is now open for our most requested course... [Sample Content]"
    }
];

async function seed() {
    console.log("Starting seed process...");
    try {
        for (const post of posts) {
            const docRef = await addDoc(collection(db, "posts"), {
                ...post,
                date: serverTimestamp(),
                createdAt: serverTimestamp()
            });
            console.log(`Added post: ${post.title} with ID: ${docRef.id}`);
        }
        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
    process.exit();
}

seed();
