"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import axios from "axios"

const schema = z.object({
  name:     z.string().min(2),
  email:    z.string().email(),
  password: z.string().min(6),
})
type Form = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: Form) => {
    try {
      await axios.post("/api/register", data)
      toast.success("Account created! Please sign in.")
      router.push("/login")
    } catch (e: any) {
      toast.error(e.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name")}     placeholder="Full name"  className="w-full border rounded px-3 py-2" />
          <input {...register("email")}    placeholder="Email"      className="w-full border rounded px-3 py-2" />
          <input {...register("password")} type="password" placeholder="Password (min 6)" className="w-full border rounded px-3 py-2" />
          <button disabled={isSubmitting} className="w-full bg-primary text-primary-foreground rounded py-2">
            {isSubmitting ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="text-center text-sm">
          Have an account? <Link href="/login" className="underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}