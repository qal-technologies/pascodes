"use client";

import BlogPost from "@/components/blog/BlogPost";

export default function BlogPostPage() {
  // In a real application, you would fetch the post data from a CMS or database based on the slug.
  const post = {
    title: "",
    content: "",
    imageUrl: "",
  };
  return <BlogPost post={post} />;
}
