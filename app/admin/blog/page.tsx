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
    await axios.post("/api/blog", {
      ...data,
      tags: data.tags.split(",").map((t: string) => t.trim()),
      published: true,
    });
    toast.success("Post created");
    reset();
    setOpen(false);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Blog ({posts.length})</h1>
        <button
          onClick={() => setOpen(!open)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm"
        >
          New Post
        </button>
      </div>
      {open && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border rounded-lg p-4 space-y-3"
        >
          <input
            {...register("title")}
            placeholder="Title"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            {...register("excerpt")}
            placeholder="Excerpt"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            {...register("tags")}
            placeholder="Tags (comma separated)"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <textarea
            {...register("content")}
            placeholder="Content"
            rows={6}
            className="w-full border rounded px-3 py-2 text-sm resize-none"
          />
          <button className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm">
            Publish
          </button>
        </form>
      )}
      <div className="space-y-2">
        {posts.map((p) => (
          <div
            key={String(p._id)}
            className="border rounded-lg px-4 py-3 flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-sm">{p.title}</p>
              <p className="text-xs text-muted-foreground">
                {formatDate(p.createdAt)}
              </p>
            </div>
            <div className="flex gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded">
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
