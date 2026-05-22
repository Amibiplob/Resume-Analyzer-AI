"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Logged in successfully");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 transition-colors">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl p-8 border border-slate-200 dark:border-slate-800 transition-colors">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Welcome Back
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Sign in to continue to your account
            </p>
          </div>

          {/* Demo Account */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Demo Account
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Email:
              <span className="font-medium text-slate-800 dark:text-white">
                demo@email.com
              </span>
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Password:
              <span className="font-medium text-slate-800 dark:text-white">
                123456
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Password
              </label>

              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-3 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white rounded-xl py-3 font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="border-t border-slate-200 dark:border-slate-700"></div>

            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white dark:bg-slate-900 px-3 text-sm text-slate-400 dark:text-slate-500">
              OR
            </span>
          </div>

          {/* Google Button */}
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            className="w-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl py-3 font-medium text-slate-800 dark:text-white transition"
          >
            Continue with Google
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
            Don’t have an account?
            <Link
              href="/register"
              className="font-semibold text-black dark:text-white hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
