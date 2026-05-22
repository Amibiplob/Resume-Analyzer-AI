"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const { register, handleSubmit } = useForm({
    values: {
      name: session?.user?.name || "",
    },
  });

  const onSubmit = async (data: { name: string }) => {
    await update({ name: data.name });
    toast.success("Profile updated");
  };

  return (
    <div className="max-w-md space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account information
        </p>
      </div>

      {/* User Card */}
      <div className="flex items-center gap-4 border rounded-lg p-4">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-medium">
          {session?.user?.name?.[0]?.toUpperCase() || "U"}
        </div>

        <div>
          <p className="font-medium">{session?.user?.name}</p>
          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Name</label>
          <input
            {...register("name")}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Email</label>
          <input
            value={session?.user?.email || ""}
            disabled
            className="w-full border rounded px-3 py-2 text-sm opacity-60"
          />
        </div>

        <button className="w-full bg-primary text-primary-foreground rounded px-4 py-2 text-sm font-medium">
          Save changes
        </button>
      </form>
    </div>
  );
}
