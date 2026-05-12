"use client"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

const schema = z.object({
  email:    z.string().email(),
  password: z.string().min(1),
})
type Form = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: Form) => {
    const res = await signIn("credentials", { ...data, redirect: false })
    if (res?.error) toast.error("Invalid credentials")
    else { toast.success("Logged in!"); router.push("/") }
  }

  const fillDemo = (role: "user" | "admin") => {
    setValue("email",    role === "admin" ? process.env.NEXT_PUBLIC_DEMO_ADMIN_EMAIL! : process.env.NEXT_PUBLIC_DEMO_USER_EMAIL!)
    setValue("password", role === "admin" ? "admin1234" : "demo1234")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Sign in</h1>

        <div className="flex gap-2">
          <button onClick={() => fillDemo("user")}  className="flex-1 border rounded px-3 py-1.5 text-sm">Demo User</button>
          <button onClick={() => fillDemo("admin")} className="flex-1 border rounded px-3 py-1.5 text-sm">Demo Admin</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input {...register("email")} placeholder="Email" className="w-full border rounded px-3 py-2" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input {...register("password")} type="password" placeholder="Password" className="w-full border rounded px-3 py-2" />
          </div>
          <button disabled={isSubmitting} className="w-full bg-primary text-primary-foreground rounded py-2">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full border rounded py-2 text-sm">
          Continue with Google
        </button>

        <p className="text-center text-sm">
          No account? <Link href="/register" className="underline">Register</Link>
        </p>
      </div>
    </div>
  )
}