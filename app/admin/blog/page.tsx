"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { formatDate } from "@/lib/utils";
import type { Blog } from "@/lib/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const load = () => axios.get("/api/blog").then((r) => setPosts(r.data));

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/api/blog", {
        ...data,
        tags: data.tags
          ? data.tags.split(",").map((t: string) => t.trim())
          : [],
        published: true,
      });

      toast.success("Post created");
      reset();
      setOpen(false);
      load();
    } catch {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blog ({posts.length})</h1>
          <p className="text-sm text-muted-foreground">Manage blog posts</p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          New Post
        </button>
      </div>

      {/* form */}
      {open && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 rounded-xl border p-4"
        >
          <input
            {...register("title")}
            placeholder="Title"
            required
            className="w-full rounded border px-3 py-2 text-sm"
          />

          <input
            {...register("excerpt")}
            placeholder="Excerpt"
            className="w-full rounded border px-3 py-2 text-sm"
          />

          <input
            {...register("tags")}
            placeholder="Tags (comma separated)"
            className="w-full rounded border px-3 py-2 text-sm"
          />

          <textarea
            {...register("content")}
            placeholder="Content"
            rows={6}
            className="w-full resize-none rounded border px-3 py-2 text-sm"
          />

          <button className="rounded bg-primary px-4 py-2 text-sm text-primary-foreground">
            Publish
          </button>
        </form>
      )}

      {/* list */}
      <div className="space-y-2">
        {posts.map((p) => (
          <div
            key={String(p._id)}
            className="flex items-start justify-between rounded-xl border p-4"
          >
            <div>
              <p className="text-sm font-medium">{p.title}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(p.createdAt)}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 justify-end">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
