// // // "use client"

// // // import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// // // import { supabase, type User } from "@/lib/supabase"

// // // interface AuthContextType {
// // //   user: User | null
// // //   loading: boolean
// // //   login: (email: string, password: string) => Promise<boolean>
// // //   logout: () => Promise<void>
// // //   isAuthenticated: boolean
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // // export function AuthProvider({ children }: { children: ReactNode }) {
// // //   const [user, setUser] = useState<User | null>(null)
// // //   const [loading, setLoading] = useState(true)

// // //   useEffect(() => {
// // //     const initAuth = async () => {
// // //       try {
// // //         const currentUser = await supabase.getCurrentUser()
// // //         setUser(currentUser)
// // //       } catch (error) {
// // //         console.error("Auth initialization error:", error)
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }

// // //     initAuth()
// // //   }, [])

// // //   const login = async (email: string, password: string): Promise<boolean> => {
// // //     try {
// // //       setLoading(true)
// // //       const user = await supabase.signIn(email, password)
// // //       setUser(user)
// // //       return true
// // //     } catch (error) {
// // //       console.error("Login error:", error)
// // //       return false
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const logout = async (): Promise<void> => {
// // //     try {
// // //       setLoading(true)
// // //       await supabase.signOut()
// // //       setUser(null)
// // //     } catch (error) {
// // //       console.error("Logout error:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const value: AuthContextType = {
// // //     user,
// // //     loading,
// // //     login,
// // //     logout,
// // //     isAuthenticated: !!user,
// // //   }

// // //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// // // }

// // // export function useSupabaseAuth() {
// // //   const context = useContext(AuthContext)
// // //   if (context === undefined) {
// // //     throw new Error("useSupabaseAuth must be used within an AuthProvider")
// // //   }
// // //   return context
// // // }
// // "use client"

// // import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// // import { supabase } from "@/lib/supabase"
// // import type { User } from "@supabase/supabase-js"

// // interface AuthContextType {
// //   user: User | null
// //   loading: boolean
// //   login: (email: string, password: string) => Promise<boolean>
// //   logout: () => Promise<void>
// //   isAuthenticated: boolean
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // export function AuthProvider({ children }: { children: ReactNode }) {
// //   const [user, setUser] = useState<User | null>(null)
// //   const [loading, setLoading] = useState(true)

// //   useEffect(() => {
// //     const initAuth = async () => {
// //       try {
// //         const { data, error } = await supabase.auth.getUser()
// //         if (error) throw error
// //         setUser(data.user)
// //       } catch (error) {
// //         console.error("Auth initialization error:", error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     initAuth()

// //     // Listen perubahan auth state (login/logout)
// //     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
// //       setUser(session?.user ?? null)
// //     })

// //     return () => {
// //       authListener.subscription.unsubscribe()
// //     }
// //   }, [])

// //   const login = async (email: string, password: string): Promise<boolean> => {
// //     try {
// //       setLoading(true)
// //       const { data, error } = await supabase.auth.signInWithPassword({ email, password })
// //       if (error) throw error
// //       setUser(data.user)
// //       return true
// //     } catch (error) {
// //       console.error("Login error:", error)
// //       return false
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const logout = async (): Promise<void> => {
// //     try {
// //       setLoading(true)
// //       const { error } = await supabase.auth.signOut()
// //       if (error) throw error
// //       setUser(null)
// //     } catch (error) {
// //       console.error("Logout error:", error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const value: AuthContextType = {
// //     user,
// //     loading,
// //     login,
// //     logout,
// //     isAuthenticated: !!user,
// //   }

// // //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// // }

// // export function useSupabaseAuth() {
// //   const context = useContext(AuthContext)
// //   if (context === undefined) {
// //     throw new Error("useSupabaseAuth must be used within an AuthProvider")
// //   }
// //   return context
// // }
// // File: components/providers/AuthProvider.tsx (atau di mana pun kamu meletakkannya)

// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import { supabase } from "@/lib/supabase"
// import type { User } from "@supabase/supabase-js"

// // Definisikan tipe untuk context
// interface AuthContextType {
//   user: User
//   loading: boolean
//   login: (email: string, password: string) => Promise<boolean>
//   logout: () => Promise<void>
//   isAuthenticated: boolean
// }

// // Buat context dengan nilai awal undefined
// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // Komponen Provider
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Fungsi untuk mendapatkan data user saat pertama kali load
//     const getInitialUser = async () => {
//       try {
//         const { data, error } = await supabase.auth.getUser()
//         if (error) throw error
//         setUser(data?.user ?? null)
//       } catch (error) {
//         console.error("Auth initialization error:", error)
//         setUser(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     getInitialUser()

//     // Listener untuk memantau perubahan status otentikasi (login/logout)
//     const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null)
//       setLoading(false)
//     })

//     // Cleanup listener saat komponen di-unmount
//     return () => {
//       authListener.subscription.unsubscribe()
//     }
//   }, [])

//   const login = async (email: string, password: string): Promise<boolean> => {
//     setLoading(true)
//     try {
//       const { error } = await supabase.auth.signInWithPassword({ email, password })
//       if (error) throw error
//       return true
//     } catch (error) {
//       console.error("Login error:", error)
//       return false
//     } finally {
//       setLoading(false)
//     }
//   }

//   const logout = async (): Promise<void> => {
//     setLoading(true)
//     try {
//       const { error } = await supabase.auth.signOut()
//       if (error) throw error
//     } catch (error) {
//       console.error("Logout error:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Nilai yang akan diberikan ke komponen di dalamnya
//   const value: AuthContextType = {
//     user,
//     loading,
//     login,
//     logout,
//     isAuthenticated: !!user, // true jika user ada, false jika null
//   }

//   // BAGIAN INI HARUS DIAKTIFKAN
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

// // Custom hook untuk menggunakan context
// export function useSupabaseAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useSupabaseAuth must be used within an AuthProvider")
//   }
//   return context
// }

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
// 1. GANTI IMPOR DARI 'User' MENJADI 'CustomUser' DARI FILE TIPE KITA
import type { CustomUser } from "@/lib/types.ts"

// 2. PERBARUI TIPE KONTEKS AGAR SESUAI
interface AuthContextType {
  user: CustomUser | null // User bisa null saat logout
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

// Buat context dengan nilai awal undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Komponen Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  // 3. GUNAKAN 'CustomUser' PADA STATE
  const [user, setUser] = useState<CustomUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        // 4. BERI TAHU TYPESCRIPT BAHWA USER INI ADALAH CustomUser
        setUser((data?.user as CustomUser) ?? null)
      } catch (error) {
        console.error("Auth initialization error:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      // 4. BERI TAHU TYPESCRIPT BAHWA USER INI ADALAH CustomUser
      setUser((session?.user as CustomUser) ?? null)
      setLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook untuk menggunakan context
export function useSupabaseAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within an AuthProvider")
  }
  return context
}

// ----- Hook data lainnya bisa tetap berada di file use-supabase-data.ts -----
// Ini hanya contoh jika kamu ingin menggabungkannya, tapi lebih baik tetap terpisah.