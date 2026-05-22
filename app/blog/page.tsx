import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Blog } from "@/lib/types";

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog`, {
      next: { revalidate: 60 },
    });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-8">Resume Tips & Guides</h1>
        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={String(post._id)} className="border rounded-lg p-6">
              <div className="flex gap-2 mb-2 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-lg font-medium hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-muted-foreground text-sm mt-1">
                {post.excerpt}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                {formatDate(post.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
