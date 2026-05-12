import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatDate } from "@/lib/utils";

async function getPost(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/blog/${slug}`, {
      next: { revalidate: 60 },
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) return <p className="p-8">Post not found.</p>;
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.tags.map((t: string) => (
            <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-semibold mb-2">{post.title}</h1>
        <p className="text-xs text-muted-foreground mb-8">
          {formatDate(post.createdAt)}
        </p>
        <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-wrap">
          {post.content}
        </div>
      </main>
      <Footer />
    </>
  );
}
