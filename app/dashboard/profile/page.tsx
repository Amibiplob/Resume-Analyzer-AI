"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const { register, handleSubmit } = useForm({
    defaultValues: { name: session?.user?.name || "" },
  });

  const onSubmit = async (data: { name: string }) => {
    await update({ name: data.name });
    toast.success("Profile updated");
  };

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-medium">
          {session?.user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-medium">{session?.user?.name}</p>
          <p className="text-sm text-muted-foreground">
            {session?.user?.email}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            {...register("name")}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={session?.user?.email || ""}
            disabled
            className="w-full border rounded px-3 py-2 mt-1 opacity-50"
          />
        </div>
        <button className="bg-primary text-primary-foreground rounded px-4 py-2 text-sm">
          Save changes
        </button>
      </form>
    </div>
  );
}
