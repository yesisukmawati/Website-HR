"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseAuth } from "@/hooks/use-supabase-auth"
import { LandingPage } from "@/app/components/landing-page"

export default function HomePage() {
  const { user, loading } = useSupabaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      if (user.role === "admin") {
        router.push("/admin")
      } else if (user.role === "employee") {
        router.push("/employee")
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show landing page if not authenticated
  if (!user) {
    return <LandingPage />
  }

  // This will be reached briefly before redirect
  return null
}
